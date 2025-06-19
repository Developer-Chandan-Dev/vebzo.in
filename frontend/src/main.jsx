import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./store/store.js";
import FavsContextProvider from "./context/FavsContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <FavsContextProvider>
        <Router>
          <App />
        </Router>
      </FavsContextProvider>
    </Provider>
  </StrictMode>
);
