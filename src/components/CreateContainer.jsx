import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdDescription,
} from "react-icons/md";
import { ReactComponent as NairaSign } from "../img/naira-currency.svg";
import { product_categories, product_types } from "../utils/data";
import Loader from "./Loader";

const CreateContainer = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCalories, setProductCalories] = useState(0);
  const [productType, setProductType] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      setIsLoading(true);
      reader.onload = (event) => {
        resolve(event.target.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    });
  const ScrollToTopOnMount = () => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, []);

    return null;
  };

  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile.name.match(/.(jpg|jpeg|png|webp)$/i)) {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image Format Not Allowed ☹");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 5000);
      return;
    }
    if (!imageFile) {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("No Image was added 😥");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 5000);
      return;
    }

    fileToDataUri(imageFile).then((dataUri) => {
      setImageAsset(dataUri);
    });
    setFields(true);
    setMsg("Image added successfully 😎");
    setAlertStatus("success");
    setTimeout(() => {
      setFields(false);
    }, 5000);
  };
  const deleteImage = () => {
    setIsLoading(true);
    setImageAsset(null);
    setFields(true);
    setMsg("Image deleted successfully 👌");
    setAlertStatus("success");
    setTimeout(() => {
      setFields(false);
    }, 5000);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (
        !productName ||
        !productCategory ||
        !productType ||
        !productPrice ||
        !imageAsset
      ) {
        setFields(true);
        setMsg("Required fields can't be empty 😕");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          product_slug: `${Date.now()}`,
          product_name: productName,
          product_price: productPrice,
          product_image: imageAsset,
          product_category: productCategory,
          product_type: productType
        }
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error white uploading : Try Again 😕");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  return (
    <div className="no-select w-full min-h-screen flex items-center justify-center transition-all duration-500">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 transition-all duration-500">
        {fields && (
          <>
            <ScrollToTopOnMount />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                alertStatus === "danger"
                  ? "bg-red-400 text-red-800"
                  : "bg-emerald-400 text-emerald-800"
              }`}
            >
              {msg}
            </motion.p>
          </>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Give me a name..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        {productName.length > 0 && (
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdDescription className="text-xl text-gray-700" />
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="About this item (Optional)"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        )}

        <div className="w-full">
          <select
            onChange={(e) => setProductCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="others" className="bg-white">
              Select Category
            </option>
            {product_categories &&
              product_categories.map((category) => (
                <option
                  key={category.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={category.urlParamName}
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {productCategory && product_categories && (
          <div className="w-full">
            <select
              onChange={(e) => setProductType(e.target.value)}
              className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            >
              <option value="others" className="bg-white">
                Select Type
              </option>
              {product_types &&
                product_types.map((type) => (
                  <option
                    key={type.id}
                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    value={type.urlParamName}
                  >
                    {type.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Upload Item Image
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploadedImage"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete title="Remove Image" className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              value={productCalories === 0 ? null : ""}
              onChange={(e) => setProductCalories(e.target.value)}
              placeholder="Calories (Optional)"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <NairaSign className="text-gray-700 text-2xl w-5 h-5" />

            <input
              type="number"
              required
              value={productPrice === 0 ? null : ""}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
