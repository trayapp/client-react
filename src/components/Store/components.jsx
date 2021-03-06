import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_STORE_QUERY } from "../../GraphQL/queries/store/queries";
import { motion } from "framer-motion";
import RowContainer from "../RowContainer";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Loader from "../Loader";
import { EditInitialScreen } from "./menu";
import { ReactComponent as NoData } from "../../img/no_data.svg";
export const StoreComponent = () => {
  const user = useSelector((state) => state.authToken?.user); // getting user state
  var { storeNickname } = useParams(); // getting storename from parameters
  storeNickname = storeNickname.replace("@", ""); // removing the `@` symbol
  const { loading, data } = useQuery(GET_STORE_QUERY, {
    variables: { storeNickname: storeNickname },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
  });
  const [store, setStore] = useState(null);
  const windowHash = window.location.hash ? window.location.hash : false;
  const [filter, setFilter] = useState(
    windowHash !== false ? windowHash.replaceAll("#", "") : "all"
  );
  const [scrollValue, setScrollValue] = useState(50);

  let menu = ["all", "items", "about"];
  const is_user =
    user && user.profile.vendor !== null && user.profile.vendor.store.storeNickname === storeNickname
      ? true
      : false;
  if (is_user) {
    menu = menu.concat(["edit"]);
  }
  useEffect(() => {
    if (!loading && data) {
      setStore(data.getStore);
    }
    window.location.hash = filter;
  }, [data, filter, loading, scrollValue, windowHash]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {!loading && store !== null ? (
        <div className="w-full flex flex-col items-center justify-center mt-3">
          <div
            style={{ transform: "skew(227deg, 343deg)" }}
            className="absolute flex justify-between top-[21rem] pointer-events-none w-full h-screen 
                rounded-lg bg-gradient-to-t from-orange-200 to-transparent"
          ></div>
          <figure className="w-[15rem] h-[15rem] drop-shadow-lg">
            {store && store.vendor.profile?.image ? (
              <img
                src={store && store.vendor.profile?.image}
                className="rounded-lg bg-orange-100 w-full h-full"
                loading="lazy"
                alt=""
              />
            ) : (
              <div
                title="click to change profile picture"
                className="bg-orange-500 w-full h-full flex justify-center select-none items-center rounded-lg uppercase cursor-pointer"
              >
                <span className="font-semibold text-primary backdrop-blur-sm leading-relaxed">
                  {store?.storeName}
                </span>
              </div>
            )}
            <p
              className="w-full border-t border-orange-300 bg-orange-300 flex justify-center 
                items-center text-base p-2 absolute bottom-0 rounded-bl-lg rounded-br-lg"
            >
              {store?.storeName}
            </p>
          </figure>
          <div className="w-full text-center mt-2">
            <p className="font-semibold text-base">
              {storeNickname} {store?.storeCategory}
            </p>
          </div>
          <div className="text-sm font-medium z-40 text-center mt-[3rem]">
            <ul className="flex flex-row gap-3 -mb-px m-auto no-select">
              {menu.map((menu, index) => (
                <li className="mr-2" key={index}>
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    aria-current={menu}
                    onClick={() => setFilter(menu)}
                    className={`inline-block p-3 rounded-lg py-2 px-3 capitalize cursor-pointer transition-colors ease-in-out
                          ${
                            filter === menu ||
                            (menu === "edit" &&
                              menu ===
                                window.location.hash
                                  .split("&")[0]
                                  .replace("#", ""))
                              ? `text-white bg-cartNumBg drop-shadow-md`
                              : `text-orange-600 border-transparent hover:text-white hover:bg-cartNumBg`
                          }`}
                  >
                    {menu}
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full my-10">
            {/* All Menu */}
            {filter === menu[0] && (
              <>
                {/* Top Dishes */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex items-center justify-between"
                >
                  <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
                    Top Dishes
                  </p>

                  <div className="hidden md:flex gap-3 item-center">
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      className="w-8 h-8 rounded-lg bg-orange-700 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
                      onClick={() => setScrollValue(-100)}
                    >
                      <MdChevronLeft className="text-lg text-white" />
                    </motion.div>
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      className="w-8 h-8 rounded-lg bg-orange-700 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
                      onClick={() => setScrollValue(100)}
                    >
                      <MdChevronRight className="text-lg text-white" />
                    </motion.div>
                  </div>
                </motion.div>
                <RowContainer
                  scrollValue={scrollValue}
                  rowData={store?.storeProducts
                    ?.filter(
                      (n) =>
                        n.isAvaliable === true &&
                        n.productType.urlParamName === "a-dish"
                    )
                    .sort((a, b) => -parseInt(a.id) - parseInt(b.id))}
                  className="w-full flex no-select md:rounded-lg rounded-md bg-gradient-to-l from-orange-400 to-transparent backdrop-blur-lg items-center gap-3 my-6 scroll-smooth overflow-x-scroll scrollbar-none"
                  flag={true}
                />

                {/* Avaliable Items */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex items-center justify-between"
                >
                  <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
                    {store?.storeName} Avaliable Items
                  </p>
                </motion.div>
                <RowContainer
                  rowData={store?.storeProducts?.filter(
                    (n) => n.isAvaliable === true
                  )}
                  className="w-full flex no-select items-center gap-3 my-6 scroll-smooth overflow-x-scroll scrollbar-none"
                  flag={false}
                />
              </>
            )}

            {/* Items */}
            {filter === menu[1] && (
              <>
                <RowContainer
                  rowData={store?.storeProducts}
                  className="w-full flex no-select items-center gap-3 my-6 scroll-smooth overflow-x-scroll scrollbar-none"
                  flag={false}
                />
              </>
            )}
            {is_user &&
              (filter === menu[3] ||
                menu[3] ===
                  window.location.hash.split("&")[0].replace("#", "")) && (
                <EditInitialScreen
                  is_user={is_user}
                  filter={filter}
                  setFilter={setFilter}
                  store={store}
                />
              )}
          </div>
        </div>
      ) : (
        <div className="bg-primary store-loader fixed top-0 h-screen w-screen m-auto flex justify-center items-center">
          {loading && <Loader className="top-50" />}
          {!loading && !store && store === null && (
            <div className="flex flex-col gap-1 justify-center items-center">
              <NoData className="w-[10rem] h-[10rem]" />
              <span className="md:text-3xl md:w-[16rem] text-2xl w-[13rem] text-slate-800 text-center flex justify-center font-semibold">
                Store Not Found
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
