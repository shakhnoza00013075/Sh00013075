const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Example data
let patients = [
  { name: 'John Doe', age: 35, gender: 'male', diagnoses: ['Flu', 'Headache'] },
  { name: 'Jane Smith', age: 42, gender: 'female', diagnoses: ['Broken leg'] },
  { name: 'Bob Johnson', age: 50, gender: 'male', diagnoses: ['High blood pressure'] }
];

// Display list of patients
app.get('/', (req, res) => {
  res.render('index', { patients });
});

// Display form for adding new patient
app.get('/patients/new', (req, res) => {
  res.render('new');
});

// Handle adding new patient
app.post('/patients', (req, res) => {
  const { name, age, gender } = req.body;
  patients.push({ name, age, gender, diagnoses: [] });
  res.redirect('/');
});

// Display patient details
app.get('/patients/:id', (req, res) => {
  const id = req.params.id;
  const patient = patients[id];
  res.render('patient', { id, patient });
});

// Display form for editing patient details
app.get('/patients/:id/edit', (req, res) => {
  const id = req.params.id;
  const patient = patients[id];
  res.render('edit', { id, patient });
});

// Handle editing patient details
app.post('/patients/:id', (req, res) => {
  const id = req.params.id;
  const { name, age, gender } = req.body;
  patients[id] = { name, age, gender, diagnoses: patients[id].diagnoses };
  res.redirect(`/patients/${id}`);
});

// Handle deleting patient
app.post('/patients/:id/delete', (req, res) => {
  const id = req.params.id;
  patients.splice(id, 1);
  res.redirect('/');
});

// Display form for adding new diagnosis
app.get('/patients/:id/diagnoses/new', (req, res) => {
  const id = req.params.id;
  res.render('new-diagnosis', { id });
});

// Handle adding new diagnosis
app.post('/patients/:id/diagnoses', (req, res) => {
  const id = req.params.id;
  const diagnosis = req.body.diagnosis;
  patients[id].diagnoses.push(diagnosis);
  res.redirect(`/patients/${id}`);
});

// Start server
app.listen(port, () => {
  console.log(`Medical registry app listening at http://localhost:${port}`);
});
