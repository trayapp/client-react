import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContainer, MainContainer } from "./components";
import { Login, Signup } from "./components/Auth";

import { ProtectedRoute } from "./utils/hooks";
import { useIsAuthenticated } from "./context/hooks";

const Router = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
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
          <Route
            path="/auth/signup"
            element={
              <ProtectedRoute loginPage={true}>
                <Signup />
              </ProtectedRoute>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default Router;
