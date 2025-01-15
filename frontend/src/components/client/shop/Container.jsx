import { MoveLeft, MoveRight, Star } from "lucide-react";
import { useState } from "react";

const Container = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="w-[800px] h-auto text-left">
      <h1 className="text-4xl font-semibold py-3 text-[#8bc34a]">Shop</h1>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p>Showing 1 - 9 of 14 results</p>
        <select
          name="filter"
          id=""
          className="px-2 py-1 outline-gray-300 rounded border border-gray-300"
        >
          <option value="">Default Sorting</option>
          <option value="">Sort by populatiry</option>
          <option value="">Sort by average rating</option>
          <option value="">Sort by latest</option>
          <option value="">Sort by Price : low to high</option>
          <option value="">Sort by Price : high to low</option>
        </select>
      </div>

      <div className="flex items-center flex-wrap gap-5 my-14 ">
        <div className="w-60 h-auto">
          <div className=" w-60 h-60 border mx-auto overflow-hidden">
            <img
              src="/public/images/cauliflower-1.webp"
              className="w-full h-full object-fit cursor-pointer"
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
        <div className="w-60 h-auto ">
          <div className=" w-60 h-60 border mx-auto overflow-hidden">
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
        <div className="w-60 h-auto ">
          <div className=" w-60 h-60 border mx-auto overflow-hidden">
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
        <div className="w-60 h-auto ">
          <div className=" w-60 h-60 border mx-auto overflow-hidden">
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
        <div className="w-60 h-auto ">
          <div className=" w-60 h-60 border mx-auto overflow-hidden">
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
        <div className="w-60 h-auto ">
          <div className=" w-60 h-60 border mx-auto overflow-hidden">
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
        <div className="w-60 h-auto ">
          <div className=" w-60 h-60 border mx-auto overflow-hidden">
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
        <div className="w-60 h-auto ">
          <div className=" w-60 h-60 border mx-auto overflow-hidden">
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
      <div className="flex items-center gap-3">
        <button
          className={`w-10 h-10 border border-[#8bc34a]  font-semibold text-base transition-all hover:bg-[#8bc34a] hover:text-white ${
            active === 1 ? "bg-[#8bc34a] text-white" : "text-[#8bc34a]"
          }`}
        >
          1
        </button>
        <button
          className={`w-10 h-10 border border-[#8bc34a]  font-semibold text-base transition-all hover:bg-[#8bc34a] hover:text-white ${
            active === 2 ? "bg-[#8bc34a] text-white" : "text-[#8bc34a]"
          }`}
        >
          2
        </button>

        <button className="w-10 h-10 border border-[#8bc34a] text-[#8bc34a] font-semibold text-base flex-center transition-all hover:bg-[#8bc34a] hover:text-white ">
          <MoveRight size="16" />
        </button>
      </div>
    </div>
  );
};

export default Container;
