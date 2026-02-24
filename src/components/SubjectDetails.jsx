const TERM_CONFIG = {
    "Per Semester": { color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
    "Per Term": { color: "#f97316", bg: "rgba(249,115,22,0.12)" },
    "Both": { color: "#10b981", bg: "rgba(16,185,129,0.12)" },
};

const PROGRAM_COLORS = {
    "BSIT": "#6366f1", "BSCS": "#06b6d4",
    "DIT": "#10b981", "BSECE": "#f59e0b", "BSBA": "#a855f7",
};

const InfoRow = ({ label, value, highlight }) => (
    <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "12px 0",
        borderBottom: "1px solid var(--border)",
        gap: "16px",
    }}>
        <span style={{ fontSize: "12px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600", flexShrink: 0 }}>
            {label}
        </span>
        <span style={{ fontSize: "14px", color: highlight ? "var(--accent-light)" : "var(--text)", fontWeight: highlight ? "700" : "400", textAlign: "right" }}>
            {value}
        </span>
    </div>
);

export default function SubjectDetails({ subject, onClose }) {
    const term = TERM_CONFIG[subject.term] || TERM_CONFIG["Per Semester"];
    const color = PROGRAM_COLORS[subject.programCode] || "#6366f1";

    return (
        <div
            style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1000, padding: "20px",
                animation: "fadeIn 0.2s ease both",
            }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-hover)",
                    borderRadius: "var(--radius)",
                    padding: "0",
                    maxWidth: "520px",
                    width: "100%",
                    maxHeight: "85vh",
                    overflowY: "auto",
                    position: "relative",
                    animation: "scaleIn 0.25s cubic-bezier(0.4,0,0.2,1) both",
                    boxShadow: "var(--shadow-lg)",
                }}
            >
                {/* Top color bar */}
                <div style={{ height: "3px", background: `linear-gradient(90deg, ${color}, var(--accent2))`, borderRadius: "var(--radius) var(--radius) 0 0" }} />

                {/* Header */}
                <div style={{
                    padding: "28px 28px 24px",
                    borderBottom: "1px solid var(--border)",
                    position: "relative",
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute", top: "20px", right: "20px",
                            width: "32px", height: "32px",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            background: "var(--surface2)",
                            color: "var(--text2)",
                            cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "16px",
                            transition: "all var(--transition)",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
                    >
                        ✕
                    </button>

                    <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: "600", marginBottom: "8px" }}>
                        Subject Details
                    </div>
                    <h2 style={{ fontSize: "28px", fontWeight: "800", color: color, fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em", marginBottom: "6px" }}>
                        {subject.code}
                    </h2>
                    <p style={{ fontSize: "16px", color: "var(--text)", fontWeight: "500", paddingRight: "40px" }}>
                        {subject.title}
                    </p>

                    <div style={{ display: "flex", gap: "8px", marginTop: "14px", flexWrap: "wrap" }}>
                        <span style={{
                            fontSize: "11px", padding: "4px 12px",
                            background: term.bg, color: term.color,
                            borderRadius: "99px", fontWeight: "700",
                            border: `1px solid ${term.color}30`,
                        }}>
                            {subject.term}
                        </span>
                        <span style={{
                            fontSize: "11px", padding: "4px 12px",
                            background: `${color}15`, color,
                            borderRadius: "99px", fontWeight: "700",
                            border: `1px solid ${color}25`,
                        }}>
                            {subject.programCode}
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: "24px 28px" }}>
                    <InfoRow label="Units / Credits" value={`${subject.units} units`} highlight />
                    <InfoRow label="Semester Offered" value={subject.semester} />
                    <InfoRow label="Year Level" value={`Year ${subject.yearLevel}`} />
                    <InfoRow label="Program" value={subject.programCode} />

                    {/* Prerequisites */}
                    <div style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ fontSize: "12px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600", marginBottom: "8px" }}>
                            Pre-requisites
                        </div>
                        {subject.prerequisites.length === 0 ? (
                            <span style={{ fontSize: "14px", color: "var(--text3)", fontStyle: "italic" }}>None</span>
                        ) : (
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {subject.prerequisites.map(p => (
                                    <span key={p} style={{
                                        fontSize: "12px", padding: "4px 12px",
                                        background: "rgba(245,158,11,0.1)", color: "var(--gold)",
                                        borderRadius: "99px", fontWeight: "600",
                                        border: "1px solid rgba(245,158,11,0.25)",
                                    }}>{p}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Co-requisites */}
                    <div style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ fontSize: "12px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600", marginBottom: "8px" }}>
                            Co-requisites
                        </div>
                        {subject.corequisites.length === 0 ? (
                            <span style={{ fontSize: "14px", color: "var(--text3)", fontStyle: "italic" }}>None</span>
                        ) : (
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {subject.corequisites.map(c => (
                                    <span key={c} style={{
                                        fontSize: "12px", padding: "4px 12px",
                                        background: "rgba(6,182,212,0.1)", color: "var(--accent2)",
                                        borderRadius: "99px", fontWeight: "600",
                                        border: "1px solid rgba(6,182,212,0.25)",
                                    }}>{c}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {subject.description && (
                        <div style={{ paddingTop: "16px" }}>
                            <div style={{ fontSize: "12px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600", marginBottom: "10px" }}>
                                Description
                            </div>
                            <p style={{ fontSize: "14px", color: "var(--text2)", lineHeight: 1.7 }}>
                                {subject.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: "16px 28px",
                    borderTop: "1px solid var(--border)",
                    display: "flex", justifyContent: "flex-end",
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "10px 24px",
                            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                            border: "none",
                            borderRadius: "var(--radius-sm)",
                            color: "white",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all var(--transition)",
                            fontFamily: "DM Sans, sans-serif",
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}