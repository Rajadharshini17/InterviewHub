import { useState } from "react";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function Register() {
 
 const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",
  qualification: "",
  experienceLevel: "",
  username: "",
  password: "",
  hobby: ""
 });
 
 const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };
 
 const handleRegister = async () => {
 
  if (
   !form.fullName ||
   !form.email ||
   !form.phone ||
   !form.qualification ||
   !form.experienceLevel ||
   !form.username ||
   !form.password ||
   !form.hobby
  ) {
   alert("⚠️ All fields are required");
   return;
  }
 
  try {
   await api.post("/auth/register", form);
 
   alert("✅ Registration successful");
   window.location.href = "/";
  } catch (err) {
   console.error(err);
   alert("Registration failed ❌");
  }
 };
 
 return (
  <div
   className="d-flex justify-content-center align-items-center min-vh-100"
   style={{
    background: "linear-gradient(135deg,#27235c,#97247e,#e01950)",
    padding: "20px"
   }}
  >
 
   {/* CARD */}
   <div
    className="shadow-lg w-100"
    style={{
     maxWidth: "780px",
     borderRadius: "20px",
     background: "rgba(255,255,255,0.95)",
     backdropFilter: "blur(10px)",
     padding: "25px"
    }}
   >
 
    {/* TITLE */}
    <h3 className="text-center fw-bold mb-4"
     style={{ color: "#27235c" }}
    >
     ✨ Create Your Account
    </h3>
 
    {/* FORM */}
    <div className="row g-3">
 
     <div className="col-md-6">
      <input
       name="fullName"
       className="form-control"
       placeholder="👤 Full Name"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="email"
       className="form-control"
       placeholder="📧 Email"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="phone"
       className="form-control"
       placeholder="📱 Phone"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="qualification"
       className="form-control"
       placeholder="🎓 Qualification"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="experienceLevel"
       className="form-control"
       placeholder="💼 Experience Level"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="hobby"
       className="form-control"
       placeholder="🎯 Hobby"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="username"
       className="form-control"
       placeholder="👤 Username"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="password"
       type="password"
       className="form-control"
       placeholder="🔒 Password"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
    </div>
 
    {/* BUTTON */}
    <button
     className="btn w-100 mt-4 fw-bold text-white"
     style={{
      background: "linear-gradient(135deg,#27235c,#e01950)",
      borderRadius: "12px",
      padding: "10px"
     }}
     onClick={handleRegister}
    >
     Register Now
    </button>
 
   </div>
  </div>
 );
}
 