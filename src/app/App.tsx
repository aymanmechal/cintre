import { BrowserRouter } from 'react-router';
import { ROUTER_BASENAME } from '../shared/utils/basePath';
import { AppGate } from './AppGate';
import { AppProviders } from './AppProviders';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <AppProviders>
      <BrowserRouter basename={ROUTER_BASENAME}>
        <AppGate>
          <AppRoutes />
        </AppGate>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
