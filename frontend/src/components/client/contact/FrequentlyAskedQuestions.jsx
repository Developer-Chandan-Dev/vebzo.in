import './style.css';
import { ArrowRight } from "lucide-react";

const FrequentlyAskedQuestions = () => {
  return (
    <div className="w-full sm:w-11/12 h-auto px-3 md:px-8 py-10 lg:p-10 mx-auto">
      <h1 className="text-4xl font-semibold amiri-quarn py-1">
        Frequently Asked Question
      </h1>
      <img
        src="/public/images/logo-leaf-new.png"
        alt="Leaf"
        className="mx-auto py-7"
      />

      <div className="w-full h-auto py-5 px-3 sm:px-5 flex items-center justify-between flex-wrap gap-5 text-left text-base">
        <div className="w-full sm:w-[80%] lg:w-[47%] mx-auto h-auto py-4 px-4 border-b">
          <div className="flex items-center justify-between cursor-pointer">
            <h1>Pulvinar nostrud class cum facilis?</h1>
            <ArrowRight className="size-5 text-gray-800" />
          </div>
          <p className="text-gray-700 py-4 text-[15px]">
            I am item content. Click edit button to change this text. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
            luctus nec ullamcorper mattis, pulvinar leo.
          </p>
        </div>
        <div className="w-full sm:w-[80%] lg:w-[47%] mx-auto h-auto py-4 px-4 border-b">
          <div className="flex items-center justify-between cursor-pointer">
            <h1>Pulvinar nostrud class cum facilis?</h1>
            <ArrowRight className="size-5 text-gray-800" />
          </div>
          <p className="text-gray-700 py-4 text-[15px]">
            I am item content. Click edit button to change this text. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
            luctus nec ullamcorper mattis, pulvinar leo.
          </p>
        </div>
        <div className="w-full sm:w-[80%] lg:w-[47%] mx-auto h-auto py-4 px-4 border-b">
          <div className="flex items-center justify-between cursor-pointer">
            <h1>Pulvinar nostrud class cum facilis?</h1>
            <ArrowRight className="size-5 text-gray-800" />
          </div>
          <p className="text-gray-700 py-4 text-[15px]">
            I am item content. Click edit button to change this text. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
            luctus nec ullamcorper mattis, pulvinar leo.
          </p>
        </div>
        <div className="w-full sm:w-[80%] lg:w-[47%] mx-auto h-auto py-4 px-4 border-b">
          <div className="flex items-center justify-between cursor-pointer">
            <h1>Pulvinar nostrud class cum facilis?</h1>
            <ArrowRight className="size-5 text-gray-800" />
          </div>
          <p className="text-gray-700 py-4 text-[15px]">
            I am item content. Click edit button to change this text. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
            luctus nec ullamcorper mattis, pulvinar leo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
