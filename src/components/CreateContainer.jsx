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
import Loader from "./Loader";
import { LoadItemAttribute } from "../GraphQL/functions/graphqlFunctions";
import AnimatePage from "../AnimatePage";
import { useMutation } from "@apollo/client";
import { ADD_NEW_PRODUCT } from "../GraphQL/mutations/products";
import { alertSliceActions } from "../context/actions";
import { errorHandler } from "../apollo";

// Saving new Items
const CreateContainer = () => {
  const [addProduct, { loading }] = useMutation(ADD_NEW_PRODUCT);
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCalories, setProductCalories] = useState("");
  const [productType, setProductType] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      setIsLoading(true);
      reader.onload = (event) => {
        resolve(event.target.result);
        setIsLoading(false);
      };
      setProductImage(file);
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
    if (!imageFile.name.match(/.(jpg|jpeg|png|gif|tif|tiff)$/i)) {
      setImageAsset(null);
      setIsScroll(true);
      setIsLoading(false);
      setFields(true);
      setMsg("Image Format Not Allowed ☹");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsScroll(false);
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
    }, 4000);
    console.log(productImage);
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

  const saveDetails = (e) => {
    e.preventDefault();
    setAlertStatus("success");
    try {
      if (
        !productName ||
        !productCategory ||
        !productType ||
        !productPrice ||
        !imageAsset ||
        productImage === null
      ) {
        setFields(true);
        setIsScroll(true);
        setMsg("Required fields can't be empty 😕");
        setAlertStatus("danger");
        setTimeout(() => {
          setIsScroll(true);
          setFields(false);
        }, 4000);
      } else {
        addProduct({
          variables: {
            product_slug: `${Date.now()}`,
            product_name: productName,
            product_price: parseInt(productPrice),
            product_image: productImage,
            product_category: productCategory,
            product_type: productType,
            product_description: productDescription,
            product_calories: parseInt(productCalories),
          },
          onError: (error) => {
            alertSliceActions.createAlert({
              type: "error",
              message: `${error} ❗`,
            });
          },
          onCompleted: () => {
            clearData();
            alertSliceActions.createAlert({
              type: "success",
              message: "Item Was Added Successfully 💚",
            });
          },
        }).then(errorHandler);
      }
    } catch (error) {
      console.log(error);
      setIsScroll(true);
      setFields(true);
      setMsg("Error while uploading : Try Again 😕");
      setAlertStatus("danger");
      setTimeout(() => {
        setIsScroll(true);
        setFields(false);
      }, 4000);
    }
  };
  const clearData = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductCategory(null);
    setProductType(null);
    setProductCalories("");
    setProductImage(null);
    setImageAsset(null);
  };
  return (
    <AnimatePage>
      <form
        className="no-select w-full min-h-screen flex items-center justify-center"
        onSubmit={saveDetails}
      >
        <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 transition-all duration-500">
          {fields && (
            <>
              {isScroll && <ScrollToTopOnMount />}
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
              className="w-full h-full text-lg bg-transparent outline-none focus:outline-none border-none placeholder:text-gray-400 text-textColor"
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
                className="w-full h-full text-lg bg-transparent outline-none focus:outline-none border-none placeholder:text-gray-400 text-textColor"
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
              <LoadItemAttribute type={1} />
            </select>
          </div>
          <div className="w-full">
            <select
              onChange={(e) => setProductType(e.target.value)}
              className={`outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer ${
                productCategory ? "block" : "hidden"
              }`}
            >
              <option value="others" className="bg-white">
                Select Type
              </option>
              <LoadItemAttribute type={0} />
            </select>
          </div>

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
                        onChange={(e) => {
                          setProductImage(e.target.files[0]);
                          uploadImage(e);
                        }}
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
                type="number"
                value={productCalories}
                onChange={(e) => setProductCalories(e.target.value)}
                placeholder="Calories (Optional)"
                className="shadow-none focus:outline-none w-full h-full text-lg bg-transparent border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-3">
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <NairaSign className="text-gray-700 text-2xl w-5 h-5" />

              <input
                type="number"
                required
                value={
                  productPrice.includes("e")
                    ? productPrice.replace("e", "")
                    : productPrice
                }
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Price"
                className="w-full h-full text-lg bg-transparent outline-none focus:outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
          </div>
          <div className="flex items-center w-full">
            {loading ? (
              <button
                disabled
                type="button"
                className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
              >
                <svg
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              <button
                className="ml-0 md:ml-auto w-full md:w-auto disabled:bg-slate-300 border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                disabled={
                  !(
                    productName &&
                    productImage &&
                    productPrice &&
                    productCategory &&
                    productType
                  )
                    ? true
                    : false
                }
                onSubmit={saveDetails}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </form>
    </AnimatePage>
  );
};

export default CreateContainer;
