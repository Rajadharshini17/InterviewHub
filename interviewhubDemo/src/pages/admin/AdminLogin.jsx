import { useState } from "react";
import { loginAdmin } from "../../api/adminApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminLogin() {

  const [admin, setAdmin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await loginAdmin(admin);
      localStorage.setItem("admin", JSON.stringify(res.data));
      window.location.href = "/admin/dashboard";
    } catch {
      // alert("Invalid Admin Credentials ❌");
      setError("Invalid Admin Credentials ❌");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg,#3b3fda,#7c83ff)"
      }}
    >
      <div
        className="bg-white p-4 shadow-lg w-100"
        style={{
          maxWidth: "420px",
          borderRadius: "20px"
        }}
      >
        {/* ICON */}
        <div className="text-center mb-3">
          <i
            className="bi bi-shield-lock-fill"
            style={{ fontSize: "46px", color: "#3b3fda" }}
          ></i>
        </div>

        {/* TITLE */}
        <h3 className="text-center fw-bold text-primary mb-4">
          Admin Login
        </h3>

        <form onSubmit={login}>

          {/* USERNAME */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="👤 Admin Username"
              value={admin.username}
              onChange={(e) =>
                setAdmin({ ...admin, username: e.target.value })
              }
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="🔑 Admin Password"
              value={admin.password}
              onChange={(e) =>
                setAdmin({ ...admin, password: e.target.value })
              }
              required
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-danger text-center py-1">
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            className="btn btn-primary w-100 fw-bold rounded-pill mt-3"
            style={{ padding: "10px" }}
          >
            🔐 Login as Admin
          </button>

        </form>

        {/* FOOTER */}
        <p
          className="text-center mt-3 text-muted"
          style={{ fontSize: "13px" }}
        >
          Secure Admin Access Only
        </p>
      </div>
    </div>
  );
}
