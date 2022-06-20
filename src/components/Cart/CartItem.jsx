/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { cartAction } from "../../context/actions";

var items = [];
const CartItem = ({ item, flag, setFlag }) => {
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const [qty, setQty] = useState(item.productQty);

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          cartAction.updateCartItem({ id: item.id, action: action });
          setFlag(flag + 1);
        }
      });
    } else {
      // initial state value is one so you need to check if 1 then remove it
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            cartAction.updateCartItem({ id: item.id, action: action });
            setFlag(flag + 1);
          }
        });
    }
  };

  useEffect(() => {
    items = cartItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, items]);
  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={
          item.productImages &&
          item.productImages.length > 0 &&
          item.productImages[0]?.productImage
        }
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.productName}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          <strong className="text-emerald-400">₦ </strong>
          {parseFloat(item?.productPrice) * qty}
        </p>
      </div>
      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className={
            item.productQty < 2 && qty > 4 && `opacity-5 pointer-events-none`
          }
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
