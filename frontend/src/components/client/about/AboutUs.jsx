import BasilLeaf from "../../../assets/images/basil-leaf.png";
import AboutBanner from "../../../assets/images/banner-01.jpg";

const AboutUs = () => {
  return (
    <div className="w-full px-5 sm:px-8 lg:px-10 py-20 bg-white flex-center relative">
      <div className="absolute w-full h-auto -top-[2rem] ">
        <img src={BasilLeaf} className="mx-auto h-16" alt="Leaf" />
      </div>
      <div className="flex gap-20 flex-wrap justify-between">
        <div className="text-left w-full sm:w-[500px] mx-auto">
          <h2 className="py-6 text-3xl font-semibold  text-gray-700 amiri-quarn">
            Our Mission
          </h2>
          <p className="text-[15px] text-gray-700">
            At <b>ApnaMarket</b>, we bring you to purest and freshest products
            directly from our local farms and trusted suppliers. Our mission is
            to provide high-quality, organic, and natural products to our
            beloved community, ensuring you receive only the best and healthiest
            options.
          </p>
          <br />
          <p className="text-[15px] text-gray-700">
            We understand the importance of freshness and quality, which is why
            every product at ApnaMarket is carefully selected and delivered with
            love. From farm-fresh vegetables and fruits to authentic
            village-made products, we strive to bring the goodness of nature
            right to your doorstep.
          </p>
        </div>
        <div className="w-full sm:w-[550px] mx-auto">
          <img src={AboutBanner} alt="Image" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
