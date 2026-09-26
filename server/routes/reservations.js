import express from 'express';
import Reservation from '../models/Reservation.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

function makeRef(prefix) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return prefix + s;
}

router.post('/', async (req, res) => {
  const { name, phone, email, date, time, guests, seating, occasion } = req.body;
  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'name, phone, date, time and guests are required' });
  }
  const reservation = await Reservation.create({
    ref: makeRef('RS-'),
    name,
    phone,
    email,
    date,
    time,
    guests,
    seating,
    occasion,
  });
  res.status(201).json(reservation);
});

router.get('/', protect, admin, async (req, res) => {
  const reservations = await Reservation.find().sort({ createdAt: -1 });
  res.json(reservations);
});

export default router;
