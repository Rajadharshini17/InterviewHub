import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">InterviewHub</span>

      <div className="text-light">
        Welcome, {user?.username}
        <button className="btn btn-danger ms-3" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}