import { Routes, Route } from "react-router-dom";

import OverviewPage from "../pages/dashboard/OverviewPage.jsx";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage.jsx";
import OrdersPage from "../pages/dashboard/OrdersPage.jsx";
import ProductsPage from "../pages/dashboard/ProductsPage.jsx";
import SalesPage from "../pages/dashboard/SalesPage.jsx";
import UsersPage from "../pages/dashboard/UsersPage.jsx";
import SettingPage from "../pages/dashboard/SettingPage.jsx";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<OverviewPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/settings" element={<SettingPage />} />
    </Routes>
  );
};

export default DashboardRoutes;
