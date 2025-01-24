/* eslint-disable react/prop-types */
import { useState } from "react";
import "./style.css";
import { Search, X } from "lucide-react";
import ToggleSwitch from "../utility/ToggleSwitch";

const Sidebar = ({
  toggleSidebar,
  setToggleSidebar,
  searchText = "",
  setSearchText,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  toggleFilter,
  setToggleFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSetSearchText = () => {
    setSearchText(searchTerm.trim());
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSetSearchText(); // Trigger the search function when Eter is pressed
    }
  };
  return (
    <div
      className={`${
        toggleSidebar ? "block" : "hidden"
      } md:block  w-72 lg:w-80 h-auto border-r searchFilterMainBox absolute md:sticky top-40 bg-white z-10`}
    >
      <div
        className="absolute block md:hidden w-8 h-8 bg-white flex-center right-0 -top-9 sm:-right-8 sm:-top-7 rounded-full cursor-pointer border"
        style={{ boxShadow: "0 25px 50px silver" }}
        onClick={() => setToggleSidebar(false)}
      >
        <X className="text-gray-700 size-5 opacity-50 hover:opacity-100 " />
      </div>
      <div className="flex items-center  px-3 gap-2">
        <input
          type="text"
          className="py-2 px-3 w-full sm:w-60 outline-gray-300 border rounded"
          placeholder="Search Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="w-8 flex-center h-9 py-1 border-2 cursor-pointer border-[#8bc34a] hover:border-[#6a9739] bg-[#8bc34a] hover:bg-[#6a9739] rounded text-white">
          <Search size="18" onClick={handleSetSearchText} />
        </div>
      </div>

      <div className="py-7 px-3">
        <div className="flex-between gap-2">
          <h3 className="text-left text-xl text-[#111111] font-semibold">
            Filter by price
          </h3>
          <ToggleSwitch
            isOn={toggleFilter}
            onToggle={() => setToggleFilter(!toggleFilter)}
          />
        </div>
        <div className="flex items-center gap-x-2 justify-end pr-7 py-5">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(toggleFilter && e.target.value)}
            className="border rounded text-base py-3 outline-gray-200 w-20 px-2"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(toggleFilter && e.target.value)}
            className="border rounded text-base py-3 outline-gray-200 w-20 px-2"
          />
        </div>
      </div>
      <div className="px-3 py-4 text-left text-base">
        <ul>
          <li className="py-2 text-[#8bc34a]">
            Uncategories <span className="text-gray-700">(1)</span>
          </li>
          <li className="py-2 text-[#8bc34a]">
            Groceries <span className="text-gray-700">(10)</span>
          </li>
          <li className="py-2 text-[#8bc34a]">
            Juice <span className="text-gray-700">(9)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
