import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_STORE_QUERY } from "../../GraphQL/queries/store/queries";
import { motion } from "framer-motion";
import RowContainer from "../RowContainer";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export const StoreComponent = () => {
  const user = useSelector((state) => state.authToken?.user); // getting user state
  var { storeNickname } = useParams(); // getting storename from parameters
  storeNickname = storeNickname.replace("@", ""); // removing the `@` symbol
  const { loading, data } = useQuery(GET_STORE_QUERY, {
    variables: { storeNickname: storeNickname },
    fetchPolicy: "cache-and-network",
  });
  const [store, setStore] = useState(null);
  const [filter, setFilter] = useState("all");
  const [scrollValue, setScrollValue] = useState(50);
  // const [scrollValue, setScrollValue] = useState(0);
  let menu = ["all", "about", "avaliable"];
  const is_user =
    user && user.profile.vendor.store.storeNickname === storeNickname
      ? true
      : false;

  useEffect(() => {
    if (!loading && data) {
      setStore(data.getStore);
    }
  }, [data, loading, scrollValue]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {!loading && (
        <>
          {store === null ? (
            "Store Not Found"
          ) : (
            <div className="w-full flex flex-col items-center justify-center mt-3">
              <div
                style={{ transform: "skew(227deg, 343deg)" }}
                className="absolute flex justify-between top-[13rem] md:top-[21rem] pointer-events-none w-full h-screen 
                rounded-lg bg-gradient-to-b bg-gradient-to-t from-orange-200 to-transparent"
              ></div>
              <figure className="w-[15rem] h-[15rem] drop-shadow-lg">
                <img
                  src={store && store.vendor.profile?.image}
                  className="rounded-lg w-full h-full"
                  alt=""
                />
                <p
                  className="w-full border-t border-orange-300 bg-orange-300 flex justify-center 
                items-center text-base p-2 absolute bottom-0 rounded-bl-lg rounded-br-lg"
                >
                  {store.vendor.store?.storeName}
                </p>
              </figure>
              <div className="w-full text-center mt-2">
                <p className="font-semibold text-base">
                  {storeNickname} {store.vendor.store?.storeCategory}
                </p>
              </div>
              <div class="text-sm font-medium text-center mt-[3rem]">
                <ul className="flex flex-row gap-3 -mb-px m-auto no-select">
                  {menu.map((menu) => (
                    <li className="mr-2">
                      <motion.div
                        whileTap={{ scale: 0.8 }}
                        aria-current={menu}
                        onClick={() => setFilter(menu)}
                        className={`inline-block p-3 rounded-lg py-2 px-3 capitalize cursor-pointer transition-colors ease-in-out
                          ${
                            filter === menu
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
                          onClick={() => setScrollValue(-200)}
                        >
                          <MdChevronLeft className="text-lg text-white" />
                        </motion.div>
                        <motion.div
                          whileTap={{ scale: 0.75 }}
                          className="w-8 h-8 rounded-lg bg-orange-700 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
                          onClick={() => setScrollValue(200)}
                        >
                          <MdChevronRight className="text-lg text-white" />
                        </motion.div>
                      </div>
                    </motion.div>
                    <RowContainer
                      scrollValue={scrollValue}
                      rowData={store.vendor.store?.storeProducts
                        ?.filter(
                          (n) =>
                            n.isAvaliable === true &&
                            n.productType.urlParamName === "a-dish"
                        )
                        .sort((a, b) => -parseInt(a.id) - parseInt(b.id))}
                      className="w-full flex no-select rounded-lg bg-gradient-to-l from-orange-400 to-transparent backdrop-blur-lg items-center gap-3 my-6 scroll-smooth overflow-x-scroll scrollbar-none"
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
                        {store.vendor.store?.storeName} Items
                      </p>
                    </motion.div>
                    <RowContainer
                      rowData={store.vendor.store?.storeProducts}
                      className="w-full flex no-select items-center gap-3 my-6 scroll-smooth overflow-x-scroll scrollbar-none"
                      flag={false}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
