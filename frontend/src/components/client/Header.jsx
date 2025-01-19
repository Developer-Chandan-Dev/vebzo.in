/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../utility/Button";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ bg = "bg-white" }) => {
  const [authUser, setAuthUser] = useState(false);

  const location = useLocation();

  return (
    <header
      className={`py-5 px-4 sm:px-7 lg:px-10 w-full z-50 sticky top-0 ${bg}`}
    >
      <nav className="hidden md:flex-between gap-x-7 lg:gap-x-10 max-w-7xl mx-auto lg:px-5 xl:px-10">
        <div className="logo text-2xl font-bold text-slate-500">
          <Link to="/">
            <img
              src="/public/images/organic-store-logo5.svg"
              className="h-16"
              alt="Logo"
            />
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
                Rs. 100
              </p>
              <Link to="/cart">
                <ShoppingCart
                  className="text-[#8bc34a] cursor-pointer"
                  size="20"
                />
                <span className="w-5 h-5 flex-center text-xs right-5 -top-3 text-white absolute font-serif rounded-full bg-[#8bc34a]">
                  1
                </span>
              </Link>
              <User size="20" className="cursor-pointer" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-x-2">
              <Button md={true} label="SIGNUP" className="hidden lg:block" />
              <Button md={true} label="LOGIN" />
            </div>
          </>
        )}
      </nav>

      <nav className="flex-between md:hidden">
        <div className="logo text-2xl font-bold text-slate-500">
          <Link to="/">
            <img
              src="/public/images/organic-store-logo5.svg"
              className="h-12"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="flex items-center relative">
          {authUser ? (
            <>
              <p className="text-base font-semibold text-[#8bc34a] drop-shadow-sm mr-1 sm:mr-3">
                Rs. 100
              </p>
              <Link to="/cart">
                <ShoppingCart
                  className="text-[#8bc34a] cursor-pointer mr-4 sm:mr-6"
                  size="22"
                />
                <span className="w-5 h-5 flex-center text-xs right-12 -top-1 text-white absolute font-serif rounded-full bg-[#8bc34a]">
                  1
                </span>
              </Link>
              <button className="w-10 flex-center h-10 bg-[#6a9739]">
                <Menu className="text-white" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-x-2">
              <Button sm={true} label="LOGIN" />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
