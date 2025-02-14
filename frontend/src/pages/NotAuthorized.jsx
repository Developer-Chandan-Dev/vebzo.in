import { Link } from "react-router-dom";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";

const NotAuthorized = () => {
  return (
    <div>
      <Header />

      <div className="w-full h-96 flex-center flex-col">
        <h1 className="text-2xl font-semibold">Not Authorized</h1>
        <Link to="/">
          <p className="mt-4 text-blue-500 underline">Go To Home</p>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default NotAuthorized;
