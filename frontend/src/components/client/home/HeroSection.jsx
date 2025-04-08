import "./style.css";
import { ShoppingCart } from "lucide-react";
import Button from "../../utility/Button";
import { Link } from "react-router-dom";
import heroSectionImage from '../../../assets/images/organic-products-hero.png'
import logoLeaf from '../../../assets/images/logo-leaf-new.png'

const HeroSection = () => {
  return (
    <div className="w-full h-auto hero-section bg-[#f8f6f3]">
      <div className="mx-auto w-full lg:w-11/12 max-w-7xl flex-center px-4 mainBox py-14 sm:py-20 lg:gap-x-14 xl:gap-x-20 ">
        <div className="imageBox w-[60%] lg:w-1/2 ">
          <img
            src={heroSectionImage}
            className="w-11/12 xl:w-full"
            alt="hero section image"
          />
        </div>
        <div className="w-full sm:w-[500px] hero-section-leftBox md:text-left">
          <img
            src={logoLeaf}
            alt="Leaf"
            className="pb-5 leaf"
          />
          <h5 className="text-base lg:text-md xl:text-lg font-semibold text-gray-700">
            Welcome to Vebzo
          </h5>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl head-line-1 leading-[50px] lg:leading-[60px] xl:leading-[70px] text-gray-700">
            Your Own, The Home of Freshness
          </h1>
          <p className="mt-7 text-gray-600 text-base">
            Discover the purest, freshest, and most authentic products from your
            own local community. At Vebzo we bring nature&apos;s goodness
            straight to your doorstep.
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
