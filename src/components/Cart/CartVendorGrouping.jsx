import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_STORE_QUERY } from "../../GraphQL/queries/store/queries";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cartAction } from "../../context/actions";

const CartVendorGrouping = ({ items, vendor, flag, setFlag }) => {
  vendor = vendor !== "null" && vendor;
  const { loading, data } = useQuery(GET_STORE_QUERY, {
    variables: { storeNickname: vendor },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
  });
  const [store, setStore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && data) {
      if (data.getStore !== null) {
        setStore(data.getStore);
      }
    }
  }, [data, loading]);

  const handleStoreRedirect = (storeNickname) => {
    cartAction.setCartShow(false);
    navigate(`/store/@${storeNickname}`);
  };
  return (
    <div>
      {store && store !== null && (
        <motion.div
          onClick={() => handleStoreRedirect(store.vendor.store?.storeNickname)}
          whileTap={{ scale: 0.85 }}
          className="w-max flex p-1 justify-start hover:bg-gray-700 transition-all 
        duration-100 cursor-pointer rounded-md items-start mb-2 gap-3"
        >
          <img
            src={store.vendor.profile?.image}
            loading="lazy"
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <p className="text-base font-semibold text-yellow-500 mt-1">
            {store.vendor.store?.storeName}
          </p>
        </motion.div>
      )}
      {items &&
        items.map((item, index) => (
          <CartItem
            item={item}
            vendor={vendor}
            key={index+parseInt(item?.id)}
            flag={flag}
            setFlag={setFlag}
          />
        ))}
    </div>
  );
};

export default CartVendorGrouping;
