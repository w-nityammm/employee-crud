function EmployeeModal({
    isOpen,
    onClose,
    employee,
    setEmployee,
    onSave,
    isEditing,
    errors,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-xs">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">

                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    {isEditing ? "Edit Employee" : "Add Employee"}
                </h2>

                <input
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    placeholder="Full Name"
                    value={employee.full_name}
                    onChange={(e) => setEmployee({ ...employee, full_name: e.target.value })}
                />
                {errors.full_name && <p className="text-red-500 text-sm mb-2">{errors.full_name}</p>}

                <input
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    placeholder="Email"
                    value={employee.email}
                    onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                <input
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    placeholder="Phone Number"
                    value={employee.phone_number}
                    onChange={(e) => setEmployee({ ...employee, phone_number: e.target.value })}
                />
                {errors.phone_number && <p className="text-red-500 text-sm mb-2">{errors.phone_number}</p>}

                <input
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    placeholder="Designation"
                    value={employee.designation}
                    onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
                />
                {errors.designation && <p className="text-red-500 text-sm mb-2">{errors.designation}</p>}

                <input
                    type="date"
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    value={employee.date_of_joining}
                    onChange={(e) => setEmployee({ ...employee, date_of_joining: e.target.value })}
                />
                {errors.date_of_joining && <p className="text-red-500 text-sm mb-2">{errors.date_of_joining}</p>}

                <select
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition-shadow"
                    value={employee.status}
                    onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
                >
                    <option>Active</option>
                    <option>Inactive</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer transition-colors"
                        onClick={onSave}
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}

export default EmployeeModal;