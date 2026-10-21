import { useParams } from 'react-router';

export function PieceDetailPage() {
  const { id } = useParams();

  return (
    <section>
      <h1>Pièce n°{id}</h1>
      <p>Fiche détaillée — à construire.</p>
    </section>
  );
}
