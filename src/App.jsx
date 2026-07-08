import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import HealthWorker from "./pages/HealthWorker";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/worker" element={<HealthWorker />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;