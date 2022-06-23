import React from "react";
import { MdFoodBank, MdPerson } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SearchComponent } from "../SearchComponent";

const EditScreen = ({ is_user, filter, setFilter, store }) => {
  const navigate = useNavigate();
  let iconClassName =
    "fill-white shadow-sm text-white w-10 h-10 bg-orange-300 p-1 rounded-md";
  let storeUrl = `/store/@${store.vendor.store?.storeNickname}`;
  let menu = [
    {
      name: "change_account_info",
      icon: <MdPerson className={iconClassName} />,
      link: "/",
    },
    {
      name: "update_available_items",
      icon: <MdFoodBank className={iconClassName} />,
      link: `${storeUrl}#update_available_items`,
    },
  ];
  const handleListLink = (link) => {
    setTimeout(() => {
      navigate(link);
      setFilter("#edit&" + link.split("#")[1]);
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-wrap flex-nowrap md:flex-row gap-3 h-max"
    >
      {/* List */}
      {!(
        filter.split("&") &&
        filter.split("&").length >= 1 &&
        filter.split("&")[1] !== undefined
      ) &&
        menu &&
        menu.map((n, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.88 }}
            className="flex flex-row cursor-pointer m-auto w-[350px] justify-start gap-4 items-start p-2 shadow-md text-center rounded-md bg-orange-500
            md:hover:bg-orange-600 backdrop-blur-md"
            onClick={() => handleListLink(n.link)}
          >
            <motion.p whileHover={{ scale: 1.15 }}>{n.icon}</motion.p>
            <p className="text-base capitalize font-semibold mt-2 text-white ml-2">
              {n.name.replaceAll("_", " ")}
            </p>
          </motion.div>
        ))}
      {filter.split("&") &&
        filter.split("&").length >= 1 &&
        filter.split("&")[1] === menu[1].name && (
          <div className="w-screen p-2 flex flex-col justify-center items-center">
            <SearchComponent />
          </div>
        )}
    </motion.div>
  );
};

export default EditScreen;
