// import { Link } from "react-router-dom";

import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full py-10 bg-black text-white">
      <div className="flex items-start justify-between flex-wrap gap-4 px-10 py-5">
        <div className="w-96">
          <img
            src="/public/images/organic-store-white-logo.png"
            className="h-20 mb-7"
            alt="Logo"
          />
          <p className="text-left text-gray-300">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda
            possimus unde aut numquam cum, non neque qui praesentium modi
            delectus sapiente magni molestiae, reprehenderit fuga, quo
            temporibus perferendis nulla dignissimos.
          </p>
        </div>
        <div className="text-left">
          <h3 className=" mb-7 text-lg font-semibold">Quick Links</h3>
          <ul>
            {/* <Link to="/"> */}
            <li className="my-2 text-gray-300 transition hover:text-white">
              Home
            </li>
            {/* </Link> */}
            {/* <Link to="/products"> */}
            <li className="my-2 text-gray-300 transition hover:text-white">
              Products
            </li>
            {/* </Link> */}
            {/* <Link to="/about"> */}
            <li className="my-2 text-gray-300 transition hover:text-white">
              About
            </li>
            {/* </Link> */}
            {/* <Link  to="/contact"> */}{" "}
            <li className="my-2 text-gray-300 transition hover:text-white">
              Contact
            </li>
            {/* </Link> */}
            {/* <Link  to="/contact"> */}{" "}
            <li className="my-2 text-gray-300 transition hover:text-white">
              Cart
            </li>
            {/* </Link> */}
            {/* <Link  to="/contact"> */}{" "}
            <li className="my-2 text-gray-300 transition hover:text-white">
              CheckOut
            </li>
            {/* </Link> */}
            {/* <Link  to="/contact"> */}{" "}
            <li className="my-2 text-gray-300 transition hover:text-white">
              My Account
            </li>
            {/* </Link> */}
          </ul>
        </div>
        <div className="text-left">
          <h3 className=" mb-7 text-lg font-semibold">Site Links</h3>
          <ul>
            <li className="my-2 text-gray-300 transition hover:text-white">
              Privacy Policy
            </li>
            <li className="my-2 text-gray-300 transition hover:text-white">
              Shopping Details
            </li>
            <li className="my-2 text-gray-300 transition hover:text-white">
              Term & Conditions
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between px-10 border-t pt-10 border-gray-700">
        <p className="text-gray-300">Copyright &#169; | Apna Grocery Store </p>
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
