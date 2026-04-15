import { useState } from "react";
import { resetPassword } from "../api/authApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [data, setData] = useState({
    email: "",
    hobby: "",
    newPassword: "",
  });

  const handleReset = async () => {
    try {
      const res = await resetPassword(
        data.email,
        data.hobby,
        data.newPassword
      );
      toast.success(res.data);
    } catch {
      toast.error("Invalid Email or Hobby ❌");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 col-md-4 shadow">
        <h3 className="text-center mb-3">Forgot Password</h3>

        <input className="form-control mb-2" placeholder="Email"
          onChange={e=>setData({...data,email:e.target.value})} />

        <input className="form-control mb-2" placeholder="Hobby"
          onChange={e=>setData({...data,hobby:e.target.value})} />

        <input type="password" className="form-control mb-3" placeholder="New Password"
          onChange={e=>setData({...data,newPassword:e.target.value})} />

        <button className="btn btn-warning w-100" onClick={handleReset}>
          Reset Password
        </button>

        <div className="text-center mt-3">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}