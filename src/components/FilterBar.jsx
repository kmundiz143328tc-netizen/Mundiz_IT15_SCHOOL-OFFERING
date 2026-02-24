export default function FilterBar({ search, onSearch, searchPlaceholder, filters }) {
    return (
        <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "28px",
            padding: "16px 20px",
            background: "var(--surface)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
        }}>
            {/* Search */}
            <div style={{ position: "relative", flex: "1 1 240px", minWidth: "200px" }}>
                <span style={{
                    position: "absolute", left: "14px", top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text3)", fontSize: "15px",
                    pointerEvents: "none",
                }}>⌕</span>
                <input
                    value={search}
                    onChange={e => onSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                    style={{
                        width: "100%",
                        padding: "10px 14px 10px 38px",
                        background: "var(--surface2)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--text)",
                        fontSize: "14px",
                        outline: "none",
                        transition: "all var(--transition)",
                    }}
                    onFocus={e => {
                        e.target.style.borderColor = "var(--accent)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
                    }}
                    onBlur={e => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                    }}
                />
            </div>

            {/* Divider */}
            <div style={{ width: "1px", height: "32px", background: "var(--border)", flexShrink: 0 }} />

            {/* Filter dropdowns */}
            {filters.map(f => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "12px", color: "var(--text3)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                        {f.label}
                    </span>
                    <select
                        value={f.value}
                        onChange={e => f.onChange(e.target.value)}
                        style={{
                            padding: "8px 32px 8px 12px",
                            background: "var(--surface2)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius-sm)",
                            color: f.value !== "All" ? "var(--accent-light)" : "var(--text2)",
                            fontSize: "13px",
                            outline: "none",
                            cursor: "pointer",
                            fontWeight: f.value !== "All" ? "600" : "400",
                            transition: "all var(--transition)",
                            appearance: "none",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238b9dc3' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 10px center",
                            minWidth: "120px",
                        }}
                        onFocus={e => e.target.style.borderColor = "var(--accent)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"}
                    >
                        {f.options.map(o => <option key={o} value={o} style={{ background: "var(--surface2)" }}>{o}</option>)}
                    </select>
                </div>
            ))}

            {/* Active filter count */}
            {filters.some(f => f.value !== "All") && (
                <button
                    onClick={() => filters.forEach(f => f.onChange("All"))}
                    style={{
                        padding: "8px 14px",
                        background: "var(--blue-dim)",
                        border: "1px solid rgba(99,102,241,0.3)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--accent-light)",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all var(--transition)",
                        whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.25)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--blue-dim)"}
                >
                    ✕ Clear filters
                </button>
            )}
        </div>
    );
}