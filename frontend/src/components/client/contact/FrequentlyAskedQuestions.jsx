import "./style.css";
import { ArrowRight } from "lucide-react";
import LogoLeaf from "../../../assets/images/logo-leaf-new.png"

const FrequentlyAskedQuestions = () => {
  return (
    <div className="w-full sm:w-11/12 h-auto px-3 md:px-8 py-10 lg:p-10 mx-auto">
      <h1 className="text-4xl font-semibold amiri-quarn py-1">
        Frequently Asked Question
      </h1>
      <img
        src={LogoLeaf}
        alt="Leaf"
        className="mx-auto py-7"
      />

      <div className="w-full h-auto py-5 px-3 sm:px-5 flex items-center justify-between flex-wrap gap-5 text-left text-base">
        <div className="w-full sm:w-[80%] lg:w-[47%] mx-auto h-auto py-4 px-4 border-b">
          <div className="flex items-center justify-between cursor-pointer">
            <h1>What types of products do you offer?</h1>
            <ArrowRight className="size-5 text-gray-800" />
          </div>
          <p className="text-gray-700 py-4 text-[15px]">
            We offer a wide range of products, including fresh fruits,
            vegetables, grains, spices, skincare products, and more.All our
            products are 100% natural, chemical free, and sourced from trusted
            organic farms.
          </p>
        </div>
        <div className="w-full sm:w-[80%] lg:w-[47%] mx-auto h-auto py-4 px-4 border-b">
          <div className="flex items-center justify-between cursor-pointer">
            <h1>How can I place an order?</h1>
            <ArrowRight className="size-5 text-gray-800" />
          </div>
          <p className="text-gray-700 py-4 text-[15px]">
            Simply browse our products, add your desired items to the cart, and
            proceed to checkout. We are offer Cash on Delivery (COD) for easy
            payment, you can pay using google pay, phone pay also.{" "}
          </p>
        </div>
        <div className="w-full sm:w-[80%] lg:w-[47%] mx-auto h-auto py-4 px-4 border-b">
          <div className="flex items-center justify-between cursor-pointer">
            <h1>What is your return and refund policy?</h1>
            <ArrowRight className="size-5 text-gray-800" />
          </div>
          <p className="text-gray-700 py-4 text-[15px]">
            If you are not satisfied with your purchase, you can return the
            product within 1 day of delivery. Please ensure the product is
            unused and in its original packaging. Once approaved, a refund will
            be processed within 10-12 business hours.
          </p>
        </div>
        <div className="w-full sm:w-[80%] lg:w-[47%] mx-auto h-auto py-4 px-4 border-b">
          <div className="flex items-center justify-between cursor-pointer">
            <h1>Do you offer home delivery?</h1>
            <ArrowRight className="size-5 text-gray-800" />
          </div>
          <p className="text-gray-700 py-4 text-[15px]">
            Yes, we provide fast and reliable home delivery services. Delivery
            times may vary depending on your location, but we strive to ensure
            you receive your order as quickly as possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
