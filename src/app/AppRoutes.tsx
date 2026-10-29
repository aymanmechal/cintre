import { Route, Routes } from 'react-router';
import { AppFeature } from '../shared/constants/features';
import { FeatureRoute } from './FeatureRoute';
import { AccountPage } from '../features/auth/pages/AccountPage';
import { ArchivePage } from '../features/archive/pages/ArchivePage';
import { BackupPage } from '../features/backup/pages/BackupPage';
import { CalendarPage } from '../features/calendar/pages/CalendarPage';
import { CompatibilityPage } from '../features/compatibility/pages/CompatibilityPage';
import { HomePage } from '../features/home/pages/HomePage';
import { MePage } from '../features/me/pages/MePage';
import { LookbookPage } from '../features/lookbook/pages/LookbookPage';
import { ColorIdeasPage } from '../features/outfits/pages/ColorIdeasPage';
import { OutfitIdeasPage } from '../features/outfits/pages/OutfitIdeasPage';
import { OutfitsPage } from '../features/outfits/pages/OutfitsPage';
import { AddPiecePage } from '../features/piece-form/pages/AddPiecePage';
import { EditPiecePage } from '../features/piece-form/pages/EditPiecePage';
import { SharedOutfitPage } from '../features/sharing/pages/SharedOutfitPage';
import { StyleProfilePage } from '../features/profile/pages/StyleProfilePage';
import { ShopsPage } from '../features/shops/pages/ShopsPage';
import { StylistPage } from '../features/stylist/pages/StylistPage';
import { SuitcasePage } from '../features/suitcase/pages/SuitcasePage';
import { StatsPage } from '../features/stats/pages/StatsPage';
import { TrashPage } from '../features/trash/pages/TrashPage';
import { WrappedPage } from '../features/wrapped/pages/WrappedPage';
import { WardrobePage } from '../features/wardrobe/pages/WardrobePage';
import { ROUTES } from '../shared/routes';
import { Layout } from './layout/Layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.sharedOutfit} element={<SharedOutfitPage />} />
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.catalog} element={<ShopsPage />} />
        <Route path={ROUTES.wardrobe} element={<WardrobePage />} />
        <Route path={ROUTES.addPiece} element={<AddPiecePage />} />
        <Route path={ROUTES.editPiece} element={<EditPiecePage />} />
        <Route path={ROUTES.outfits} element={<OutfitsPage />} />
        <Route path={ROUTES.outfitIdeas} element={<OutfitIdeasPage />} />
        <Route path={ROUTES.colorIdeas} element={<ColorIdeasPage />} />
        <Route path={ROUTES.calendar} element={<CalendarPage />} />
        <Route path={ROUTES.archive} element={<ArchivePage />} />
        <Route path={ROUTES.trash} element={<TrashPage />} />
        <Route
          path={ROUTES.backup}
          element={
            <FeatureRoute feature={AppFeature.Backup}>
              <BackupPage />
            </FeatureRoute>
          }
        />
        <Route path={ROUTES.stats} element={<StatsPage />} />
        <Route
          path={ROUTES.suitcase}
          element={
            <FeatureRoute feature={AppFeature.Suitcase}>
              <SuitcasePage />
            </FeatureRoute>
          }
        />
        <Route path={ROUTES.wrapped} element={<WrappedPage />} />
        <Route path={ROUTES.lookbook} element={<LookbookPage />} />
        <Route
          path={ROUTES.compatibility}
          element={
            <FeatureRoute feature={AppFeature.Compatibility}>
              <CompatibilityPage />
            </FeatureRoute>
          }
        />
        <Route
          path={ROUTES.stylist}
          element={
            <FeatureRoute feature={AppFeature.Stylist}>
              <StylistPage />
            </FeatureRoute>
          }
        />
        <Route path={ROUTES.styleProfile} element={<StyleProfilePage />} />
        <Route path={ROUTES.account} element={<AccountPage />} />
        <Route path={ROUTES.me} element={<MePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
