import React, { useEffect, useState, useRef } from "react";
import { loginFields } from "./constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import FormInput from "./FormInput";
import FormHeader from "./FormHeader";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../GraphQL/mutations/auth";
import { motion } from "framer-motion";
import { AUTH_TOKEN, AUTH_TOKEN_REFRESH, USER } from "../../constants";
import { ReactComponent as LoginIllustration } from "../../img/login.svg";
import { errorHandler, apolloClientAuth } from "../../apollo";
import { authTokenActions, alertSliceActions } from "../../context/actions";
import { ScrollToElement } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Login = () => {
  const [tokenAuth, { loading, error, data }] = useMutation(LOGIN_USER, {
    client: apolloClientAuth,
  });
  const [loginState, setLoginState] = useState(fieldsState);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState("danger");
  const navigate = useNavigate();
  const ref = useRef(null);
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
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
      var qs = data.tokenAuth;
      if (qs.errors) {
        setIsError(true);
        setAlertStatus("danger");
        if (qs.errors.nonFieldErrors) {
          setMsg(`${qs.errors.nonFieldErrors[0].message}`);
        } else {
          setMsg("Please Enter Correct Details");
        }
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);

  //Handling Login API Integration here
  const authenticateUser = () => {
    tokenAuth({
      variables: {
        username: loginState.username,
        password: loginState.password,
      },
      onCompleted: (data) => {
        let qs = data.tokenAuth;
        authTokenActions.setAuthToken(qs);
        localStorage.setItem(USER, JSON.stringify(qs.user));
        localStorage.setItem(AUTH_TOKEN, qs.token);
        localStorage.setItem(AUTH_TOKEN_REFRESH, qs.refreshToken);
        alertSliceActions.createAlert({
          type: "success",
          message: `You Logged In as ${qs.user.username} Successfully 🤩`,
        });
        navigate("/");
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
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <LoginIllustration className="w-full h-420 hidden lg:block" />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20 py-3 px-5 shadow-lg border bg-loginColor rounded-lg">
            <FormHeader
              heading="Login to your account"
              paragraph="Don't have an account yet? "
              linkName="Signup"
              linkUrl="signup"
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
              <div className="-space-y-px">
                {fields.map((field) => (
                  <FormInput
                    key={field.id}
                    handleChange={handleChange}
                    value={loginState[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    autoComplete={field.autoComplete}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />
                ))}
              </div>

              <FormExtra />
              <FormAction
                handleSubmit={handleSubmit}
                loading={loading === true}
                text="Login"
              />
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
export default Login;
