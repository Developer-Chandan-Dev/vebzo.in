import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar.jsx";

import OverviewPage from "../pages/dashboard/OverviewPage.jsx";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage.jsx";
import OrdersPage from "../pages/dashboard/OrdersPage.jsx";
import ProductsPage from "../pages/dashboard/ProductsPage.jsx";
import SalesPage from "../pages/dashboard/SalesPage.jsx";
import UsersPage from "../pages/dashboard/UsersPage.jsx";
import SettingPage from "../pages/dashboard/SettingPage.jsx";

// Product routes
import ProductsTable from "../components/dashboard/products/ProductsTable.jsx";
import CategoriesTable from "../components/dashboard/products/CategoriesTable.jsx";

const DashboardRoutes = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden text-left">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm " />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <Routes>
        <Route path="" element={<OverviewPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="products" element={<ProductsPage />}>
          <Route path="" element={<ProductsTable />} />
          <Route path="categories" element={<CategoriesTable />} />
        </Route>
        <Route path="sales" element={<SalesPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingPage />} />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
