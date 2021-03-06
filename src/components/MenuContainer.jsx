import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { LOAD_ITEM_ATTRIBUTE } from "../GraphQL/queries/products";

const MenuContainer = () => {
  const { loading, data } = useQuery(LOAD_ITEM_ATTRIBUTE, {
    variables: {
      type: 1,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const [categories, setCategories] = useState(null);
  const [filter, setFilter] = useState(
    `${
      categories !== null && categories.length > 0
        ? categories[0].urlParamName
        : "category-snacks"
    }`
  );
  const foodItems = useSelector((state) =>
    state.foodItems?.foodItems?.filter((n) => n.isAvaliable === true)
  );
  useEffect(() => {
    if (!loading && data) {
      setCategories(data?.itemAttributes);
    }
  }, [data, loading]);

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className="text-2xl font-semibold capitalize text-headingColor
         relative before:absolute before:rounded-lg before:content
          before:w-16 before:h-1 before:-bottom-2 before:left-0
           before:bg-gradient-to-tr from-orange-400 to-orange-600
           transition-all ease-in-out duration-100 mr-auto select-none"
        >
          Our Hot Dishes
        </p>
        <div className="w-full flex items-center no-select justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg`}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:fill-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white select-none`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            rowData={foodItems?.filter(
              (n) => n.productCategory.urlParamName === filter
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
