import { useEffect, useState } from "react";
 
export default function ExperienceModal({
  experience,
  onClose,
  onApprove,
  onReject,
  isAdmin = false,
}) {
  const [activeTab, setActiveTab] = useState("experience");
 
  // Escape key to close
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
 
  // Lock body scroll
  useEffect(() => {
    if (experience) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [experience]);
 
  if (!experience) return null;
 
  const hasUserDetails = isAdmin && experience.user;
  const initial = (experience.company ?? "?")[0].toUpperCase();
 
  return (
    <>
      <style>{STYLES}</style>
 
      {/* Backdrop */}
      <div className="em-backdrop" onClick={onClose} />
 
      {/* Panel */}
      <div className="em-panel" role="dialog" aria-modal="true">
 
        {/* ── Hero Header ── */}
        <div className="em-hero">
          <div className="em-hero-content">
            <div className="em-avatar">{initial}</div>
            <div className="em-hero-text">
              <h2 className="em-company">{experience.company}</h2>
              <p className="em-role">{experience.role}</p>
            </div>
            {isAdmin && (
              <div className="em-status-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {experience.status ?? "Approved"}
              </div>
            )}
          </div>
          {/* <button className="em-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button> */}
        </div>
 
        {/* ── Tabs (only when admin + user details exist) ── */}
        {hasUserDetails && (
          <div className="em-tabs">
            <button
              className={`em-tab ${activeTab === "experience" ? "em-tab--active" : ""}`}
              onClick={() => setActiveTab("experience")}
            >
              <span className="em-tab-icon">💼</span> Experience
            </button>
            <button
              className={`em-tab ${activeTab === "user" ? "em-tab--active" : ""}`}
              onClick={() => setActiveTab("user")}
            >
              <span className="em-tab-icon">👤</span> Applicant
            </button>
          </div>
        )}
 
        {/* ── Body ── */}
        <div className="em-body">
 
          {/* EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <div className="em-fade-in">
 
              {/* Quick stats row */}
              <div className="em-stats">
                {experience.packageoffer && (
                  <div className="em-stat">
                    <div className="em-stat-header">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span className="em-stat-label">PACKAGE</span>
                    </div>
                    <span className="em-stat-value">{experience.packageoffer}</span>
                  </div>
                )}
                {experience.rounds && (
                  <div className="em-stat">
                    <div className="em-stat-header">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                        <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                      </svg>
                      <span className="em-stat-label">ROUNDS</span>
                    </div>
                    <span className="em-stat-value">{experience.rounds}</span>
                  </div>
                )}
              </div>
 
              {/* Technologies */}
              {experience.technologies && (
                <div className="em-section">
                  <div className="em-section-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                    </svg>
                    Technologies
                  </div>
                  <div className="em-tags">
                    {experience.technologies.split(/[,;|]/).map((t, i) => (
                      <span key={i} className="em-tag">{t.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
 
              {/* Questions */}
              {experience.questions && (
                <div className="em-section">
                  <div className="em-section-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Interview Questions
                  </div>
                  <p className="em-prose">{experience.questions}</p>
                </div>
              )}
 
              {/* Experience description */}
              {experience.experience && (
                <div className="em-section">
                  <div className="em-section-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                    </svg>
                    Experience
                  </div>
                  <p className="em-prose">{experience.experience}</p>
                </div>
              )}
 
            </div>
          )}
 
          {/* APPLICANT TAB */}
          {activeTab === "user" && hasUserDetails && (
            <div className="em-fade-in">
              <div className="em-user-card">
                <div className="em-user-avatar">
                  {(experience.user.fullName ?? "U")[0].toUpperCase()}
                </div>
                <div>
                  <p className="em-user-name">{experience.user.fullName}</p>
                  <p className="em-user-level">{experience.user.experienceLevel}</p>
                </div>
              </div>
 
              <div className="em-info-grid">
                {[
                  { icon: "✉️", label: "Email", value: experience.user.email },
                  { icon: "📞", label: "Phone", value: experience.user.phone },
                  { icon: "🎓", label: "Qualification", value: experience.user.qualification },
                  { icon: "🎮", label: "Hobby", value: experience.user.hobby },
                ].filter(r => r.value).map(({ icon, label, value }) => (
                  <div key={label} className="em-info-row">
                    <span className="em-info-icon">{icon}</span>
                    <div>
                      <span className="em-info-label">{label}</span>
                      <span className="em-info-value">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
 
        </div>
 
        {/* ── Footer Actions ── */}
        <div className="em-footer">
          {onApprove && (
            <button className="em-btn em-btn--approve" onClick={onApprove}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Approve
            </button>
          )}
          {onReject && (
            <button className="em-btn em-btn--reject" onClick={onReject}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Reject
            </button>
          )}
          <button className="em-btn em-btn--close" onClick={onClose}>
            Close
          </button>
        </div>
 
      </div>
    </>
  );
}
 
/* ─────────────────────────── STYLES ─────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
 
@keyframes em-backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes em-panel-in {
  from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)) scale(0.97); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
@keyframes em-fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
 
/* ── Backdrop ── */
.em-backdrop {
  position: fixed; inset: 0;
  background: rgba(100, 116, 139, 0.45);
  backdrop-filter: blur(3px);
  z-index: 1000;
  animation: em-backdrop-in 0.2s ease forwards;
}
 
/* ── Panel ── */
.em-panel {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: min(580px, 95vw);
  max-height: 88vh;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
  z-index: 1001;
  display: flex; flex-direction: column;
  font-family: 'Inter', sans-serif;
  animation: em-panel-in 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
 
/* ── Hero ── */
/* ── Hero ── */
.em-hero {
  position: relative;
  padding: 20px 24px 20px;
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  flex-shrink: 0;
}
.em-hero-content {
  display: flex; align-items: center; gap: 14px;
}
.em-avatar {
  width: 48px; height: 48px; border-radius: 10px;
  background: rgba(255,255,255,0.25);
  border: 2px solid rgba(255,255,255,0.4);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 700; color: #fff;
  flex-shrink: 0;
}
.em-hero-text { flex: 1; }
.em-company {
  margin: 0; font-size: 18px; font-weight: 700;
  color: #ffffff; line-height: 1.2;
}
.em-role {
  margin: 4px 0 0; font-size: 13px;
  color: rgba(255,255,255,0.75); font-weight: 400;
}
.em-status-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: #16a34a;
  border: 2px solid rgba(255,255,255,0.6);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 12px; font-weight: 600; color: #fff;
  white-space: nowrap;
}
.em-close {
  position: absolute; top: 16px; right: 16px; z-index: 2;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 6px; width: 30px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; cursor: pointer; transition: all 0.15s; padding: 0;
}
.em-close:hover { background: rgba(255,255,255,0.35); }
 
/* ── Tabs ── */
.em-tabs {
  display: flex; gap: 0;
  padding: 0 20px;
  border-bottom: 2px solid #e9ecef;
  background: #fff;
  flex-shrink: 0;
}
.em-tab {
  padding: 12px 18px; background: none; border: none;
  font-family: 'Inter', sans-serif;
  font-size: 13px; font-weight: 500;
  color: #6b7280; cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  display: flex; align-items: center; gap: 6px;
  transition: color 0.15s;
}
.em-tab:hover { color: #374151; }
.em-tab--active { color: #16a34a; border-bottom-color: #16a34a; font-weight: 600; }
.em-tab-icon { font-size: 13px; }
 
/* ── Body ── */
.em-body {
  flex: 1; overflow-y: auto; padding: 20px 22px;
  background: #f8fafc;
  scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent;
}
.em-body::-webkit-scrollbar { width: 4px; }
.em-body::-webkit-scrollbar-track { background: transparent; }
.em-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.em-fade-in { animation: em-fade-in 0.2s ease forwards; }
 
/* Stats */
.em-stats { display: flex; gap: 12px; margin-bottom: 18px; }
.em-stat {
  flex: 1;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex; flex-direction: column; gap: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.em-stat-header {
  display: flex; align-items: center; gap: 6px;
}
.em-stat-label {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; color: #3b82f6;
}
.em-stat-value {
  font-size: 22px; font-weight: 700; color: #1e293b;
}
 
/* Section */
.em-section {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.em-section-label {
  display: flex; align-items: center; gap: 7px;
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; color: #3b82f6; margin-bottom: 10px;
}
 
/* Tags */
.em-tags { display: flex; flex-wrap: wrap; gap: 7px; }
.em-tag {
  padding: 4px 12px; border-radius: 20px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8; font-size: 12px; font-weight: 500;
}
 
/* Prose */
.em-prose {
  margin: 0; font-size: 14px; line-height: 1.75; color: #374151;
  white-space: pre-wrap;
}
 
/* User card */
.em-user-card {
  display: flex; align-items: center; gap: 14px;
  background: #ffffff; border: 1px solid #e2e8f0;
  border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.em-user-avatar {
  width: 46px; height: 46px; border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: 700; color: #fff;
  flex-shrink: 0;
}
.em-user-name { margin: 0; font-size: 15px; font-weight: 600; color: #1e293b; }
.em-user-level { margin: 3px 0 0; font-size: 12px; color: #64748b; }
 
/* Info grid */
.em-info-grid { display: flex; flex-direction: column; gap: 4px; }
.em-info-row {
  display: flex; align-items: center; gap: 14px;
  padding: 10px 14px; border-radius: 8px;
  background: #ffffff; border: 1px solid #e2e8f0;
  transition: background 0.12s;
}
.em-info-row:hover { background: #f1f5f9; }
.em-info-icon { font-size: 16px; width: 24px; text-align: center; flex-shrink: 0; }
.em-info-label {
  display: block; font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;
}
.em-info-value { display: block; font-size: 13px; color: #374151; margin-top: 2px; font-weight: 500; }
 
/* ── Footer ── */
.em-footer {
  padding: 14px 22px; border-top: 1px solid #e2e8f0;
  background: #ffffff; display: flex; gap: 8px; align-items: center;
  flex-shrink: 0;
}
.em-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 20px; border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 13px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.15s;
}
.em-btn--approve {
  background: #16a34a; color: #fff;
}
.em-btn--approve:hover { background: #15803d; }
 
.em-btn--reject {
  background: #ef4444; color: #fff;
}
.em-btn--reject:hover { background: #dc2626; }
 
.em-btn--close {
  margin-left: auto;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #64748b;
}
.em-btn--close:hover { background: #e2e8f0; color: #475569; }
`;
 
 