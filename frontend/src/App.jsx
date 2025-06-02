import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Route Imports
import ClientRoutes from "./routes/ClientRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import NotFound from "./pages/NotFound";
import RoleProtectedRoute from "./components/utility/RoleProtectedRoute";
import { fetchCartItems } from "./store/features/cartSlice";
import NotAuthorized from "./pages/NotAuthorized";


import { SocketProvider } from "./context/SocketContext";
import { fetchBSOrders } from "./store/features/products/bestSellingProductsSlice";
import { fetchTrendingProducts } from "./store/features/products/trendingProductsSlice";

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchCartItems(authUser?._id));
  }, [authUser?._id, dispatch]);

  useEffect(() => {
    dispatch(fetchBSOrders());
    dispatch(fetchTrendingProducts());
  }, [dispatch]);


  return (
    <>
      <SocketProvider userId={authUser?._id}>
        <Router>
          <Routes>
            {/* Client Routes */}
            <Route path="/*" element={<ClientRoutes />} />

            {/* Dashboard Routes */}
            <Route
              path="/dashboard/*"
              element={
                <RoleProtectedRoute allowedRoles={["admin", "manager"]}>
                  {" "}
                  <DashboardRoutes />
                </RoleProtectedRoute>
              }
            />

            {/* Fallback for Undefined Routes */}
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<NotAuthorized />} />
          </Routes>
        </Router>
        <ToastContainer />
      </SocketProvider>
    </>
  );
}

export default App;

// Tum Aa Gaye Ho Noor Aa Gaya
// Aanewal Pal Janewal Hai
// Yara Seeli Seeli
// Dil Dhundta Hai
// Thoda thoda pyaar yahi asma se isase hai teri yaar aayi
// Do Deewane Shaher Mein
// Woh Sham Kuchh Ajeeb Thi
// Aaj kal tere mere pyar ke charche har juban par
