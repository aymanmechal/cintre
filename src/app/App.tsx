import { BrowserRouter } from 'react-router';
import { AppProviders } from './AppProviders';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
