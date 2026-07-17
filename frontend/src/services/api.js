const API = "http://localhost:5000/employees";

export async function getEmployees() {
    const response = await fetch(API);
    return await response.json();
}

export async function addEmployee(employee) {
    const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(employee),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add employee");
    }
    return await response.json();
}

export async function deleteEmployee(id) {
    const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete employee");
    }
}

export async function updateEmployee(id, employee) {
    const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(employee),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update employee");
    }
    return await response.json();
}