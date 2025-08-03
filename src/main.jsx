import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import History from "./components/History.jsx";
import { GlobalProvider } from "./context/global-context.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <GlobalProvider>
        <History />
        <App />
      </GlobalProvider>
    </div>
  </StrictMode>,
);