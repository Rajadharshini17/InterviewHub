import { useEffect, useState } from "react";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
 
  .profile-root * {
    font-family: 'DM Sans', sans-serif;
    box-sizing: border-box;
  }
 
  .profile-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #27235c, #97247e, #e01950);
    padding: 40px 0 60px;
  }
 
  /* ── PAGE HEADER ── */
  .page-header {
    text-align: center;
    margin-bottom: 36px;
  }
  .page-header h2 {
    color: #fff;
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: -0.4px;
    margin: 0;
  }
  .page-header p {
    color: rgba(255,255,255,0.65);
    font-size: 0.9rem;
    margin: 6px 0 0;
  }
 
  /* ── CARDS ── */
  .card-panel {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 8px 40px rgba(39,35,92,0.18);
    padding: 32px 36px;
    margin-bottom: 28px;
  }
 
  .card-panel-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #27235c;
    margin: 0 0 22px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .card-panel-title::after {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, #97247e22, transparent);
    border-radius: 2px;
    margin-left: 8px;
  }
 
  /* ── FORM FIELDS ── */
  .field-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #97247e;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 6px;
  }
 
  .field-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #e2e0f0;
    border-radius: 10px;
    font-size: 0.9rem;
    color: #27235c;
    background: #faf9fd;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field-input:focus {
    border-color: #97247e;
    box-shadow: 0 0 0 3px rgba(151,36,126,0.1);
    background: #fff;
  }
  .field-input::placeholder {
    color: #b0aac8;
  }
 
  /* ── SAVE BUTTON ── */
  .btn-save {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #27235c, #e01950);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.3px;
    margin-top: 24px;
    transition: opacity 0.2s, transform 0.15s;
  }
  .btn-save:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  .btn-save:active {
    transform: translateY(0);
  }
 
  /* ── SECTION HEADING ── */
  .section-heading {
    color: #fff;
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
 
  /* ── EXPERIENCE CARDS ── */
  .exp-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 6px 28px rgba(39,35,92,0.14);
    padding: 22px 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: transform 0.2s;
  }
  .exp-card:hover {
    transform: translateY(-3px);
  }
 
  .exp-company {
    font-size: 1rem;
    font-weight: 700;
    color: #27235c;
    margin: 0;
  }
  .exp-role {
    font-size: 0.85rem;
    color: #888;
    margin: 2px 0 10px;
  }
 
  .badge-status {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.4px;
    margin-bottom: 14px;
  }
  .badge-approved { background: #d4f3e5; color: #1a7a4a; }
  .badge-rejected { background: #fde0e6; color: #c0163b; }
  .badge-pending  { background: #fff3cd; color: #856404; }
 
  .exp-actions {
    display: flex;
    gap: 10px;
    margin-top: auto;
  }
 
  .btn-edit {
    flex: 1;
    padding: 8px 0;
    border: none;
    border-radius: 10px;
    background: #97247e;
    color: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .btn-delete {
    flex: 1;
    padding: 8px 0;
    border: none;
    border-radius: 10px;
    background: #e01950;
    color: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .btn-edit:hover, .btn-delete:hover { opacity: 0.85; }
 
  .cannot-edit-note {
    font-size: 0.78rem;
    color: #aaa;
    margin: auto 0 0;
    font-style: italic;
  }
 
  /* ── MODAL OVERLAY ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(20, 10, 40, 0.65);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
  }
 
  .modal-box {
    background: #fff;
    border-radius: 20px;
    padding: 32px 36px;
    width: 100%;
    max-width: 560px;
    box-shadow: 0 20px 60px rgba(39,35,92,0.3);
  }
 
  .modal-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #27235c;
    margin: 0 0 22px;
  }
 
  .modal-textarea {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #e2e0f0;
    border-radius: 10px;
    font-size: 0.9rem;
    color: #27235c;
    background: #faf9fd;
    resize: vertical;
    min-height: 90px;
    outline: none;
    transition: border-color 0.2s;
  }
  .modal-textarea:focus {
    border-color: #97247e;
    box-shadow: 0 0 0 3px rgba(151,36,126,0.1);
  }
 
  .btn-modal-save {
    flex: 1;
    padding: 11px 0;
    border: none;
    border-radius: 10px;
    background: #27235c;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .btn-modal-cancel {
    flex: 1;
    padding: 11px 0;
    border: 1.5px solid #ddd;
    border-radius: 10px;
    background: transparent;
    color: #555;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-modal-save:hover  { opacity: 0.88; }
  .btn-modal-cancel:hover { background: #f5f5f5; }
 
  /* ── EMPTY STATE ── */
  .empty-state {
    text-align: center;
    color: rgba(255,255,255,0.6);
    padding: 30px 0;
    font-size: 0.9rem;
  }
`;
 
export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
 
  const [profile, setProfile] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    qualification: user.qualification || "",
    experienceLevel: user.experienceLevel || ""
  });
 
  const [myExperiences, setMyExperiences] = useState([]);
  const [editingExp, setEditingExp] = useState(null);
 
  useEffect(() => {
    loadMyExperiences();
  }, []);
 
  const loadMyExperiences = async () => {
    const res = await api.get("/experience");
    const mine = res.data.filter(exp => exp.user?.userId === user.userId);
    setMyExperiences(mine);
  };
 
  const updateProfile = async () => {
    await api.put(`/user/${user.userId}`, profile);
    localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
    alert("✅ Profile updated successfully");
  };
 
  const deleteExperience = async (expId) => {
    if (!window.confirm("Delete this experience?")) return;
    await api.delete(`/experience/${expId}/${user.userId}`);
    loadMyExperiences();
  };
 
  const updateExperience = async () => {
    await api.put(`/experience/${editingExp.id}/${user.userId}`, editingExp);
    alert("✅ Experience updated");
    setEditingExp(null);
    loadMyExperiences();
  };
 
  const badgeClass = (status) => {
    if (status === "Approved") return "badge-status badge-approved";
    if (status === "Rejected") return "badge-status badge-rejected";
    return "badge-status badge-pending";
  };
 
  return (
    <>
      <style>{styles}</style>
 
      <div className="profile-root">
        <div className="container" style={{ maxWidth: "900px" }}>
 
          {/* PAGE HEADER */}
          <div className="page-header">
            <h2>👤 My Profile</h2>
            <p>Manage your personal info and experiences</p>
          </div>
 
          {/* PROFILE CARD */}
          <div className="card-panel">
            <p className="card-panel-title">Personal Information</p>
 
            <div className="row g-3">
              <div className="col-md-6">
                <div className="field-label">Full Name</div>
                <input
                  className="field-input"
                  placeholder="Enter full name"
                  value={profile.fullName}
                  onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>
 
              <div className="col-md-6">
                <div className="field-label">Email Address</div>
                <input
                  className="field-input"
                  placeholder="Enter email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
 
              <div className="col-md-6">
                <div className="field-label">Phone</div>
                <input
                  className="field-input"
                  placeholder="Enter phone number"
                  value={profile.phone}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
 
              <div className="col-md-6">
                <div className="field-label">Qualification</div>
                <input
                  className="field-input"
                  placeholder="Enter qualification"
                  value={profile.qualification}
                  onChange={e => setProfile({ ...profile, qualification: e.target.value })}
                />
              </div>
 
              <div className="col-md-6">
                <div className="field-label">Experience Level</div>
                <input
                  className="field-input"
                  placeholder="e.g. Junior, Senior"
                  value={profile.experienceLevel}
                  onChange={e => setProfile({ ...profile, experienceLevel: e.target.value })}
                />
              </div>
            </div>
 
            <button className="btn-save" onClick={updateProfile}>
              💾 Save Profile
            </button>
          </div>
 
         {/* EXPERIENCES SECTION */}
          <div className="section-heading">
            📄 My Experiences
          </div>
 
          {myExperiences.length === 0 ? (
            <div className="empty-state">No experiences added yet.</div>
          ) : (
            <div className="row g-3">
              {myExperiences.map(exp => (
                <div className="col-md-4" key={exp.id}>
                  <div className="exp-card">
                    <p className="exp-company">{exp.company}</p>
                    <p className="exp-role">{exp.role}</p>
 
                    <span className={badgeClass(exp.status)}>
                      {exp.status}
                    </span>
 
                    {exp.status === "Pending" ? (
                      <div className="exp-actions">
                        <button
                          className="btn-edit"
                          onClick={() => setEditingExp(exp)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteExperience(exp.id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    ) : (
                      <p className="cannot-edit-note">Cannot edit after review</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
 
        </div>
 
        {/* EDIT MODAL */}
        {editingExp && (
          <div className="modal-overlay" onClick={() => setEditingExp(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
 
              <p className="modal-title">✏️ Edit Experience</p>
 
              <div className="field-label" style={{ marginBottom: 6 }}>Company</div>
              <input
                className="field-input"
                style={{ marginBottom: 14 }}
                value={editingExp.company}
                onChange={e => setEditingExp({ ...editingExp, company: e.target.value })}
              />
 
              <div className="field-label" style={{ marginBottom: 6 }}>Role</div>
              <input
                className="field-input"
                style={{ marginBottom: 14 }}
                value={editingExp.role}
                onChange={e => setEditingExp({ ...editingExp, role: e.target.value })}
              />
 
              <div className="field-label" style={{ marginBottom: 6 }}>Description</div>
              <textarea
                className="modal-textarea"
                style={{ marginBottom: 22 }}
                value={editingExp.experience}
                onChange={e => setEditingExp({ ...editingExp, experience: e.target.value })}
              />
 
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-modal-save" onClick={updateExperience}>
                  Save Changes
                </button>
                <button className="btn-modal-cancel" onClick={() => setEditingExp(null)}>
                  Cancel
                </button>
              </div>
 
            </div>
          </div>
        )}
 
      </div>
    </>
  );
}
 