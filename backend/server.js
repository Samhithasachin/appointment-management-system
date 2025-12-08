const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());


const DATA_PATH = path.join(__dirname, 'data.json');


function readData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    
    return { users: [], appointments: [] };
  }
}


function writeData(data) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write data file', err);
    throw err;
  }
}

//unique id 
function genId(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}


app.post('/login', (req, res) => {
  const { email:username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });

  const db = readData();
  const user = db.users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

 
  return res.json({ token: 'fake-token-' + genId('t_'), user: { id: user.id, username: user.username, name: user.name } });
});


app.get('/appointments', (req, res) => {
  const { search = '', status = '', doctor = '', page = '1', limit = '10' } = req.query;
  const db = readData();
  let items = db.appointments || [];

 
  if (search && search.trim()) {
    const s = search.toLowerCase();
    items = items.filter(a =>
      (a.patientName && a.patientName.toLowerCase().includes(s))
      || (a.notes && a.notes.toLowerCase().includes(s))
      || (a.doctor && a.doctor.toLowerCase().includes(s))
    );
  }

  if (status) {
    items = items.filter(a => a.status === status);
  }

  if (doctor) {
    items = items.filter(a => a.doctor === doctor);
  }

  
  items = items.slice().sort((a, b) => {
    const aKey = (a.date || '') + ' ' + (a.time || '');
    const bKey = (b.date || '') + ' ' + (b.time || '');
    return aKey.localeCompare(bKey);
  });

  const p = Math.max(1, parseInt(page || '1', 10));
  const l = Math.max(1, parseInt(limit || '10', 10));
  const start = (p - 1) * l;
  const paged = items.slice(start, start + l);

  res.json({
    data: paged,
    total: items.length,
    page: p,
    limit: l
  });
});


app.post('/appointments', (req, res) => {
  const payload = req.body || {};
  if (!payload.patientName || !payload.doctor || !payload.date || !payload.time) {
    return res.status(400).json({ message: 'patientName, doctor, date and time are required' });
  }

  const db = readData();
  const newAppt = {
    id: genId('a_'),
    patientName: payload.patientName,
    doctor: payload.doctor,
    date: payload.date,
    time: payload.time,
    status: payload.status || 'pending',
    notes: payload.notes || ''
  };

  db.appointments = db.appointments || [];
  db.appointments.push(newAppt);
  writeData(db);

  res.status(201).json(newAppt);
});


app.put('/appointments/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body || {};
  const db = readData();
  const idx = (db.appointments || []).findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Appointment not found' });

  const updated = { ...db.appointments[idx], ...updates, id }; 
  db.appointments[idx] = updated;
  writeData(db);

  res.json(updated);
});


app.delete('/appointments/:id', (req, res) => {
  const id = req.params.id;
  const db = readData();
  const idx = (db.appointments || []).findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Appointment not found' });

  const removed = db.appointments.splice(idx, 1)[0];
  writeData(db);

  res.json(removed);
});


app.get('/', (req, res) => res.json({ ok: true, msg: 'Appointments backend running' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Appointments backend listening on http://localhost:${PORT}`);
});
