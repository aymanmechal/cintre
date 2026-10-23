import { BrowserRouter } from 'react-router';
import { ROUTER_BASENAME } from '../shared/utils/basePath';
import { AppProviders } from './AppProviders';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <AppProviders>
      <BrowserRouter basename={ROUTER_BASENAME}>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
