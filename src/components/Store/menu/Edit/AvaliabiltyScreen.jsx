import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { SearchComponent } from "../../../SearchComponent";
import { motion } from "framer-motion";

const AvaliabiltyScreen = () => {
  return (
    <div className="AvaliabiltyScreenComponent">
      <div className="w-screen p-2 flex flex-col justify-center items-center">
        <SearchComponent />
      </div>
      <div className="px-4 md:px-16 py-4 w-full h-screen">
        <ul className="list-style-none flex justify-start items-start">
          <li className="py-2 px-4 rounded-3xl gap-2 flex justify-between items-center bg-primary drop-shadow-md backdrop-blur-md">
            <span className="text-base font-semibold text-orange-400 flex justify-center items-center w-full capitalize">
              Chicken Wings
            </span>
            <motion.span
              whileTap={{ scale: 0.85 }}
              className="text-base cursor-pointer font-semibold p-2 rounded-full bg-red-600 capitalize"
            >
              <MdDeleteForever className="fill-white" />
            </motion.span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AvaliabiltyScreen;
