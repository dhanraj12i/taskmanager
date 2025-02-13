import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./states/context/AuthProvider.tsx";
import { Provider as StoreWrapper } from "react-redux";
import store from "./states/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreWrapper store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StoreWrapper>
  </StrictMode>
);
