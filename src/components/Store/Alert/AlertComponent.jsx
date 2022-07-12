import React from "react";
import { motion } from "framer-motion";

const AlertComponent = ({
  handleAction,
  handleLoader,
  handleParagraph,
  extraElement,
  handleYesDisable,
  handleNoDisable,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      className="bg-primary rounded-lg overflow-hidden shadow-md w-[15rem]"
    >
      {handleLoader && (
        <div className={`h-2 w-full bg-orange-300`}>
          <div className="animate-load h-full w-full bg-orange-500"></div>
        </div>
      )}
      <p className="text-base font-semibold py-3 px-6 capitalize">
        {handleParagraph}
      </p>
      <div className="border-t w-full h-1 border-orange-300"></div>
      {extraElement}
      <div className="flex gap-1 px-2 justify-end items-end">
        <button
          onClick={() => handleAction("yes")}
          disabled={handleYesDisable}
          className="text-lg font-semibold cursor-pointer disabled:shadow-none disabled:bg-slate-400 capitalize py-2 px-4 
            transition-all duration-100 hover:shadow-none shadow-md rounded-lg my-2 bg-orange-400 hover:bg-orange-500"
        >
          yes
        </button>
        <button
          onClick={() => handleAction("no")}
          disabled={handleNoDisable}
          className="text-lg font-semibold cursor-pointer capitalize py-2 px-4 rounded-full transition-all duration-150 hover:bg-slate-200 my-2"
        >
          no
        </button>
      </div>
    </motion.div>
  );
};

export default AlertComponent;
