import React, { useEffect, useState } from "react";
import Router from "./router";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { LOAD_ITEMS } from "./GraphQL/queries/products/queries";
import { AnimatePresence } from "framer-motion";
import { Header, Alerts, CartContainer } from "./components";
import { cartAction, foodItemsAction } from "./context/actions";

const App = () => {
  const { data, loading } = useQuery(LOAD_ITEMS, {
    variables: { count: 30 },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first"
  });
  const cartShow = useSelector((state) => state.cart.cartShow);
  const [cartInit, setCartInit] = useState(false);
  const [foodItems, setFoodItems] = useState(null);
  if (cartInit === false) {
    setCartInit(true);
    cartAction.setCartShow(false);
  }
  useEffect(() => {
    if (!loading && data && foodItems === null) {
      setFoodItems(data.items);
    } else {
      foodItemsAction.setFoodItems(foodItems);
    }
  }, [data, loading, foodItems]);
  return (
    <AnimatePresence>
      <Alerts />
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Router />
          {cartShow && <CartContainer />}
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
