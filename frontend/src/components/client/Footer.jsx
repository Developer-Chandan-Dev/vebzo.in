// import { Link } from "react-router-dom";

import { Facebook, Instagram, Twitter } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/images/organic-store-white-logo.png";

const Footer = () => {
  const authUser = useSelector((state) => state.user.user);

  return (
    <div className="w-full py-10 bg-black text-white">
      <div className="flex items-start justify-between flex-wrap gap-4 px-10 py-5">
        <div className="w-96">
          <img
            src={footerLogo}
            className="h-20 mb-7"
            alt="Logo"
          />
          <p className="text-left text-gray-300">
            Bringing fresh, natural, and organic products straight from local
            farmers to your doorstep. Quality you can trust, right from the
            heart of your village.
          </p>
        </div>
        <div className="text-left">
          <h3 className=" mb-7 text-lg font-semibold">Quick Links</h3>
          <ul>
            <Link to="/">
              <li className="my-2 text-gray-300 transition hover:text-white">
                Home
              </li>
            </Link>
            <Link to="/shop">
              <li className="my-2 text-gray-300 transition hover:text-white">
                Shop
              </li>
            </Link>
            <Link to="/about">
              <li className="my-2 text-gray-300 transition hover:text-white">
                About
              </li>
            </Link>
            <Link to="/contact">
              {" "}
              <li className="my-2 text-gray-300 transition hover:text-white">
                Contact
              </li>
            </Link>
            {authUser && (
              <>
                <Link to="/cart">
                  {" "}
                  <li className="my-2 text-gray-300 transition hover:text-white">
                    Cart
                  </li>
                </Link>
                <Link to="/checkout">
                  {" "}
                  <li className="my-2 text-gray-300 transition hover:text-white">
                    CheckOut
                  </li>
                </Link>
                <Link to="/profile">
                  {" "}
                  <li className="my-2 text-gray-300 transition hover:text-white">
                    My Account
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
        <div className="text-left">
          <h3 className=" mb-7 text-lg font-semibold">Site Links</h3>
          <ul>
            <Link to="/privacy-policy">
              <li className="my-2 text-gray-300 transition hover:text-white">
                Privacy Policy
              </li>
            </Link>
            {/* <li className="my-2 text-gray-300 transition hover:text-white">
              Shopping Details
            </li> */}
            <Link to="/terms-conditions">
              <li className="my-2 text-gray-300 transition hover:text-white">
                Term & Conditions
              </li>
            </Link>
            <li
              className={`${
                authUser?.role === "admin" || authUser?.role === "manager"
                  ? ""
                  : "hidden"
              } my-2 text-gray-300 transition hover:text-white`}
            >
              <Link to="/dashboard">Admin Panel</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between px-10 border-t pt-10 border-gray-700">
        <p className="text-gray-300">&#169; 2025 Apna Market | All right reserved </p>
        <div className="flex items-center gap-5">
          <Facebook size="19" />
          <Instagram size="19" />
          <Twitter size="19" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
