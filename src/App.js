import React from "react";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { AUTH_TOKEN } from "./constants";
import BaseContainer from "./Base";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
  if (networkError) {
    console.log(networkError);
    // return alert(`Server was disconnected, check internet connection`);
  }
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});
const uri = "http://localhost:8000/graphql/";
const link = from([
  errorLink,
  createUploadLink({ uri }),
  // new HttpLink({ uri: "http://localhost:8000/graphql/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
  csrfPrevention: true,
  cors: {
    origin: ["http://localhost:8000"],
    credentials: true,
  },
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <BaseContainer />
    </ApolloProvider>
  );
};

export default App;
