import "./admin.css";
import interviewicon from "../../assets/interviewicon.jpg";

export default function AdminNavbar({ setView }) {
  return (
    <div className="admin-navbar d-flex flex-wrap justify-content-between align-items-center px-4 py-3">

      {/* 🔵 LOGO + TITLE */}
      <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
        <img
          src={interviewicon}
          alt="Interview Icon"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "contain",
          }}
        />
        <h4 className="fw-bold m-0">InterviewHub</h4>
      </div>

      {/* 🔵 MENU */}
      <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-end">
        <button className="nav-btn" onClick={() => setView("dashboard")}>
          🏠 Dashboard
        </button>

        <button className="nav-btn" onClick={() => setView("interviews")}>
          📅 Interviews
        </button>

        <button className="nav-btn" onClick={() => setView("users")}>
          👥 Users
        </button>

        <button
          className="nav-btn logout-btn"
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/admin";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
``