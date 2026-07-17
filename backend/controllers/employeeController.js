const pool = require("../config/db");

async function getEmployees(req, res) {
    try {
        const result = await pool.query(
            "SELECT * FROM employees ORDER BY id"
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function getEmployeeById(req, res) {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM employees WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found."
            });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function createEmployee(req, res) {
    try {
        const {
            full_name,
            email,
            phone_number,
            designation,
            date_of_joining,
            status
        } = req.body;

        if (
            !full_name || !email || !phone_number || !designation ||
            !date_of_joining || !status
        ) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const result = await pool.query(
            `INSERT INTO employees
            (
                full_name,
                email,
                phone_number,
                designation,
                date_of_joining,
                status
            )
            VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [
                full_name,
                email,
                phone_number,
                designation,
                date_of_joining,
                status
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        if (error.code === "23505") {
            return res.status(409).json({ message: "Email already exists." });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateEmployee(req, res) {
    try {
        const { id } = req.params;
        const {
            full_name,
            email,
            phone_number,
            designation,
            date_of_joining,
            status
        } = req.body;
        const result = await pool.query(
            `UPDATE employees
            SET
                full_name = $1,
                email = $2,
                phone_number = $3,
                designation = $4,
                date_of_joining = $5,
                status = $6
            WHERE id = $7
            RETURNING *;
            `,
            [
                full_name,
                email,
                phone_number,
                designation,
                date_of_joining,
                status,
                id
            ]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found."
            });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        if (error.code === "23505") {
            return res.status(409).json({ message: "Email already exists." });
        }
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE FROM employees
            WHERE id = $1
            RETURNING *;`,
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.json({
            message: "Employee deleted successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};