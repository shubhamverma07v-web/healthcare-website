
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const appointments = [];
let nextId = 1;

const doctors = [
  { id: 1, name: 'Dr. Priya Sharma', specialization: 'Cardiologist' },
  { id: 2, name: 'Dr. Rahul Verma', specialization: 'General Physician' },
  { id: 3, name: 'Dr. Neha Gupta', specialization: 'Dermatologist' }
];

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'CuraGuide backend is running!' });
});

app.get('/api/doctors', (req, res) => {
  res.json({ success: true, doctors });
});

app.post('/api/appointments', (req, res) => {
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

  const doctor = doctors.find(d => d.id === Number(doctorId));

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: 'Doctor not found.'
    });
  }

  const appointment = {
    id: nextId++,
    patientName: patientName.trim(),
    doctorId: doctor.id,
    doctorName: doctor.name,
    date,
    time,
    status: 'Booked'
  };

  appointments.push(appointment);

  res.status(201).json({
    success: true,
    message: 'Appointment booked successfully!',
    appointment
  });
});

app.get('/api/appointments', (req, res) => {
  res.json({ success: true, appointments });
});

app.listen(PORT, () => {
  console.log(`CuraGuide backend running at http://localhost:${PORT}`);
});
