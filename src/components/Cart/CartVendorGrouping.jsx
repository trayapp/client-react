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
  let storeImageName = store?.storeName.split(' ');
  storeImageName = storeImageName && storeImageName.length > 1 ? `${storeImageName[0][0]+storeImageName[1][0]}` : store?.storeNickname[0]

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
          onClick={() => handleStoreRedirect(store?.storeNickname)}
          whileTap={{ scale: 0.85 }}
          className="w-max flex p-1 justify-start hover:bg-gray-700 transition-all 
        duration-100 cursor-pointer rounded-md items-start mb-2 gap-3"
        >
          {store && store.vendor.profile?.image ? (
            <img
            src={store.vendor.profile?.image}
            loading="lazy"
            className="w-8 h-8 rounded-full shadow-md"
            alt=""
          />
          ): (
              <div className="w-8 h-8 rounded-full bg-orange-500 shadow-md flex justify-center items-center">
                <span className="text-base font-semibold capitalize text-gray-100">{storeImageName}</span>
            </div>
          )}
          <p className="text-base font-semibold capitalize text-yellow-500 mt-1">
            {store?.storeName}
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
