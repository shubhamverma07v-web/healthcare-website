
import express from 'express';
import cors from 'cors';
import pool from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please log in first.'
    });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'Server authentication is not configured.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired login session.'
    });
  }
};

// Generate login token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Signup
app.post('/api/auth/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (
    typeof fullName !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !fullName.trim() ||
    !email.trim() ||
    password.length < 8
  ) {
    return res.status(400).json({
      success: false,
      message: 'Enter your name, email and password of at least 8 characters.'
    });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'JWT_SECRET is not configured.'
    });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [normalizedEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.query(
      'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
      [fullName.trim(), normalizedEmail, passwordHash]
    );

    const token = generateToken(result.insertId);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id: result.insertId,
        fullName: fullName.trim(),
        email: normalizedEmail
      }
    });
  } catch (error) {
    console.error('Signup error:', error);

    return res.status(500).json({
      success: false,
      message: 'Could not create account.'
    });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: 'Enter email and password.'
    });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'JWT_SECRET is not configured.'
    });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    const [users] = await pool.query(
      'SELECT id, full_name, email, password_hash FROM users WHERE email = ?',
      [normalizedEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const user = users[0];
    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user.id);

    return res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      success: false,
      message: 'Could not log in.'
    });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');

    res.json({
      success: true,
      message: 'CuraGuide backend and MySQL are connected!'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Database connection failed.'
    });
  }
});

// Get doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, specialization FROM doctors ORDER BY id'
    );

    res.json({ success: true, doctors: rows });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Could not load doctors.'
    });
  }
});

// Book appointment - login required
app.post('/api/appointments', authenticateToken, async (req, res) => {
  const { patientName, doctorId, date, time } = req.body;

  if (
    typeof patientName !== 'string' ||
    !patientName.trim() ||
    !Number.isInteger(Number(doctorId)) ||
    !date ||
    !time
  ) {
    return res.status(400).json({
      success: false,
      message: 'Please provide patient name, doctor, date and time.'
    });
  }

  try {
    const [doctorRows] = await pool.query(
      'SELECT id, name FROM doctors WHERE id = ?',
      [Number(doctorId)]
    );

    if (doctorRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found.'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO appointments
       (user_id, patient_name, doctor_id, appointment_date, appointment_time, status)
       VALUES (?, ?, ?, ?, ?, 'Booked')`,
      [
        req.user.userId,
        patientName.trim(),
        Number(doctorId),
        date,
        time
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      appointment: {
        id: result.insertId,
        patientName: patientName.trim(),
        doctorId: Number(doctorId),
        doctorName: doctorRows[0].name,
        date,
        time,
        status: 'Booked'
      }
    });
  } catch (error) {
    console.error('Appointment booking error:', error);

    return res.status(500).json({
      success: false,
      message: 'Could not book appointment.'
    });
  }
});

// Get only logged-in user's appointments
app.get('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.id, a.patient_name AS patientName,
              a.doctor_id AS doctorId, d.name AS doctorName,
              a.appointment_date AS date,
              a.appointment_time AS time, a.status
       FROM appointments a
       JOIN doctors d ON d.id = a.doctor_id
       WHERE a.user_id = ?
       ORDER BY a.appointment_date, a.appointment_time`,
      [req.user.userId]
    );

    res.json({
      success: true,
      appointments: rows
    });
  } catch (error) {
    console.error('Appointment loading error:', error);

    res.status(500).json({
      success: false,
      message: 'Could not load appointments.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`CuraGuide backend running on port ${PORT}`);
});
