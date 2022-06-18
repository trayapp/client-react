import React, { useEffect, useState } from "react";
import App from "./App";
import { getApolloClient } from "./apollo";
import { Loader } from "./components";
import { ScrollToTop } from "./utils/hooks";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";

const BaseComponent = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      getApolloClient().then((client) => {
        setClient(client);
        setLoading(false);
      });
    }
  }, [client, loading]);
  if (loading) {
    return (
      <div className="main-loader h-screen w-screen m-auto flex justify-center items-center">
        <Loader className="top-50" />
      </div>
    );
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </ApolloProvider>
  );
};

export default BaseComponent;
