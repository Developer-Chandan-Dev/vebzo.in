import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import MyProfile from "../../components/client/profile/MyProfile";
import WishList from "../../components/client/profile/WishList";
import MyOrders from "../../components/client/profile/MyOrders";

const UserProfilePage = () => {
  const location = useLocation();

  return (
    <div className="w-full h-auto">
      <Header />
      <div className="h-auto md:py-10 sm:px-5 md:px-10 md:flex justify-center text-left text-gray-700 gap-10 relative">
        <div className="w-full md:w-56 z-10 h-auto md:h-44 sticky top-[72px] md:top-32 p-2 bg-slate-50 ">
          <ul className="px-3 md:py-3 flex-center gap-2 md:block">
            <Link to="/profile">
              <li
                className={`cursor-pointer px-3 transition-all rounded-md text-gray-600 font-semibold ${
                  location.pathname.endsWith("/profile")
                    ? "bg-white drop-shadow  text-gray-700"
                    : ""
                } hover:bg-slate-100 hover:text-gray-500 py-[10px] mb-2`}
              >
                My Profile
              </li>
            </Link>
            <Link to="/profile/my-orders">
              <li
                className={`cursor-pointer px-3 transition-all rounded-md text-gray-600 font-semibold ${
                  location.pathname.endsWith("/my-orders")
                    ? "bg-white drop-shadow  text-gray-700"
                    : ""
                } hover:bg-slate-100 hover:text-gray-500 py-[10px] mb-2`}
              >
                My Orders
              </li>
            </Link>
            {/* <Link to="/profile/wishlist">
              <li
                className={`cursor-pointer px-3 transition-all rounded-md text-gray-600 font-semibold ${
                  location.pathname.includes("/wishlist")
                    ? "bg-white drop-shadow  text-gray-700"
                    : ""
                } hover:bg-slate-100 hover:text-gray-500 py-[10px] mb-2`}
              >
                Wishlist
              </li>
            </Link> */}
          </ul>
        </div>
        <div className="w-full md:w-[850px] h-auto pb-10 border md:rounded-3xl overflow-hidden">
          <Outlet>
            <MyProfile />
            <MyOrders />
            <WishList />
          </Outlet>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
