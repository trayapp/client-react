import { useLazyQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { SEARCH_ITEMS } from "../GraphQL/queries/products";
import Loader from "./Loader";
import "flowbite";

const ToggleSwitch = ({ active, setActive, index }) => {
  index = useRef(index).current;
  active = useRef(active).current;
  let checkbox = useRef(active === index);
  useEffect(() => {
    if (active === index) {
      checkbox.current = !checkbox.current;
    }
  }, [active, checkbox, index]);
  console.log(checkbox.current, index === active);
  return (
    <label
      htmlFor="toggleThree"
      className="flex items-center cursor-pointer select-none"
    >
      <div className="relative">
        <input
          type="checkbox"
          onClick={() => setActive(index)}
          // onChange={() => setActive(index)}
          value={checkbox.current}
          id="toggleThree"
          className="sr-only"
        />
        <div className="block bg-[#E5E7EB] w-14 h-8 rounded-full"></div>
        <div
          className={`dot absolute ${
            checkbox.current ? `bg-orange-300 right` : `bg-white left`
          }-1 top-1 w-6 h-6 rounded-full transition-all duration-50 flex items-center justify-center`}
        >
          <span className={`active ${!checkbox.current && `hidden`}`}>
            <svg
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                fill="white"
                stroke="white"
                strokeWidth="0.4"
              ></path>
            </svg>
          </span>
          <span
            className={`inactive ${
              checkbox.current && `hidden`
            } text-body-color`}
          >
            <svg
              className="w-4 h-4 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </label>
  );
};

export const SearchComponent = ({ product_only }) => {
  const [searchItems, { loading, data }] = useLazyQuery(SEARCH_ITEMS);
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setsearchResults] = useState(null);
  const [didLookUp, setDidLookUp] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const showList = () => {
    setShow(true);
  };
  const hideList = () => {
    setShow(false);
  };
  const handleSearch = () => {
    setDidLookUp(true);
  };
  useEffect(() => {
    if (searchQuery && searchQuery.length > 0 && didLookUp) {
      setDidLookUp(false);
      searchItems({
        variables: { query: searchQuery },
      });
    }
    if (!loading && data) {
      setsearchResults(data.searchItems);
    }
  }, [data, didLookUp, loading, searchItems, searchQuery]);
  return (
    <>
      {/* Search Bar */}
      <div
        className={`md:w-[30rem] mr-auto md:m-0 w-[20em] w-full flex flex-row justify-start p-1 items-start focus:border backdrop-blur-md bg-gray-100 transition-all duration-150 ease-in-out ${
          show
            ? `${
                searchQuery && searchQuery.length > 0
                  ? `border-none rounded-tr-md rounded-tl-md shadow-md`
                  : `shadow-md rounded-md`
              } z-10 `
            : `rounded-md border`
        }`}
      >
        <div className="w-10 h-10 rounded-bl-md rounded-tl-md cursor-pointer">
          {loading ? (
            <div className="w-full h-full flex flex-row justify-center items-center">
              <Loader />
            </div>
          ) : (
            <MdSearch className="p-1 w-10 h-10 border-r text-gray-400 rounded-bl-md rounded-tl-md" />
          )}
        </div>
        <div className="w-full h-10 rounded-tr-md rounded-br-md flex justify-start items-center">
          <input
            type="text"
            name=""
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={handleSearch}
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
          show && searchQuery && searchQuery.length > 0
            ? `h-auto z-10`
            : `h-[0px]`
        } md:w-[30rem] overflow-auto mr-auto relative md:m-0 w-[20em] w-full transition-all duration-100 ease-in-out rounded-bl-lg shadow-md backdrop-blur-md rounded-br-lg bg-gray-100`}
      >
        {show &&
          searchQuery &&
          searchQuery.length > 0 &&
          searchResults &&
          searchResults.map((n, index) => (
            <>
              {/* Item */}
              <div
                key={index}
                className="w-full flex flex-row border-t p-4 justify-start items-start"
              >
                <figure
                  className="w-[5.5rem] h-[3.5rem] rounded-md bg-arrenge-center"
                  style={{
                    backgroundImage: `url(${n.productImages[0].productImage})`,
                  }}
                >
                  <img
                    src={n.productImages[0].productImage}
                    className="w-full h-full opacity-0"
                    alt=""
                  />
                </figure>
                <div className="w-full flex p-1 justify-between items-between">
                  <p className="text-base mt-4">{n?.productName}</p>
                  <ToggleSwitch
                    setActive={setActiveButton}
                    active={activeButton}
                    index={n}
                  />
                </div>
              </div>
              {/* end item */}
            </>
          ))}
      </div>
    </>
  );
};
