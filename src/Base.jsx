import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import Login from "./components/Auth/Login";
import { useLazyQuery } from "@apollo/client";
import { RefreshToken } from "./GraphQL/functions/graphqlFunctions";
import { useStateValue } from "./context/StateProvider";
import { LOAD_ITEMS } from "./GraphQL/queries/products/queries";
import { ProtectedRoute } from "./utils/hooks";

const BaseContainer = () => {
  const [items, { data }] = useLazyQuery(LOAD_ITEMS);
  const [{ foodItems }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     if (isLoading) {
  //       items({
  //         variables: { count: 1 },
  //       });
  //       setIsLoading(false);
  //     }
  //   }, [isLoading, items]);
  return (
    // <RefreshToken>
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route
              path="/createItem"
              element={
                <ProtectedRoute newItem={true}>
                  <CreateContainer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/login"
              element={
                <ProtectedRoute loginPage={true}>
                  <RefreshToken protectedPage={true}>
                    <Login />
                  </RefreshToken>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
    // </RefreshToken>
  );
};

export default BaseContainer;
