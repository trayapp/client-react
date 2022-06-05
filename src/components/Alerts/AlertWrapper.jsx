import React from "react";
import { useToaster } from "react-hot-toast";
import { motion } from "framer-motion";
const AlertWrapper = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;
  return (
    <div
      style={{ zIndex: 999999 }}
      className="flex fixed flex-wrap items-center justify-center w-screen h-screen"
    >
      <div
        className="flex fixed bottom-0 mb-4 flex-col-reverse gap-3 w-full flex-wrap items-center justify-center"
        onMouseEnter={startPause}
        onMouseLeave={endPause}
      >
        {toasts.map((t) => {
          const offset = calculateOffset(t.id, {
            reverseOrder: false,
            margin: 10,
          });
          const ref = (el) => {
            if (el && !t.height) {
              const height = el.getBoundingClientRect().height;
              updateHeight(t.id, height);
            }
          };
          return (
            <motion.div
              initial={{ opacity: 0, transform: `translateY(-${offset}px)` }}
              animate={{ opacity: 1, transform: `translateY(${offset}px)` }}
              exit={{ opacity: 0, transform: `translateY(-${offset}px)` }}
              key={t.id}
              ref={ref}
              style={{ transform: `translateY(${offset}px)` }}
              className="flex items-center h-16 border drop-shadow-lg bg-white pr-4 w-full max-w-md shadow-lg hover:shadow-none transition-all duration-400"
            >
              <div className="flex items-center justify-center bg-gray-300 w-12 h-full">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="px-6">
                <h5 className="font-semibold">{t.title}</h5>
                <p className="text-sm">{t.message}</p>
              </div>
              <button className="ml-auto focus:outline-none hover:text-red-500" onClick={t.dismiss}>
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertWrapper;
