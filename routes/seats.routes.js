const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const payload = {
    id: uuidv4(),
    day: day,
    seat: seat,
    client: client,
    email: email,
  }

  if (db.seats.some(item => (item.seat === payload.seat && item.day ===payload.day))) {
    res.json({message: 'The slot is already taken'})
  }
  else {
    db.seats.push(payload);
    res.json({ message: 'OK' });
  }


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
  db.seats = db.seats.filter((item) => item.id != req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;