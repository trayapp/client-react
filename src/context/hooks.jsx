import { useEffect } from "react";
import { useSelector } from "react-redux";
import { authTokenActions } from "./actions";
import { LOGOUT } from "../GraphQL/mutations/auth";
import { apolloClientAuth, apolloClientMain } from "../apollo";
import { possibleRefreshTokenErrors } from "./utils";
export function useIsAuthenticated() {
  const isAuthenticated = useSelector((state) => state.authToken.user !== null);
  const refreshToken = useSelector((state) => state.authToken.refreshToken);

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
      }
      apolloClientAuth.clearStore(); //apolloClientAuth.resetStore()
      apolloClientMain.clearStore(); //apolloClientMain.resetStore()
      localStorage.setItem("isAuthenticated", false);
    } else {
      localStorage.setItem("isAuthenticated", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return isAuthenticated;
}
