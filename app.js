const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory storage for multiple form submissions
let formData = [];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
  formData.push(req.body); // Append new submission to the array
  res.redirect('/all-data'); // Redirect to the "All Data" route
});

app.get('/all-data', (req, res) => {
  res.render('all-data', { data: formData });
});

app.get('/table-view', (req, res) => {
  res.render('table-view', { data: formData });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
