import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "./AdminNavbar";
import AdminStats from "./AdminStats";
import PendingExperience from "./PendingExperience";
import Approvedexperience from "./Approvedexperience";
import AdminUsers from "./AdminUsers";
import AdminUpcomingInterview from "./AdminUpcomingInterview";
 
// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background: "#eef2f7",
    fontFamily: "'Segoe UI', sans-serif",
  },
 
  // ── Navbar ──────────────────────────────────────────────────────────────────
  navbar: {
    background: "linear-gradient(135deg, #27235c, #97247e)",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: 52,
    boxShadow: "0 2px 12px rgba(39,35,92,0.35)",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  navLogoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  navTitle: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    margin: 0,
    letterSpacing: "0.3px",
  },
  navSub: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 10,
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  navBtn: (active) => ({
    background: active ? "rgba(255,255,255,0.22)" : "transparent",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: active ? 700 : 400,
    cursor: "pointer",
    transition: "background 0.15s",
    display: "flex",
    alignItems: "center",
    gap: 6,
  }),
  navLogout: {
    background: "#111",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    padding: "6px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    marginLeft: 6,
  },
 
  // ── Stat Cards ───────────────────────────────────────────────────────────────
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 14,
    marginBottom: 20,
  },
  statCard: (grad) => ({
    background: grad,
    borderRadius: 14,
    padding: "16px 18px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
  }),
  statLabel: {
    fontSize: 10,
    opacity: 0.9,
    marginBottom: 6,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },
  statValue: { fontSize: 32, fontWeight: 800, margin: 0, lineHeight: 1 },
  statIcon: { fontSize: 34, opacity: 0.55 },
 
  // ── Search/Filter bar ─────────────────────────────────────────────────────
  filterBar: {
    background: "#fff",
    borderRadius: 12,
    padding: "12px 16px",
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 18,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    border: "1.5px solid #e0e6f0",
    padding: "8px 12px",
    fontSize: 13,
    outline: "none",
    background: "#f7f9fc",
    color: "#333",
  },
  selectInput: {
    borderRadius: 8,
    border: "1.5px solid #e0e6f0",
    padding: "8px 12px",
    fontSize: 13,
    background: "#f7f9fc",
    outline: "none",
    color: "#333",
    minWidth: 130,
  },
  rejectedBtn: (active) => ({
    background: active ? "linear-gradient(135deg,#e01950,#ff4d7d)" : "#fff",
    border: "1.5px solid #e01950",
    color: active ? "#fff" : "#e01950",
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: 5,
  }),
 
  // ── Two-column layout ──────────────────────────────────────────────────────
  twoCol: {
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: 16,
    alignItems: "start",
  },
 
  // ── Left sidebar list ──────────────────────────────────────────────────────
  sidePanel: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    overflow: "hidden",
  },
  sectionHeader: (grad) => ({
    background: grad,
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    userSelect: "none",
  }),
  sectionHeaderLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  sectionHeaderBadge: {
    background: "rgba(255,255,255,0.3)",
    color: "#fff",
    borderRadius: 20,
    padding: "1px 9px",
    fontSize: 12,
    fontWeight: 700,
  },
  sectionHeaderArrow: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  listItem: (active) => ({
    padding: "12px 16px",
    borderBottom: "1px solid #f0f3f8",
    cursor: "pointer",
    background: active ? "#f0f7ff" : "#fff",
    borderLeft: active ? "4px solid #3b3fda" : "4px solid transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background 0.12s",
  }),
  listItemCompany: (active) => ({
    fontWeight: 700,
    fontSize: 14,
    color: active ? "#27235c" : "#2d3142",
    marginBottom: 2,
  }),
  listItemRole: {
    fontSize: 12,
    color: "#888",
  },
  listItemArrow: {
    color: "#aab",
    fontSize: 14,
  },
 
  // ── Right detail panel ─────────────────────────────────────────────────────
  detailPanel: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    overflow: "hidden",
    minHeight: 260,
  },
  detailHeader: (grad) => ({
    background: grad,
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  detailTitle: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 20,
    margin: 0,
  },
  detailSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    margin: "2px 0 0",
  },
  detailBadge: (color) => ({
    background: color,
    border: "2px solid rgba(255,255,255,0.5)",
    color: "#fff",
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 5,
  }),
  detailBody: {
    padding: 20,
  },
  roundsBox: {
    border: "1.5px solid #e0e8f5",
    borderRadius: 10,
    padding: "14px 18px",
    display: "inline-block",
    minWidth: 120,
  },
  roundsLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#3b3fda",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  searchInput: {
  width: "50%",
  padding: "10px 14px",
  fontSize: "16px",
},
  roundsValue: {
    fontSize: 22,
    fontWeight: 800,
    color: "#27235c",
  },
 
  // ── Rejected cards ─────────────────────────────────────────────────────────
  rejGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 14,
  },
  rejCard: {
    background: "#fff",
    border: "1.5px solid #ffd6de",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2px 8px rgba(224,25,80,0.06)",
  },
  rejBadge: {
    background: "linear-gradient(135deg,#e01950,#ff4d7d)",
    color: "#fff",
    borderRadius: 6,
    padding: "2px 10px",
    fontSize: 11,
    fontWeight: 700,
    display: "inline-block",
    marginBottom: 10,
  },
  deleteBtn: {
    background: "transparent",
    border: "1.5px solid #e01950",
    color: "#e01950",
    borderRadius: 8,
    padding: "5px 12px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
 
  // ── Full-width section card (users/interviews) ────────────────────────────
  sectionCard: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    overflow: "hidden",
  },
  sectionCardHeader: (grad) => ({
    background: grad,
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  }),
  sectionCardTitle: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    margin: 0,
  },
  sectionCardBody: {
    padding: 20,
  },
};
 
// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, gradient }) {
  return (
    <div style={S.statCard(gradient)}>
      <div>
        <div style={S.statLabel}>{label}</div>
        <div style={S.statValue}>{value}</div>
      </div>
      <span style={S.statIcon}>{icon}</span>
    </div>
  );
}
 
export default function AdminDashboard() {
  const [view, setView] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showRejected, setShowRejected] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);
  const [pendingOpen, setPendingOpen] = useState(true);
  const [approvedOpen, setApprovedOpen] = useState(true);
 
  const loadAllData = async () => {
    try {
      const usersRes = await api.get("/user");
      const expRes = await api.get("/experience");
      setUsers(usersRes.data);
      setExperiences(expRes.data);
    } catch (err) {
      console.error(err);
    }
  };
 
  useEffect(() => {
    loadAllData();
  }, []);
 
  // ── FIX 1: Search now filters correctly across company AND role.
  // Also clears selectedExp if it no longer appears in the filtered approved list,
  // so the detail panel stays in sync when the user searches/filters.
  const filteredExperiences = experiences.filter((exp) => {
    const q = search.toLowerCase().trim();
    const searchMatch =
      !q ||
      exp.company?.toLowerCase().includes(q) ||
      exp.role?.toLowerCase().includes(q);
    const statusMatch =
      statusFilter === "all" || exp.status?.toLowerCase() === statusFilter;
    return searchMatch && statusMatch;
  });
 
  const approvedExperiences = filteredExperiences.filter(
    (e) => e.status?.toLowerCase() === "approved"
  );
  const rejectedExperiences = filteredExperiences.filter(
    (e) => e.status?.toLowerCase() === "rejected"
  );
  const pendingExperiences = filteredExperiences.filter(
    (e) => e.status?.toLowerCase() === "pending"
  );
 
  // Use the total (unfiltered) counts for stat cards so they always reflect reality
  const allApproved = experiences.filter((e) => e.status?.toLowerCase() === "approved");
  const allPending  = experiences.filter((e) => e.status?.toLowerCase() === "pending");
  const totalCompanies = [...new Set(experiences.map((e) => e.company))].length;
 
  // ── FIX 1 (continued): clear selectedExp when it falls outside filtered results
  useEffect(() => {
    if (selectedExp && !approvedExperiences.find((e) => e.id === selectedExp.id)) {
      setSelectedExp(null);
    }
  }, [search, statusFilter]);
 
  // ── FIX 2: Removed the auto-select useEffect that was picking approvedExperiences[0].
  // Nothing is selected by default — the user must click an item to see its details.
 
  const deleteRejected = async (id) => {
    if (!window.confirm("Delete this rejected experience?")) return;
    try {
      await api.delete(`/admin/experience/${id}`);
      loadAllData();
    } catch (err) {
      alert("Delete failed ❌");
    }
  };
 
  const getDetailGradient = (status) => {
    if (status?.toLowerCase() === "approved")
      return "linear-gradient(135deg,#1a7a4a,#28a745)";
    if (status?.toLowerCase() === "pending")
      return "linear-gradient(135deg,#b8860b,#f4a800)";
    return "linear-gradient(135deg,#e01950,#ff4d7d)";
  };
 
  const getStatusBadgeColor = (status) => {
    if (status?.toLowerCase() === "approved") return "rgba(0,0,0,0.2)";
    if (status?.toLowerCase() === "pending") return "rgba(0,0,0,0.2)";
    return "rgba(0,0,0,0.2)";
  };
 
  return (
    <div style={S.page}>
      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <div style={S.navbar}>
        <div style={S.navBrand}>
          <div style={S.navLogoBox}>🛡️</div>
          <div>
            <p style={S.navTitle}>InterviewHub</p>
            <p style={S.navSub}>Admin Panel</p>
          </div>
        </div>
        <div style={S.navActions}>
          <button style={S.navBtn(view === "dashboard")} onClick={() => setView("dashboard")}>
            <span>📊</span> Dashboard
          </button>
          <button style={S.navBtn(view === "users")} onClick={() => setView("users")}>
            <span>👥</span> Users
          </button>
          <button style={S.navBtn(view === "interviews")} onClick={() => setView("interviews")}>
            <span>📅</span> Interviews
          </button>
          <button
            style={S.navLogout}
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
          >
            Logout
          </button>
        </div>
      </div>
 
      {/* ── PAGE BODY ─────────────────────────────────────────────────────── */}
      <div style={{ padding: "20px", maxWidth: 1400, margin: "0 auto" }}>
 
        {/* ── SEARCH + FILTER ─────────────────────────────────────────────── */}
        {view === "dashboard" && (
          <div style={S.filterBar}>
            <input
              style={S.searchInput }
              placeholder="🔍 Search by company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              style={S.selectInput}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                // Reset rejected view if the new filter hides rejected items
                if (e.target.value !== "all" && e.target.value !== "rejected") {
                  setShowRejected(false);
                }
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            {/* Always show the rejected button based on unfiltered count so it's never hidden by search */}
            {experiences.filter((e) => e.status?.toLowerCase() === "rejected").length > 0 && (
              <button
                style={S.rejectedBtn(showRejected)}
                onClick={() => setShowRejected(!showRejected)}
              >
                ❌ Rejected ({experiences.filter((e) => e.status?.toLowerCase() === "rejected").length})
              </button>
            )}
          </div>
        )}
 
      {/* ── DASHBOARD VIEW ──────────────────────────────────────────────── */}
        {view === "dashboard" && (
          <>
            {/* STAT CARDS — always use unfiltered totals */}
            <div style={S.statsGrid}>
              <StatCard
                label="Total Experiences"
                value={experiences.length}
                icon="📋"
                gradient="linear-gradient(135deg,#27235c,#3b3fda)"
              />
              <StatCard
                label="Pending Approvals"
                value={allPending.length}
                icon="⏳"
                gradient="linear-gradient(135deg,#b8860b,#f4a800)"
              />
              <StatCard
                label="Approved"
                value={allApproved.length}
                icon="✅"
                gradient="linear-gradient(135deg,#1a7a4a,#28a745)"
              />
              <StatCard
                label="Total Users"
                value={users.length}
                icon="👥"
                gradient="linear-gradient(135deg,#97247e,#c13aa5)"
              />
              <StatCard
                label="Companies"
                value={totalCompanies}
                icon="🏢"
                gradient="linear-gradient(135deg,#e01950,#ff4d7d)"
              />
            </div>
 
            {/* PENDING + APPROVED — two-column layout */}
            {!showRejected && (
              <div style={S.twoCol}>
                {/* LEFT: sidebar list */}
                <div style={S.sidePanel}>
                  {/* Pending section header */}
                  <div
                    style={S.sectionHeader("linear-gradient(135deg,#b8860b,#f4a800)")}
                    onClick={() => setPendingOpen(!pendingOpen)}
                  >
                    <div style={S.sectionHeaderLabel}>
                      <span>⏳</span>
                      <span>PENDING</span>
                      <span style={{ fontWeight: 400, textTransform: "none", opacity: 0.9, fontSize: 13 }}>
                        Awaiting Approval
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={S.sectionHeaderBadge}>{pendingExperiences.length}</span>
                      <span style={S.sectionHeaderArrow}>{pendingOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  {pendingOpen && (
                    <PendingExperience
                      experiences={filteredExperiences}
                      refresh={loadAllData}
                    />
                  )}
 
                  {/* Approved section header */}
                  <div
                    style={S.sectionHeader("linear-gradient(135deg,#1a7a4a,#28a745)")}
                    onClick={() => setApprovedOpen(!approvedOpen)}
                  >
                    <div style={S.sectionHeaderLabel}>
                      <span>✅</span>
                      <span>APPROVED</span>
                      <span style={{ fontWeight: 400, textTransform: "none", opacity: 0.9, fontSize: 13 }}>
                        Live Experiences
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={S.sectionHeaderBadge}>{approvedExperiences.length}</span>
                      <span style={S.sectionHeaderArrow}>{approvedOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  {approvedOpen && (
                    <div>
                      {approvedExperiences.map((exp) => (
                        <div
                          key={exp.id}
                          style={S.listItem(selectedExp?.id === exp.id)}
                          onClick={() => setSelectedExp(exp)}
                        >
                          <div>
                            <div style={S.listItemCompany(selectedExp?.id === exp.id)}>
                              {exp.company}
                            </div>
                            <div style={S.listItemRole}>{exp.role}</div>
                          </div>
                          <span style={S.listItemArrow}>›</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
 
                {/* RIGHT: detail panel */}
                <div style={S.detailPanel}>
                  {selectedExp ? (
                    <>
                      <div style={S.detailHeader(getDetailGradient(selectedExp.status))}>
                        <div>
                          <div style={S.detailTitle}>{selectedExp.company}</div>
                          <div style={S.detailSub}>{selectedExp.role}</div>
                        </div>
                        <div style={S.detailBadge(getStatusBadgeColor(selectedExp.status))}>
                          {selectedExp.status?.toLowerCase() === "approved" ? "✅" : "⏳"}
                          {selectedExp.status?.charAt(0).toUpperCase() + selectedExp.status?.slice(1)}
                        </div>
                      </div>
                      <div style={S.detailBody}>
                        <div style={S.roundsBox}>
                          <div style={S.roundsLabel}>
                            <span>📋</span> ROUNDS
                          </div>
                          <div style={S.roundsValue}>{selectedExp.rounds ?? 1}</div>
                        </div>
                        <div style={{ marginTop: 16 }}>
                          <Approvedexperience
                            experiences={[selectedExp]}
                            refresh={loadAllData}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 260,
                        color: "#aab",
                        fontSize: 14,
                      }}
                    >
                      Select an experience to view details
                    </div>
                  )}
                </div>
              </div>
            )}
 
            {/* REJECTED VIEW */}
            {showRejected && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span
                    style={{
                      background: "linear-gradient(135deg,#e01950,#ff4d7d)",
                      borderRadius: 8,
                      padding: "4px 14px",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    ❌ REJECTED
                  </span>
                  <span style={{ color: "#666", fontSize: 14 }}>
                    {rejectedExperiences.length} experience{rejectedExperiences.length !== 1 ? "s" : ""} rejected
                  </span>
                </div>
                <div style={S.rejGrid}>
                  {rejectedExperiences.map((exp) => (
                    <div style={S.rejCard} key={exp.id}>
                      <h6 style={{ fontWeight: 700, marginBottom: 4, color: "#27235c" }}>
                        {exp.company}
                      </h6>
                      <p style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>{exp.role}</p>
                      <span style={S.rejBadge}>Rejected</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
 
        {/* ── USERS VIEW ──────────────────────────────────────────────────── */}
        {view === "users" && (
          <div style={S.sectionCard}>
            <div style={S.sectionCardHeader("linear-gradient(135deg,#27235c,#3b3fda)")}>
              <span style={{ fontSize: 16 }}>👥</span>
              <span style={S.sectionCardTitle}>User Management</span>
            </div>
            <div style={S.sectionCardBody}>
              <AdminUsers users={users} refresh={loadAllData} />
            </div>
          </div>
        )}
 
        {/* ── INTERVIEWS VIEW ─────────────────────────────────────────────── */}
        {view === "interviews" && (
          <div style={S.sectionCard}>
            <div style={S.sectionCardHeader("linear-gradient(135deg,#97247e,#c13aa5)")}>
              <span style={{ fontSize: 16 }}>📅</span>
              <span style={S.sectionCardTitle}>Upcoming Interviews</span>
            </div>
            <div style={S.sectionCardBody}>
              <AdminUpcomingInterview />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 