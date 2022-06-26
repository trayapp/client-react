import React from "react";
import { MdFoodBank, MdPerson } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import AvaliabiltyScreen from "./AvaliabiltyScreen";

const EditInitialScreen = ({ is_user, filter, setFilter, store }) => {
  const navigate = useNavigate();
  let iconClassName =
    "fill-white shadow-sm text-white w-10 h-10 bg-orange-300 p-1 rounded-md";
  let storeUrl = `/store/@${store.vendor.store?.storeNickname}`;
  let filteredMenu = filter.split("&") === undefined ? null : filter.split("&");
  let menu = [
    {
      name: "change_account_info",
      icon: <MdPerson className={iconClassName} />,
      link: `${storeUrl}#change_account_info`,
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
      className="flex flex-col justify-center items-center no-select md:flex-wrap m-auto gap-3 flex-nowrap md:flex-row h-max"
    >
      {/* List */}
      {!(filteredMenu && filteredMenu.length > 1) &&
        menu &&
        menu.map((n, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.88 }}
            className="flex flex-row cursor-pointer w-[350px] justify-start gap-4 items-start p-2 shadow-md text-center rounded-md bg-orange-500
            md:hover:bg-orange-600 backdrop-blur-md"
            onClick={() => handleListLink(n.link)}
          >
            <motion.p whileHover={{ scale: 1.15 }}>{n.icon}</motion.p>
            <p className="text-base capitalize font-semibold mt-2 text-white ml-2">
              {n.name.replaceAll("_", " ")}
            </p>
          </motion.div>
        ))}
      {filteredMenu && filteredMenu.length > 1 && (
        <>
          <div className="flex mb-2 gap-2 justify-start text-xl md:w-auto w-full font-bold">
            <MdOutlineKeyboardArrowRight className="mt-1" />
            <span className="capitalize">
              {filteredMenu && filteredMenu[1].replaceAll("_", " ")}
            </span>
            <MdOutlineKeyboardArrowLeft className="mt-1 md:block hidden" />
          </div>
          {filteredMenu[1] === menu[1].name && (
            <AvaliabiltyScreen />
          )}
        </>
      )}
    </motion.div>
  );
};

export default EditInitialScreen;
