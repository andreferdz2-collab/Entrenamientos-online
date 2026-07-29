import React from "react";
import ReactDOM from "react-dom/client";
import "./lib/storage"; // define window.storage antes de montar App
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
