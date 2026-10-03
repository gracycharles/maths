import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { TypographyProvider } from './context/TypographyContext';
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
