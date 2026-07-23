interface StatsBadgeProps {
  label: string;
  value: number;
  color?: string;
}

function StatsBadge({ label, value, color = "#1e40af" }: StatsBadgeProps) {
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        borderRadius: "8px",
        padding: "16px",
        minWidth: "160px",
        textAlign: "center",
        background: "white",
      }}
    >
      <div style={{ fontSize: "28px", fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
        {label}
      </div>
    </div>
  );
}

export default StatsBadge;
