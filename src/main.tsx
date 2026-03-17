import { StrictMode } from 'react'; // Importa o modo estrito do React para detectar problemas comuns em desenvolvimento.
import { createRoot } from 'react-dom/client'; // Importa API moderna de renderização do React 18.
import './index.css'; // Importa estilos globais da aplicação.
import App from './App.tsx'; // Importa o componente raiz da aplicação.

// Inicializa a aplicação React no elemento #root do index.html.
createRoot(document.getElementById('root')!).render(
  <StrictMode> {/* Ativa verificações extras do React em ambiente de desenvolvimento. */}
    <App /> {/* Renderiza a aplicação principal. */}
  </StrictMode>,
);
