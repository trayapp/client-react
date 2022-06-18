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
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
    pollInterval: 500,
  });
  const cartShow = useSelector((state) => state.cart.cartShow);
  const [cartInit, setCartInit] = useState(false);
  useEffect(() => {
    if (!loading && data) {
      foodItemsAction.setFoodItems(data.items);
    }
    if (cartInit === false && cartShow === true) {
      cartAction.setCartShow(false);
      setCartInit(true);
    }
  }, [data, loading, cartShow, cartInit]);
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
