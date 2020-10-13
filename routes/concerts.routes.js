const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = Math.floor(Math.random()*100 + 1);
  db.concerts.push({ id, performer, genre, price, day, image });
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const concerts = db.concerts.find(item => item.id == req.params.id);
  concerts.performer = performer;
  concerts.genre = genre;
  concerts.price = price;
  concerts.day = day;
  concerts.image = image;
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts = db.concerts.filter((item) => item.id != req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;