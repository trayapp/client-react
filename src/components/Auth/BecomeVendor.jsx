import React, { useRef, useEffect, useState } from "react";
import { becomeVendorFields } from "./constants/formFields";
import FormAction from "./FormAction";
import FormInput from "./FormInput";
import FormHeader from "./FormHeader";
import { useMutation } from "@apollo/client";
import { CREATE_VENDOR } from "../../GraphQL/mutations/auth";
import { motion } from "framer-motion";
import { USER } from "../../constants";
import { errorHandler } from "../../apollo";
import { authTokenActions, alertSliceActions } from "../../context/actions";
import AnimatePage from "../../AnimatePage";
import { ReactComponent as BecomeAVendorIllustration } from "../../img/become-vendor.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScrollToElement } from "../../utils/hooks";
const fields = becomeVendorFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const BecomeVendor = () => {
  const [createVendor, { loading, error, data }] = useMutation(CREATE_VENDOR);
  const [becomeVendorState, setLoginState] = useState(fieldsState);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState("danger");
  const [errors, setErrors] = useState(null);
  const ref = useRef(null);
  const user = useSelector((state) => state.authToken?.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginState({ ...becomeVendorState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };
  useEffect(() => {
    if (error && error.message.includes("You Already A Vendor")) {
      alertSliceActions.createAlert({
        type: "info",
        message: `${error.message} 😉`,
      });
      if (user.profile.vendor)
        navigate(`/store/@${user.profile.vendor.store?.storeNickname}`);
    } else if (error && error.message.includes("Login Required.")) {
      alertSliceActions.createAlert({
        type: "error",
        message: `There was an error, Reloading...`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (error && error !== undefined) {
      setIsError(true);
      setAlertStatus("danger");
      setMsg(`${error}`);
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
    if (loading) {
      alertSliceActions.createAlert({
        type: "info",
        message: `Creating Your Tray Store... (¬‿¬)`,
      });
      alertSliceActions.clearAlerts([]);
    }
    if (data && !loading) {
      alertSliceActions.clearAlerts([]);
      var qs = data.createVendor;
      if (qs.success === true) {
        authTokenActions.setAuthToken(qs);
        localStorage.setItem(USER, JSON.stringify(qs.user));
        alertSliceActions.createAlert({
          type: "success",
          message: `Congratulation ${qs.user.username} you are now a Tray vendor 🚀`,
        });
        navigate(`/store/@${becomeVendorState.storeNickname}`);
      } else {
        if (qs.errors) {
          setErrors(qs.errors);
        }
      }
    }
  }, [
    data,
    loading,
    error,
    navigate,
    becomeVendorState.storeNickname,
    user.profile.vendor,
  ]);

  //Handling Become Vendor API Integration here
  const authenticateUser = () => {
    createVendor({
      variables: {
        storeName: becomeVendorState.storeName,
        storeCategory: becomeVendorState.storeCategory,
        storeNickname: becomeVendorState.storeNickname,
      },
    }).catch(errorHandler);
  };
  return (
    <AnimatePage>
      <section className="h-auto" ref={ref}>
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <BecomeAVendorIllustration className="w-full h-420 hidden lg:block" />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 py-3 px-5 shadow-lg border bg-becomeVendorColor rounded-lg">
              <FormHeader heading="Create A Vendor Account" />
              {isError && (
                <>
                  <ScrollToElement refrence={ref} />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                      alertStatus === "danger"
                        ? "bg-red-200 text-red-600"
                        : "bg-emerald-200 text-emerald-600"
                    }`}
                  >
                    {msg}
                  </motion.p>
                </>
              )}
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                  {fields.map((field) => (
                    <FormInput
                      key={field.id}
                      handleChange={handleChange}
                      value={becomeVendorState[field.id]}
                      labelText={field.labelText}
                      labelFor={field.labelFor}
                      autoComplete={field.autoComplete}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      isRequired={field.isRequired}
                      placeholder={field.placeholder}
                      helpText={field.helpText}
                      errors={errors}
                      customClass={`my-6`}
                    />
                  ))}
                </div>
                <FormAction
                  handleSubmit={handleSubmit}
                  loading={loading === true}
                  text="Become A Vendor"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default BecomeVendor;
