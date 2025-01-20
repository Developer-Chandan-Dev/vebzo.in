import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Route Imports
import ClientRoutes from "./routes/ClientRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<ClientRoutes />} />
          <Route path="/*" element={<DashboardRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
