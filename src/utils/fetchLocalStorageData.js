import { AUTH_TOKEN_REFRESH, AUTH_TOKEN, USER } from "../constants";

export const fetchUser = () => {
  const userInfo =
    localStorage.getItem(USER) !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
};

export const fetchToken = () => {
  let data = {
    token: localStorage.getItem(AUTH_TOKEN),
    refreshToken: localStorage.getItem(AUTH_TOKEN_REFRESH),
  };
  const TokenInfo =
    localStorage.getItem(AUTH_TOKEN_REFRESH) !== "undefined" &&
    localStorage.getItem(AUTH_TOKEN) !== "undefined"
      ? JSON.parse(JSON.stringify(data))
      : localStorage.clear();

  return TokenInfo;
};
