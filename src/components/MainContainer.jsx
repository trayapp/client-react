import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RowContainer, MenuContainer } from "./index";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const foodItems = useSelector((state) => state.foodItems?.foodItems);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue]);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold select-none capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our fresh & healthy foods
          </p>

          <div className="hidden md:flex gap-3 item-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-100)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(100)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          rowData={foodItems?.filter((n) => n.productCategory.urlParamName.includes("food") && n.isAvaliable === true)}
        />
      </section>

      <MenuContainer />
    </div>
  );
};

export default MainContainer;
