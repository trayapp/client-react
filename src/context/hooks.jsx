import { useEffect } from "react";
import { useSelector } from "react-redux";
import { authTokenActions } from "./actions";
import { LOGOUT } from "../GraphQL/mutations/auth";
import { apolloClientAuth, apolloClientMain } from "../apollo";
import { possibleRefreshTokenErrors } from "./utils";
import { USER, AUTH_TOKEN, AUTH_TOKEN_REFRESH } from "../constants";
export function useIsAuthenticated() {
  const isAuthenticated = useSelector((state) => state.authToken.user !== null);
  let refreshToken = localStorage.getItem(AUTH_TOKEN_REFRESH);
  refreshToken = refreshToken ? refreshToken : null;

  const syncTabLogout = (event) => {
    if (event.key === "isAuthenticated" && event.newValue === "false")
      authTokenActions.logOut();
  };

  useEffect(() => {
    window.addEventListener("storage", syncTabLogout);
    return () => {
      window.removeEventListener("storage", syncTabLogout);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      if (refreshToken !== null) {
        apolloClientAuth
          .mutate({
            mutation: LOGOUT,
            variables: { refreshToken: refreshToken },
          })
          .catch((error) => {
            if (!possibleRefreshTokenErrors.includes(error.message)) {
              console.log(error.message);
            }
          });
        localStorage.removeItem(AUTH_TOKEN_REFRESH);
      }
      apolloClientAuth.clearStore(); //apolloClientAuth.resetStore()
      apolloClientMain.clearStore(); //apolloClientMain.resetStore()
      localStorage.setItem("isAuthenticated", false);
      localStorage.removeItem(USER);
      localStorage.removeItem(AUTH_TOKEN);
    } else {
      localStorage.setItem("isAuthenticated", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return isAuthenticated;
}
