import { Routes, Route } from "react-router-dom";

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

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product-page" element={<ProductPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
  );
};

export default ClientRoutes;
