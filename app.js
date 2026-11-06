
const express = require('express');
const db = require('./db');

const app = express();
const PORT = 4000;

// ================= MIDDLEWARE =================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// ================= HOME ROUTES =================

app.get('/', (req, res) => {
    res.send('College Management System Running Successfully!');
});

app.get('/test', (req, res) => {
    res.send('Route Working Successfully!');
});


// ================= STUDENT MANAGEMENT =================

// Get All Students
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, result) => {
        if (err) {
            console.log('Student Error:', err.message);
            return res.status(500).send(err.message);
        }
        res.json(result);
    });
});

// Add Student
app.post('/students', (req, res) => {
    const { roll_no, student_name, email, phone, department, year } = req.body;

    const sql = `INSERT INTO students
    (roll_no, student_name, email, phone, department, year)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [roll_no, student_name, email, phone, department, year],
        (err, result) => {
            if (err) {
                console.log('Student Insert Error:', err.message);
                return res.status(500).send(err.message);
            }
            res.send('Student Registered Successfully!');
        });
});

// Update Student
app.put('/students/:id', (req, res) => {
    const { roll_no, student_name, email, phone, department, year } = req.body;

    const sql = `UPDATE students SET
    roll_no = ?, student_name = ?, email = ?,
    phone = ?, department = ?, year = ?
    WHERE student_id = ?`;

    db.query(sql, [
        roll_no, student_name, email, phone,
        department, year, req.params.id
    ], (err, result) => {
        if (err) {
            console.log('Student Update Error:', err.message);
            return res.status(500).send(err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Student Not Found');
        }
        res.send('Student Updated Successfully!');
    });
});

// Delete Student
app.delete('/students/:id', (req, res) => {
    db.query('DELETE FROM students WHERE student_id = ?',
        [req.params.id], (err, result) => {
            if (err) {
                console.log('Student Delete Error:', err.message);
                return res.status(500).send(err.message);
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Student Not Found');
            }
            res.send('Student Deleted Successfully!');
        });
});


// ================= FACULTY MANAGEMENT =================

// Faculty Test
app.get('/faculty-test', (req, res) => {
    res.send('FACULTY ROUTE WORKING SUCCESSFULLY!');
});

// Get All Faculty
app.get('/faculty', (req, res) => {
    db.query('SELECT * FROM faculty', (err, result) => {
        if (err) {
            console.log('Faculty Fetch Error:', err.message);
            return res.status(500).send(err.message);
        }
        res.json(result);
    });
});

// Get One Faculty
app.get('/faculty/:id', (req, res) => {
    db.query('SELECT * FROM faculty WHERE faculty_id = ?',
        [req.params.id], (err, result) => {
            if (err) {
                console.log('Faculty Fetch Error:', err.message);
                return res.status(500).send(err.message);
            }
            if (result.length === 0) {
                return res.status(404).send('Faculty Not Found');
            }
            res.json(result[0]);
        });
});

// Add Faculty
app.post('/faculty', (req, res) => {
    const { faculty_name, email, phone, department, designation } = req.body;

    const sql = `INSERT INTO faculty
    (faculty_name, email, phone, department, designation)
    VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [
        faculty_name, email, phone, department, designation
    ], (err, result) => {
        if (err) {
            console.log('Faculty Insert Error:', err.message);
            return res.status(500).send(err.message);
        }
        res.send('Faculty Added Successfully!');
    });
});

// Update Faculty
app.put('/faculty/:id', (req, res) => {
    const { faculty_name, email, phone, department, designation } = req.body;

    const sql = `UPDATE faculty SET
    faculty_name = ?, email = ?, phone = ?,
    department = ?, designation = ?
    WHERE faculty_id = ?`;

    db.query(sql, [
        faculty_name, email, phone,
        department, designation, req.params.id
    ], (err, result) => {
        if (err) {
            console.log('Faculty Update Error:', err.message);
            return res.status(500).send(err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Faculty Not Found');
        }
        res.send('Faculty Updated Successfully!');
    });
});

// Delete Faculty
app.delete('/faculty/:id', (req, res) => {
    db.query('DELETE FROM faculty WHERE faculty_id = ?',
        [req.params.id], (err, result) => {
            if (err) {
                console.log('Faculty Delete Error:', err.message);
                return res.status(500).send(err.message);
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Faculty Not Found');
            }
            res.send('Faculty Deleted Successfully!');
        });
});


// ================= COURSE MANAGEMENT =================

// Course Test
app.get('/courses-test', (req, res) => {
    res.send('COURSES ROUTE WORKING SUCCESSFULLY!');
});

// Get All Courses
app.get('/courses', (req, res) => {
    db.query('SELECT * FROM courses', (err, result) => {
        if (err) {
            console.log('Course Fetch Error:', err.message);
            return res.status(500).send(err.message);
        }
        res.json(result);
    });
});

// Get One Course
app.get('/courses/:id', (req, res) => {
    db.query('SELECT * FROM courses WHERE course_id = ?',
        [req.params.id], (err, result) => {
            if (err) {
                console.log('Course Fetch Error:', err.message);
                return res.status(500).send(err.message);
            }
            if (result.length === 0) {
                return res.status(404).send('Course Not Found');
            }
            res.json(result[0]);
        });
});

// Add Course
app.post('/courses', (req, res) => {
    const { course_name, course_code, department, credits } = req.body;

    const sql = `INSERT INTO courses
    (course_name, course_code, department, credits)
    VALUES (?, ?, ?, ?)`;

    db.query(sql, [
        course_name, course_code, department, credits
    ], (err, result) => {
        if (err) {
            console.log('Course Insert Error:', err.message);
            return res.status(500).send(err.message);
        }
        res.send('Course Added Successfully!');
    });
});

// Update Course
app.put('/courses/:id', (req, res) => {
    const { course_name, course_code, department, credits } = req.body;

    const sql = `UPDATE courses SET
    course_name = ?, course_code = ?, department = ?, credits = ?
    WHERE course_id = ?`;

    db.query(sql, [
        course_name, course_code, department,
        credits, req.params.id
    ], (err, result) => {
        if (err) {
            console.log('Course Update Error:', err.message);
            return res.status(500).send(err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Course Not Found');
        }
        res.send('Course Updated Successfully!');
    });
});

// Delete Course
app.delete('/courses/:id', (req, res) => {
    db.query('DELETE FROM courses WHERE course_id = ?',
        [req.params.id], (err, result) => {
            if (err) {
                console.log('Course Delete Error:', err.message);
                return res.status(500).send(err.message);
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Course Not Found');
            }
            res.send('Course Deleted Successfully!');
        });
});


// ================= ATTENDANCE MANAGEMENT =================

// Attendance Test
app.get('/attendance-test', (req, res) => {
    res.send('ATTENDANCE ROUTE WORKING SUCCESSFULLY!');
});

// Get All Attendance
app.get('/attendance', (req, res) => {
    const sql = `SELECT attendance.*, students.student_name, students.roll_no
                 FROM attendance
                 LEFT JOIN students
                 ON attendance.student_id = students.student_id`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Attendance Fetch Error:', err.message);
            return res.status(500).send(err.message);
        }
        res.json(result);
    });
});

// Get Attendance by Student ID
app.get('/attendance/:id', (req, res) => {
    db.query('SELECT * FROM attendance WHERE student_id = ?',
        [req.params.id], (err, result) => {
            if (err) {
                console.log('Attendance Error:', err.message);
                return res.status(500).send(err.message);
            }
            res.json(result);
        });
});

// Add Attendance
app.post('/attendance', (req, res) => {
    const { student_id, attendance_date, status } = req.body;

    const sql = `INSERT INTO attendance
    (student_id, attendance_date, status)
    VALUES (?, ?, ?)`;

    db.query(sql, [student_id, attendance_date, status],
        (err, result) => {
            if (err) {
                console.log('Attendance Insert Error:', err.message);
                return res.status(500).send(err.message);
            }
            res.send('Attendance Added Successfully!');
        });
});


// ================= FEES MANAGEMENT =================

// Fees Test
app.get('/fees-test', (req, res) => {
    res.send('FEES ROUTE WORKING SUCCESSFULLY!');
});

// Get All Fees
app.get('/fees', (req, res) => {
    const sql = `SELECT fees.*, students.student_name, students.roll_no
                 FROM fees
                 LEFT JOIN students
                 ON fees.student_id = students.student_id`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Fees Fetch Error:', err.message);
            return res.status(500).send(err.message);
        }
        res.json(result);
    });
});

// Get One Fee Record
app.get('/fees/:id', (req, res) => {
    db.query('SELECT * FROM fees WHERE fee_id = ?',
        [req.params.id], (err, result) => {
            if (err) {
                console.log('Fees Fetch Error:', err.message);
                return res.status(500).send(err.message);
            }
            if (result.length === 0) {
                return res.status(404).send('Fee Record Not Found');
            }
            res.json(result[0]);
        });
});

// Add Fees
app.post('/fees', (req, res) => {
    const {
        student_id,
        total_fee,
        paid_amount,
        payment_date,
        payment_status
    } = req.body;

    const balance = Number(total_fee) - Number(paid_amount);

    const sql = `INSERT INTO fees
    (student_id, total_fee, paid_amount, balance,
     payment_date, payment_status)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        student_id,
        total_fee,
        paid_amount,
        balance,
        payment_date,
        payment_status
    ], (err, result) => {
        if (err) {
            console.log('Fees Insert Error:', err.message);
            return res.status(500).send(err.message);
        }
        res.send('Fees Added Successfully!');
    });
});

// Update Fees
app.put('/fees/:id', (req, res) => {
    const {
        total_fee,
        paid_amount,
        payment_date,
        payment_status
    } = req.body;

    const balance = Number(total_fee) - Number(paid_amount);

    const sql = `UPDATE fees SET
    total_fee = ?, paid_amount = ?, balance = ?,
    payment_date = ?, payment_status = ?
    WHERE fee_id = ?`;

    db.query(sql, [
        total_fee,
        paid_amount,
        balance,
        payment_date,
        payment_status,
        req.params.id
    ], (err, result) => {
        if (err) {
            console.log('Fees Update Error:', err.message);
            return res.status(500).send(err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Fee Record Not Found');
        }
        res.send('Fees Updated Successfully!');
    });
});

// Delete Fees
app.delete('/fees/:id', (req, res) => {
    db.query('DELETE FROM fees WHERE fee_id = ?',
        [req.params.id], (err, result) => {
            if (err) {
                console.log('Fees Delete Error:', err.message);
                return res.status(500).send(err.message);
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Fee Record Not Found');
            }
            res.send('Fees Deleted Successfully!');
        });
});


// ================= INVALID ROUTE =================

app.use((req, res) => {
    res.status(404).send(
        'Route Not Found: ' + req.method + ' ' + req.originalUrl
    );
});


// ================= START SERVER =================

app.listen(PORT, () => {
    console.log('MY COLLEGE APP IS RUNNING');
    console.log('Server running at http://localhost:' + PORT);
    console.log('Student Routes Registered');
    console.log('Faculty Routes Registered');
    console.log('Course Routes Registered');
    console.log('Attendance Routes Registered');
    console.log('Fees Routes Registered');
});
