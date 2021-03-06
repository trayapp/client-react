import React, { useState, useEffect, useRef } from "react";
import { signupFields } from "./constants/formFields";
import FormAction from "./FormAction";
import FormHeader from "./FormHeader";
import FormInput from "./FormInput";
import LoginAuth from "./LoginAuth";
import { ReactComponent as SignUpIllustration } from "../../img/signup.svg";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../GraphQL/mutations/auth";
import { motion } from "framer-motion";
import { AUTH_TOKEN } from "../../constants";
import { errorHandler, apolloClientAuth } from "../../apollo";
import { ScrollToElement } from "../../utils/hooks";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

const Signup = () => {
  const [register, { loading, error, data }] = useMutation(REGISTER_USER, {
    client: apolloClientAuth,
  });
  const [signupState, setSignupState] = useState(fieldsState);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState("danger");
  const [loginRedirect, setLoginRedirect] = useState(false);
  const ref = useRef(null);
  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };
  useEffect(() => {
    if (error) {
      setIsError(true);
      setAlertStatus("danger");
      setMsg("Server Error, Please Try Again");
      setTimeout(() => {
        setIsError(false);
      }, 1000);
    }
    if (data && !loading) {
      var qs = data.register;
      if (qs.errors) {
        setIsError(true);
        setAlertStatus("danger");
        if (qs.errors) {
          let error = qs.errors;
          if (error.first_name) {
            setMsg(`${error.first_name[0].message}`);
          }
          if (error.last_name) {
            setMsg(`${error.last_name[0].message}`);
          }
          if (error.username) {
            setMsg(`${error.username[0].message}`);
          }
          if (error.email) {
            setMsg(`${error.email[0].message}`);
          }
          if (error.password1) {
            setMsg(`${error.password1[0].message}`);
          }
          if (error.password2) {
            setMsg(`${error.password2[0].message}`);
          }
        } else {
          setMsg("Please Enter Correct Details");
        }
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
      if (qs.errors === null) {
        localStorage.setItem(AUTH_TOKEN, qs.token);
        setLoginRedirect(true);
      }
    }
  }, [data, loading, error]);

  //handle Signup API Integration here
  const createAccount = () => {
    register({
      variables: {
        first_name: signupState.first_name,
        last_name: signupState.last_name,
        username: signupState.username,
        email: signupState.email,
        password1: signupState.password1,
        password2: signupState.password2,
      },
    }).catch(errorHandler);
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-auto"
    >
      {!loading && loginRedirect === true ? (
        <LoginAuth
          username={signupState.username}
          password={signupState.password2}
        />
      ) : (
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <SignUpIllustration className="w-full h-420 hidden lg:block signup-svg" />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 py-3 px-5 shadow-lg border bg-loginColor rounded-lg">
              <FormHeader
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="login"
              />
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
                <div className="">
                  {fields.map((field) => (
                    <FormInput
                      key={field.id}
                      handleChange={handleChange}
                      value={signupState[field.id]}
                      labelText={field.labelText}
                      labelFor={field.labelFor}
                      id={field.id}
                      autoComplete={field.autoComplete}
                      name={field.name}
                      type={field.type}
                      isRequired={field.isRequired}
                      placeholder={field.placeholder}
                    />
                  ))}
                  <FormAction
                    handleSubmit={handleSubmit}
                    loading={loading === true}
                    text="Signup"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
export default Signup;
