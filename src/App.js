import React, { useEffect } from "react";
import Router from "./router";
import { useQuery } from "@apollo/client";
import { LOAD_ITEMS } from "./GraphQL/queries/products/queries";
import { AnimatePresence } from "framer-motion";
import { Header, Alerts } from "./components";
import { foodItemsAction } from "./context/actions";

const App = () => {
  const { data } = useQuery(LOAD_ITEMS, {
    variables: { count: 20 },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      foodItemsAction.setFoodItems(data.items);
    }
  }, [data]);
  return (
    <AnimatePresence>
      <Alerts />
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Router />
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
