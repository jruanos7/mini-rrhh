// src/pages/EmployeeDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployees"; // ajustá el path si tu archivo se llama distinto

const statusLabels: Record<string, { text: string; className: string }> = {
  active: { text: "Activo", className: "bg-green-100 text-green-700" },
  on_leave: { text: "En permiso", className: "bg-yellow-100 text-yellow-700" },
  inactive: { text: "Inactivo", className: "bg-red-100 text-red-700" },
};

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employeeId = id ? Number(id) : null;

  const { data: employee, isLoading, isError } = useEmployee(employeeId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isError || !employee) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-semibold">
            Error al cargar el empleado
          </p>
        </div>
        <button
          onClick={() => navigate("/empleados")}
          className="mt-4 flex items-center gap-2 text-blue-700 hover:underline"
        >
          ← Volver
        </button>
      </div>
    );
  }

  const salarioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(employee.salary);

  const fechaFormateada = new Date(employee.hireDate).toLocaleDateString(
    "es-AR",
  );

  const status = statusLabels[employee.status];

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate("/empleados")}
        className="mb-6 flex items-center gap-2 text-blue-700 hover:underline"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          {employee.avatarUrl ? (
            <img
              src={employee.avatarUrl}
              alt={employee.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-semibold">
              {employee.name.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{employee.name}</h1>
            <p className="text-gray-500">{employee.position}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{employee.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="font-medium">{employee.phone ?? "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Departamento</p>
            <p className="font-medium">{employee.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estado</p>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${status.className}`}
            >
              {status.text}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Salario</p>
            <p className="font-medium">{salarioFormateado}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de ingreso</p>
            <p className="font-medium">{fechaFormateada}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
