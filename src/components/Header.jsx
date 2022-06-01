import React, { useState } from "react";
import {
  MdShoppingBasket,
  MdAdd,
  MdLogout,
  MdLogin,
  MdStore,
} from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const [{ user, token }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const login = async () => {
    if (!user) {
      if (window.location.pathname !== "/auth/login") {
        setIsMenu(false);
        navigate("/auth/login");
      } else {
        setIsMenu(!isMenu);
      }
    } else if (user) {
      if (!token) {
        window.location.href = "/auth/login";
      } else {
        if (isMenu === true) {
          setIsMenu(false);
        } else {
          setIsMenu(true);
        }
      }
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    dispatch({
      type: actionType.SET_TOKEN,
      user: null,
      token: null,
    });
  };
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-navOverlay backdrop-blur-md">
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

          <div className="relative flex rounded-full p-1 hover:bg-gray-300 transition-all duration-100 items-center ease-in-out justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer hover:text-slate-600 transition-all duration-100 ease-in" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.figure
              whileTap={{ scale: 0.6 }}
              onClick={login}
              className="w-10 min-w-[40px] rounded-full bg-arrenge-center object-fit cursor-pointer h-10 min-h-[40px] drop-shadow-xl"
              style={{
                backgroundImage: `url("${
                  user ? user.profile.image : Avatar
                }"), url(${Avatar})`,
              }}
            >
              <img
                src={user ? user.profile.image : Avatar}
                className="w-10 min-w-[40px] rounded-lg cursor-pointer h-10 min-h-[40px] opacity-0"
                alt="profileimage"
                onClick={login}
              />
            </motion.figure>
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
                    to={""}
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
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
            <p className="text-xs text-white font-semibold">2</p>
          </div>
        </motion.div>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">Tray</p>
        </Link>
        <div className="relative no-select">
          <motion.figure
            whileTap={{ scale: 0.6 }}
            onClick={login}
            className="w-10 min-w-[40px] rounded-full bg-arrenge-center object-fit cursor-pointer h-10 min-h-[40px] drop-shadow-xl"
            style={{
              backgroundImage: `url("${
                user ? user.profile.image : Avatar
              }"), url(${Avatar})`,
            }}
          >
            <img
              src={user ? user.profile.image : Avatar}
              className="w-10 min-w-[40px] rounded-lg cursor-pointer h-10 min-h-[40px] opacity-0"
              alt="profileimage"
              onClick={login}
            />
          </motion.figure>
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
                  to={""}
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
