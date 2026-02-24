import { subjects } from "../data/mockData";

const STATUS_CONFIG = {
    "Active": { color: "var(--green)", bg: "var(--green-dim)" },
    "Phased Out": { color: "var(--red)", bg: "var(--red-dim)" },
    "Under Review": { color: "var(--orange)", bg: "var(--orange-dim)" },
};

export default function ProgramDetails({ program, onBack }) {
    const programSubjects = subjects.filter(s => s.programId === program.id);
    const status = STATUS_CONFIG[program.status] || STATUS_CONFIG["Active"];

    return (
        <div style={{ animation: "fadeUp 0.4s ease both" }}>
            {/* Back button */}
            <button
                onClick={onBack}
                style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "10px 18px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text2)",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                    marginBottom: "28px",
                    transition: "all var(--transition)",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--border-hover)";
                    e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text2)";
                }}
            >
                ← Back to Programs
            </button>

            {/* Hero section */}
            <div style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "36px",
                marginBottom: "24px",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* BG glow */}
                <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: "300px", height: "300px",
                    background: "radial-gradient(circle at top right, rgba(99,102,241,0.1), transparent 70%)",
                    pointerEvents: "none",
                }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, var(--accent), var(--accent2))" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                        <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: "600", marginBottom: "8px" }}>
                            Program Details
                        </div>
                        <h2 style={{ fontSize: "40px", fontWeight: "800", color: "var(--accent-light)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "10px" }}>
                            {program.code}
                        </h2>
                        <p style={{ fontSize: "17px", color: "var(--text)", fontWeight: "500", maxWidth: "600px" }}>
                            {program.name}
                        </p>
                    </div>
                    <div style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        padding: "8px 16px",
                        background: status.bg,
                        border: `1px solid ${status.color}40`,
                        borderRadius: "99px",
                        color: status.color,
                        fontSize: "13px",
                        fontWeight: "700",
                    }}>
                        {program.status}
                    </div>
                </div>

                <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.7, marginTop: "20px", maxWidth: "700px" }}>
                    {program.description}
                </p>

                {/* Stats */}
                <div style={{ display: "flex", gap: "0", marginTop: "28px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
                    {[
                        { label: "Type", value: program.type },
                        { label: "Duration", value: program.duration },
                        { label: "Total Units", value: program.totalUnits },
                        { label: "Year Levels", value: program.yearLevels.length },
                        { label: "Total Subjects", value: programSubjects.length },
                    ].map((stat, i) => (
                        <div key={stat.label} style={{
                            flex: 1,
                            paddingRight: "24px",
                            marginRight: "24px",
                            borderRight: i < 4 ? "1px solid var(--border)" : "none",
                        }}>
                            <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600", marginBottom: "6px" }}>
                                {stat.label}
                            </div>
                            <div style={{ fontSize: "20px", fontWeight: "800", fontFamily: "Syne, sans-serif", color: "var(--text)" }}>
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Year level sections */}
            <div>
                {program.yearLevels.map((yr, yi) => {
                    const yrSubjects = programSubjects.filter(s => s.yearLevel === yr);
                    return (
                        <div key={yr} style={{
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius)",
                            marginBottom: "16px",
                            overflow: "hidden",
                            animation: `fadeUp 0.4s ease ${yi * 0.08}s both`,
                        }}>
                            {/* Year header */}
                            <div style={{
                                padding: "16px 24px",
                                background: "var(--surface2)",
                                borderBottom: "1px solid var(--border)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <div style={{
                                        width: "28px", height: "28px",
                                        borderRadius: "8px",
                                        background: "var(--blue-dim)",
                                        border: "1px solid rgba(99,102,241,0.3)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "12px", fontWeight: "800",
                                        fontFamily: "Syne, sans-serif",
                                        color: "var(--accent-light)",
                                    }}>
                                        {yr}
                                    </div>
                                    <span style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "15px", color: "var(--text)" }}>
                                        Year {yr}
                                    </span>
                                </div>
                                <span style={{ fontSize: "12px", color: "var(--text2)" }}>
                                    {yrSubjects.length} subject{yrSubjects.length !== 1 ? "s" : ""}
                                </span>
                            </div>

                            {yrSubjects.length === 0 ? (
                                <div style={{ padding: "24px", color: "var(--text3)", fontSize: "14px", fontStyle: "italic" }}>
                                    No subjects listed for this year level.
                                </div>
                            ) : (
                                <div style={{ padding: "8px" }}>
                                    {yrSubjects.map((s, si) => (
                                        <div key={s.id} style={{
                                            display: "grid",
                                            gridTemplateColumns: "100px 1fr 60px 140px",
                                            gap: "16px",
                                            alignItems: "center",
                                            padding: "12px 16px",
                                            borderRadius: "var(--radius-sm)",
                                            transition: "background var(--transition)",
                                            cursor: "default",
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--accent-light)", fontFamily: "Syne, sans-serif" }}>
                                                {s.code}
                                            </div>
                                            <div style={{ fontSize: "13px", color: "var(--text)" }}>{s.title}</div>
                                            <div style={{ fontSize: "12px", color: "var(--text2)", textAlign: "center" }}>
                                                <span style={{ fontWeight: "700", color: "var(--text)" }}>{s.units}</span> units
                                            </div>
                                            <div style={{ fontSize: "11px", color: "var(--text3)" }}>{s.semester}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}