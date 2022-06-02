import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import Login from "./components/Auth/Login";
import { useQuery } from "@apollo/client";
import { LOAD_ITEMS } from "./GraphQL/queries/products/queries";
import { ProtectedRoute } from "./utils/hooks";
import { useIsAuthenticated } from "./context/hooks";

const BaseContainer = () => {
  const isAuthenticated = useIsAuthenticated();
  const { loading, data } = useQuery(LOAD_ITEMS);
  // const foodItems = useSelector();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  console.log(loading);
  console.log(isAuthenticated);
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            {isAuthenticated === true ? (
              <>
                <Route
                  path="/createItem"
                  element={
                    <ProtectedRoute newItem={true}>
                      <CreateContainer />
                    </ProtectedRoute>
                  }
                />
              </>
            ) : (
              <>
                <Route
                  path="/auth/login"
                  element={
                    <ProtectedRoute loginPage={true}>
                      <Login />
                    </ProtectedRoute>
                  }
                />
              </>
            )}
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default BaseContainer;
