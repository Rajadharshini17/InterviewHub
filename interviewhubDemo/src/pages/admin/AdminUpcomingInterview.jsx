import { useEffect, useState } from "react";
import api from "../../api/axios";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
 
  .interview-root {
    --bg: #f0f2f8;
    --surface: #ffffff;
    --surface2: #f5f6fa;
    --border: rgba(0,0,0,0.08);
    --accent: #5b21b6;
    --accent2: #7c3aed;
    --header-grad: linear-gradient(135deg, #4a1a8c 0%, #7c2fa8 50%, #c026d3 100%);
    --danger: #ef4444;
    --warn: #f59e0b;
    --success: #10b981;
    --text: #1e1b4b;
    --muted: #6b7280;
    --card-blue: linear-gradient(135deg, #1e3a8a, #2563eb);
    --card-amber: linear-gradient(135deg, #b45309, #f59e0b);
    --card-green: linear-gradient(135deg, #065f46, #10b981);
    --card-purple: linear-gradient(135deg, #6b21a8, #a855f7);
    --card-pink: linear-gradient(135deg, #9f1239, #f43f5e);
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text);
  }
 
  .interview-root * { box-sizing: border-box; margin: 0; padding: 0; }
 
  /* TOP HEADER BAR */
  .page-header {
    background: var(--header-grad);
    padding: 1.25rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 20px rgba(124,47,168,0.35);
  }
 
  .page-header-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
 
  .page-header-sub {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.7);
    margin-top: 0.1rem;
  }
 
  /* MAIN CONTENT AREA */
  .interview-body {
    padding: 2rem;
  }
 
  /* FORM PANEL */
  .form-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2.5rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
 
  .form-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--header-grad);
  }
 
  .form-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent2);
    margin-bottom: 1.5rem;
  }
 
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.85rem;
  }
 
  .field-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
 
  .field-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }
 
  .field-input, .field-select {
    background: var(--surface2);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    padding: 0.6rem 0.85rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
    appearance: none;
  }
 
  .field-input::placeholder { color: #b0b7c3; }
 
  .field-input:focus, .field-select:focus {
    border-color: var(--accent2);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
    background: #fff;
  }
 
  .field-input[type="date"]::-webkit-calendar-picker-indicator {
    filter: opacity(0.4);
    cursor: pointer;
  }
 
  .form-actions {
    margin-top: 1.25rem;
    display: flex;
    justify-content: flex-end;
  }
 
  .btn-submit {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.65rem 1.8rem;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.2s;
  }
 
  .btn-submit.add {
    background: var(--header-grad);
    color: #fff;
    box-shadow: 0 4px 16px rgba(124,47,168,0.35);
  }
 
  .btn-submit.update {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: #fff;
    box-shadow: 0 4px 16px rgba(245,158,11,0.35);
  }
 
  .btn-submit:hover { transform: translateY(-1px); }
  .btn-submit:active { transform: translateY(0); }
 
  /* SECTION HEADER */
  .section-header {
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
 
  .section-header::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }
 
  /* EMPTY STATE */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--muted);
    font-size: 0.95rem;
    background: var(--surface);
    border-radius: 16px;
    border: 1px solid var(--border);
  }
 
  .empty-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
    opacity: 0.4;
  }
 
  /* CARDS GRID */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }
 
  .interview-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 0;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  }
 
  .interview-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(124,47,168,0.15);
  }
 
  .card-header-strip {
    background: var(--header-grad);
    padding: 1.1rem 1.5rem 1rem;
    position: relative;
  }
 
  .card-company {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: #fff;
  }
 
  .card-role {
    display: inline-block;
    background: rgba(255,255,255,0.18);
    color: rgba(255,255,255,0.92);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 50px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0.2rem 0.7rem;
    margin-top: 0.35rem;
    width: fit-content;
  }
 
  .card-body {
    padding: 1.1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    flex: 1;
  }
 
  .card-meta-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: var(--muted);
  }
 
  .card-meta-icon {
    width: 18px;
    font-size: 0.85rem;
    flex-shrink: 0;
    opacity: 0.7;
  }
 
  .card-meta-value {
    color: var(--text);
    font-weight: 500;
  }
 
  .mode-badge {
    display: inline-block;
    padding: 0.15rem 0.65rem;
    border-radius: 50px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
 
  .mode-badge.online {
    background: rgba(16,185,129,0.12);
    color: #065f46;
    border: 1px solid rgba(16,185,129,0.3);
  }
 
  .mode-badge.offline {
    background: rgba(124,58,237,0.1);
    color: var(--accent2);
    border: 1px solid rgba(124,58,237,0.2);
  }
 
  .card-actions {
    padding: 0.85rem 1.5rem 1.1rem;
    display: flex;
    gap: 0.6rem;
    justify-content: flex-end;
    border-top: 1px solid var(--border);
    background: #fafafe;
  }
 
  .btn-action {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.4rem 1rem;
    border-radius: 8px;
    border: 1.5px solid;
    cursor: pointer;
    background: transparent;
    transition: background 0.15s, color 0.15s, transform 0.1s;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
 
  .btn-action.edit {
    color: #b45309;
    border-color: rgba(245,158,11,0.4);
  }
  .btn-action.edit:hover {
    background: rgba(245,158,11,0.1);
    transform: scale(1.02);
  }
 
  .btn-action.delete {
    color: #9f1239;
    border-color: rgba(239,68,68,0.35);
  }
  .btn-action.delete:hover {
    background: rgba(239,68,68,0.1);
    transform: scale(1.02);
  }
`;
 
export default function AdminUpcomingInterview() {
  const [interview, setInterview] = useState({
    company: "",
    role: "",
    date: "",
    location: "",
    mode: "",
    packageOffer: ""
  });
 
  const [interviews, setInterviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
 
  const loadInterviews = async () => {
    const res = await api.get("/interviews");
    setInterviews(res.data);
  };
 
  useEffect(() => {
    loadInterviews();
  }, []);
 
  const submitInterview = async () => {
    if (
      !interview.company ||
      !interview.role ||
      !interview.date ||
      !interview.location ||
      !interview.mode ||
      !interview.packageOffer
    ) {
      alert("⚠️ Fill all fields");
      return;
    }
 
    try {
      if (editingId) {
        await api.put(`/interviews/${editingId}`, interview);
        setEditingId(null);
      } else {
        await api.post("/interviews", interview);
      }
 
      setInterview({
        company: "",
        role: "",
        date: "",
        location: "",
        mode: "",
        packageOffer: ""
      });
 
      loadInterviews();
    } catch (err) {
      alert("❌ Error occurred");
    }
  };
 
  const editInterview = (i) => {
    setInterview(i);
    setEditingId(i.id);
  };
 
  const deleteInterview = async (id) => {
    if (!window.confirm("Delete this interview?")) return;
    await api.delete(`/interviews/${id}`);
    loadInterviews();
  };
 
  const set = (field) => (e) => setInterview({ ...interview, [field]: e.target.value });
 
  return (
    <div className="interview-root">
      <style>{styles}</style>
 
      {/* TOP HEADER */}
     {/* TOP HEADER */}
      {/* <div className="page-header">
        <div>
          <div className="page-header-title">📋 Upcoming Interviews</div>
          <div className="page-header-sub">Manage and schedule interview sessions</div>
        </div>
      </div>
  */}
      <div className="interview-body">
        {/* FORM PANEL */}
        <div className="form-panel">
          <p className="form-title">{editingId ? "✏️ Edit Interview" : "＋ Add Interview"}</p>
 
          <div className="form-grid">
            <div className="field-wrap">
              <label className="field-label">Company</label>
              <input className="field-input" placeholder="e.g. Google" value={interview.company} onChange={set("company")} />
            </div>
 
            <div className="field-wrap">
              <label className="field-label">Role</label>
              <input className="field-input" placeholder="e.g. SDE-1" value={interview.role} onChange={set("role")} />
            </div>
 
            <div className="field-wrap">
              <label className="field-label">Date</label>
              <input type="date" className="field-input" value={interview.date} onChange={set("date")} />
            </div>
 
            <div className="field-wrap">
              <label className="field-label">Location</label>
              <input className="field-input" placeholder="e.g. Bangalore" value={interview.location} onChange={set("location")} />
            </div>
 
            <div className="field-wrap">
              <label className="field-label">Mode</label>
              <select className="field-select" value={interview.mode} onChange={set("mode")}>
                <option value="">Select mode</option>
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>
 
            <div className="field-wrap">
              <label className="field-label">Package (LPA)</label>
              <input className="field-input" placeholder="e.g. 12 LPA" value={interview.packageOffer} onChange={set("packageOffer")} />
            </div>
          </div>
 
          <div className="form-actions">
            <button className={`btn-submit ${editingId ? "update" : "add"}`} onClick={submitInterview}>
              {editingId ? "Update Interview" : "+ Add Interview"}
            </button>
          </div>
        </div>
 
        {/* SECTION LABEL */}
        {interviews.length > 0 && (
          <div className="section-header">🗓 Scheduled Interviews ({interviews.length})</div>
        )}
 
        {/* EMPTY STATE */}
        {interviews.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            No interviews scheduled yet
          </div>
        )}
 
        {/* CARDS */}
        <div className="cards-grid">
          {interviews.map((i) => (
            <div className="interview-card" key={i.id}>
              <div className="card-header-strip">
                <div className="card-company">{i.company}</div>
                <div className="card-role">{i.role}</div>
              </div>
 
              <div className="card-body">
                <div className="card-meta-row">
                  <span className="card-meta-icon">📅</span>
                  <span className="card-meta-value">{i.date}</span>
                </div>
                <div className="card-meta-row">
                  <span className="card-meta-icon">📍</span>
                  <span className="card-meta-value">{i.location || "N/A"}</span>
                </div>
                <div className="card-meta-row">
                  <span className="card-meta-icon">💻</span>
                  {i.mode ? (
                    <span className={`mode-badge ${i.mode.toLowerCase()}`}>{i.mode}</span>
                  ) : (
                    <span className="card-meta-value">N/A</span>
                  )}
                </div>
                <div className="card-meta-row">
                  <span className="card-meta-icon">💰</span>
                  <span className="card-meta-value">{i.packageOffer || "N/A"}</span>
                </div>
              </div>
 
              <div className="card-actions">
                <button className="btn-action edit" onClick={() => editInterview(i)}>Edit</button>
                <button className="btn-action delete" onClick={() => deleteInterview(i.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 