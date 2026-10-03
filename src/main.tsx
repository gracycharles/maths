import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { TypographyProvider } from './context/TypographyContext.tsx';
import 'katex/dist/katex.min.css';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <TypographyProvider>
          <App />
        </TypographyProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
