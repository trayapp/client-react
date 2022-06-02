import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "flowbite";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { ScrollToTop } from "./utils/hooks";
import { ApolloProvider } from "@apollo/client";
import { apolloClientMain } from "./apollo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { reduxStoreMain, reduxStoreMainPersistor } from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={reduxStoreMain}>
      <PersistGate
        loading={<p>loading...</p>}
        persistor={reduxStoreMainPersistor}
      >
        <ApolloProvider client={apolloClientMain}>
          <Router>
            <ScrollToTop>
              <App />
            </ScrollToTop>
          </Router>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
