import { reduxStoreMain } from "../redux";
import { authTokenActions } from "./actions";
import { apolloClientAuth } from "../apollo";
import { REFRESH_TOKEN } from "../GraphQL/mutations/auth";
import { fetchUser } from "../utils/fetchLocalStorageData";
import { AUTH_TOKEN, AUTH_TOKEN_REFRESH, USER } from "../constants";

export const possibleRefreshTokenErrors = [
  "Refresh token is required", // refresh token is not sent or Cookie is deleted
  "Invalid refresh token", // refresh token is not in the database
  "Refresh token is expired", // refresh token is expired
];

export const possibleAccessTokenErrors = [
  "Login required", // access token is not sent or Header key is not correct
  "Login required.", // access token is not sent or Header key is not correct
  "Error decoding signature", // access token or prefix is invalid
  "Signature has expired", // access token is expired
];

async function getRefreshedAccessTokenPromise() {
  const authTokenState = reduxStoreMain.getState().authToken;
  let refreshToken = authTokenState.refreshToken ? authTokenState.refreshToken: localStorage.getItem(AUTH_TOKEN_REFRESH)
  if (refreshToken && refreshToken !== undefined) {
    try {
      const { data } = await apolloClientAuth.mutate({
        mutation: REFRESH_TOKEN,
        variables: { refreshToken: `${refreshToken}` },
      });
      let new_data = {
        user: fetchUser(),
        token: data.refreshToken.token,
        refreshToken: data.refreshToken.refreshToken,
        refreshExpiresIn: data.refreshToken.payload.exp,
      };
      new_data = JSON.parse(JSON.stringify(new_data));
      if (data && data.refreshToken) authTokenActions.setAuthToken(new_data);
      return new_data;
    } catch (error) {
      authTokenActions.logOut();
      localStorage.removeItem(USER);
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_TOKEN_REFRESH);
      console.log(error);
      return error;
    }
  }
}

let pendingAccessTokenPromise = null;

export function getAccessTokenPromise() {
  const authTokenState = reduxStoreMain.getState().authToken;
  const currentNumericDate = Math.round(Date.now() / 1000);

  if (
    authTokenState &&
    authTokenState.token &&
    authTokenState.user &&
    currentNumericDate - 100 <= authTokenState.refreshExpiresIn
  ) {
    //if (currentNumericDate + 3 * 60 >= authTokenState.payload.exp) getRefreshedAccessTokenPromise()
    return new Promise((resolve) => resolve(authTokenState));
  }

  if (!pendingAccessTokenPromise)
    pendingAccessTokenPromise = getRefreshedAccessTokenPromise().finally(
      () => (pendingAccessTokenPromise = null)
    );

  return pendingAccessTokenPromise;
}

export const getUniqueArrays = (array, key) => {
  if (typeof key !== "function") {
    const property = key;
    key = function (item) {
      return item[property];
    };
  }
  return Array.from(
    array
      .reduce(function (map, item) {
        const k = key(item);
        if (!map.has(k)) map.set(k, item);
        return map;
      }, new Map())
      .values()
  );
};
