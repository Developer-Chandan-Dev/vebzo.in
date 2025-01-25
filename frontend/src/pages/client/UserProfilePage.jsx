import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import MyProfile from "../../components/client/profile/MyProfile";
import WishList from "../../components/client/profile/WishList";
import useFetchData from "../../hooks/useFetchData";

const UserProfilePage = () => {

  const location = useLocation();



  return (
    <div className="w-full h-auto">
      <Header />
      <div className="h-auto py-10 px-10 flex justify-center text-left text-gray-500 gap-10 relative">
        <div className="w-56 h-44 sticky top-32">
          <ul className="px-3 py-3">
            <Link to="/profile">
              <li
                className={`cursor-pointer px-3 transition-all rounded-md text-gray-400 font-semibold ${
                  location.pathname === "/profile"
                    ? "bg-slate-100  text-gray-500"
                    : ""
                } hover:bg-slate-100 hover:text-gray-500 py-[10px] mb-2`}
              >
                My Profile
              </li>
            </Link>
            {/* <li className="cursor-pointer my-2 transition-all rounded-md font-semibold text-gray-400 hover:bg-slate-100 hover:text-gray-500 px-3 py-[10px] ">
              Setting
            </li> */}
            <Link to="/profile/wishlist">
              <li
                className={`cursor-pointer px-3 transition-all rounded-md text-gray-400 font-semibold ${
                  location.pathname.includes("/wishlist")
                    ? "bg-slate-100  text-gray-500"
                    : ""
                } hover:bg-slate-100 hover:text-gray-500 py-[10px] mb-2`}
              >
                Wishlist
              </li>
            </Link>
          </ul>
        </div>
        <div className="w-[850px] h-auto pb-10 border rounded-3xl overflow-hidden">
          <Outlet>
            <MyProfile />
            <WishList />
          </Outlet>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
