const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/testimointials')));


const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Alicia Keys', text: 'They really know how to make you sad.' },
];

app.get('/', (req, res) => {
  res.json(db);
});

app.get('/:id', (req, res) => {
  res.json(db.find(item => item.id == req.params.id));
});

app.get('/random', (req, res) => {
  res.json('db');
});

app.post('/', (req, res) => {
  const { author, text } = req.body;
  const id = Math.floor(Math.random() + 99);
  db.push({ id, author, text });
  res.json({ message: 'OK' });
});

app.put('/:id', (req, res) => {
  const testimonials = db.find(item => item.id == req.params.id);
  testimonials.author = req.body.author;
  testimonials.text = req.body.text;
  res.json({ message: 'OK' });
});

app.delete(':id', (req, res) => {
  db.delete(item => item.id == req.params.id);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});