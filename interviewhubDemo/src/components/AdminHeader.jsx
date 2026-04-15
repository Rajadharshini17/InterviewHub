import { useNavigate, Link } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">

      {/* BRAND */}
      <span className="navbar-brand fw-bold">
        Interview Hub
      </span>

      {/* CENTER MENU */}
      <ul className="navbar-nav me-auto ms-4">
        <li className="nav-item">
          <Link className="nav-link fw-semibold" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-semibold" to="/admin/users">
            Users
          </Link>
        </li>
      </ul>

      {/* RIGHT SIDE */}
      <div className="d-flex align-items-center">
        <span className="me-3 fw-semibold">Welcome, Admin</span>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={logout}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}