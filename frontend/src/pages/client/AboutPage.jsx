import AboutTeam from "../../components/client/about/AboutTeam";
import AboutUs from "../../components/client/about/AboutUs";
import Insights from "../../components/client/about/Insights";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";

const AboutPage = () => {
  return (
    <div className="w-full h-auto">
      <Header bg="bg-[#f8f6f3]" />
      <div className="py-10 px-10 bg-[#f8f6f3] flex-center h-72">
        <h1 className="text-5xl font-bold amiri-quarn">About Us</h1>
      </div>
      <AboutUs />
      <Insights />
      <AboutTeam />

      <Footer />
    </div>
  );
};

export default AboutPage;
