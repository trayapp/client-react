import { useState, useEffect } from "react";
import { signupFields } from "./constants/formFields";
import FormAction from "./FormAction";
import FormHeader from "./FormHeader";
import FormInput from "./FormInput";
import { ReactComponent as SignUpIllustration } from "../../img/signup.svg";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../GraphQL/mutations/auth";
import { motion } from "framer-motion";
import { AUTH_TOKEN, AUTH_TOKEN_REFRESH } from "../../constants";
import { errorHandler, apolloClientAuth } from "../../apollo";
import { authTokenActions } from "../../context/actions";

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

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
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
        // console.log(qs.errors);
        if (qs.errors.nonFieldErrors) {
          setMsg(`${qs.errors.nonFieldErrors[0].message}`);
        } else {
          setMsg("Please Enter Correct Details");
        }
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
      if (qs.errors === null) {
        authTokenActions.setAuthToken(qs);
        console.log(qs.refreshToken);
        localStorage.setItem("user", JSON.stringify(qs.user));
        localStorage.setItem(AUTH_TOKEN, qs.token);
        localStorage.setItem(AUTH_TOKEN_REFRESH, qs.refreshToken);
      }
      console.log(qs);
    }
  }, [data, loading, error]);
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
  //handle Signup API Integration here
  const createAccount = () => {
    register({
      variables: {
        first_name: signupState.first_name,
        last_name: signupState.last_name,
        username: signupState.username,
        email: signupState.email,
        password: signupState.password,
      },
    }).catch(errorHandler);
  };

  return (
    <section className="h-auto">
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
                <ScrollToTopOnMount />
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
    </section>
  );
};
export default Signup;
