const TERM_CONFIG = {
    "Per Semester": { color: "#6366f1", bg: "rgba(99,102,241,0.12)", label: "Semester" },
    "Per Term": { color: "#f97316", bg: "rgba(249,115,22,0.12)", label: "Term" },
    "Both": { color: "#10b981", bg: "rgba(16,185,129,0.12)", label: "Both" },
};

const PROGRAM_COLORS = {
    "BSIT": "#6366f1",
    "BSCS": "#06b6d4",
    "DIT": "#10b981",
    "BSECE": "#f59e0b",
    "BSBA": "#a855f7",
};

export default function SubjectCard({ subject, onClick, index = 0 }) {
    const term = TERM_CONFIG[subject.term] || TERM_CONFIG["Per Semester"];
    const color = PROGRAM_COLORS[subject.programCode] || "#6366f1";
    const hasPrereqs = subject.prerequisites.length > 0;

    return (
        <div
            onClick={() => onClick(subject)}
            style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "22px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                animation: `fadeUp 0.5s ease ${index * 0.06}s both`,
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = color + "50";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 40px ${color}18`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {/* Top bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${color}, transparent)` }} />

            {/* Ambient */}
            <div style={{
                position: "absolute", top: "-20px", right: "-20px",
                width: "80px", height: "80px",
                background: `radial-gradient(circle, ${color}10, transparent 70%)`,
                pointerEvents: "none",
            }} />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{
                    fontSize: "25px", fontWeight: "800",
                    fontFamily: "Playfair Display, serif",
                    color: color, letterSpacing: "-0.01em",
                }}>
                    {subject.code}
                </div>
                <span style={{
                    fontSize: "10px", fontWeight: "700",
                    padding: "3px 9px",
                    background: term.bg,
                    color: term.color,
                    borderRadius: "99px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    border: `1px solid ${term.color}30`,
                }}>
                    {term.label}
                </span>
            </div>

            {/* Title */}
            <p style={{
                fontSize: "14px", fontWeight: "500", color: "var(--text)",
                marginBottom: "16px", lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}>
                {subject.title}
            </p>

            {/* Tags row */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                <span style={{
                    fontSize: "10px", padding: "3px 8px",
                    background: `${color}15`, color,
                    borderRadius: "99px", fontWeight: "600",
                    border: `1px solid ${color}25`,
                }}>
                    {subject.programCode}
                </span>
                <span style={{
                    fontSize: "10px", padding: "3px 8px",
                    background: "var(--surface2)", color: "var(--text2)",
                    borderRadius: "99px",
                    border: "1px solid var(--border)",
                }}>
                    Year {subject.yearLevel}
                </span>
                {hasPrereqs && (
                    <span style={{
                        fontSize: "10px", padding: "3px 8px",
                        background: "rgba(245,158,11,0.1)", color: "var(--gold)",
                        borderRadius: "99px",
                        border: "1px solid rgba(245,158,11,0.25)",
                    }}>
                        Has prereqs
                    </span>
                )}
            </div>

            {/* Bottom */}
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingTop: "12px", borderTop: "1px solid var(--border)",
            }}>
                <div style={{ fontSize: "12px", color: "var(--text2)" }}>
                    <span style={{ fontWeight: "700", color: "var(--text)", fontSize: "16px" }}>{subject.units}</span> units
                </div>
                <div style={{ fontSize: "11px", color: "var(--text3)" }}>{subject.semester}</div>
            </div>
        </div>
    );
}