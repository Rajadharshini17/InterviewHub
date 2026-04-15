import { Routes, Route, Navigate } from "react-router-dom";

/* -------- USER -------- */
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExperience from "./pages/AddExperience";
import Profile from "./pages/Profile";

/* -------- ADMIN -------- */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  const user = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");

  return (
    <Routes>
      {/* USER */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/add-experience" element={user ? <AddExperience /> : <Navigate to="/" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />

      {/* ADMIN */}
      <Route path="/admin" element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
      <Route path="/admin/dashboard" element={admin ? <AdminDashboard /> : <Navigate to="/admin" />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;