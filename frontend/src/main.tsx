import { AuthContextProvider } from "./Context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./Components/App.tsx";
import { StrictMode } from "react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
