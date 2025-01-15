/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../../components/client/Header";
import HeroSection from "../../components/client/home/HeroSection";
import BestSellingProducts from "../../components/client/home/BestSellingProducts";
import TrendingProducts from "../../components/client/home/TrendingProducts";
import { Car, CarTaxiFront } from "lucide-react";
import LeafSection from "../../components/client/home/LeafSection";
import Footer from "../../components/client/Footer";

const HomePage = () => {
  return (
    <div className="w-full h-auto ">
      <Header />
      <HeroSection />
      <div className="w-full py-12 px-4 bg-black text-white flex-center">
        <div className="flex items-center flex-wrap gap-5">
          <div className="w-72 h-32 rounded bg-[#333333] flex items-center px-6">
            <div className="flex items-center gap-x-5">
              <svg
                aria-hidden="true"
                className="e-font-icon-svg e-fas-truck fill-[#8bc34a] size-8"
                viewBox="0 0 640 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path>
              </svg>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Free Shipping</h3>
                <h4 className="text-md">Above $5 Only</h4>
              </div>
            </div>
          </div>
          <div className="w-72 h-32 rounded bg-[#333333] flex items-center px-6">
            <div className="flex items-center gap-x-5">
              <svg
                aria-hidden="true"
                className="e-font-icon-svg e-far-address-book fill-[#8bc34a] size-8"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-68 304H48V48h320v416zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2z"></path>
              </svg>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Certified Organic</h3>
                <h4 className="text-md">100% Guarantee</h4>
              </div>
            </div>
          </div>
          <div className="w-72 h-32 rounded bg-[#333333] flex items-center px-6">
            <div className="flex items-center gap-x-5">
              <svg
                aria-hidden="true"
                className="e-font-icon-svg e-far-money-bill-alt fill-[#8bc34a] size-8"
                viewBox="0 0 640 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M320 144c-53.02 0-96 50.14-96 112 0 61.85 42.98 112 96 112 53 0 96-50.13 96-112 0-61.86-42.98-112-96-112zm40 168c0 4.42-3.58 8-8 8h-64c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h16v-55.44l-.47.31a7.992 7.992 0 0 1-11.09-2.22l-8.88-13.31a7.992 7.992 0 0 1 2.22-11.09l15.33-10.22a23.99 23.99 0 0 1 13.31-4.03H328c4.42 0 8 3.58 8 8v88h16c4.42 0 8 3.58 8 8v16zM608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zm-16 272c-35.35 0-64 28.65-64 64H112c0-35.35-28.65-64-64-64V176c35.35 0 64-28.65 64-64h416c0 35.35 28.65 64 64 64v160z"></path>
              </svg>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Huge Saving</h3>
                <h4 className="text-md">At Lowest Price</h4>
              </div>
            </div>
          </div>
          <div className="w-72 h-32 rounded bg-[#333333] flex items-center px-6">
            <div className="flex items-center gap-x-5">
              <svg
                aria-hidden="true"
                className="e-font-icon-svg e-fas-recycle fill-[#8bc34a] size-8"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M184.561 261.903c3.232 13.997-12.123 24.635-24.068 17.168l-40.736-25.455-50.867 81.402C55.606 356.273 70.96 384 96.012 384H148c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12H96.115c-75.334 0-121.302-83.048-81.408-146.88l50.822-81.388-40.725-25.448c-12.081-7.547-8.966-25.961 4.879-29.158l110.237-25.45c8.611-1.988 17.201 3.381 19.189 11.99l25.452 110.237zm98.561-182.915l41.289 66.076-40.74 25.457c-12.051 7.528-9 25.953 4.879 29.158l110.237 25.45c8.672 1.999 17.215-3.438 19.189-11.99l25.45-110.237c3.197-13.844-11.99-24.719-24.068-17.168l-40.687 25.424-41.263-66.082c-37.521-60.033-125.209-60.171-162.816 0l-17.963 28.766c-3.51 5.62-1.8 13.021 3.82 16.533l33.919 21.195c5.62 3.512 13.024 1.803 16.536-3.817l17.961-28.743c12.712-20.341 41.973-19.676 54.257-.022zM497.288 301.12l-27.515-44.065c-3.511-5.623-10.916-7.334-16.538-3.821l-33.861 21.159c-5.62 3.512-7.33 10.915-3.818 16.536l27.564 44.112c13.257 21.211-2.057 48.96-27.136 48.96H320V336.02c0-14.213-17.242-21.383-27.313-11.313l-80 79.981c-6.249 6.248-6.249 16.379 0 22.627l80 79.989C302.689 517.308 320 510.3 320 495.989V448h95.88c75.274 0 121.335-82.997 81.408-146.88z"></path>
              </svg>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Easy Returns</h3>
                <h4 className="text-md">No Questions Asked</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BestSellingProducts />
      <LeafSection />
      <TrendingProducts />
      <Footer />
    </div>
  );
};

export default HomePage;
