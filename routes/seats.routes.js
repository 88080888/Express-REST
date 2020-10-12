const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = Math.floor(Math.random()*100 + 1);
  db.seats.push({ id, day, seat, client, email });
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const seats = db.seats.find(item => item.id == req.params.id);
  seats.day = day;
  seats.seat = seat;
  seats.client = client;
  seats.email = email;
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  db = db.seats.filter((item) => item.id != req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;