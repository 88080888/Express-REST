const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Alicia Keys', text: 'They really know how to make you sad.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find(item => item.id == req.params.id));
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = Math.floor(Math.random()*100 + 1);
  db.push({ id, author, text });
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const testimonials = db.find(item => item.id == req.params.id);
  testimonials.author = author;
  testimonials.text = text;
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  db == db.filter((item) => item.id !== req.params.id);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});