import React, { useEffect } from "react";
import Router from "./router"
import { useQuery } from "@apollo/client";
import { LOAD_ITEMS } from "./GraphQL/queries/products/queries";
import { AnimatePresence } from "framer-motion";
import { Header } from "./components";

const App = () => {
  const { loading, data } = useQuery(LOAD_ITEMS);
  // const foodItems = useSelector();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  console.log(loading);
  return (
    <AnimatePresence exitBeforeEnter>
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
