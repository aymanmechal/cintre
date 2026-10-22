import { Route, Routes } from 'react-router';
import { CalendarPage } from '../features/calendar/pages/CalendarPage';
import { CatalogPage } from '../features/catalog/pages/CatalogPage';
import { HomePage } from '../features/home/pages/HomePage';
import { OutfitsPage } from '../features/outfits/pages/OutfitsPage';
import { AddPiecePage } from '../features/piece-form/pages/AddPiecePage';
import { EditPiecePage } from '../features/piece-form/pages/EditPiecePage';
import { PieceDetailPage } from '../features/piece-detail/pages/PieceDetailPage';
import { WardrobePage } from '../features/wardrobe/pages/WardrobePage';
import { ROUTES } from '../shared/routes';
import { Layout } from './layout/Layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.catalog} element={<CatalogPage />} />
        <Route path={ROUTES.pieceDetail} element={<PieceDetailPage />} />
        <Route path={ROUTES.wardrobe} element={<WardrobePage />} />
        <Route path={ROUTES.addPiece} element={<AddPiecePage />} />
        <Route path={ROUTES.editPiece} element={<EditPiecePage />} />
        <Route path={ROUTES.outfits} element={<OutfitsPage />} />
        <Route path={ROUTES.calendar} element={<CalendarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
