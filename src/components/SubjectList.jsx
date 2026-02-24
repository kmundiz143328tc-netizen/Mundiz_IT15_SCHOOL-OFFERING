import { useState } from "react";
import { subjects } from "../data/mockData";
import SubjectCard from "./SubjectCard";
import SubjectDetails from "./SubjectDetails";
import FilterBar from "./FilterBar";

export default function SubjectList() {
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [semFilter, setSemFilter] = useState("All");
    const [prereqFilter, setPrereqFilter] = useState("All");
    const [programFilter, setProgramFilter] = useState("All");
    const [termFilter, setTermFilter] = useState("All");

    const semesters = ["All", ...new Set(subjects.map(s => s.semester))];
    const programCodes = ["All", ...new Set(subjects.map(s => s.programCode))];
    const terms = ["All", "Per Semester", "Per Term", "Both"];

    const filtered = subjects.filter(s =>
        (s.code.toLowerCase().includes(search.toLowerCase()) ||
            s.title.toLowerCase().includes(search.toLowerCase())) &&
        (semFilter === "All" || s.semester === semFilter) &&
        (programFilter === "All" || s.programCode === programFilter) &&
        (termFilter === "All" || s.term === termFilter) &&
        (prereqFilter === "All" ||
            (prereqFilter === "With Prerequisites" ? s.prerequisites.length > 0 : s.prerequisites.length === 0))
    );

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "50px", fontWeight: "800", color: "var(--text)", marginBottom: "6px" }}>
                    Subject Offerings
                </h2>
                <p style={{ color: "var(--text2)", fontSize: "15px" }}>
                    Explore all subjects, their semester offerings, and prerequisite requirements.
                </p>
            </div>

            {/* Term badges quick summary */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
                {[
                    { label: "Total Subjects", count: subjects.length, color: "#6366f1" },
                    { label: "Per Semester", count: subjects.filter(s => s.term === "Per Semester").length, color: "#6366f1" },
                    { label: "Per Term", count: subjects.filter(s => s.term === "Per Term").length, color: "#f97316" },
                    { label: "Both", count: subjects.filter(s => s.term === "Both").length, color: "#10b981" },
                    { label: "With Prerequisites", count: subjects.filter(s => s.prerequisites.length > 0).length, color: "#f59e0b" },
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
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.color }} />
                        <span style={{ fontWeight: "700", color: "var(--text)" }}>{s.count}</span>
                        <span>{s.label}</span>
                    </div>
                ))}
            </div>

            <FilterBar
                search={search} onSearch={setSearch}
                searchPlaceholder="Search by subject code or title..."
                filters={[
                    { label: "Semester", value: semFilter, options: semesters, onChange: setSemFilter },
                    { label: "Term", value: termFilter, options: terms, onChange: setTermFilter },
                    { label: "Program", value: programFilter, options: programCodes, onChange: setProgramFilter },
                    { label: "Prerequisites", value: prereqFilter, options: ["All", "With Prerequisites", "No Prerequisites"], onChange: setPrereqFilter },
                ]}
            />

            {/* Results count */}
            {(search || semFilter !== "All" || termFilter !== "All" || programFilter !== "All" || prereqFilter !== "All") && (
                <div style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "16px" }}>
                    Showing <span style={{ fontWeight: "700", color: "var(--text)" }}>{filtered.length}</span> of {subjects.length} subjects
                </div>
            )}

            {filtered.length === 0 ? (
                <div style={{
                    textAlign: "center", padding: "80px 20px",
                    color: "var(--text3)", fontSize: "15px",
                }}>
                    <div style={{ fontSize: "40px", marginBottom: "16px" }}>◇</div>
                    <div style={{ fontWeight: "600", color: "var(--text2)", marginBottom: "8px" }}>No subjects found</div>
                    <div>Try adjusting your search or filters</div>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
                    gap: "16px",
                }}>
                    {filtered.map((s, i) => (
                        <SubjectCard key={s.id} subject={s} onClick={setSelected} index={i} />
                    ))}
                </div>
            )}

            {selected && <SubjectDetails subject={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}