import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { actionType, useStateValue } from "../../context/old_context";
import { CART_ITEMS } from "../../constants";
let items = [];

const CartItem = ({ item, key, flag, setFlag }) => {
  // const cartItems = useSelector((state) => state.cart?.cartItems);
  const [{cartItems}, dispatch] = useStateValue()
  const [qty, setQty] = useState(item.productQty);

  const cartDispatch = () => {
    localStorage.setItem(CART_ITEMS, JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };
  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      // eslint-disable-next-line array-callback-return
      cartItems.map((item) => {
        if (item.id === id) {
          console.log(item)
          item.productQty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      /* initial state value is one, 
      so you need to check if its 1,
      then remove it
      */
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        // eslint-disable-next-line array-callback-return
        cartItems.map((item) => {
          if (item.id === id) {
            item.productQty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };
  useEffect(() => {
    items = cartItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, items]);
  return (
    <div
      key={key}
      className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
    >
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
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
