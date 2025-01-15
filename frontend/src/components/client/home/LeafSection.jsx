import React from "react";
import Button from "../../utility/Button";
import { MoveRight } from "lucide-react";

const LeafSection = () => {
  return (
    <div className="w-full py-10 bg-[#f8f6f3] relative">
      <div className="absolute w-full h-auto -top-[2rem] ">
        <img
          src="/public/images/basil-leaf.png"
          className="mx-auto h-16"
          alt="Leaf"
        />
      </div>

      <div className="flex items-center flex-wrap gap-8 py-10 px-10 justify-center">
        <div className="w-96 h-96 rounded-lg bg-white shadow-lg shadow-gray-200 relative">
          <img
            src="/public/images/product11-free-img.jpg"
            className="h-full absolute bottom-0 right-0 -z-0"
            alt="product Image"
          />
          <div className="!z-10 px-8 text-left py-10  relative">
            <h2 className="text-left text-lg font-semibold py-1">
              Farm Fresh Fruits
            </h2>
            <p className="py-1 text-base">
              Ut sollicitudin quam vel purus tempus, vel eleifend felis varius.
            </p>
            <Button label="SHOP NOW" RightIcon={MoveRight} className="mt-4" />
          </div>
        </div>
        <div className="w-96 h-96 rounded-lg bg-white shadow-lg shadow-gray-200 relative">
          <img
            src="/public/images/product17-free-img.jpg"
            className="h-full absolute bottom-0 right-0"
            alt="product Image"
          />
          <div className="!z-10 px-8 text-left py-10  relative">
            <h2 className="text-left text-lg font-semibold py-1">
              Farm Fresh Fruits
            </h2>
            <p className="py-1 text-base">
              Ut sollicitudin quam vel purus tempus, vel eleifend felis varius.
            </p>
            <Button label="SHOP NOW" RightIcon={MoveRight} className="mt-4" />
          </div>
        </div>
        <div className="w-96 h-96 rounded-lg bg-white shadow-lg shadow-gray-200 relative">
          <img
            src="/public/images/product13-free-img.jpg"
            className="h-full absolute bottom-0 right-0"
            alt="product Image"
          />
          <div className="!z-10 px-8 text-left py-10  relative">
            <h2 className="text-left text-lg font-semibold py-1">
              Farm Fresh Fruits
            </h2>
            <p className="py-1 text-base">
              Ut sollicitudin quam vel purus tempus, vel eleifend felis varius.
            </p>
            <Button label="SHOP NOW" RightIcon={MoveRight} className="mt-4" />
          </div>
        </div>
        {/* <div className="w-72 h-80 rounded bg-white"></div> */}
      </div>
    </div>
  );
};

export default LeafSection;
