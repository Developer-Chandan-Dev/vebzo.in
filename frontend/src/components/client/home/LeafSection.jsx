import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import Button from "../../utility/Button";
import BasilLeaf from "../../../assets/images/basil-leaf.png";
import FarmFreshVegitables from "../../../assets/images/product11-free-img.jpg";
import Vegitables from "../../../assets/images/product17-free-img.jpg";
import FarmFreshFruit from "../../../assets/images/product13-free-img.jpg";

const LeafSection = () => {
  return (
    <div className="w-full py-10 bg-[#f8f6f3] relative">
      <div className="absolute w-full h-auto -top-[2rem] ">
        <img src={BasilLeaf} className="mx-auto h-16" alt="Leaf" />
      </div>

      <div className="flex items-center flex-wrap gap-8 py-10 px-5 sm:px-10 justify-center">
        <div className="w-96 h-96 rounded-lg bg-white shadow-lg shadow-gray-200 relative">
          <img
            src={FarmFreshVegitables}
            className="h-full absolute bottom-0 right-0 -z-0"
            alt="product Image"
          />
          <div className="!z-10 px-8 text-left py-10  relative">
            <h2 className="text-left text-lg font-semibold py-1">
              Farm Fresh Vegitables
            </h2>
            <p className="py-1  text-[14px]">
              Experience the difference of truly fresh produce. Our Farm-Fresh
              vegetables bring the garden&apos;s bounty straight to your side.
            </p>
            <Link to="/shop/category/67e280932e8d16d6040f2756">
              <Button label="SHOP NOW" RightIcon={MoveRight} className="mt-4" />
            </Link>
          </div>
        </div>
        <div className="w-96 h-96 rounded-lg bg-white shadow-lg shadow-gray-200 relative">
          <img
            src={Vegitables}
            className="h-full absolute bottom-0 right-0"
            alt="product Image"
          />
          <div className="!z-10 px-8 text-left py-10  relative">
            <h2 className="text-left text-lg font-semibold py-1">Vegitables</h2>
            <p className="py-1 text-[14px]">
              Explore our wide variety of quality vegetables, perfect the adding
              healthy and delicious ingredients to your meals.
            </p>
            <Link to="/shop/category/67e4fc6819fea4b1e3749c93">
              <Button label="SHOP NOW" RightIcon={MoveRight} className="mt-4" />
            </Link>
          </div>
        </div>
        <div className="w-96 h-96 rounded-lg bg-white shadow-lg shadow-gray-200 relative">
          <img
            src={FarmFreshFruit}
            className="h-full absolute bottom-0 right-0"
            alt="product Image"
          />
          <div className="!z-10 px-8 text-left py-10  relative">
            <h2 className="text-left text-lg font-semibold py-1">
              Farm Fresh Fruits
            </h2>
            <p className="py-1 text-[14px]">
              Taste the sunshine in every bite! Our farm-fresh fruits offer a
              delightful and nutritious treat straight from the farm.
            </p>
            <Link to="/shop">
              <Button label="SHOP NOW" RightIcon={MoveRight} className="mt-4" />
            </Link>
          </div>
        </div>
        {/* <div className="w-72 h-80 rounded bg-white"></div> */}
      </div>
    </div>
  );
};

export default LeafSection;
