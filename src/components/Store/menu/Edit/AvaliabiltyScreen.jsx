import React from "react";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { SearchComponent } from "../../../SearchComponent";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { alertSliceActions, storeAction } from "../../../../context/actions";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT_TO_AVAILABLE_PRODUCTS } from "../../../../GraphQL/mutations/store";
import { GET_STORE_QUERY } from "../../../../GraphQL/queries/store/queries";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../Loader";

export const AvaliableItemComponent = ({ item }) => {
  const [addAvaliableProduct, { data, loading }] = useMutation(
    ADD_PRODUCT_TO_AVAILABLE_PRODUCTS
  );
  var { storeNickname } = useParams(); // getting storename from parameters
  storeNickname = storeNickname.replace("@", ""); // removing the `@` symbol
  const removeAvaliableItem = (item) => {
    addAvaliableProduct({
      variables: {
        product_slug: item?.productSlug,
        action: "remove",
      },
      refetchQueries: [
        {
          query: GET_STORE_QUERY,
          variables: { storeNickname: storeNickname },
        },
      ],
    });
  };
  useEffect(() => {
    if (!loading && data) {
      if (
        data.addAvaliableProduct &&
        data.addAvaliableProduct.success === true
      ) {
        alertSliceActions.createAlert({
          type: "success",
          message: `Item was Removed Successfully 😎`,
        });
      } else {
        alertSliceActions.createAlert({
          type: "error",
          message: `Item did not Removed from your Available Products, please try again later 😥`,
        });
      }
    }
  }, [data, loading]);
  return (
    <li className="py-2 px-4 rounded-3xl gap-2 flex justify-between items-center bg-primary drop-shadow-md backdrop-blur-md">
      <span className="text-base font-semibold text-orange-400 flex justify-center items-center w-full capitalize">
        {item?.productName}
      </span>
      {loading ? (
        <Loader />
      ) : (
        <motion.span
          whileTap={{ scale: 0.85 }}
          onClick={() => removeAvaliableItem(item)}
          className="text-base cursor-pointer font-semibold p-2 rounded-full bg-red-600 capitalize"
        >
          <MdDeleteForever className="fill-white" />
        </motion.span>
      )}
    </li>
  );
};

const AvaliabiltyScreen = ({ items, setShow, show, showText, setShowText }) => {
  const avaliableItems = useSelector((state) => state.store?.avaliableItems);
  
  React.useEffect(() => {
    if (!(avaliableItems && items && avaliableItems.length === items.length)) {
      storeAction.setAvaliableItems(items);
    }
  }, [avaliableItems, items]);
  return (
    <div className="AvaliabiltyScreenComponent">
      <div className="w-screen p-2 flex flex-col justify-center items-center">
        <SearchComponent
          flag={true}
          showText={showText}
          setShowText={setShowText}
          showHandler={show}
          setShowHandler={setShow}
        />
      </div>
      <div className="px-4 md:px-16 py-4 w-full h-screen">
        <ul className="list-style-none flex justify-center md:justify-start flex-wrap md:flex-nowrap gap-3 items-start">
          {avaliableItems &&
            avaliableItems.length > 0 &&
            avaliableItems.map((item, idx) => (
              <AvaliableItemComponent key={idx} item={item} />
            ))}
          {/* Add Item Button */}
          <li className="flex justify-center items-center">
            <motion.span
              whileTap={{ scale: 0.85 }}
              title="Add Avaliable Item"
              className="p-3 mt-1 rounded-full flex cursor-pointer justify-center items-center bg-orange-400 drop-shadow-md"
              onClick={() => {
                setShowText("Search For Item Here...");
                setShow(true);
              }}
            >
              <MdAdd className="fill-white" />
            </motion.span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AvaliabiltyScreen;
