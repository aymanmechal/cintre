import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { PieceDetailPage } from './pages/PieceDetailPage';
import { WardrobePage } from './pages/WardrobePage';
import { AddPiecePage } from './pages/AddPiecePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ROUTES } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.catalog} element={<CatalogPage />} />
          <Route path={ROUTES.pieceDetail} element={<PieceDetailPage />} />
          <Route path={ROUTES.wardrobe} element={<WardrobePage />} />
          <Route path={ROUTES.addPiece} element={<AddPiecePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
