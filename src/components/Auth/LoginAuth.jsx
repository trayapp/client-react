import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../GraphQL/mutations/auth";
import { errorHandler, apolloClientAuth } from "../../apollo";
import { authTokenActions, alertSliceActions } from "../../context/actions";
import Loader from "../Loader";
import { AUTH_TOKEN, AUTH_TOKEN_REFRESH } from "../../constants";

const LoginAuth = (props) => {
  const { username, password } = props;
  const [tokenAuth, { loading, error, data }] = useMutation(LOGIN_USER, {
    client: apolloClientAuth,
  });
  useEffect(() => {
    if (error) {
      alertSliceActions.createAlert({
        type: "error",
        message: "Your account was created but you are not logged in",
      });
    }
    if (data && !loading) {
      var qs = data.tokenAuth;
      if (qs.errors) {
        alertSliceActions.createAlert({
          type: "error",
          message: "Your account was created but you are not logged in",
        });
      }
      if (qs.errors === null) {
        authTokenActions.setAuthToken(qs);
        console.log(qs.refreshToken);
        localStorage.setItem("user", JSON.stringify(qs.user));
        localStorage.setItem(AUTH_TOKEN, qs.token);
        localStorage.setItem(AUTH_TOKEN_REFRESH, qs.refreshToken);
        alertSliceActions.createAlert({
          type: "success",
          message: `You Logged In as ${qs.user.username} Successfully 🤩`,
        });
      }
      console.log(qs);
    }
  }, [data, loading, error]);
  if (username && password) {
    tokenAuth({
      variables: {
        username: username,
        password: password,
      },
    }).catch(errorHandler);
  } else {
    window.location.reload()
  }
  return (
    loading && (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  );
};

export default LoginAuth;
