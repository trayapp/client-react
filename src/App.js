import React from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import Login from "./components/Auth/Login";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ProtectedRoute } from "./utils/hooks";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
  if (networkError) {
    console.log(networkError)
    return alert(`Server was disconnected, check internet connection`)
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8000/graphql/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  csrfPrevention: true,
  cors: {
    origin: ["http://localhost:8000"],
    credentials: true
  }
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <AnimatePresence exitBeforeEnter>
        <div className="w-screen h-auto flex flex-col bg-primary">
          <Header />

          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route path="/*" element={<MainContainer />} />
              <Route path="/createItem" element={
                <ProtectedRoute newItem={true}>
                  <CreateContainer />
                  </ProtectedRoute>
              } />
              <Route path="/auth/login" element={
                <ProtectedRoute loginPage={true}>
                  <Login />
                  </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </AnimatePresence>
    </ApolloProvider>
  );
};

export default App;
