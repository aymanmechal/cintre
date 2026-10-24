create table if not exists public.user_data (
  user_id uuid primary key references auth.users (id) on delete cascade,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

drop policy if exists "Lire ses donnees" on public.user_data;
drop policy if exists "Creer ses donnees" on public.user_data;
drop policy if exists "Modifier ses donnees" on public.user_data;

create policy "Lire ses donnees" on public.user_data
  for select using (auth.uid() = user_id);

create policy "Creer ses donnees" on public.user_data
  for insert with check (auth.uid() = user_id);

create policy "Modifier ses donnees" on public.user_data
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('photos', 'photos', false)
on conflict (id) do nothing;

drop policy if exists "Lire ses photos" on storage.objects;
drop policy if exists "Ajouter ses photos" on storage.objects;
drop policy if exists "Modifier ses photos" on storage.objects;
drop policy if exists "Supprimer ses photos" on storage.objects;

create policy "Lire ses photos" on storage.objects
  for select using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Ajouter ses photos" on storage.objects
  for insert with check (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Modifier ses photos" on storage.objects
  for update using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Supprimer ses photos" on storage.objects
  for delete using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);

create table if not exists public.shared_looks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(title) <= 200),
  looks jsonb not null check (octet_length(looks::text) < 3000000),
  created_at timestamptz not null default now()
);

alter table public.shared_looks enable row level security;

drop policy if exists "Lire ses partages" on public.shared_looks;
drop policy if exists "Creer ses partages" on public.shared_looks;
drop policy if exists "Supprimer ses partages" on public.shared_looks;

create policy "Lire ses partages" on public.shared_looks
  for select using (auth.uid() = user_id);

create policy "Creer ses partages" on public.shared_looks
  for insert with check (auth.uid() = user_id);

create policy "Supprimer ses partages" on public.shared_looks
  for delete using (auth.uid() = user_id);

create table if not exists public.look_votes (
  id bigint generated always as identity primary key,
  shared_id uuid not null references public.shared_looks (id) on delete cascade,
  choice text not null check (char_length(choice) between 1 and 8),
  created_at timestamptz not null default now()
);

alter table public.look_votes enable row level security;

drop policy if exists "Donner son avis" on public.look_votes;
drop policy if exists "Lire les avis de ses partages" on public.look_votes;

create policy "Donner son avis" on public.look_votes
  for insert to anon, authenticated with check (true);

create policy "Lire les avis de ses partages" on public.look_votes
  for select using (
    exists (select 1 from public.shared_looks s where s.id = shared_id and s.user_id = auth.uid())
  );

create or replace function public.get_shared_look(look_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'id', s.id,
    'title', s.title,
    'looks', s.looks,
    'votes', coalesce((select jsonb_agg(v.choice) from look_votes v where v.shared_id = s.id), '[]'::jsonb)
  )
  from shared_looks s
  where s.id = look_id;
$$;

grant execute on function public.get_shared_look(uuid) to anon, authenticated;
