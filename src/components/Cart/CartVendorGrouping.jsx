import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_STORE_QUERY } from "../../GraphQL/queries/store/queries";
import CartItem from "./CartItem";
import { useEffect } from "react";

const CartVendorGrouping = ({ items, vendor, key, flag, setFlag }) => {
  vendor = vendor !== "null" && vendor;
  const { loading, data } = useQuery(GET_STORE_QUERY, {
    variables: { storeNickname: vendor },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
  });
  const [store, setStore] = useState([]);
  useEffect(() => {
    if (!loading && data) {
      if (data.getStore !== null) {
        setStore(data.getStore);
      }
    }
  }, [data, loading]);
  return (
    <div>
      {!loading && store && store.length > 0 && (
        <div className="w-full flex justify-start items-start mb-2 gap-3">
          <img
            src={store.vendor.profile?.image}
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <p className="text-base font-semibold text-yellow-500 mt-1">
            {store.vendor.store?.storeName}
          </p>
        </div>
      )}
      {items &&
        items.map((item, index) => (
          <CartItem
            item={item}
            vendor={vendor}
            key={key + index}
            flag={flag}
            setFlag={setFlag}
          />
        ))}
    </div>
  );
};

export default CartVendorGrouping;
