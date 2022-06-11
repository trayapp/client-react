import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CreateContainer, MainContainer } from "./components";
import { Login, Signup, BecomeVendor } from "./components/Auth";

import { ProtectedRoute } from "./utils/hooks";
import { useIsAuthenticated } from "./context/hooks";

const Router = () => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/*" element={<MainContainer />} />
      <Route
        path="/auth/become-vendor"
        element={
          <ProtectedRoute>
            <BecomeVendor />
          </ProtectedRoute>
        }
      />
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
              <ProtectedRoute authPage={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <ProtectedRoute authPage={true}>
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
