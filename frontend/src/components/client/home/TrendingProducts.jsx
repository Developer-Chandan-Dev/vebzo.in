import { Star } from "lucide-react";

const TrendingProducts = () => {
  return (
    <div className="w-full px-5 sm:px-10 py-20 ">
      <h2 className="text-4xl font-semibold text-gray-700 head-line-1">
        Trending Products
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
              src="/public/images/cauliflower-1.webp"
              className="w-full h-full object-fit"
              alt="Product Image"
            />
          </div>
          <div className="flex-center flex-col py-5">
            <p>Vagitables</p>
            <h4 className="text-lg font-semibold py-1">Cauliflower</h4>
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
              src="/public/images/tomato-country-1.webp"
              className="w-full h-full object-fit"
              alt="Product Image"
            />
          </div>
          <div className="flex-center flex-col py-5">
            <p>Vagitables</p>
            <h4 className="text-lg font-semibold py-1">Tomato</h4>
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
              src="/public/images/green-capsicum-1.webp"
              className="w-full h-full object-fit"
              alt="Product Image"
            />
          </div>
          <div className="flex-center flex-col py-5">
            <p>Vagitables</p>
            <h4 className="text-lg font-semibold py-1">Green Capsicum</h4>
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
        <div className="w-72 h-auto  productBox">
          <div className=" w-72 h-72 border mx-auto overflow-hidden">
            <img
              src="/public/images/coriander-bunch-1.webp"
              className="w-full h-full object-fit"
              alt="Product Image"
            />
          </div>
          <div className="flex-center flex-col py-5">
            <p>Vagitables</p>
            <h4 className="text-lg font-semibold py-1">Coriander Bunch</h4>
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

export default TrendingProducts;
