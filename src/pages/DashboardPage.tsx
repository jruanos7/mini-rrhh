import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import { mockEmployees } from "../utils/mockData";
import type { User } from "../types";

function DashboardPage() {
  const navigate = useNavigate();

  // Obtener usuario guardado al iniciar sesión
  const user: User = {
    name: localStorage.getItem("userName") || "Usuario",
    role: localStorage.getItem("userRole") || "user",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    navigate("/");
  };

  const total = mockEmployees.length;
  const active = mockEmployees.filter((e) => e.status === "active").length;
  const onLeave = mockEmployees.filter((e) => e.status === "on_leave").length;

  const stats = [
    {
      label: "Total empleados",
      value: total,
      color: "#dbeafe",
      textColor: "#1e40af",
    },
    {
      label: "Activos",
      value: active,
      color: "#dcfce7",
      textColor: "#166534",
    },
    {
      label: "En permiso",
      value: onLeave,
      color: "#fef9c3",
      textColor: "#854d0e",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <Header user={user} onLogout={handleLogout} showWelcome={true} />

      {/* CONTENIDO */}
      <main style={{ padding: "24px" }}>
        <h2
          style={{
            color: "#1e293b",
            marginBottom: "24px",
          }}
        >
          Dashboard
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: stat.color,
                padding: "24px",
                borderRadius: "12px",
              }}
              className="flex-1 min-w-[160px] hover:shadow-lg transition-shadow duration-200"
            >
              <p
                style={{
                  margin: "0 0 4px",
                  color: stat.textColor,
                  fontSize: "14px",
                }}
              >
                {stat.label}
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: "36px",
                  fontWeight: 700,
                  color: stat.textColor,
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to="/empleados"
            style={{
              padding: "10px 20px",
              background: "#1e40af",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Ver empleados →
          </Link>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
