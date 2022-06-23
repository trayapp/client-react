import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

export const ProductSearch = () => {
  return <div>ProductSearch</div>;
};

export const SearchComponent = ({ product_only }) => {
  const [show, setShow] = useState(false);
  const showList = () => {
    setShow(true);
  };
  const hideList = () => {
    setShow(false);
  };
  return (
    <>
      {/* Search Bar */}
      <div
        className={`w-[30rem] flex flex-row justify-start p-1 items-start focus:border backdrop-blur-md bg-gray-100 transition-all duration-150 ease-in-out shadow-md ${
          show ? `border-b z-10 rounded-tr-md rounded-tl-md` : `rounded-md`
        }`}
      >
        <div className="w-10 h-10 rounded-bl-md rounded-tl-md cursor-pointer">
          <MdSearch className="p-1 w-10 h-10 border-r rounded-bl-md rounded-tl-md" />
        </div>
        <div className="w-full h-10 rounded-tr-md rounded-br-md flex justify-start items-center">
          <input
            type="text"
            name=""
            className="w-full text-lg px-2 font-semibold border-none h-full bg-transparent
                           rounded-tr-md rounded-br-md outline-none"
            id=""
            onClick={showList}
          />
        </div>
      </div>
      {show && (
        <div
          className="w-screen fixed h-screen top-0 bottom-0"
          onClick={hideList}
        ></div>
      )}
      {/* List Of Products */}
      <div
        className={`${
          show ? `h-10 z-10` : `h-[0px]`
        } w-[30rem] transition-all duration-100 ease-in-out rounded-bl-lg shadow-md backdrop-blur-md rounded-br-lg bg-gray-100`}
      ></div>
    </>
  );
};
