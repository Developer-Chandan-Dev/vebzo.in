import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Route Imports
import HomePage from "../pages/client/HomePage";
import ShopPage from "../pages/client/ShopPage";
import AboutPage from "../pages/client/AboutPage";
import CartPage from "../pages/client/CartPage";
import ContactPage from "../pages/client/ContactPage";
import CheckoutPage from "../pages/client/CheckoutPage";
import ProductPage from "../pages/client/ProductPage";
import SignupPage from "../pages/client/SignupPage";
import LoginPage from "../pages/client/LoginPage";
import UserProfilePage from "../pages/client/UserProfilePage";
import MyProfile from "../components/client/profile/MyProfile";
import WishList from "../components/client/profile/WishList";
import MyOrders from "../components/client/profile/MyOrders";
import ScrollToTop from "../components/utility/ScrollToTop";

const ClientRoutes = () => {
  // Retrive authenticated user information from Redux state
  const authUser = useSelector((state) => state.user.user);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/cart"
          element={authUser ? <CartPage /> : <Navigate to="/" />}
        />
        <Route
          path="/checkout"
          element={authUser ? <CheckoutPage /> : <Navigate to="/" />}
        />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/category/:id" element={<ShopPage />} />
        <Route path="/shop/:id" element={<ProductPage />} />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/profile"
          element={authUser ? <UserProfilePage /> : <Navigate to="/" />}
        >
          <Route path="" element={<MyProfile />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="wishlist" element={<WishList />} />
        </Route>
      </Routes>
    </>
  );
};

export default ClientRoutes;
