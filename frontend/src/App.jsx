import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Route Imports
import ClientRoutes from "./routes/ClientRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/*" element={<ClientRoutes />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        
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