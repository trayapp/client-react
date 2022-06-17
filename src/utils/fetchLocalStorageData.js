import { AUTH_TOKEN_REFRESH, AUTH_TOKEN, USER, CART_ITEMS } from "../constants";

export const fetchUser = () => {
  const userInfo =
    localStorage.getItem(USER) !== "undefined"
      ? JSON.parse(localStorage.getItem(USER))
      : localStorage.clear();

  return userInfo ? userInfo : null;
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

  return TokenInfo ? TokenInfo : null;
};

export const fetchCartItems = () => {
  const cartItemsInfo =
    localStorage.getItem(CART_ITEMS) !== "undefined"
      ? JSON.parse(localStorage.getItem(CART_ITEMS))
      : localStorage.clear();

  return cartItemsInfo ? cartItemsInfo : [];
};
