import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { LoadHeroData } from "../GraphQL/functions";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
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
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
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

        <LoadHeroData />
      </div>
    </section>
  );
};

export default HomeContainer;
