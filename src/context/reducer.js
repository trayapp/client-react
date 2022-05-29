export const initialState = {
  user: null,
  cart: null,
  total: null,
};

export const actionType = {
  SET_USER: "SET_USER",
  SET_CART: "SET_CART",
  SET_TOTAL: "SET_TOTAL",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
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
