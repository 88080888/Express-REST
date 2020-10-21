const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const app = express();
const mongoose = require('mongoose');

const seatsRoute = require('./routes/seats.routes');
const concertsRoute = require('./routes/concerts.routes');
const testimonialsRoute = require('./routes/testimonials.routes');

// connects our backend code with the database
mongoose.connect('mongodb://localhost:27017/companyDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', testimonialsRoute);
app.use('/api', seatsRoute);
app.use('/api', concertsRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New Socket!');
});  