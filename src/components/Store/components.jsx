import React from "react";
import { useSelector } from "react-redux";
export const StoreComponent = () => {
  const user = useSelector((state) => state.authToken?.user);
  const is_user = user.profile.vendor.store.storeNickname === "dedex" ? "true" : "false";
  return <div>Store Page ===&gt;&gt;{is_user}</div>;
};
