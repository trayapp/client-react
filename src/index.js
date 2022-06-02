import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "flowbite";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { ScrollToTop } from "./utils/hooks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </React.StrictMode>
);
