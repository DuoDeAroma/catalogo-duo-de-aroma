import React from "react";
import ReactDOM from "react-dom/client";

const App = () => (
  <div>
    <h1>¡Catálogo Dúo de Aroma funcionando! 🌸</h1>
    <p>Pronto verás aquí los perfumes cargados desde el Excel.</p>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
