import { programs, subjects } from "../data/mockData";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

const StatCard = ({ label, value, icon, color, delay = 0, sub }) => (
    <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        animation: `fadeUp 0.5s ease ${delay}s both`,
        transition: "all var(--transition)",
        cursor: "default",
    }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = color + "44";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 32px ${color}22`;
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
        }}
    >
        {/* Ambient glow */}
        <div style={{
            position: "absolute", top: 0, right: 0,
            width: "120px", height: "120px",
            background: `radial-gradient(circle at top right, ${color}15, transparent 70%)`,
            pointerEvents: "none",
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
                <div style={{ fontSize: "12px", color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600", marginBottom: "10px" }}>
                    {label}
                </div>
                <div style={{ fontSize: "42px", fontWeight: "800", fontFamily: "Playfair Display, serif", color: "var(--text)", lineHeight: 1 }}>
                    {value}
                </div>
                {sub && <div style={{ fontSize: "12px", color: "var(--text2)", marginTop: "8px" }}>{sub}</div>}
            </div>
            <div style={{
                width: "48px", height: "48px",
                borderRadius: "12px",
                background: color + "20",
                border: `1px solid ${color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px",
                flexShrink: 0,
            }}>
                {icon}
            </div>
        </div>

        {/* Bottom accent */}
        <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${color}, transparent)`,
        }} />
    </div>
);

const COLORS = ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: "var(--surface2)",
            border: "1px solid var(--border-hover)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 16px",
            fontSize: "13px",
        }}>
            <div style={{ color: "var(--text2)", marginBottom: "4px" }}>{label}</div>
            <div style={{ color: "var(--accent-light)", fontWeight: "600" }}>{payload[0].value} subjects</div>
        </div>
    );
};

export default function Dashboard() {
    const active = programs.filter(p => p.status === "Active").length;
    const phasedOut = programs.filter(p => p.status === "Phased Out").length;
    const underReview = programs.filter(p => p.status === "Under Review").length;
    const withPrereqs = subjects.filter(s => s.prerequisites.length > 0).length;

    const semesterCounts = subjects.reduce((acc, s) => {
        acc[s.semester] = (acc[s.semester] || 0) + 1;
        return acc;
    }, {});
    const barData = Object.entries(semesterCounts).map(([name, count]) => ({ name, count }));

    const pieData = [
        { name: "Active", value: active },
        { name: "Phased Out", value: phasedOut },
        { name: "Under Review", value: underReview },
    ];

    const termData = ["Per Semester", "Per Term", "Both"].map(t => ({
        name: t,
        count: subjects.filter(s => s.term === t).length,
    }));

    const recentPrograms = [...programs]
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        .slice(0, 4);

    const statusColors = { Active: "var(--green)", "Phased Out": "var(--red)", "Under Review": "var(--orange)" };

    return (
        <div>
            {/* Welcome */}
            <div style={{ marginBottom: "36px" }}>
                <h2 style={{ fontSize: "50px", fontWeight: "800", color: "var(--text)", marginBottom: "6px" }}>
                    Welcome back 👋
                </h2>
                <p style={{ color: "var(--text2)", fontSize: "15px" }}>
                    Here's what's happening with your school offerings today.
                </p>
            </div>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px", marginBottom: "32px" }}>
                <StatCard label="Total Programs" value={programs.length} icon="◈" color="#6366f1" delay={0} sub={`${active} active`} />
                <StatCard label="Total Subjects" value={subjects.length} icon="◇" color="#06b6d4" delay={0.05} sub="across all programs" />
                <StatCard label="Active Programs" value={active} icon="✦" color="#10b981" delay={0.1} />
                <StatCard label="With Prerequisites" value={withPrereqs} icon="⟶" color="#f59e0b" delay={0.15} sub="subjects" />
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "18px", marginBottom: "28px" }}>
                {/* Bar chart */}
                <div style={{
                    background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px",
                    animation: "fadeUp 0.5s ease 0.2s both",
                    gridColumn: "span 2",
                }}>
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600" }}>Chart</div>
                        <h3 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text)" }}>Subjects per Semester</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={barData} barSize={36}>
                            <XAxis dataKey="name" tick={{ fill: "#8b9dc3", fontSize: 12, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "#8b9dc3", fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                            <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                            <defs>
                                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie chart */}
                <div style={{
                    background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px",
                    animation: "fadeUp 0.5s ease 0.25s both",
                }}>
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600" }}>Breakdown</div>
                        <h3 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text)" }}>Program Status</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" strokeWidth={0}>
                                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: "var(--surface2)", border: "1px solid var(--border-hover)", borderRadius: "8px", fontSize: "12px", color: "var(--text)" }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                        {pieData.map((d, i) => (
                            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS[i], flexShrink: 0 }} />
                                <span style={{ color: "var(--text2)", flex: 1 }}>{d.name}</span>
                                <span style={{ color: "var(--text)", fontWeight: "600" }}>{d.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                {/* Term distribution */}
                <div style={{
                    background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px",
                    animation: "fadeUp 0.5s ease 0.3s both",
                }}>
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600" }}>Distribution</div>
                        <h3 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text)" }}>Subjects by Term</h3>
                    </div>
                    {termData.map((t, i) => {
                        const max = Math.max(...termData.map(x => x.count));
                        const pct = max > 0 ? (t.count / max) * 100 : 0;
                        return (
                            <div key={t.name} style={{ marginBottom: i < termData.length - 1 ? "16px" : "0" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                                    <span style={{ fontSize: "13px", color: "var(--text2)" }}>{t.name}</span>
                                    <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text)" }}>{t.count}</span>
                                </div>
                                <div style={{ height: "6px", background: "var(--surface2)", borderRadius: "99px", overflow: "hidden" }}>
                                    <div style={{
                                        height: "100%",
                                        width: `${pct}%`,
                                        background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[i + 1] || COLORS[0]})`,
                                        borderRadius: "99px",
                                        transition: "width 1s ease",
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent programs */}
                <div style={{
                    background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px",
                    animation: "fadeUp 0.5s ease 0.35s both",
                }}>
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600" }}>Recent</div>
                        <h3 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text)" }}>Latest Programs</h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {recentPrograms.map((p, i) => (
                            <div key={p.id} style={{
                                display: "flex", alignItems: "center", gap: "14px",
                                padding: "12px",
                                background: "var(--surface2)",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid var(--border)",
                                animation: `fadeUp 0.4s ease ${0.35 + i * 0.07}s both`,
                            }}>
                                <div style={{
                                    width: "36px", height: "36px",
                                    borderRadius: "8px",
                                    background: `${COLORS[i % COLORS.length]}20`,
                                    border: `1px solid ${COLORS[i % COLORS.length]}30`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "10px", fontWeight: "700", fontFamily: "Syne, sans-serif",
                                    color: COLORS[i % COLORS.length],
                                    flexShrink: 0,
                                }}>
                                    {p.code.slice(0, 2)}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {p.code}
                                    </div>
                                    <div style={{ fontSize: "11px", color: "var(--text2)" }}>{p.dateAdded}</div>
                                </div>
                                <div style={{
                                    fontSize: "10px", fontWeight: "600",
                                    padding: "3px 8px",
                                    borderRadius: "99px",
                                    background: p.status === "Active" ? "var(--green-dim)" : p.status === "Phased Out" ? "var(--red-dim)" : "var(--orange-dim)",
                                    color: statusColors[p.status],
                                    whiteSpace: "nowrap",
                                }}>
                                    {p.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}