import React from "react";
import BaseContainer from "./Base";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { reduxStoreMain, reduxStoreMainPersistor } from "./redux";

import { ApolloProvider } from "@apollo/client";
import { apolloClientMain } from "./apollo";

const App = () => {
  return (
    <Provider store={reduxStoreMain}>
      <PersistGate
        loading={<p>loading...</p>}
        persistor={reduxStoreMainPersistor}
      >
        <ApolloProvider client={apolloClientMain}>
          <BaseContainer />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
