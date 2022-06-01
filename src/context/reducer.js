export const initialState = {
  user: null,
  token: null,
  cart: null,
  total: null,
};

export const actionType = {
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKENIZATION",
  SET_CART: "SET_CART",
  SET_TOTAL: "SET_TOTAL",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };
    case actionType.SET_TOKEN:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    case actionType.SET_CART:
      return {
        ...state,
        cart: action.cart,
      };

    case actionType.SET_TOTAL:
      return {
        ...state,
        total: action.total,
      };

    default:
      return state;
  }
};

export default reducer;
