import React, { useState } from "react";
import {
  MdShoppingBasket,
  MdAdd,
  MdLogout,
  MdLogin,
  MdStore,
} from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import {
  alertSliceActions,
  authTokenActions,
  cartAction,
} from "../context/actions";
import { AUTH_TOKEN, AUTH_TOKEN_REFRESH, USER } from "../constants";

const Header = () => {
  const user = useSelector((state) => state.authToken?.user);
  const cartShow = useSelector((state) => state.cart.cartShow);
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const [isMenu, setIsMenu] = useState(false);

  /* Creating A Rounded div with text in it as user default avater, 
  then create random colors for the div bg-color */
  const CreateAvater = ({ user, onClick }) => {
    const colors = ["#fdba74", "#ff5722", "#ffc107", "#00bcd4", "#673ab7"]; // the 5 random colors
    let random_color = colors[Math.floor(Math.random() * colors.length)]; // randomizing the colors with Math
    return (
      <>
        <div
          onClick={onClick}
          style={{ backgroundColor: `${random_color}` }}
          className="bg-orange-300 w-[40px] min-w-[40px] flex justify-center select-none items-center border px-[20px] py-[20px] rounded-full uppercase cursor-pointer h-[40px] min-h-[40px]"
        >
          <span className="font-semibold text-primary backdrop-blur-sm leading-relaxed">
            {user && user.firstName && user.lastName // getting the first letter from both the user's first and last name
              ? `${user?.firstName[0] + user?.lastName[0]}`
              : user.username
              ? `${user.username[0] + user.username[1]}`
              : "?"}
          </span>
        </div>
      </>
    );
  };

  // Menu Toggle
  const showMenu = () => {
    setIsMenu(!isMenu);
  };

  // Cart Toggle
  const showCart = () => {
    cartAction.setCartShow(!cartShow);
  };

  /* 
  Logging out user function by setting user state 
  to null and clearing the localStorage 
  */
  const logout = () => {
    alertSliceActions.createAlert({
      type: "info",
      message: `Logging You Out... 🙂`,
    });
    setIsMenu(false);
    localStorage.removeItem(USER);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_TOKEN_REFRESH);
    authTokenActions.logOut();

    // setting a 3secs timeout before the `Logout was Successful` message shows
    setTimeout(() => {
      alertSliceActions.createAlert({
        type: "success",
        message: `Logout was Successful 😁`,
      });
    }, 3000);
  };
  
  return (
    <header className="fixed no-select z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-navOverlay backdrop-blur-md">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">Tray</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            {!user && (
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <Link to={"/auth/login"}>Login</Link>
              </li>
            )}
          </motion.ul>

          <div
            className="relative flex rounded-full p-1 hover:bg-gray-300 transition-all duration-100 items-center ease-in-out justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer hover:text-slate-600 transition-all duration-100 ease-in" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            {/* profile image */}
            {user && !user.profile?.image ? ( // checking if user exists and if the user profile exists
              <>
                <CreateAvater onClick={showMenu} user={user} />
              </>
            ) : (
              <motion.figure
                whileTap={{ scale: 0.6 }}
                onClick={showMenu}
                className="w-10 min-w-[40px] rounded-full bg-arrenge-center object-fit cursor-pointer h-10 min-h-[40px] drop-shadow-xl"
                style={{
                  backgroundImage: `url("${
                    user && user.profile?.image
                  }"), url(${Avatar})`,
                }}
              >
                <img
                  src={user ? user.profile.image : Avatar}
                  className="w-10 min-w-[40px] rounded-lg cursor-pointer h-10 min-h-[40px] opacity-0"
                  alt="profileimage"
                  onClick={showMenu}
                />
              </motion.figure>
            )}

            {/* menu */}
            {isMenu === true && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-50 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.profile.vendor !== null ? (
                  <Link
                    to={"/createItem"}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    <MdAdd />
                    New Item
                  </Link>
                ) : user && user.profile.vendor === null ? (
                  <Link
                    to="/auth/become-vendor"
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    <MdStore />
                    Become A Vendor
                  </Link>
                ) : null}
                {!user && (
                  <Link
                    to={"/auth/login"}
                    className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    Login <MdLogin />
                  </Link>
                )}
                {user && (
                  <p
                    onClick={logout}
                    className="m-2 p-2 rounded-md shadow-md flex items-center justify-center cursor-pointer bg-gray-200 gap-3 hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    Logout <MdLogout />
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full no-select">
        <motion.div
          whileTap={{ scale: 0.6 }}
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </motion.div>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">Tray</p>
        </Link>
        <div className="relative no-select">
          {/* profile image */}
          {user && !user.profile?.image ? (
            <>
              <CreateAvater onClick={showMenu} user={user} />
            </>
          ) : (
            <motion.figure
              whileTap={{ scale: 0.6 }}
              onClick={showMenu}
              className="w-10 min-w-[40px] rounded-full bg-arrenge-center object-fit cursor-pointer h-10 min-h-[40px] drop-shadow-xl"
              style={{
                backgroundImage: `url("${
                  user && user.profile?.image
                }"), url(${Avatar})`,
              }}
            >
              <img
                src={user ? user.profile.image : Avatar}
                className="w-10 min-w-[40px] rounded-lg cursor-pointer h-10 min-h-[40px] opacity-0"
                alt="profileimage"
                onClick={showMenu}
              />
            </motion.figure>
          )}
          {/* menu */}
          {isMenu === true && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-50 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-1"
            >
              {user && user.profile.vendor !== null ? (
                <Link
                  to={"/createItem"}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={() => setIsMenu(false)}
                >
                  <MdAdd />
                  New Item
                </Link>
              ) : user && user.profile.vendor === null ? (
                <Link
                  to="/auth/become-vendor"
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={() => setIsMenu(false)}
                >
                  <MdStore />
                  Become A Vendor
                </Link>
              ) : null}
              {!user && (
                <Link
                  to={"/auth/login"}
                  className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={() => setIsMenu(false)}
                >
                  Login <MdLogin />
                </Link>
              )}
              <Link
                to={"/"}
                onClick={() => setIsMenu(false)}
                className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
              >
                Home
              </Link>
              <Link
                to={"/menu"}
                onClick={() => setIsMenu(false)}
                className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
              >
                Menu
              </Link>
              <p
                onClick={() => setIsMenu(false)}
                className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
              >
                About Us
              </p>
              {user && (
                <p
                  onClick={logout}
                  className="m-2 p-2 rounded-md shadow-md flex items-center justify-center cursor-pointer bg-gray-200 gap-3 hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Logout <MdLogout />
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
