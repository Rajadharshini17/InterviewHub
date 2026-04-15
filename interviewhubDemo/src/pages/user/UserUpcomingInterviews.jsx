import { useEffect, useState } from "react";
import api from "../../api/axios";
 
export default function UserUpcomingInterviews() {
 
  const [interviews, setInterviews] = useState([]);
 
  useEffect(() => {
    api.get("/interviews")
      .then(res => setInterviews(res.data))
      .catch(err => console.error(err));
  }, []);
 
  return (
    <div className="container mt-4">
 
      <h4 className="fw-bold mb-4 text-primary">
        📅 Upcoming Interviews
      </h4>
 
      {interviews.length === 0 && (
        <p className="text-muted">No upcoming interviews</p>
      )}
 
      <div className="row">
 
        {interviews.map(i => (
          <div key={i.id} className="col-md-4 mb-4">
 
            <div
              className="card border-0 shadow-sm p-3 h-100"
              style={{
                borderRadius: "15px",
                transition: "0.3s",
                cursor: "pointer"
              }}
            >
 
              {/* 🔹 COMPANY */}
              <h5 className="fw-bold mb-2">{i.company}</h5>
 
              {/* 🔹 ROLE */}
              <span className="badge bg-primary mb-2 w-fit">
                {i.role}
              </span>
 
              {/* 🔹 DETAILS */}
              <p className="mb-1">📅 {i.date}</p>
              <p className="mb-1">📍 {i.location || "N/A"}</p>
              <p className="mb-1">💻 {i.mode || "N/A"}</p>
              <p className="mb-2">💰 {i.packageOffer || "N/A"}</p>
 
              {/* 🔹 FOOTER */}
              <div className="mt-auto text-end">
                <small className="text-muted">
                  Apply soon 🚀
                </small>
              </div>
 
            </div>
 
          </div>
        ))}
 
      </div>
    </div>
  );
}
 