import { Star } from "lucide-react";

const BestSellingProducts = () => {
  return (
    <div className="w-full px-5 sm:px-10 py-20 ">
      <h2 className="text-4xl font-semibold text-gray-700 head-line-1">
        Best Selling Products
      </h2>
      <img
        src="/public/images/logo-leaf-new.png"
        alt="Leaf"
        className="pt-7 pb-4 mx-auto"
      />

      <div className="flex items-center justify-center flex-wrap gap-5 my-14">
        <div className="w-72 h-auto productBox">
          <div className=" w-72 h-72 border mx-auto overflow-hidden">
            <img
              src="/public/images/potato-1.webp"
              className="w-full h-full object-fit"
              alt="Product Image"
            />
          </div>
          <div className="flex-center flex-col py-5">
            <p>Vagitables</p>
            <h4 className="text-lg font-semibold py-1">Potato</h4>
            <div className="flex-center">
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
            </div>
            <p className="mt-1">Rs. 35.00</p>
          </div>
        </div>
        <div className="w-72 h-auto productBox">
          <div className=" w-72 h-72 border mx-auto overflow-hidden">
            <img
              src="/public/images/sweet-potato-1.webp"
              className="w-full h-full object-fit"
              alt="Product Image"
            />
          </div>
          <div className="flex-center flex-col py-5">
            <p>Vagitables</p>
            <h4 className="text-lg font-semibold py-1">Sweet Potato</h4>
            <div className="flex-center">
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 " size="18" />
            </div>
            <p className="mt-1">Rs. 35.00</p>
          </div>
        </div>
        <div className="w-72 h-auto productBox">
          <div className=" w-72 h-72 border mx-auto overflow-hidden">
            <img
              src="/public/images/onion-1.webp"
              className="w-full h-full object-fit"
              alt="Product Image"
            />
          </div>
          <div className="flex-center flex-col py-5">
            <p>Vagitables</p>
            <h4 className="text-lg font-semibold py-1">Onion</h4>
            <div className="flex-center">
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 " size="18" />
              <Star className="text-yellow-500 " size="18" />
            </div>
            <p className="mt-1">Rs. 35.00</p>
          </div>
        </div>
        <div className="w-72 h-auto productBox">
          <div className=" w-72 h-72 border mx-auto overflow-hidden">
            <img
              src="/public/images/brinjal-black-1.webp"
              className="w-full h-full object-fit"
              alt="Product Image"
            />
          </div>
          <div className="flex-center flex-col py-5">
            <p>Vagitables</p>
            <h4 className="text-lg font-semibold py-1">Brinjal</h4>
            <div className="flex-center">
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
              <Star className="text-yellow-500 fill-yellow-300" size="18" />
            </div>
            <p className="mt-1">Rs. 35.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
