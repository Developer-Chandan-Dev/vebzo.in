import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

// Route Imports
import ClientRoutes from "./routes/ClientRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
  return (
    <>
      <Router>
        <ClientRoutes />
        <DashboardRoutes />
      </Router>
    </>
  );
}

export default App;
