import { Search } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-80 h-auto border-r sticky top-40">
      <div className="flex items-center  px-3 gap-2">
        <input
          type="text"
          className="py-2 px-3 w-60 outline-gray-300 border rounded"
          placeholder="Search Products"
        />
        <div className="w-8 flex-center h-9 py-1 border-2 cursor-pointer border-[#8bc34a] hover:border-[#6a9739] bg-[#8bc34a] hover:bg-[#6a9739] rounded text-white">
          <Search size="18" />
        </div>
      </div>

      <div className="py-7 px-3">
        <h3 className="text-left text-xl text-[#111111] font-semibold">
          Filter by price
        </h3>
        <div className="flex items-center gap-x-2 justify-end pr-7 py-5">
          <input
            type="number"
            className="border rounded text-base py-3 outline-gray-200 w-20 px-2"
          />
          <input
            type="number"
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
