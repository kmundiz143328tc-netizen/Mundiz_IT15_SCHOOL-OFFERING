const STATUS_CONFIG = {
    "Active": { color: "var(--green)", bg: "var(--green-dim)", dot: true },
    "Phased Out": { color: "var(--red)", bg: "var(--red-dim)", dot: false },
    "Under Review": { color: "var(--orange)", bg: "var(--orange-dim)", dot: false },
};

const TYPE_ICONS = {
    "Bachelor's": "🎓",
    "Diploma": "📜",
    "Certificate": "📋",
};

const ACCENT_COLORS = ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#a855f7"];

export default function ProgramCard({ program, onClick, index = 0 }) {
    const status = STATUS_CONFIG[program.status] || STATUS_CONFIG["Active"];
    const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

    return (
        <div
            onClick={() => onClick(program)}
            style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                animation: `fadeUp 0.5s ease ${index * 0.07}s both`,
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = color + "50";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 40px ${color}20`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {/* Top gradient */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "2px",
                background: `linear-gradient(90deg, ${color}, transparent)`,
            }} />

            {/* Ambient */}
            <div style={{
                position: "absolute", top: "-20px", right: "-20px",
                width: "100px", height: "100px",
                background: `radial-gradient(circle, ${color}12, transparent 70%)`,
                pointerEvents: "none",
            }} />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                    <div style={{
                        fontSize: "10px", color: "var(--text3)", textTransform: "uppercase",
                        letterSpacing: "0.12em", fontWeight: "600", marginBottom: "6px",
                    }}>
                        {TYPE_ICONS[program.type] || "📚"} {program.type}
                    </div>
                    <div style={{
                        fontSize: "26px", fontWeight: "800",
                        fontFamily: "Playfair Display, serif",
                        color: color,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                    }}>
                        {program.code}
                    </div>
                </div>
                <div style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    padding: "5px 10px",
                    background: status.bg,
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: status.color,
                    border: `1px solid ${status.color}30`,
                    whiteSpace: "nowrap",
                }}>
                    {status.dot && (
                        <div style={{
                            width: "5px", height: "5px", borderRadius: "50%",
                            background: status.color,
                            animation: "pulse-glow 2s infinite",
                        }} />
                    )}
                    {program.status}
                </div>
            </div>

            {/* Name */}
            <p style={{
                fontSize: "13px",
                color: "var(--text2)",
                lineHeight: 1.5,
                marginBottom: "20px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}>
                {program.name}
            </p>

            {/* Stats row */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border)",
            }}>
                {[
                    { label: "Duration", value: program.duration },
                    { label: "Total Units", value: program.totalUnits },
                ].map(stat => (
                    <div key={stat.label}>
                        <div style={{ fontSize: "10px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600", marginBottom: "4px" }}>
                            {stat.label}
                        </div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text)", fontFamily: "Syne, sans-serif" }}>
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* View arrow */}
            <div style={{
                position: "absolute", bottom: "20px", right: "20px",
                color: "var(--text3)", fontSize: "18px",
                transition: "all var(--transition)",
            }}>
                →
            </div>
        </div>
    );
}