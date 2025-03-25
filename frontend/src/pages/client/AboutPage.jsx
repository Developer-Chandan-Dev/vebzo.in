import AboutTeam from "../../components/client/about/AboutTeam";
import AboutUs from "../../components/client/about/AboutUs";
import Insights from "../../components/client/about/Insights";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";

const AboutPage = () => {
  return (
    <div className="w-full h-auto">
      <Header bg="bg-[#f8f6f3]" />
      <div className="py-14 px-5 sm:px-10 bg-[#f8f6f3] flex-center gap-4 h-auto  flex-col ">
        <div className="w-11/12 sm:w-[80%] md:w-[65%] flex-center flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold amiri-quarn">
            About Us
          </h1>
          <p className="mt-5 text-[15px] text-gray-700 px-2">
            Welcome to <b>ApnaMarket</b> - Your trusted local organic store. We
            are dedicated to providing high-quality, fresh, and organic products
            sourced directly from local farmers. Our mission is to promote
            healthy living by making natural and organic products accessible to
            everyone in the community.
          </p>
        </div>
      </div>
      <AboutUs />
      <div className="w-full mx-auto py-5 text-gray-600 px-5 md:w-11/12 text-left flex-center gap-5 flex-wrap ">
        <div className="w-96 p-5 border rounded-md bg-[#f8f6f3] transition-all hover:shadow-xl hover:-translate-y-3">
          <h2 className="pb-4 text-2xl font-semibold  text-gray-700 amiri-quarn">
            Our Vision
          </h2>
          <p>
            We envision a world where everyone has access to fresh, organic, and
            natural products. We aim to become the most trusted name for organic
            shopping in your local area.
          </p>
        </div>
        <div className="w-96 p-5 border rounded-md bg-[#f8f6f3] transition-all hover:shadow-xl hover:-translate-y-3">
          <h2 className="pb-4 text-2xl font-semibold  text-gray-700 amiri-quarn">
            What We Offer
          </h2>
          <li className="ml-1">Fresh Organic Vegetables & Fruits</li>
          <li className="ml-1">Pure Grains & Pulses</li>
          <li className="ml-1">Dairy & Herbal Products</li>
          <li className="ml-1">Natural Beauty & Health Products</li>
        </div>
        <div className="w-96 p-5 border rounded-md bg-[#f8f6f3] transition-all hover:shadow-xl hover:-translate-y-3">
          <h2 className="pb-4 text-2xl font-semibold  text-gray-700 amiri-quarn">
            What Choose Us?
          </h2>
          <li className="ml-1">Directly sourced from local farmers.</li>
          <li className="ml-1">100% pure and organic products.</li>
          <li className="ml-1">Affordable prices with quality assurance.</li>
          <li className="ml-1">Supporting the local community.</li>
        </div>
      </div>
      <div className="w-full mx-auto py-5 text-gray-600 px-10 md:w-11/12 lg:px-14 text-left">
        <h2 className="text-xl font-semibold py-5">Why Choose ApnaMarket?</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" checked className="mr-2 size-[14px]" />
                <b>Freshness Guaranteed </b>
              </td>
              <td className="ml-3"> Only the best reaches you.</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" checked className="mr-2 size-[14px]" />
                <b>Local & Organic </b>
              </td>
              <td> Supporting farmers and promoting natural farming.</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" checked className="mr-2 size-[14px]" />
                <b>Affordable Prices </b>
              </td>
              <td>High-quality products at reasonable rates.</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" checked className="mr-2 size-[14px]" />
                <b>Community Focused </b>
              </td>
              <td>Serving our local areas with dedication and care.</td>
            </tr>
          </tbody>
        </table>

        <br />
        <p>
          Apna Market is more than just a store - it&apos;s a commitment to
          healthier, happier living. Your trust is our pride, and your
          satisfaction is our success. <br />
          Join us on our journey to promote local products and bring natural
          goodness to every hoursehold!
        </p>
      </div>

      <Insights />
      <AboutTeam />

      <Footer />
    </div>
  );
};

export default AboutPage;
