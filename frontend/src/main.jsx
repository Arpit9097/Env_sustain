import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SustainabilityProvider from "./context/SustainabilityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SustainabilityProvider>
      <App />
    </SustainabilityProvider>
  </React.StrictMode>
);
