const pool = require("../config/db");

async function getEmployees(req, res) {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM employees ORDER BY id"
        );
        res.status(200).json(rows);
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
        const [rows] = await pool.query(
            "SELECT * FROM employees WHERE id = ?",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found."
            });
        }
        res.status(200).json(rows[0]);
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

        const [result] = await pool.query(
            `INSERT INTO employees
            (
                full_name,
                email,
                phone_number,
                designation,
                date_of_joining,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                full_name,
                email,
                phone_number,
                designation,
                date_of_joining,
                status
            ]
        );
        
        const [rows] = await pool.query(
            "SELECT * FROM employees WHERE id = ?",
            [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
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
        const [result] = await pool.query(
            `UPDATE employees
            SET
                full_name = ?,
                email = ?,
                phone_number = ?,
                designation = ?,
                date_of_joining = ?,
                status = ?
            WHERE id = ?;
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
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Employee not found."
            });
        }
        const [rows] = await pool.query(
            "SELECT * FROM employees WHERE id = ?",
            [id]
        );
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
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
        const [result] = await pool.query(
            `DELETE FROM employees
            WHERE id = ?;`,
            [id]
        );
        if (result.affectedRows === 0) {
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