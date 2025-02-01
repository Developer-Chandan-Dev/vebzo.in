import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import StatCard from "../../components/dashboard/common/StatCard";
import Header from "../../components/dashboard/Header";
import ProductsTable from "../../components/dashboard/products/ProductsTable";
import SalesTrendChart from "../../components/dashboard/products/SalesTrendChart";
import CategoryDistributionChart from "../../components/dashboard/overview/CategoryDistributionChart";
import AddUpdateProductsPopup from "../../components/dashboard/products/AddUpdateProductsPopup";
import CategoriesTable from "../../components/dashboard/products/CategoriesTable";
import { Link, Outlet, useLocation } from "react-router-dom";
import AddUpdateCategoriesPopup from "../../components/dashboard/products/AddUpdateCategoriesPopup";
import useFetchData from "../../hooks/useFetchData";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const ProductsPage = () => {
  document.title = "Admin Dashboard - Products";

  const [isPopupActive, setIsPopupActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isCategoryPopupActive, setIsCategoryPopupActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const location = useLocation();

  const { data, loading, error } = useFetchData(
    `${VITE_API_URL}/api/v1/analytics/product-cards`
  );
  console.log(data, loading, error);

  const handleEditClick = (product) => {
    setSelectedProduct(product); // Set the selected product details
    setIsPopupActive(true); // Activate the popup
  };

  const handlePopupModelClose = () => {
    setIsPopupActive(false);
  };

  const handleEditCategoryClick = (category) => {
    setSelectedCategory(category); // Set the selected category details
    setIsCategoryPopupActive(true); // Activate the category popup
  };

  const handleCategoryPopupModelClose = () => {
    setIsCategoryPopupActive(false);
  };

  return (
    <div className="flex-1 overflow-y-auto relative z-10 pb-6">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto pt-6 px-6 lg:px-8 xl:px-20">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Products"
            icon={Package}
            value={
              loading ? "Loaidng..." : parseInt(data?.data?.totalProducts) || 0
            }
            color="#6366F1"
          />
          <StatCard
            name="Featured Products"
            icon={TrendingUp}
            value={
              loading
                ? "Loaidng..."
                : parseInt(data?.data?.featuredProducts) || 0
            }
            color="#108981"
          />
          <StatCard
            name="Low Stock"
            icon={AlertTriangle}
            value={
              loading
                ? "Loaidng..."
                : parseInt(data?.data?.outOfStockProducts) || 0
            }
            color="#F59E08"
          />
          <StatCard
            name="Most Viwed Product"
            icon={DollarSign}
            value={loading ? "Loaidng..." : data?.data?.mostViewedProduct?.name}
            color="#EF4444"
          />
        </motion.div>

        <div className="full border-t mb-10 gap-3 text-base border-slate-600 shadow-lg">
          <Link to="/dashboard/products">
            <button
              className={`px-6 py-3 hover:bg-slate-800 border-r ${
                location.pathname.endsWith("products") ||
                location.pathname.endsWith("products/")
                  ? "bg-slate-800"
                  : ""
              }  border-slate-600`}
            >
              Products
            </button>
          </Link>
          <Link to="/dashboard/products/categories">
            <button
              className={`px-6 py-3 transition-all hover:bg-slate-800  ${
                location.pathname.includes("categories") ? "bg-slate-800" : ""
              }`}
            >
              Categories
            </button>
          </Link>
        </div>
        {/* <Outlet> */}
        <ProductsTable onEditClick={handleEditClick} />
        <CategoriesTable onEditClick={handleEditCategoryClick} />
        {/* </Outlet> */}

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>

        {isPopupActive && (
          <AddUpdateProductsPopup
            product={selectedProduct}
            onClose={handlePopupModelClose}
          />
        )}

        {isCategoryPopupActive && (
          <AddUpdateCategoriesPopup
            category={selectedCategory}
            onClose={handleCategoryPopupModelClose}
          />
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
