import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useState, useRef, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { SEARCH_ITEMS } from "../GraphQL/queries/products";
import Loader from "./Loader";
import "flowbite";
import { ADD_PRODUCT_TO_AVAILABLE_PRODUCTS } from "../GraphQL/mutations/store";
import { alertSliceActions } from "../context/actions";
import { GET_STORE_QUERY } from "../GraphQL/queries/store/queries";
import { useParams, useSearchParams } from "react-router-dom";
import { ScrollToElement } from "../utils/hooks";

const ToggleSwitchComponent = ({ item }) => {
  const [checked, setChecked] = useState(
    item?.isAvaliableForStore === "1" ? true : false
  );
  const [addAvaliableProduct, { data, loading }] = useMutation(
    ADD_PRODUCT_TO_AVAILABLE_PRODUCTS
  );
  var { storeNickname } = useParams(); // getting storename from parameters
  storeNickname = storeNickname.replace("@", ""); // removing the `@` symbol
  useEffect(() => {
    if (!loading && data) {
      if (
        data.addAvaliableProduct &&
        data.addAvaliableProduct.success === true
      ) {
        alertSliceActions.createAlert({
          type: "success",
          message: `Item was ${
            checked === true ? "Added" : "Removed"
          } Successfully 😎`,
        });
      } else {
        alertSliceActions.createAlert({
          type: "error",
          message: `Item did not ${
            checked === true ? "Add to" : "Removed from"
          } 
          your Available Products, please try another item 😥`,
        });
      }
    }
  }, [checked, data, loading]);
  return (
    <label
      htmlFor={item.id}
      className="flex items-center cursor-pointer select-none"
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          defualtchecked={`${checked}`}
          onChange={(e) => {
            setChecked(e.target.checked);
            addAvaliableProduct({
              variables: {
                product_slug: item?.productSlug,
                action: checked === true ? "remove" : "add",
              },
              refetchQueries: [
                {
                  query: GET_STORE_QUERY,
                  variables: { storeNickname: storeNickname },
                }, // DocumentNode object parsed with gql
                "getStore", // Query name
              ],
            });
          }}
          id={item.id}
          className="sr-only"
        />
        <div className="block bg-[#E5E7EB] w-14 h-8 rounded-full"></div>
        <div
          className={`dot absolute top-1 ${
            checked === true ? `bg-orange-400 right-1` : `bg-white left-1`
          } w-6 h-6 rounded-full transition flex items-center justify-center`}
        >
          {loading ? (
            <Loader className="mr-auto" />
          ) : (
            <>
              {checked === true ? (
                <span>
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
              ) : (
                <span className="text-body-color">
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
              )}
            </>
          )}
        </div>
      </div>
    </label>
  );
};
const SearchResultComponent = ({ data }) => {
  return (
    <div className="w-full flex flex-row border-t p-4 justify-start items-start">
      <figure
        className="w-[5.5rem] h-[3.5rem] rounded-md bg-arrenge-center"
        style={{
          backgroundImage: `url(${
            data.productImages &&
            data.productImages.length > 0 &&
            data.productImages[0].productImage
          })`,
        }}
      >
        <img
          src={
            data.productImages &&
            data.productImages.length > 0 &&
            data.productImages[0].productImage
          }
          className="w-full h-full opacity-0"
          alt=""
        />
      </figure>
      <div className="w-full flex p-1 justify-between items-between">
        <p className="text-base mt-4">{data?.productName}</p>
        <ToggleSwitchComponent item={data} />
      </div>
    </div>
  );
};

export const SearchComponent = ({
  flag,
  showHandler,
  setShowHandler,
  showText,
  setShowText,
}) => {
  const [searchItems, { loading, data }] = useLazyQuery(SEARCH_ITEMS);
  let [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search_query") ? searchParams.get("search_query") : ""
  );
  const [searchResults, setsearchResults] = useState([]);
  const [didLookUp, setDidLookUp] = useState(true);
  const [checkedParams, setCheckedParams] = useState(false)
  searchParams = searchParams.get("search_query");
  const SearchContainer = useRef(null);

  const showList = () => {
    setShowHandler(true);
    if (setShowText) {
      setShowText("");
    }
  };
  const hideList = () => {
    setShowHandler(false);
  };
  const handleSearch = () => {
    setDidLookUp(false);
  };
  useEffect(() => {
    if (searchParams && !checkedParams) {
      setShowHandler(true);
      setDidLookUp(false);
      setCheckedParams(true)
    }
    if (searchQuery && searchQuery.length > 0 && !didLookUp) {
      setDidLookUp(true);
      searchItems({
        variables: { query: searchQuery },
        fetchPolicy: "no-cache",
      });
    }
    if (!loading && data) {
      setsearchResults(data.searchItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    didLookUp,
    loading,
    searchItems,
    searchParams,
    searchQuery,
    searchResults,
    setShowHandler,
  ]);
  return (
    <>
      {showHandler && (
        <div
          className="w-screen fixed h-screen z-10 top-0 bottom-0"
          onClick={hideList}
        ></div>
      )}
      {/* Search Container */}
      <div className="md:w-[30rem] z-30 mr-5 md:m-0 w-[27rem] transition-all duration-100">
        {/* Search Bar */}
        <div
          className={`w-full flex flex-row justify-start p-1 items-start focus:border backdrop-blur-md bg-gray-100 transition-all duration-150 ease-in-out ${
            showHandler
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
            {showText && <ScrollToElement refrence={SearchContainer} />}
            <input
              type="text"
              ref={SearchContainer}
              placeholder={showText ? showText : ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearch}
              value={searchQuery}
              className="w-full text-lg px-2 font-semibold border-none h-full bg-transparent
                           rounded-tr-md rounded-br-md outline-none"
              onClick={showList}
            />
          </div>
        </div>
        {/* List Of Products */}
        <div
          className={`${
            showHandler && searchQuery && searchQuery.length > 0
              ? `h-auto z-10`
              : `h-[0px]`
          } overflow-auto relative w-full transition-all duration-100 ease-in-out rounded-bl-lg shadow-md backdrop-blur-md rounded-br-lg bg-gray-100`}
        >
          {showHandler &&
          searchQuery &&
          searchQuery.length > 0 &&
          searchResults &&
          searchResults.length > 0 ? (
            searchResults.map((data, idx) => {
              return (
                <SearchResultComponent
                  data={data}
                  flag={flag}
                  key={`${data?.id}-${idx}`}
                />
              );
            })
          ) : (
            <div className="w-full flex flex-row border-t p-4 justify-center items-center">
              {loading ? <Loader /> : <span>No Results found!</span>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

/*
update: (cache, { data: { addAvaliableProduct } }) => {
                // read data from cache
                const { getStore } = cache.readQuery({
                  query: GET_STORE_QUERY,
                  variables: { storeNickname: storeNickname },
                });
                // update the cache with new data
                cache.writeQuery({
                  query: GET_STORE_QUERY,
                  data: {
                    getStore: {
                      vendor: {
                        profile: { ...getStore.vendor.profile },
                        store: {
                          ...getStore.vendor.store,
                          storeProducts: [
                            ...getStore.vendor.store.storeProducts,
                            addAvaliableProduct.product,
                          ],
                        },
                      },
                    },
                  },
                });
              }
*/
