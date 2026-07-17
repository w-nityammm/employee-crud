# Employee Management System

A simple Full-Stack Employee Management System built using React, Node.js, Express.js, and PostgreSQL.

## Tech Stack

- **Frontend:** React.js, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Database Setup

```sql
CREATE DATABASE employee_db;

\c employee_db

CREATE TYPE employee_status AS ENUM ('Active', 'Inactive');

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    date_of_joining DATE NOT NULL,
    status employee_status NOT NULL DEFAULT 'Active'
);
```

## Backend Setup

```bash
cd backend
npm install
npm start
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=employee_db
PORT=5000
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

## API Endpoints

- `GET /employees`
- `POST /employees`
- `PUT /employees/:id`
- `DELETE /employees/:id`
