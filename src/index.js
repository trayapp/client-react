import './wdyr'
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "flowbite";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { reduxStoreMain, reduxStoreMainPersistor } from "./redux";
import BaseComponent from "./base";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={reduxStoreMain}>
      <PersistGate
        loading={<p>loading...</p>}
        persistor={reduxStoreMainPersistor}
      >
        <BaseComponent />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
