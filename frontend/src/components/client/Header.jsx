/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../utility/Button";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
  const [authUser, setAuthUser] = useState(true);

  return (
    <header className="py-5 px-10 w-full sticky top-0 bg-white">
      <nav className="flex-between gap-x-10 max-w-7xl mx-auto lg:px-5 xl:px-10">
        <div className="logo text-2xl font-bold text-slate-500">
          <img src="/public/images/organic-store-logo5.svg" className="h-16" alt="Logo" />
        </div>
        <ul className="flex items-center md:gap-x-4 lg:gap-x-5 xl:gap-x-6 font-semibold ">
          <li className="py-4 px-3 border-b border-red-200 text-gray-700 transition-all hover:text-gray-700 cursor-pointer hover:border-red-200">
            HOME
          </li>
          <li className="py-4 px-3 border-b border-transparent text-gray-400 transition-all hover:text-gray-700 cursor-pointer hover:border-red-200">
            SHOP
          </li>
          <li className="py-4 px-3 border-b border-transparent text-gray-400 transition-all hover:text-gray-700 cursor-pointer hover:border-red-200">
            ABOUT US
          </li>
          <li className="py-4 px-3 border-b border-transparent text-gray-400 transition-all hover:text-gray-700 cursor-pointer hover:border-red-200">
            CONTACT US
          </li>
        </ul>

        {authUser ? (
          <>
            <div className="flex item-center gap-x-4 relative">
              <p className="text-base font-semibold text-[#8bc34a] drop-shadow-sm">
                Rs. 100
              </p>
              <ShoppingCart
                className="text-[#8bc34a] cursor-pointer"
                size="20"
              />
              <span className="w-5 h-5 flex-center text-xs right-5 -top-3 text-white absolute font-serif rounded-full bg-[#8bc34a]">
                1
              </span>
              <User size="20" className="cursor-pointer" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-x-2">
              <Button label="SIGNUP" />
              <Button label="LOGIN" />
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
