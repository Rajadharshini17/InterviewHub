import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
 
export default function Login() {
 
 const [user, setUser] = useState({
  username: "",
  password: ""
 });
 
 const handleLogin = async (e) => {
  e.preventDefault();
 
  if (!user.username || !user.password) {
   toast.warning("Please enter username and password ⚠️");
   return;
  }
 
  try {
   const res = await api.post("/auth/login", user);
   localStorage.setItem("user", JSON.stringify(res.data));
   toast.success("Login Successful ✅");
   window.location.href = "/dashboard";
  } catch {

    // alert("Invalid Login");
   toast.error("Invalid Username or Password ❌");
  }
 };
 
 return (
  <div
   className="d-flex align-items-center justify-content-center vh-100"
   style={{
    background: "linear-gradient(135deg,#27235c,#97247e,#e01950)"
   }}
  >
 
   {/* LOGIN CARD */}
   <div
    className="shadow-lg p-4 w-100"
    style={{
     maxWidth: "430px",
     borderRadius: "20px",
     background: "rgba(255,255,255,0.95)",
     backdropFilter: "blur(10px)"
    }}
   >
 
    {/* ICON */}
    <div className="text-center mb-3">
     <div
      style={{
       width: "70px",
       height: "70px",
       borderRadius: "50%",
       background: "linear-gradient(135deg,#27235c,#e01950)",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       margin: "0 auto",
       color: "white",
       fontSize: "30px"
      }}
     >
      <i className="bi bi-person-circle"></i>
     </div>
    </div>
 
    {/* TITLE */}
    <h3 className="text-center fw-bold mb-1" style={{ color: "#27235c" }}>
     InterviewHub
    </h3>
 
    <p className="text-center text-muted mb-4" style={{ fontSize: "14px" }}>
     Welcome back! Please login to continue
    </p>
 
    {/* FORM */}
    <form onSubmit={handleLogin}>
 
     <div className="mb-3">
      <input
       type="text"
       className="form-control"
       placeholder="👤 Username"
       value={user.username}
       onChange={(e) =>
        setUser({ ...user, username: e.target.value })
       }
       style={{
        borderRadius: "12px",
        padding: "10px"
       }}
      />
     </div>
 
     <div className="mb-3">
      <input
       type="password"
       className="form-control"
       placeholder="🔑 Password"
       value={user.password}
       onChange={(e) =>
        setUser({ ...user, password: e.target.value })
       }
       style={{
        borderRadius: "12px",
        padding: "10px"
       }}
      />
     </div>
 
     {/* BUTTON */}
     <button
      className="btn w-100 fw-bold text-white"
      style={{
       background: "linear-gradient(135deg,#27235c,#e01950)",
       borderRadius: "12px",
       padding: "10px"
      }}
     >
      🔓 Sign In
     </button>
 
    </form>
 
    {/* LINKS */}
    <div className="text-center mt-4">
 
     <button
      className="btn btn-link p-0"
      style={{
       fontSize: "14px",
       color: "#97247e",
       textDecoration: "none"
      }}
      onClick={() => window.location.href = "/register"}
     >
      Create new account
     </button>
 
     <div className="mt-3">
      <button
       className="btn btn-sm text-white px-3"
       style={{
        background: "#27235c",
        borderRadius: "20px"
       }}
       onClick={() => window.open("/admin", "_blank")}
      >
       🔐 Admin Login
      </button>
     </div>
 
    </div>
 
   </div>
  </div>
 );
}

 