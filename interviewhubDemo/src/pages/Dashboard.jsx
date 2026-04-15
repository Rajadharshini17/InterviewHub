import { useEffect, useState } from "react";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import interviewicon from "../assets/interviewicon.jpg";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
 
  * { box-sizing: border-box; }
 
  body, .dashboard-root {
    font-family: 'DM Sans', sans-serif;
    background: #f0f2f8;
  }
 
  .dashboard-root {
    min-height: 100vh;
    background: linear-gradient(160deg, #f0f2f8 0%, #e8eaf6 100%);
  }
 
  /* SEARCH BAR */
  .search-bar {
    border: 1.5px solid #e0e3ef;
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 14px;
    background: #fff;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
    outline: none;
  }
  .search-bar:focus {
    border-color: #7c83ff;
    box-shadow: 0 0 0 3px rgba(124,131,255,0.12);
  }
 
  .filter-select {
    border: 1.5px solid #e0e3ef;
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 14px;
    background: #fff;
    width: 100%;
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2397247e' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }
  .filter-select:focus {
    border-color: #97247e;
    box-shadow: 0 0 0 3px rgba(151,36,126,0.1);
  }
 
  /* EXP CARDS */
  .exp-card {
    background: #fff;
    border-radius: 20px;
    border: none;
    box-shadow: 0 2px 16px rgba(39,35,92,0.08);
    overflow: hidden;
    transition: transform 0.22s, box-shadow 0.22s;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .exp-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 32px rgba(39,35,92,0.14);
  }
 
  .card-accent-bar {
    height: 4px;
    background: linear-gradient(90deg, #27235c, #97247e, #e01950);
  }
 
  .card-body-inner {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
 
  .company-badge {
    display: inline-block;
    background: linear-gradient(135deg, #f3f0ff, #fce4f6);
    color: #27235c;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    margin-bottom: 10px;
    letter-spacing: 0.3px;
  }
 
  .role-title {
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 8px;
    line-height: 1.3;
  }
 
  .exp-preview {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.6;
    flex: 1;
    margin-bottom: 14px;
  }
 
  .read-more-link {
    color: #97247e;
    font-weight: 600;
    cursor: pointer;
    font-size: 12px;
  }
 
  /* ACTION BUTTONS */
  .action-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding-top: 12px;
    border-top: 1px solid #f3f4f6;
    margin-top: auto;
  }
 
  .vote-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.18s;
  }
  .vote-btn:hover { background: #f3f0ff; border-color: #c4b5fd; color: #27235c; }
 
  .comment-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.18s;
  }
  .comment-btn:hover { background: #fce4f6; border-color: #f0a0d8; color: #97247e; }
 
  .view-btn {
    margin-left: auto;
    background: linear-gradient(135deg, #27235c, #97247e);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.18s, transform 0.18s;
    letter-spacing: 0.2px;
  }
  .view-btn:hover { opacity: 0.88; transform: scale(1.03); }
 
  /* COMMENT SECTION */
  .comment-section {
    background: #fafafa;
    border-radius: 12px;
    margin-top: 12px;
    padding: 12px;
    border: 1px solid #f0f0f0;
  }
 
  .comment-item {
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
    color: #374151;
  }
  .comment-item:last-child { border-bottom: none; }
  .comment-user { font-weight: 600; color: #27235c; }
 
  .reply-link {
    color: #97247e;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0 6px;
    text-decoration: none;
  }
  .reply-link:hover { text-decoration: underline; }
 
  .reply-area {
    display: flex;
    gap: 6px;
    margin-top: 6px;
  }
  .mini-input {
    flex: 1;
    border: 1.5px solid #e0e3ef;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 12px;
    outline: none;
  }
  .mini-input:focus { border-color: #97247e; }
 
  .mini-send-btn {
    background: linear-gradient(135deg, #27235c, #97247e);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
 
  .post-comment-row {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }
 
  /* UPCOMING PANEL */
  .upcoming-panel {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 16px rgba(39,35,92,0.08);
    overflow: hidden;
    margin-bottom: 24px;
  }
  .upcoming-header {
    background: linear-gradient(135deg, #27235c, #97247e);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .upcoming-header h6 {
    color: #fff;
    margin: 0;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
  }
  .upcoming-body { padding: 16px 20px; }
  .upcoming-item {
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .upcoming-item:last-child { border-bottom: none; }
  .upcoming-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #97247e, #e01950);
    margin-top: 5px;
    flex-shrink: 0;
  }
  .upcoming-title { font-weight: 600; color: #1a1a2e; font-size: 14px; }
  .upcoming-meta { font-size: 12px; color: #9ca3af; margin-top: 2px; }
 
  /* FILTERS SECTION */
  .filters-section {
    background: #fff;
    border-radius: 16px;
    padding: 16px 20px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(39,35,92,0.06);
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }
  .filter-label {
    font-size: 12px;
    font-weight: 600;
    color: #97247e;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
 
  /* MODAL */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(10,8,30,0.65);
    backdrop-filter: blur(4px);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
 
  .modal-box {
    background: #fff;
    border-radius: 24px;
    width: 100%;
    max-width: 680px;
    max-height: 88vh;
    overflow-y: auto;
    box-shadow: 0 24px 80px rgba(39,35,92,0.25);
    animation: slideUp 0.28s ease;
  }
 
  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
 
  .modal-hero {
    background: linear-gradient(135deg, #27235c 0%, #97247e 60%, #e01950 100%);
    padding: 28px 28px 24px;
    position: relative;
    border-radius: 24px 24px 0 0;
  }
 
  .modal-company-tag {
    display: inline-block;
    background: rgba(255,255,255,0.18);
    color: #fff;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    margin-bottom: 10px;
    letter-spacing: 0.4px;
  }
 
  .modal-title {
    font-family: 'Sora', sans-serif;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 4px;
  }
 
  .modal-subtitle {
    color: rgba(255,255,255,0.75);
    font-size: 14px;
    margin: 0;
  }
 
  .modal-close-btn {
    position: absolute;
    top: 16px; right: 16px;
    background: rgba(255,255,255,0.18);
    border: none;
    border-radius: 10px;
    color: #fff;
    width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.18s;
  }
  .modal-close-btn:hover { background: rgba(255,255,255,0.3); }
 
  .modal-content-area {
    padding: 24px 28px;
  }
 
  .info-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
 
  .info-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #f5f3ff;
    border-radius: 10px;
    padding: 7px 12px;
    font-size: 13px;
    color: #27235c;
    font-weight: 500;
  }
  .info-chip .chip-icon { font-size: 15px; }
 
  .section-label {
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #97247e;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
 
  .rounds-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .round-item {
    background: linear-gradient(135deg, #fafafa, #f5f3ff);
    border: 1px solid #ede9fe;
    border-radius: 12px;
    padding: 12px 14px;
    margin-bottom: 10px;
  }
  .round-number {
    display: inline-block;
    background: linear-gradient(135deg, #27235c, #97247e);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    border-radius: 6px;
    padding: 2px 8px;
    margin-bottom: 5px;
  }
  .round-name { font-weight: 600; color: #1a1a2e; font-size: 14px; }
  .round-desc { font-size: 13px; color: #6b7280; margin-top: 3px; line-height: 1.5; }
 
  .experience-block {
    background: #f9f9fb;
    border-left: 4px solid;
    border-image: linear-gradient(180deg,#27235c,#97247e) 1;
    border-radius: 0 12px 12px 0;
    padding: 14px 16px;
    font-size: 13.5px;
    color: #374151;
    line-height: 1.75;
  }
 
  .questions-block {
    background: #fef3fb;
    border-radius: 12px;
    padding: 14px 16px;
    font-size: 13.5px;
    color: #374151;
    line-height: 1.75;
    border: 1px solid #f5d0ee;
  }
 
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, #ede9fe, transparent);
    margin: 20px 0;
  }
 
  /* SECTION HEADER */
  .section-heading {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 4px;
  }
  .section-subheading {
    font-size: 13px;
    color: #9ca3af;
    margin-bottom: 20px;
  }
 
 EMPTY STATE */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
  }
  .empty-state i { font-size: 48px; opacity: 0.3; margin-bottom: 12px; }
 
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#27235c, #97247e); border-radius: 10px; }
`;
 
export default function Dashboard() {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [replyText, setReplyText] = useState({});
  const [showReplyBox, setShowReplyBox] = useState({});
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [upcoming, setUpcoming] = useState([]);
  const [selectedExp, setSelectedExp] = useState(null);
 
  const user = JSON.parse(localStorage.getItem("user"));
 
  useEffect(() => { loadApprovedExperiences(); }, []);
 
  const loadApprovedExperiences = async () => {
    try {
      const res = await api.get("/experience");
      const approved = res.data.filter(
        e => e.status?.trim().toLowerCase() === "approved"
      );
      setExperiences(approved);
    } catch (err) { console.error("ERROR ❌", err); }
  };
 
  const loadUpcoming = async () => {
    try {
      const res = await api.get("/interviews");
      setUpcoming(res.data);
    } catch (err) { console.error("Upcoming load error ❌", err); }
  };
 
  const totalExperiences = experiences.length;
  const totalCompanies = [...new Set(experiences.map(e => e.company))].length;
  const roleCount = {};
  experiences.forEach(e => { roleCount[e.role] = (roleCount[e.role] || 0) + 1; });
  const topRole = Object.keys(roleCount).length > 0
    ? Object.keys(roleCount).reduce((a, b) => roleCount[a] > roleCount[b] ? a : b)
    : "N/A";
 
  const handleLike = async (id) => {
    await api.post(`/experience/${id}/like`);
    loadApprovedExperiences();
  };
  const handleDislike = async (id) => {
    await api.post(`/experience/${id}/dislike`);
    loadApprovedExperiences();
  };
 
  const loadComments = async (expId) => {
    const res = await api.get(`/experience/${expId}/comments`);
    setComments(prev => ({ ...prev, [expId]: res.data }));
  };
 
  const addComment = async (expId) => {
    if (!newComment[expId]?.trim()) return;
    await api.post(`/experience/${expId}/comment/${user.userId}`, newComment[expId], { headers: { "Content-Type": "text/plain" } });
    setNewComment(prev => ({ ...prev, [expId]: "" }));
    loadComments(expId);
  };
 
  const addReply = async (commentId, expId) => {
    if (!replyText[commentId]?.trim()) return;
    await api.post(`/experience/reply/${commentId}/${user.userId}`, replyText[commentId], { headers: { "Content-Type": "text/plain" } });
    setReplyText(prev => ({ ...prev, [commentId]: "" }));
    setShowReplyBox(prev => ({ ...prev, [commentId]: false }));
    loadComments(expId);
  };
 
  const filteredExperiences = experiences.filter(exp =>
    (exp.company.toLowerCase().includes(search.toLowerCase()) ||
     exp.role.toLowerCase().includes(search.toLowerCase())) &&
    (companyFilter === "" || exp.company === companyFilter) &&
    (roleFilter === "" || exp.role === roleFilter)
  );
 
  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-root">
 
        {/* ── NAVBAR ── */}
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #27235c, #97247e)",
            position: "sticky", top: 0, zIndex: 1000
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <img src={interviewicon} width={28} alt="" />
            </div>
            <div>
              <h5 className="text-white m-0 fw-bold" style={{ fontFamily: "Sora, sans-serif", letterSpacing: "0.5px" }}>
                InterviewHub
              </h5>
              <small className="text-white-50" style={{ fontSize: 11 }}>Career Experience Portal</small>
            </div>
          </div>
 
          <div className="d-flex align-items-center gap-2">
            {[
              { label: "📅 Upcoming", action: () => { setShowUpcoming(!showUpcoming); loadUpcoming(); } },
              { label: "+ Add", action: () => window.location.href = "/add-experience" },
              { label: "👤 Profile", action: () => window.location.href = "/profile" },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} style={{
                background: "rgba(255,255,255,0.15)", borderRadius: 10, border: "none",
                color: "#fff", padding: "6px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer"
              }}>
                {btn.label}
              </button>
            ))}
            <button onClick={() => { localStorage.clear(); window.location.href = "/"; }} style={{
              background: "rgba(0,0,0,0.35)", borderRadius: 10, border: "none",
              color: "#fff", padding: "6px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer"
            }}>
              Logout
            </button>
          </div>
        </div>
 
        <div className="container" style={{ maxWidth: 1200, padding: "28px 16px" }}>
 
          {/* ── STATS ── */}
          <div className="row mb-4">
            {[
              {
                label: "Approved Experiences", value: totalExperiences,
                icon: "bi-check-circle-fill",
                gradient: "linear-gradient(135deg, #27235c, #3b3fda)"
              },
              {
                label: "Companies", value: totalCompanies,
                icon: "bi-building",
                gradient: "linear-gradient(135deg, #97247e, #c13aa5)"
              },
              {
                label: "Top Role", value: topRole,
                icon: "bi-graph-up-arrow",
                gradient: "linear-gradient(135deg, #e01950, #ff4d7d)"
              },
            ].map((stat, i) => (
              <div className="col-md-4 mb-3" key={i}>
                <div style={{
                  background: stat.gradient,
                  borderRadius: 20, padding: "22px 24px",
                  boxShadow: "0 6px 28px rgba(39,35,92,0.18)",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 4 }}>
                      {stat.label}
                    </div>
                    <div style={{
                      color: "#fff", fontFamily: "Sora, sans-serif",
                      fontSize: 28, fontWeight: 700, lineHeight: 1
                    }}>
                      {stat.value}
                    </div>
                  </div>
                  <i className={`bi ${stat.icon}`} style={{ fontSize: 40, color: "rgba(255,255,255,0.25)" }} />
                </div>
              </div>
            ))}
          </div>
 
          {/* ── UPCOMING EVENTS ── */}
          {showUpcoming && (
            <div className="upcoming-panel">
              <div className="upcoming-header">
                <i className="bi bi-calendar-event text-white" style={{ fontSize: 18 }} />
                <h6>Upcoming Interview Events</h6>
                <span style={{ marginLeft: "auto", background: "rgba(255,255,255,0.18)", color: "#fff", borderRadius: 8, padding: "2px 10px", fontSize: 12 }}>
                  {upcoming.length} events
                </span>
              </div>
              <div className="upcoming-body">
                {upcoming.length === 0 ? (
                  <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>No upcoming events found.</p>
                ) : (
                  upcoming.map((item, i) => (
                    <div className="upcoming-item" key={i}>
                      <div className="upcoming-dot" />
                      <div>
                        <div className="upcoming-title">{item.title || item.company}</div>
                        {item.description && (
                          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{item.description}</div>
                        )}
                        <div className="upcoming-meta">
                          {item.date && <span>📅 {item.date}</span>}
                          {item.location && <span style={{ marginLeft: 10 }}>📍 {item.location}</span>}
                          {item.packageOffer && <span style={{ marginLeft: 10 }}>💸 {item.packageOffer}</span>}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
 
          {/* ── FILTERS ── */}
          <div className="filters-section">
            <span className="filter-label">
              <i className="bi bi-funnel" /> Filter
            </span>
            <div style={{ flex: 2, minWidth: 180 }}>
              <input
                className="search-bar"
                placeholder="🔍  Search company or role..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <select className="filter-select" onChange={e => setCompanyFilter(e.target.value)}>
                <option value="">All Companies</option>
                {[...new Set(experiences.map(e => e.company))].map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <select className="filter-select" onChange={e => setRoleFilter(e.target.value)}>
                <option value="">All Roles</option>
                {[...new Set(experiences.map(e => e.role))].map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </div>
            <div style={{ marginLeft: "auto", color: "#9ca3af", fontSize: 13, whiteSpace: "nowrap" }}>
              {filteredExperiences.length} result{filteredExperiences.length !== 1 ? "s" : ""}
            </div>
          </div>
 
          {/* ── SECTION HEADING ── */}
          <div className="section-heading">Shared Experiences</div>
          <div className="section-subheading">Community-contributed interview insights</div>
 
       {/*   EXPERIENCE CARDS ── */}
          {filteredExperiences.length === 0 ? (
            <div className="empty-state">
              <div><i className="bi bi-inbox" /></div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>No experiences found</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
            </div>
          ) : (
            <div className="row">
              {filteredExperiences.map(exp => (
                <div className="col-md-4 mb-4" key={exp.id}>
                  <div className="exp-card">
                    <div className="card-accent-bar" />
                    <div className="card-body-inner">
                      <span className="company-badge">🏢 {exp.company}</span>
                      <div className="role-title">{exp.role}</div>
                      <div className="exp-preview">
                        {exp.experience?.slice(0, 90)}...{" "}
                        <span className="read-more-link" onClick={() => setSelectedExp(exp)}>Read more</span>
                      </div>
 
                      <div className="action-row">
                        <button className="vote-btn" onClick={() => handleLike(exp.id)}>
                          👍 <span>{exp.likes || 0}</span>
                        </button>
                        <button className="vote-btn" onClick={() => handleDislike(exp.id)}>
                          👎 <span>{exp.dislikes || 0}</span>
                        </button>
                        <button className="comment-btn" onClick={() => loadComments(exp.id)}>
                          💬 <span>Comments</span>
                        </button>
                        <button className="view-btn" onClick={() => setSelectedExp(exp)}>
                          View →
                        </button>
                      </div>
 
                      {/* COMMENTS */}
                      {comments[exp.id] && (
                        <div className="comment-section">
                          {comments[exp.id].map((c, i) => (
                            <div className="comment-item" key={i}>
                              <span className="comment-user">{c.user?.fullName}</span>:{" "}
                              <span style={{ color: "#374151" }}>{c.message}</span>
                              <button
                                className="reply-link"
                                onClick={() => setShowReplyBox(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                              >Reply</button>
                              {showReplyBox[c.id] && (
                                <div className="reply-area">
                                  <input
                                    className="mini-input"
                                    placeholder="Write a reply..."
                                    value={replyText[c.id] || ""}
                                    onChange={e => setReplyText(prev => ({ ...prev, [c.id]: e.target.value }))}
                                  />
                                  <button className="mini-send-btn" onClick={() => addReply(c.id, exp.id)}>Send</button>
                                </div>
                              )}
                            </div>
                          ))}
                          <div className="post-comment-row">
                            <input
                              className="mini-input"
                              placeholder="Add a comment..."
                              value={newComment[exp.id] || ""}
                              onChange={e => setNewComment(prev => ({ ...prev, [exp.id]: e.target.value }))}
                            />
                            <button className="mini-send-btn" onClick={() => addComment(exp.id)}>Post</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
 
        {/* ── FULL DETAILS MODAL ── */}
        {selectedExp && (
          <div className="modal-overlay" onClick={() => setSelectedExp(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
 
              {/* Hero Header */}
              <div className="modal-hero">
                <button className="modal-close-btn" onClick={() => setSelectedExp(null)}>×</button>
                <span className="modal-company-tag">🏢 {selectedExp.company}</span>
                <h2 className="modal-title">{selectedExp.role}</h2>
                <p className="modal-subtitle">Interview Experience Details</p>
              </div>
 
              <div className="modal-content-area">
 
                {/* Info Chips */}
                <div className="info-chips">
                  {selectedExp.packageoffer && (
                    <div className="info-chip"><span className="chip-icon">💰</span>{selectedExp.packageoffer}</div>
                  )}
                  {selectedExp.location && (
                    <div className="info-chip"><span className="chip-icon">📍</span>{selectedExp.location}</div>
                  )}
                  {selectedExp.mode && (
                    <div className="info-chip"><span className="chip-icon">💻</span>{selectedExp.mode}</div>
                  )}
                  {selectedExp.technologies && (
                    <div className="info-chip"><span className="chip-icon">🛠</span>{selectedExp.technologies}</div>
                  )}
                </div>
 
                {/* Rounds */}
                <div className="section-divider" />
                <div className="section-label">📌 Interview Rounds</div>
 
                {selectedExp.rounds ? (
                  Array.isArray(selectedExp.rounds) ? (
                    <ul className="rounds-list">
                      {selectedExp.rounds.map((r, i) => (
                        <li key={i} className="round-item">
                          <span className="round-number">Round {i + 1}</span>
                          {typeof r === "object" ? (
                            <>
                              <div className="round-name">{r.name || "Interview Round"}</div>
                              <div className="round-desc">{r.description || r.details || "No details provided."}</div>
                            </>
                          ) : (
                            <div className="round-desc">{r}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="round-item"><div className="round-desc">{selectedExp.rounds}</div></div>
                  )
                ) : (
                  <p style={{ color: "#9ca3af", fontSize: 13 }}>No rounds information available.</p>
                )}
 
                {/* Questions */}
                <div className="section-divider" />
                <div className="section-label">❓ Interview Questions</div>
                <div className="questions-block">
                  {selectedExp.questions || <span style={{ color: "#9ca3af" }}>No questions shared.</span>}
                </div>
 
                {/* Full Experience */}
                <div className="section-divider" />
                <div className="section-label">🧾 Full Experience</div>
                <div className="experience-block">
                  {selectedExp.experience ? (
                    selectedExp.experience.split("\n").map((line, i) => (
                      <p key={i} style={{ marginBottom: 6 }}>{line}</p>
                    ))
                  ) : (
                    <span style={{ color: "#9ca3af" }}>No experience description available.</span>
                  )}
                </div>
 
                <div className="section-divider" />
                {/* <button
                  onClick={() => setSelectedExp(null)}
                  style={{
                    background: "linear-gradient(135deg,#27235c,#97247e)",
                    color: "#fff", border: "none", borderRadius: 12,
                    padding: "10px 24px", fontWeight: 600, fontSize: 14,
                    cursor: "pointer", fontFamily: "Sora, sans-serif"
                  }}
                >
                  Close
                </button> */}
              </div>
            </div>
          </div>
        )}
 
      </div>
    </>
  );
}
 