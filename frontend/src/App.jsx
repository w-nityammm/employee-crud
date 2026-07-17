import { useEffect, useState } from "react";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "./services/api";
import EmployeeModal from "./components/EmployeeModal";

function App() {

  const [employees, setEmployees] = useState([]);

  const emptyEmployee = {
    full_name: "",
    email: "",
    phone_number: "",
    designation: "",
    date_of_joining: "",
    status: "Active",
  };

  const [employee, setEmployee] = useState(emptyEmployee);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [search, setSearch] = useState("");

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function validateEmployee() {

    const newErrors = {};

    if (!employee.full_name.trim())
      newErrors.full_name = "Full Name is required.";

    if (!employee.email.trim())
      newErrors.email = "Email is required.";

    if (!employee.phone_number.trim())
      newErrors.phone_number = "Phone Number is required.";

    if (!employee.designation.trim())
      newErrors.designation = "Designation is required.";

    if (!employee.date_of_joining)
      newErrors.date_of_joining = "Date of Joining is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function loadEmployees() {
    const data = await getEmployees();
    setEmployees(data);
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function saveEmployee() {
    try {
      if (!validateEmployee()) {
        return;
      }
      if (isEditing) {
        await updateEmployee(employee.id, employee);
        showMessage("Employee updated successfully!", "success");
      } else {
        await addEmployee(employee);
        showMessage("Employee added successfully!", "success");
      }
      await loadEmployees();
      setEmployee(emptyEmployee);
      setIsEditing(false);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      if (error.message === "Email already exists.") {
        setErrors({ email: "Email already exists." });
      } else {
        showMessage(error.message || "Failed to save employee", "error");
      }
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmed) return;
    try {
      await deleteEmployee(id);
      await loadEmployees();
      showMessage("Employee deleted successfully!", "success");
    } catch (error) {
      showMessage(error.message || "Failed to delete employee", "error");
    }
  }

  function showMessage(text, type) {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 2000);

  }

  const filteredEmployees = employees.filter((emp) =>
    emp.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Employee Management
          </h1>
          {message && (
            <div
              className={`mb-6 p-3 border rounded ${messageType === "success"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
                }`}
            >
              {message}
            </div>
          )}
          <div className="flex justify-between mb-6 items-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer transition-colors"
              onClick={() => {
                setEmployee(emptyEmployee);
                setIsEditing(false);
                setIsModalOpen(true);
                setErrors({});
              }}
            >
              Add Employee
            </button>
            <input
              type="text"
              placeholder="Search by name..."
              className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-300">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-center font-semibold text-gray-700 border-b border-gray-300 w-16">ID</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300">Name</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300">Email</th>
                  <th className="p-3 text-center font-semibold text-gray-700 border-b border-gray-300 w-32">Status</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300 w-44">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-100 odd:bg-white even:bg-gray-50 border-b border-gray-200 last:border-b-0 transition-colors">
                    <td className="p-3 text-center text-gray-600">{emp.id}</td>
                    <td className="p-3 text-gray-800 font-medium">{emp.full_name}</td>
                    <td className="p-3 text-gray-600">{emp.email}</td>
                    <td className="p-3 text-center">
                      {emp.status === "Active" ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm inline-flex items-center gap-1 font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm inline-flex items-center gap-1 font-medium">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer transition-colors"
                        onClick={() => {
                          setEmployee({
                            ...emp,
                            date_of_joining: emp.date_of_joining.split("T")[0],
                          });
                          setIsEditing(true);
                          setIsModalOpen(true);
                          setErrors({});
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer transition-colors"
                        onClick={() => handleDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setErrors({});
        }}
        employee={employee}
        setEmployee={setEmployee}
        isEditing={isEditing}
        onSave={saveEmployee}
        errors={errors}
      />
    </div>
  );
}

export default App;