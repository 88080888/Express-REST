const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const app = express();

const seatsRoute = require('./routes/seats.routes');
const concertsRoute = require('./routes/concerts.routes');
const testimonialsRoute = require('./routes/testimonials.routes');

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