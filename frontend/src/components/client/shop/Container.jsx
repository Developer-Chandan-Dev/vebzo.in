/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Filter, MoveRight, Search, Star } from "lucide-react";
import { useState } from "react";
import ItemBox from "./ItemBox";

const Container = ({ toggleSidebar, setToggleSidebar }) => {
  const [active, setActive] = useState(1);

  const products = [
    {
      _id: 1,
      name: "Potato",
      category: "Vegitables",
      price: 20,
      imageUrl: "/public/images/potato-1.webp",
      rating: 4,
    },
    {
      _id: 2,
      name: "Cauliflower",
      category: "Vegitables",
      price: 35,
      imageUrl: "/public/images/cauliflower-1.webp",
      rating: 4,
    },
    {
      _id: 3,
      name: "Green capsicum",
      category: "Vegitables",
      price: 40,
      imageUrl: "/public/images/green-capsicum-1.webp",
      rating: 4,
    },
    {
      _id: 4,
      name: "Coriander bunch",
      category: "Vegitables",
      price: 50,
      imageUrl: "/public/images/coriander-bunch-1.webp",
      rating: 4,
    },
    {
      _id: 5,
      name: "Sweet potato",
      category: "Vegitables",
      price: 25,
      imageUrl: "/public/images/sweet-potato-1.webp",
      rating: 4,
    },
    {
      _id: 6,
      name: "Onion",
      category: "Vegitables",
      price: 25,
      imageUrl: "/public/images/onion-1.webp",
      rating: 4,
    },
    {
      _id: 7,
      name: "Brinjial",
      category: "Vegitables",
      price: 25,
      imageUrl: "/public/images/brinjal-black-1.webp",
      rating: 4,
    },
    {
      _id: 8,
      name: "Tomato",
      category: "Vegitables",
      price: 25,
      imageUrl: "/public/images/tomato-country-1.webp",
      rating: 4,
    },
  ];



  return (
    <div className="w-full md:w-[800px] h-auto text-left">
      <div className="flex-between">
        <h1 className="text-4xl font-semibold py-3 text-[#8bc34a]">Shop</h1>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md border flex-center cursor-pointer text-gray-500 opacity-50 hover:opacity-100" onClick={()=> setToggleSidebar(!toggleSidebar)}>
            <Search size={20} />
          </div>
          <div className="w-9 h-9 rounded-md border flex-center cursor-pointer text-gray-500  opacity-50 hover:opacity-100" onClick={()=> setToggleSidebar(!toggleSidebar)}>
            <Filter size={20} />
          </div>
        </div>
      </div>
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
        {/* <div className="w-60 h-auto">
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
        </div> */}

        {products.length > 0 && products !== null
          ? products.map((item, index) => (
              <ItemBox
                key={index}
                _id={item._id}
                name={item.name}
                category={item.category}
                price={item.price}
                imageUrl={item.imageUrl}
                rating={item.rating}
              />
            ))
          : ""}
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
