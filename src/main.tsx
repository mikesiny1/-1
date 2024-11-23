import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { FirebaseProvider } from './components/FirebaseProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </StrictMode>
);