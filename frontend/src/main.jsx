import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
