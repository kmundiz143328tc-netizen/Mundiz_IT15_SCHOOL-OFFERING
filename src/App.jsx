import { useState } from "react";
import Dashboard from "./components/Dashboard";
import ProgramList from "./components/ProgramList";
import SubjectList from "./components/SubjectList";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "programs", label: "Programs", icon: "◈" },
  { id: "subjects", label: "Subjects", icon: "◇" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        width: "260px",
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "0",
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        zIndex: 100,
        backdropFilter: "blur(20px)",
      }}>
        {/* Logo */}
        <div style={{
          padding: "32px 28px 24px",
          borderBottom: "1px solid var(--border)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px", height: "40px",
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", fontWeight: "800",
              fontFamily: "Syne, sans-serif",
              boxShadow: "0 0 20px var(--glow)",
              flexShrink: 0,
            }}>M</div>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "15px", color: "var(--text)", lineHeight: 1.2 }}>
                Mundiz School
              </div>
              <div style={{ fontSize: "11px", color: "var(--text2)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Offerings Portal
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "20px 16px", flex: 1 }}>
          <div style={{ fontSize: "10px", color: "var(--text3)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600", padding: "0 12px", marginBottom: "10px" }}>
            Navigation
          </div>
          {NAV_ITEMS.map((item, i) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  cursor: "pointer",
                  background: active
                    ? "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.1))"
                    : "transparent",
                  color: active ? "var(--accent-light)" : "var(--text2)",
                  fontWeight: active ? "600" : "400",
                  fontSize: "14px",
                  marginBottom: "4px",
                  transition: "all var(--transition)",
                  textAlign: "left",
                  position: "relative",
                  borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                  animation: `slideRight 0.4s ease ${i * 0.08}s both`,
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text2)";
                  }
                }}
              >
                <span style={{ fontSize: "18px", lineHeight: 1 }}>{item.icon}</span>
                <span>{item.label}</span>
                {active && (
                  <div style={{
                    marginLeft: "auto",
                    width: "6px", height: "6px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 8px var(--accent)",
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom info */}
        <div style={{
          padding: "20px 28px",
          borderTop: "1px solid var(--border)",
          fontSize: "12px",
          color: "var(--text3)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 8px var(--green)",
              animation: "pulse-glow 2s infinite",
            }} />
            <span>System Online</span>
          </div>
          <div style={{ marginTop: "6px", color: "var(--text3)" }}>A.Y. 2024–2025</div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{
        marginLeft: "260px",
        flex: 1,
        minHeight: "100vh",
        background: "var(--bg)",
        position: "relative",
      }}>
        {/* Ambient background */}
        <div style={{
          position: "fixed",
          top: 0, right: 0,
          width: "600px", height: "600px",
          background: "radial-gradient(circle at center, rgba(99,102,241,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />
        <div style={{
          position: "fixed",
          bottom: 0, left: "260px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle at center, rgba(6,182,212,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* Page header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(7,11,24,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600" }}>
              Portal
            </div>
            <h1 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text)", lineHeight: 1.2 }}>
              {NAV_ITEMS.find(n => n.id === page)?.label}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              padding: "6px 14px",
              background: "var(--surface2)",
              borderRadius: "99px",
              fontSize: "12px",
              color: "var(--text2)",
              border: "1px solid var(--border)",
            }}>
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: "40px", position: "relative", zIndex: 1 }}>
          <div key={page} style={{ animation: "fadeUp 0.4s ease both" }}>
            {page === "dashboard" && <Dashboard />}
            {page === "programs" && <ProgramList />}
            {page === "subjects" && <SubjectList />}
          </div>
        </div>
      </main>
    </div>
  );
}