import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/app.css'; // Asegúrate de importar tu archivo CSS aquí
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("El elemento raíz no se encontró en el DOM.");
}


