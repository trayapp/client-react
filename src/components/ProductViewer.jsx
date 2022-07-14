import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { productViewerAction } from "../context/actions";
import { Link } from "react-router-dom";

const ProductViewer = () => {
  const product = useSelector((state) => state.productViewer?.product);
  const [selectedImage, setSelectedImage] = React.useState(
    `${
      product && product.productImages
        ? product.productImages[0]?.productImage
        : ""
    }`
  );
  const closeView = () => {
    productViewerAction.setCurrentView(null);
  };
  return (
    product !== null && (
      <div className="fixed z-[200] flex justify-center w-screen h-screen">
        <div
          onClick={closeView}
          className="absolute top-0 z-[102] left-0 w-full h-full backdrop-blur-sm bg-overlay"
        ></div>
        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-full md:w-[50rem] overflow-y-auto overflow-x-hidden pointer-events-auto z-[103] h-full bg-primary"
        >
          {/* <!-- Top --> */}
          <div className="fixed select-none z-50 border-b w-full md:w-[50rem] py-3 px-4 bg-navOverlay backdrop-blur-md">
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <span>
                <svg
                  className="h-5 w-5 leading-none text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <span>Back</span>
            </div>
          </div>
          {/* <!-- ./ Top --> */}

          <div className="flex flex-col mt-14 px-4 py-4 w-full">
            {/* Image Section */}
            <div className="md:flex-1 px-4">
              <div className="h-64 rounded-lg bg-slate-200 mb-4">
                <figure className="h-64 rounded-lg bg-gray-200 mb-4 py-2 flex items-center justify-center">
                  <img
                    src={selectedImage}
                    className="object-fit w-ful h-full"
                    alt=""
                  />
                </figure>
              </div>
              {/* Image Togglers */}
              {product.productImages && product.productImages.length > 0 && (
                <div className="flex -mx-2 mb-4">
                  {/* Button */}
                  {product.productImages.map((image, idx) => (
                    <motion.div
                      whileTap={{ scale: 0.85 }}
                      key={idx}
                      className="flex-1 px-2"
                    >
                      <button
                        className={`focus:outline-none ${
                          selectedImage === image?.productImage
                            ? "ring-2 ring-indigo-300 ring-inset"
                            : ""
                        } 
                      rounded-lg w-[5rem] h-[5rem] p-2 bg-gray-300 flex items-center justify-center`}
                      >
                        <img
                          src={image?.productImage}
                          onClick={() => setSelectedImage(image?.productImage)}
                          className="object-fit w-full h-full"
                          alt=""
                        />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
              {/* ./Image Toggle */}
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {product?.productName}
              </h2>
              {product?.productAvaliableIn &&
                product?.productAvaliableIn.length > 0 && (
                  <p className="text-gray-500 text-sm">
                    Avaliable In{" "}
                    {product?.productAvaliableIn.map((n) => (
                      <Link
                        to={`/store/@${n?.storeNickname}`}
                        onClick={closeView}
                        className="text-indigo-600 hover:underline"
                      >
                        - {n?.storeName}
                      </Link>
                    ))}
                  </p>
                )}

              <div className="flex items-center space-x-4 my-4">
                <div>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-emerald-400 mr-1 mt-1">₦</span>
                    <span className="font-bold text-indigo-600 text-3xl">
                      {product?.productPrice}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-orange-500 text-xl font-semibold">
                    Save 12%
                  </p>
                  {product.productCreator && (
                    <p className="text-gray-400 text-sm">
                      Created by{" "}
                      <Link
                        to={`/store/@${product.productCreator.store?.storeNickname}`}
                        onClick={closeView}
                        className="text-indigo-600 hover:underline"
                      >
                        {product.productCreator.store?.storeNickname}
                      </Link>
                    </p>
                  )}
                </div>
              </div>
              <p className="text-gray-500">
                {product?.productDesc ? (
                  product?.productDesc
                ) : (
                  <span className="text-lg font-medium">No Description...</span>
                )}
              </p>

              <div className="flex no-select py-4 space-x-4">
                <div className="relative">
                  <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                    Qty
                  </div>
                  <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>

                  <svg
                    className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>

                <button
                  type="button"
                  onClick={closeView}
                  className="h-14 px-6 py-2 font-semibold rounded-xl bg-orange-600 hover:bg-orange-500 text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  );
};

export default ProductViewer;
