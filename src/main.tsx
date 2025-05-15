import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Admin from './Admin';
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider i18n={{}}>
      <Admin />
    </AppProvider>
  </StrictMode>
);
