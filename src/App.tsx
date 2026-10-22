import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout/Layout';
import { CatalogFiltersProvider } from './contexts/catalogFilters/CatalogFiltersProvider';
import { ThemeProvider } from './contexts/theme/ThemeProvider';
import { WardrobeProvider } from './contexts/wardrobe/WardrobeProvider';
import { OutfitsProvider } from './contexts/outfits/OutfitsProvider';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { PieceDetailPage } from './pages/PieceDetailPage';
import { WardrobePage } from './pages/WardrobePage';
import { AddPiecePage } from './pages/AddPiecePage';
import { EditPiecePage } from './pages/EditPiecePage';
import { OutfitsPage } from './pages/OutfitsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ROUTES } from './routes';

function App() {
  return (
    <ThemeProvider>
      <CatalogFiltersProvider>
        <WardrobeProvider>
          <OutfitsProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path={ROUTES.catalog} element={<CatalogPage />} />
                  <Route path={ROUTES.pieceDetail} element={<PieceDetailPage />} />
                  <Route path={ROUTES.wardrobe} element={<WardrobePage />} />
                  <Route path={ROUTES.addPiece} element={<AddPiecePage />} />
                  <Route path={ROUTES.editPiece} element={<EditPiecePage />} />
                  <Route path={ROUTES.outfits} element={<OutfitsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </OutfitsProvider>
        </WardrobeProvider>
      </CatalogFiltersProvider>
    </ThemeProvider>
  );
}

export default App;
