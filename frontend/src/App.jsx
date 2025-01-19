import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Route Imports
import ClientRoutes from "./routes/ClientRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<ClientRoutes />}  />
          <Route path="/*" element={<DashboardRoutes />}  />
          <Route path="*" element="" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
