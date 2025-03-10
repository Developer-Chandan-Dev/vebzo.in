const AboutUs = () => {
  return (
    <div className="w-full px-5 sm:px-8 lg:px-10 py-20 bg-white flex-center relative">
      <div className="absolute w-full h-auto -top-[2rem] ">
        <img
          src="/public/images/basil-leaf.png"
          className="mx-auto h-16"
          alt="Leaf"
        />
      </div>
      <div className="flex gap-20 flex-wrap justify-between">
        <div className="text-left w-full sm:w-[500px] mx-auto">
          <h2 className="py-6 text-3xl font-semibold  text-gray-700 amiri-quarn">
            Our Mission
          </h2>
          <p className="text-[15px] text-gray-700">
            At <b>Organic Store</b>, we are dedicated to bringing you the
            freshest, healthiest and 100% organic products. Our goal is to
            promote a healthier lifestyle by providing natural, chemical-free,
            and sustainably sourced food straight from trusted farms.
          </p>
          <br />
          <p className="text-[15px] text-gray-700">
            We are a passionate team of nature lovers, farmers, and
            health-conscious individuals who believe in the power of organic
            living. Our journey started with a simple version:{" "}
            <b>to make organic food accessible and affordable for everyone.</b>
          </p>
        </div>
        <div className="w-full sm:w-[550px] mx-auto">
          <img src="/public/images/banner-01.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
