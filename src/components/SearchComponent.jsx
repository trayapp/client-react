import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

export const ProductSearch = () => {
  return <div>ProductSearch</div>;
};

export const SearchComponent = ({ product_only }) => {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
        className={`md:w-[30rem] mr-auto md:m-0 w-[20em] w-full flex flex-row justify-start p-1 items-start focus:border backdrop-blur-md bg-gray-100 transition-all duration-150 ease-in-out ${
          show ? `${searchQuery && searchQuery.length > 0 ? `border-b rounded-tr-md rounded-tl-md shadow-md`: `shadow-md rounded-md`} z-10 ` : `rounded-md border`
        }`}
      >
        <div className="w-10 h-10 rounded-bl-md rounded-tl-md cursor-pointer">
          <MdSearch className="p-1 w-10 h-10 border-r text-gray-400 rounded-bl-md rounded-tl-md" />
        </div>
        <div className="w-full h-10 rounded-tr-md rounded-br-md flex justify-start items-center">
          <input
            type="text"
            name=""
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="w-full text-lg px-2 font-semibold border-none h-full bg-transparent
                           rounded-tr-md rounded-br-md outline-none"
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
          show && searchQuery && searchQuery.length > 0 ? `h-10 z-10` : `h-[0px]`
        } md:w-[30rem] mr-auto md:m-0 w-[20em] w-full transition-all duration-100 ease-in-out rounded-bl-lg shadow-md backdrop-blur-md rounded-br-lg bg-gray-100`}
      >
        
      </div>
    </>
  );
};
