import "./admin.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminStats({ users = [], experiences = [] }) {

  const totalUsers = users.length;
  const totalExp = experiences.length;

  const pending = experiences.filter(
    e => e.status && e.status.toLowerCase() === "pending"
  ).length;

  const approved = experiences.filter(
    e => e.status && e.status.toLowerCase() === "approved"
  ).length;

  const rejected = experiences.filter(
    e => e.status && e.status.toLowerCase() === "rejected"
  ).length;

  return (
    <div className="row g-3 mb-4">

      <StatCard
        title="Total Users"
        value={totalUsers}
        icon="bi-people-fill"
        color="#4e54c8"
      />

      <StatCard
        title="Experiences"
        value={totalExp}
        icon="bi-journal-text"
        color="#20c997"
      />

      <StatCard
        title="Pending"
        value={pending}
        icon="bi-hourglass-split"
        color="#ffc107"
      />

      <StatCard
        title="Approved"
        value={approved}
        icon="bi-check-circle-fill"
        color="#198754"
      />

      <StatCard
        title="Rejected"
        value={rejected}
        icon="bi-x-circle-fill"
        color="#dc3545"
      />

    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="col-12 col-sm-6 col-lg-2">
      <div
        className="stat-card shadow-sm"
        style={{
          borderLeft: `5px solid ${color}`
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="stat-title">{title}</p>
            <h3 className="stat-value">{value}</h3>
          </div>

          <div
            className="stat-icon"
            style={{ color }}
          >
            <i className={`bi ${icon}`}></i>
          </div>







        </div>
      </div>
    </div>
  );
}
