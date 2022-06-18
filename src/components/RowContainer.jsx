import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { ReactComponent as NotFound } from "../img/not-found.svg";
import { CART_ITEMS } from "../constants";
import { useSelector } from "react-redux";
import { cartAction } from "../context/actions";

// Items Row Container
const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const [items, setItems] = useState([]);

  // Adding Item to cart Function -> dispatch the `items` from state and set it in the localStorage
  const addToCart = () => {
    localStorage.setItem(CART_ITEMS, JSON.stringify(items));
    cartAction.setCartItems(items);
  };

  useEffect(() => {
    /* 
    setting container left-scroll to the 
    current value of the `scrollValue`
    */
    rowContainer.current.scrollLeft += scrollValue;

    /* Automatically calling the functions 
    when ever the length of the `items` 
    array is greater than 0
    */
    if (items && items.length > 0) addToCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollValue, items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex no-select items-center gap-3 my-12 scroll-smooth ${
        flag === true // configuring the flex of the container, depending if ther flag is true/false
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.productSlug}
            className="w-275 h-auto min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay rounded-lg p-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 -mt-8 rounded-md drop-shadow-2xl"
              >
                <img
                  src={
                    item.productImages.length > 0
                      ? item?.productImages[0].productImage
                      : null
                  }
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col gap-4 items-end justify-end">
              <p className="text-textColor font-semibold md:text-lg text-base">
                {item?.productName}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.productCategory.name}
                {item.productCalories && ` > ${item?.productCalories} Calories`}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-emerald-500">₦</span>
                  {item?.productPrice}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <NotFound className="w-340 h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
