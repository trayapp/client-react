import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "flowbite";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";
import { ScrollToTop } from "./utils/hooks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </StateProvider>
    </Router>
  </React.StrictMode>
);
