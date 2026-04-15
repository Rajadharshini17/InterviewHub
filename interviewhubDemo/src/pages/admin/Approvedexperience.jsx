import { useState } from "react";
import ExperienceModal from "./ExperienceModal";
import "./admin.css";
 
export default function Approvedexperience({ experiences }) {
 
  const [selected, setSelected] = useState(null);
 
  // FILTER APPROVED
  const approved = experiences.filter(
    e => e.status?.toLowerCase() === "approved"
  );
 
  return (
    <div className="section">
 
      <h3>Approved Experiences</h3>
 
      {approved.length === 0 && <p>No approved experiences</p>}
 
      {approved.map(e => (
        <div key={e.id} className="card">
 
          {/* VIEW ONLY */}
          <div onClick={() => setSelected(e)}>
            <h4>{e.company} – {e.role}</h4>
            <p className="muted">Click to read full experience</p>
          </div>
 
        </div>
      ))}
 
      {/* VIEW MODAL */}
      <ExperienceModal
        experience={selected}
        onClose={() => setSelected(null)}
        isAdmin={true}
      />
 
    </div>
  );
}
 