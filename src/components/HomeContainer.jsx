import React, { useState, useEffect } from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { useQuery } from "@apollo/client";
import { LOAD_HERO_DATA } from "../GraphQL/queries/products";
import { productViewerAction } from "../context/actions";

const HomeContainer = () => {
  const { data, loading } = useQuery(LOAD_HERO_DATA, {
    variables: { count: 3 },
    fetchPolicy: "network-only",
  });
  const [heroData, setHeroData] = useState([]);

  useEffect(() => {
    if (!loading && data && data.heroData) {
      setHeroData(data.heroData);
    }
  }, [data, loading]);
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full select-none"
      id="Home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 rounded-full justify-center bg-orange-100 px-4 py-1">
          <p className="text-base text-orange-500 font-semibold">
            Hostel Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              alt="delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[2.2rem] lg:text-[4.2rem] font-bold tracking-wide text-headingColor">
          Students Food Delivery
          <span className="text-orange-600 text-[2.6rem] lg:text-[4.6rem]">
            &nbsp;Made Easy
          </span>
        </p>
        <p className="text-base text-textColor select-text text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste corrupti
          sunt repellendus necessitatibus voluptatem tenetur soluta quod
          aperiam, nemo, cumque, libero nulla sapiente illum tempore maxime
          mollitia vel explicabo facilis.
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto
        px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="md:px-4 lg:px-0 lg-px-0 py-2 flex-1 flex items-center relative">
        <figure
          style={{ backgroundImage: `url(${HeroBg})` }}
          className="ml-auto rounded-lg h-420 w-full md:hidden lg:hidden block lg:w-auto bg-arrenge-cover lg:h-650"
        ></figure>
        <img
          src={HeroBg}
          className="ml-auto h-420 w-full md:block lg:block hidden lg:w-auto bg-arrenge-cover lg:h-650"
          alt="hero-bg"
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:pr-32 gap-4 flex-wrap">
          {!loading && heroData && heroData.length <= 0 && (
            <h1 className="w-full text-lg text-center uppercase font-normal">
              There is nothing here...
            </h1>
          )}
          {heroData &&
            heroData.length > 0 &&
            heroData
              ?.filter((n) => n.isAvaliable === true)
              .map((p, idx) => (
                <div
                  key={idx}
                  title={`click to view ${p?.productName}`}
                  onClick={() => productViewerAction.setCurrentView(p)}
                  className="cursor-pointer lg:w-220 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={p.productImages[0] && p.productImages[0]?.productImage}
                    className={`${
                      loading === true && "skeleton skeleton-image"
                    } w-20 lg:w-40 -mt-10 lg:-mt-20 rounded-md`}
                    alt=""
                  />
                  <p className="text-base lg:text-xl font-semibold capitalize text-textColor mt-2 lg:mt-4">
                    {p?.productName}
                  </p>

                  <p className="text-[12px] lg:text-sm w-full flex capitalize items-center justify-center text-lighttextGray font-semibold my-1 lg:my-3">
                    {p.productCategory?.name}
                  </p>
                  <div className="text-sm font-semibold text-headingColor">
                    <span className="text-xs text-green-600">???</span>
                    {p?.productPrice}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
