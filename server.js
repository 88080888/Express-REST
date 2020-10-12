const express = require('express');
const cors = require('cors');
const app = express();

const seatsRoute = require('./routes/seats.routes');
const concertsRoute = require('./routes/concerts.routes');
const testimonialsRoute = require('./routes/testimonials.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', testimonialsRoute);
app.use('/api', seatsRoute);
app.use('/api', concertsRoute);

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});