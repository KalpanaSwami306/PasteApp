import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen w-screen overflow-hidden">
          <App />
        </div>
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
