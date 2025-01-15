import './style.css'
import { ShoppingCart } from "lucide-react";
import Button from "../../utility/Button";

const HeroSection = () => {
  return (
    <div className="w-full h-auto hero-section bg-[#f8f6f3]">
      <div className="mx-auto max-w-7xl flex-center py-20 gap-x-20 ">
        <div className="">
          <img
            src="/public/images/organic-products-hero.png"
            className="w-auto"
            alt="hero section image"
          />
        </div>
        <div className="w-[500px] hero-section-leftBox text-left">
          <img src="/public/images/logo-leaf-new.png" alt="Leaf" className="pb-5" />
          <h5 className=" text-lg font-semibold text-gray-700">
            Best Quality Products
          </h5>
          <h1 className="text-6xl head-line-1 leading-[70px] text-gray-700">
            Join The Organic Movement!
          </h1>
          <p className="mt-7 text-gray-600 text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore,
            maxime blanditiis veritatis repudiandae veniam rem aliquam
            voluptatem laboriosam suscipit ullam velit quod minima nam,
            laudantium placeat excepturi numquam autem debitis?
          </p>
          <Button label="SHOP NOW" LeftIcon={ShoppingCart} className="mt-5" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
