import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Route Imports
import ClientRoutes from "./routes/ClientRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import NotFound from "./pages/NotFound";
import RoleProtectedRoute from "./components/utility/RoleProtectedRoute";
import { fetchCartItems } from "./store/features/cartSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
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
      </Routes>
    </Router>
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
