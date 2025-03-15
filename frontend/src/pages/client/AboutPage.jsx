import AboutTeam from "../../components/client/about/AboutTeam";
import AboutUs from "../../components/client/about/AboutUs";
import Insights from "../../components/client/about/Insights";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";

const AboutPage = () => {
  return (
    <div className="w-full h-auto">
      <Header bg="bg-[#f8f6f3]" />
      <div className="py-10 px-10 bg-[#f8f6f3] flex items-start justify-center h-56 sm:h-64 mg:h-72">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold amiri-quarn">
          About Us
        </h1>
      </div>
      <AboutUs />
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
