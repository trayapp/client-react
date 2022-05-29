import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";

export const ProtectedRoute = (props) => {
  const { children, newItem, loginPage } = props;
  const [{ user }] = useStateValue();
  const location = useLocation();
  const origin = location.state?.from?.pathname || "/";
  if (user === null && !loginPage) {
    return <Navigate to={`${origin}`} replace state={{ from: location }} />;
  }
  if (user !== null && loginPage === true) {
    return <Navigate to={`${origin}`} replace state={{ from: location }} />;
  }
  if (newItem === true && user && user.profile.vendor === null) {
    return <Navigate to="/login/vendor" replace state={{ from: location }} />;
  }

  return children;
};