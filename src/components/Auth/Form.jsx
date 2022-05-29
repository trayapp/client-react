import React from "react";
import Signin from "./Signin";

import { ReactComponent as LoginIllustration } from "../../img/login.svg";

const Form = () => {
  return (
    <section className="h-auto">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <LoginIllustration className="w-full h-420 hidden lg:block" />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20 py-3 px-5 shadow-lg border bg-loginColor rounded-lg">
            <Signin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
