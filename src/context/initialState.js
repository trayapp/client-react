import { fetchUser, fetchToken } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const tokenInfo = fetchToken();

export const initialState = {
  user: userInfo,
  token: tokenInfo,
  foodItems: null,
};
