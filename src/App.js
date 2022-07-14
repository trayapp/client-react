import React, { useEffect, useState } from "react";
import Router from "./router";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { LOAD_ITEMS } from "./GraphQL/queries/products/queries";
import { AnimatePresence } from "framer-motion";
import { Header, Alerts, CartContainer } from "./components";
import { cartAction, foodItemsAction, productViewerAction } from "./context/actions";
import ProductViewer from "./components/ProductViewer";

const App = () => {
  const { data, loading } = useQuery(LOAD_ITEMS, {
    variables: { count: 100 },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
  });
  const cartShow = useSelector((state) => state.cart.cartShow);
  const currentViewedProduct = useSelector(
    (state) => state.productViewer?.product
  );
  /* This is to know when the user has loaded a page */ 
  const [InitLoad, setInitLoad] = useState(false);
  const [foodItems, setFoodItems] = useState(null);

  if (InitLoad === false) {
    setInitLoad(true);
    cartAction.setCartShow(false);
    productViewerAction.setCurrentView(null)
  }
  useEffect(() => {
    if (!loading && data && foodItems === null) {
      setFoodItems(data.items);
    } else {
      foodItemsAction.setFoodItems(foodItems);
    }
  }, [data, loading, foodItems]);
  return (
    <>
      <Alerts />
      <AnimatePresence exitBeforeEnter>
        <div className="w-screen h-auto flex flex-col bg-primary">
          {/* Product Viewer */}
          {currentViewedProduct !== null && (
            
          <ProductViewer p={currentViewedProduct} />
          )}
          <Header />

          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Router />
            {cartShow && <CartContainer />}
          </main>
        </div>
      </AnimatePresence>
    </>
  );
};

export default App;
