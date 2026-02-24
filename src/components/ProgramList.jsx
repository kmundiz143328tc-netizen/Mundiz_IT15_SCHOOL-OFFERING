import { useState } from "react";
import { programs } from "../data/mockData";
import ProgramCard from "./ProgramCard";
import ProgramDetails from "./ProgramDetails";
import FilterBar from "./FilterBar";

export default function ProgramList() {
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");

    const statuses = ["All", ...new Set(programs.map(p => p.status))];
    const types = ["All", ...new Set(programs.map(p => p.type))];

    const filtered = programs.filter(p =>
        (p.code.toLowerCase().includes(search.toLowerCase()) ||
            p.name.toLowerCase().includes(search.toLowerCase())) &&
        (statusFilter === "All" || p.status === statusFilter) &&
        (typeFilter === "All" || p.type === typeFilter)
    );

    if (selected) return <ProgramDetails program={selected} onBack={() => setSelected(null)} />;

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text)", marginBottom: "6px" }}>
                    Program Offerings
                </h2>
                <p style={{ color: "var(--text2)", fontSize: "15px" }}>
                    Browse and explore all available academic programs. Click any card for full details.
                </p>
            </div>

            {/* Summary bar */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
                {[
                    { label: "All", count: programs.length, filter: null },
                    { label: "Active", count: programs.filter(p => p.status === "Active").length, color: "var(--green)" },
                    { label: "Phased Out", count: programs.filter(p => p.status === "Phased Out").length, color: "var(--red)" },
                    { label: "Under Review", count: programs.filter(p => p.status === "Under Review").length, color: "var(--orange)" },
                ].map(s => (
                    <div key={s.label} style={{
                        padding: "8px 16px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "99px",
                        fontSize: "13px",
                        color: "var(--text2)",
                        display: "flex", alignItems: "center", gap: "8px",
                    }}>
                        {s.color && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.color }} />}
                        <span style={{ fontWeight: "600", color: "var(--text)" }}>{s.count}</span>
                        <span>{s.label}</span>
                    </div>
                ))}
            </div>

            <FilterBar
                search={search} onSearch={setSearch}
                searchPlaceholder="Search by code or program name..."
                filters={[
                    { label: "Status", value: statusFilter, options: statuses, onChange: setStatusFilter },
                    { label: "Type", value: typeFilter, options: types, onChange: setTypeFilter },
                ]}
            />

            {filtered.length === 0 ? (
                <div style={{
                    textAlign: "center", padding: "80px 20px",
                    color: "var(--text3)", fontSize: "15px",
                }}>
                    <div style={{ fontSize: "40px", marginBottom: "16px" }}>◈</div>
                    <div style={{ fontWeight: "600", color: "var(--text2)", marginBottom: "8px" }}>No programs found</div>
                    <div>Try adjusting your search or filters</div>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "18px",
                }}>
                    {filtered.map((p, i) => (
                        <ProgramCard key={p.id} program={p} onClick={setSelected} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}