import { useState } from "react";
import api from "../../api/axios";
import ExperienceModal from "./ExperienceModal";
import "./admin.css";
 
export default function PendingExperience({ experiences, refresh }) {
 
  const [selected, setSelected] = useState(null);
 
  // ✅ FIXED FILTER
  const pending = experiences.filter(
    e => e.status?.trim().toLowerCase() === "pending"
  );
 
  const approve = async () => {
    if (!selected?.id) return;
 
    await api.put(`/admin/approve/${selected.id}`);
    setSelected(null);
    await refresh();
  };
 
  const reject = async () => {
    if (!selected?.id) return;
 
    await api.put(`/admin/reject/${selected.id}`);
    setSelected(null);
    await refresh();
  };
 
  return (
    <div className="section">
 
      {/* ✅ COUNT ADDED */}
      <h3>Pending Approvals ({pending.length})</h3>
 
      {pending.length === 0 && <p>No pending requests</p>}
 
      {pending.map(e => (
        <div
          key={e.id}
          className="card"
          onClick={() => setSelected(e)}
        >
          <h4>{e.company} – {e.role}</h4>
          <p className="muted">Click to view full details</p>
        </div>
      ))}
 
      <ExperienceModal
        experience={selected}
        onClose={() => setSelected(null)}
        onApprove={approve}
        onReject={reject}
      />
 
    </div>
  );
}

 