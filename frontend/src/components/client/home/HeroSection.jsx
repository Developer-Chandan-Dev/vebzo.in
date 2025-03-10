import "./style.css";
import { ShoppingCart } from "lucide-react";
import Button from "../../utility/Button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="w-full h-auto hero-section bg-[#f8f6f3]">
      <div className="mx-auto w-full lg:w-11/12 max-w-7xl flex-center px-4 mainBox py-14 sm:py-20 lg:gap-x-14 xl:gap-x-20 ">
        <div className="imageBox w-[60%] lg:w-1/2 ">
          <img
            src="/public/images/organic-products-hero.png"
            className="w-11/12 xl:w-full"
            alt="hero section image"
          />
        </div>
        <div className="w-full sm:w-[500px] hero-section-leftBox md:text-left">
          <img
            src="/public/images/logo-leaf-new.png"
            alt="Leaf"
            className="pb-5 leaf"
          />
          <h5 className="text-base lg:text-md xl:text-lg font-semibold text-gray-700">
            Welcome to Apna Store
          </h5>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl head-line-1 leading-[50px] lg:leading-[60px] xl:leading-[70px] text-gray-700">
            Your Trusted Organic Marketplace
          </h1>
          <p className="mt-7 text-gray-600 text-base">
            Bringing nature&apos;s best to your doorstep! Shop fresh, healthy, and chemical-free organic products directly from farms.
          </p>
          <Link to="/shop">
            <Button label="SHOP NOW" LeftIcon={ShoppingCart} className="mt-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
