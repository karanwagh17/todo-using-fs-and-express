import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { EditProvider } from "./todoContext.jsx";

createRoot(document.getElementById("root")).render(
  <EditProvider>
    <App />
  </EditProvider>
);
