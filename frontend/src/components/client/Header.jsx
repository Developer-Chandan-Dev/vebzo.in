/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Menu, ShoppingCart, Heart, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../utility/Button";
import useHeader from "../../hooks/client/useHeader";
import Logo from "../../assets/images/organic-store-logo5.svg";

const Header = ({ bg = "bg-white" }) => {
  const {
    subTotal,
    setSubTotal,
    isOpen,
    setIsOpen,
    location,
    authUser,
    cartItems,
    favsCount,
    calculateGrandTotal,
    grandTotal,
    toggleMenu,
  } = useHeader();

  return (
    <header
      className={`py-3 px-4 sm:px-7 lg:px-10 w-full z-50 sticky top-0 ${bg} relative`}
    >
      <nav className="hidden md:flex-between gap-x-7 lg:gap-x-10 max-w-7xl mx-auto lg:px-5 xl:px-10">
        <div className="logo text-2xl font-bold text-slate-500">
          <Link to="/">
            <img src={Logo} className="h-16" alt="Logo" />
          </Link>
        </div>
        <ul className="flex items-center md:gap-x-3 lg:gap-x-5 xl:gap-x-6 font-semibold ">
          <Link to="/">
            <li
              className={`py-4 px-3 border-b ${
                location.pathname === "/"
                  ? "border-red-200 text-gray-700"
                  : "border-transparent text-gray-400 "
              }  transition-all hover:text-gray-700 cursor-pointer hover:border-red-200`}
            >
              HOME
            </li>
          </Link>
          <Link to="/shop">
            <li
              className={`py-4 px-3 border-b ${
                location.pathname === "/shop"
                  ? "border-red-200 text-gray-700"
                  : "border-transparent text-gray-400 "
              }  transition-all hover:text-gray-700 cursor-pointer hover:border-red-200`}
            >
              SHOP
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`py-4 px-3 border-b ${
                location.pathname === "/about"
                  ? "border-red-200 text-gray-700"
                  : "border-transparent text-gray-400 "
              }  transition-all hover:text-gray-700 cursor-pointer hover:border-red-200`}
            >
              ABOUT US
            </li>
          </Link>
          <Link to="/contact">
            <li
              className={`py-4 px-3 border-b ${
                location.pathname === "/contact"
                  ? "border-red-200 text-gray-700"
                  : "border-transparent text-gray-400 "
              }  transition-all hover:text-gray-700 cursor-pointer hover:border-red-200`}
            >
              CONTACT US
            </li>
          </Link>
        </ul>

        {authUser ? (
          <>
            <div className="flex item-center gap-x-4 relative">
              <p className="text-base font-semibold text-[#8bc34a] drop-shadow-sm">
                Rs. {subTotal || 0}
              </p>
              <Link to="/cart">
                <div className="relative">
                  <ShoppingCart
                    className="text-[#8bc34a] cursor-pointer"
                    size="20"
                  />
                  <span className="flex-center text-xs px-1 py-[2px] -right-2 -top-4 text-white absolute font-serif rounded-full bg-[#8bc34a]">
                    {cartItems?.items?.length || 0}
                  </span>
                </div>
              </Link>
              <Link to="/profile/wishlist">
                <div className="relative">
                  <Heart className="text-[#8bc34a] cursor-pointer" size="20" />
                  <span className="flex-center text-xs px-1 py-[2px] -right-2 -top-4 text-white absolute font-serif rounded-full bg-[#8bc34a]">
                    {favsCount || 0}
                  </span>
                </div>
              </Link>

              <Link to="/profile">
                {authUser?.imageUrl ? (
                  <img
                    src={authUser?.imageUrl}
                    alt="User"
                    className="size-9 rounded-full overflow-hidden border"
                  />
                ) : (
                  <User size="20" className="cursor-pointer text-[#8bc34a]" />
                )}
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-x-2">
              <Link to="/signup">
                <Button md={true} label="SIGNUP" className="hidden lg:block" />
              </Link>
              <Link to="/login">
                <Button md={true} label="LOGIN" />
              </Link>
            </div>
          </>
        )}
      </nav>

      <nav className="flex-between md:hidden relative">
        <div className="logo text-2xl font-bold text-slate-500">
          <Link to="/">
            <img src={Logo} className="h-12" alt="Logo" />
          </Link>
        </div>

        <div className="flex items-center relative">
          {authUser ? (
            <>
              <p className="text-base font-semibold text-[#8bc34a] drop-shadow-sm mr-1 sm:mr-3">
                Rs. {subTotal || 0}
              </p>
              <Link to="/cart">
                <ShoppingCart
                  className="text-[#8bc34a] cursor-pointer mr-4 sm:mr-6"
                  size="22"
                />
                <span className="px-1 py-[2px] flex-center text-xs right-12 -top-1 text-white absolute font-serif rounded-full bg-[#8bc34a]">
                  {cartItems?.items?.length}
                </span>
              </Link>
              <button
                className="w-10 flex-center h-10 bg-[#6a9739]"
                onClick={toggleMenu}
              >
                <Menu className="text-white" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-x-2">
              <Link to="/login">
                {" "}
                <Button sm={true} label="LOGIN" />
              </Link>
            </div>
          )}
        </div>
      </nav>
      <SideMenu toggleMenu={toggleMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;

const SideMenu = ({ isOpen, toggleMenu, setIsOpen }) => {
  const sideMenuRef = useRef();

  const menuVariants = {
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div
      className={`w-full md:hidden absolute h-[450px] pb-4 -top-1 left-0 ${
        toggleMenu ? "flex" : "hidden"
      } items-start justify-center bg-slate-50`}
      style={{ boxShadow: "0px 25px 50px silver" }}
      ref={sideMenuRef}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
    >
      <div className="w-11/12 h-full bg-white">
        <div className="flex-between py-4 px-5">
          <Link to="/profile">
            <div className="w-9 h-9 rounded-full border flex-center">
              <User className="size-5 text-[#8bc34a]" />
            </div>
          </Link>
          <div
            className="w-10 h-10 rounded-lg flex-center transition-all text-gray-800 opacity-50 hover:opacity-100 hover:shadow cursor-pointer hover:border "
            onClick={toggleMenu}
          >
            <X className="" />
          </div>
        </div>
        <ul className="text-left px-2">
          <Link to="/">
            <li
              className={`py-4 px-3 border-b ${
                location.pathname === "/"
                  ? "border-red-200 text-gray-700"
                  : "border-transparent text-gray-400 "
              }  transition-all hover:text-gray-700 cursor-pointer hover:border-red-200`}
            >
              HOME
            </li>
          </Link>
          <Link to="/shop">
            <li
              className={`py-4 px-3 border-b ${
                location.pathname === "/shop"
                  ? "border-red-200 text-gray-700"
                  : "border-transparent text-gray-400 "
              }  transition-all hover:text-gray-700 cursor-pointer hover:border-red-200`}
            >
              SHOP
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`py-4 px-3 border-b ${
                location.pathname === "/about"
                  ? "border-red-200 text-gray-700"
                  : "border-transparent text-gray-400 "
              }  transition-all hover:text-gray-700 cursor-pointer hover:border-red-200`}
            >
              ABOUT US
            </li>
          </Link>
          <Link to="/contact">
            <li
              className={`py-4 px-3 border-b ${
                location.pathname === "/contact"
                  ? "border-red-200 text-gray-700"
                  : "border-transparent text-gray-400 "
              }  transition-all hover:text-gray-700 cursor-pointer hover:border-red-200`}
            >
              CONTACT US
            </li>
          </Link>
        </ul>
      </div>
    </motion.div>
  );
};
