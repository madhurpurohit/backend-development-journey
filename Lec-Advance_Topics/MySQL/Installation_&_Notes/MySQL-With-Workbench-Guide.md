# 📘 MySQL Beginner Guide & Cheat Sheet for Work with Workbench

This guide is designed for **beginners** to quickly revise or learn MySQL concepts.  
It covers table creation, constraints, and CRUD operations with **syntax, explanations, and examples**.

---

## 🔹 1. Creating a Table

### ✅ Syntax

```sql
CREATE TABLE table_name (
    column_name datatype [options],
    column_name datatype [options],
    ...
);
```

### ✅ Example

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- unique ID, auto increases
    name VARCHAR(100) NOT NULL,          -- student name, max 100 chars, cannot be empty
    age INT,                             -- student age, optional
    grade VARCHAR(10),                   -- grade like 'A', 'B', 'C'
    email VARCHAR(150) UNIQUE            -- unique email address
);
```

---

### 🔹 Common Data Types

| Datatype       | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `INT`          | Stores whole numbers (e.g., 1, 20, 300).                          |
| `DECIMAL(p,s)` | Fixed-point numbers (p = total digits, s = digits after decimal). |
| `FLOAT/DOUBLE` | Decimal numbers with fractions (less precise than DECIMAL).       |
| `VARCHAR(n)`   | Variable-length string up to `n` characters.                      |
| `CHAR(n)`      | Fixed-length string (always uses `n` characters).                 |
| `TEXT`         | Large text data (paragraphs).                                     |
| `DATE`         | Stores date (`YYYY-MM-DD`).                                       |
| `DATETIME`     | Stores date and time (`YYYY-MM-DD HH:MM:SS`).                     |
| `BOOLEAN`      | Stores `TRUE` (1) or `FALSE` (0).                                 |

---

### 🔹 Common Column Options

| Option           | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| `PRIMARY KEY`    | Uniquely identifies each row.                                          |
| `AUTO_INCREMENT` | Automatically increases value for each new row (used with `INT`).      |
| `NOT NULL`       | Field **must** have a value (cannot be empty).                         |
| `UNIQUE`         | Ensures all values in this column are unique.                          |
| `DEFAULT value`  | Assigns a default value if none is provided.                           |
| `CHECK (cond)`   | Ensures values meet a condition (e.g., `CHECK (age >= 18)`).           |
| `FOREIGN KEY`    | Links a column to another table’s primary key (creates relationships). |

---

## 🔹 2. Inserting Data

### ✅ Insert Single Row

```sql
INSERT INTO students (name, age, grade, email)
VALUES ('Rahul', 20, 'A', 'rahul@example.com');
```

### ✅ Insert Multiple Rows

```sql
INSERT INTO students (name, age, grade, email)
VALUES
('Priya', 19, 'B', 'priya@example.com'),
('Arjun', 21, 'A', 'arjun@example.com'),
('Sneha', 22, 'C', 'sneha@example.com');
```

---

## 🔹 3. Reading Data (SELECT)

### ✅ Select All Columns

```sql
SELECT * FROM students;
```

### ✅ Select Specific Columns

```sql
SELECT name, age FROM students;
```

### ✅ With Conditions (`WHERE`)

```sql
SELECT * FROM students WHERE grade = 'A';
SELECT * FROM students WHERE age > 20;
SELECT * FROM students WHERE age BETWEEN 18 AND 21;
SELECT * FROM students WHERE grade = 'A' OR grade = 'B';
```

### ✅ Pattern Matching (`LIKE`)

```sql
SELECT * FROM students WHERE name LIKE 'R%';   -- names starting with R
SELECT * FROM students WHERE name LIKE '%a';   -- names ending with a
SELECT * FROM students WHERE name LIKE '%an%'; -- names containing "an"
```

---

## 🔹 4. Updating Data

### ✅ Update Single Row

```sql
UPDATE students
SET grade = 'B'
WHERE id = 4;
```

### ✅ Update Multiple Rows

```sql
UPDATE students
SET age = age + 1
WHERE grade = 'B';
```

---

## 🔹 5. Deleting Data

### ✅ Delete Single Row

```sql
DELETE FROM students
WHERE id = 2;
```

### ✅ Delete Multiple Rows

```sql
DELETE FROM students
WHERE grade = 'A';
```

⚠️ **Important:**  
If you run:

```sql
DELETE FROM students;
```

👉 It will delete **all rows** in the table.

If you want to clear all rows but keep table structure:

```sql
TRUNCATE TABLE students;
```

---

## 🔹 6. Dropping a Table

```sql
DROP TABLE students;
```

👉 Permanently removes the table and all its data.

---

# ✅ Quick Summary (CRUD)

| Operation        | Command Example                                          |
| ---------------- | -------------------------------------------------------- |
| **Create Table** | `CREATE TABLE students (...);`                           |
| **Insert Data**  | `INSERT INTO students (name, age) VALUES ('Rahul', 20);` |
| **Read Data**    | `SELECT * FROM students WHERE age > 18;`                 |
| **Update Data**  | `UPDATE students SET grade = 'A' WHERE id = 3;`          |
| **Delete Data**  | `DELETE FROM students WHERE id = 5;`                     |
| **Drop Table**   | `DROP TABLE students;`                                   |

---

📌 **Best Practices for Beginners**

- Always define a `PRIMARY KEY`.
- Use `AUTO_INCREMENT` for IDs.
- Use `NOT NULL` for required fields.
- Use `UNIQUE` for things like `email`.
- Before running `DELETE` or `UPDATE`, preview rows with `SELECT`.

---
