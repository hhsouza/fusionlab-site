import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./styles/reset.css";
import "./styles/background.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/products.css";
import "./styles/process.css";
import "./styles/customizer.css";
import "./styles/loader.css";
import "./styles/effects.css";
import "./styles/animations.css";
import "./styles/responsive.css";
import "./styles/trust.css";
import "./styles/footer.css";
import "./styles/stats.css";
import "./styles/reveal.css";
import "./styles/gallery.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);