import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ReactComponent as EmptyCart } from "../../img/emptyCart.svg";
import { useNavigate } from "react-router-dom";
import CartVendorGrouping from "./CartVendorGrouping";
import { CART_ITEMS } from "../../constants";
import { cartAction } from "../../context/actions";

const CartContainer = () => {
  const user = useSelector((state) => state.authToken?.user);
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const cartShow = useSelector((state) => state.cart?.cartShow);
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(0);
  const navigate = useNavigate();
  let hostelprice =
    cartItems && cartItems.length > 8
      ? 500
      : cartItems.length > 6
      ? 300
      : cartItems.length > 4
      ? 200
      : 100;
  let portalprice =
    cartItems && cartItems.length > 8
      ? 350
      : cartItems.length > 6
      ? 200
      : cartItems.length > 4
      ? 100
      : 50;

  const hideCart = () => {
    cartAction.setCartShow(!cartShow);
  };
  // const searchStoreNickName = (item) => {
  //   let store_Nickname = null;
  //   if (item?.productCreator === null) {
  //     store_Nickname = item?.productAvaliableIn[0].storeNickname;
  //   } else {
  //     let data = item?.productAvaliableIn.filter(
  //       (n) =>
  //         n.storeNickname ===
  //         item.productCreator.profile.vendor.store?.storeNickname
  //     );
  //     store_Nickname =
  //       data && data.length > 0
  //         ? data[0].storeNickname
  //         : item?.productAvaliableIn[0].storeNickname;
  //   }
  //   return item?.productAvaliableIn && item?.productAvaliableIn.length > 0
  //     ? store_Nickname
  //     : null;
  // };
  
  let cartData = [];
  cartData =
    cartItems &&
    cartItems.length > 0 &&
    cartItems.map((item, index) => {
      let dat = cartItems.filter(
        (n) => n.avaliableStore === item?.avaliableStore
      );
      // console.log(dat);
      return dat && dat.length > 0
        && {
            id: index,
            store: `${item?.avaliableStore}`,
            items: dat,
          }
    });
    const getUniqueArrays = (array, key) => {
      if (typeof key !== "function") {
        const property = key;
        key = function (item) {
          return item[property];
        };
      }
      return Array.from(
        array
          .reduce(function (map, item) {
            const k = key(item);
            if (!map.has(k)) map.set(k, item);
            return map;
          }, new Map())
          .values()
      );
    };
  cartData = cartData && cartData.length > 0 && getUniqueArrays(cartData, 'store');
  // console.log(cartData)
  
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      let totalprice = cartItems.reduce(function (accumulator, item) {
        return accumulator + item.productQty * item.productPrice;
      }, 0);
      setTotal(totalprice);
    }
  }, [cartItems]);
  const clearCart = () => {
    cartAction.setCartItems([]);
    localStorage.setItem(CART_ITEMS, JSON.stringify([]));
  };
  return (
    <motion.div
      initial={{ opacity: 0.5, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0.5, x: 200 }}
      className="no-select fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={hideCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* Bottom Section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] overflow-y-auto scrollbar-none flex flex-col">
          {/* cart items section */}
          <div className="w-full h-225 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart item */}
            {cartData &&
              cartData.map((item) => (
                <>
                  <CartVendorGrouping
                    items={item?.items && item?.items.length > 0 ? item?.items : null}
                    vendor={item?.store}
                    key={item?.id}
                    flag={flag}
                    setFlag={setFlag}
                  />
                </>
              ))}
          </div>
          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">₦ {total}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Portal Delivery</p>
              <p className="text-gray-400 text-lg">₦{portalprice}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Hostel Delivery</p>
              <p className="text-gray-400 text-lg">₦{hostelprice}</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">
                Total For Portal
              </p>
              <p className="text-gray-200 text-xl font-semibold">
                ₦{parseInt(total + portalprice)}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">
                Total For Hostel
              </p>
              <p className="text-gray-200 text-xl font-semibold">
                ₦{parseInt(total + hostelprice)}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Checkout
              </motion.button>
            ) : (
              <motion.button
                onClick={() => {
                  hideCart();
                  navigate("/auth/login?next=/cart/checkout");
                }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login To Checkout
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <EmptyCart className="w-300" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
