import express from 'express';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

function makeRef(prefix) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return prefix + s;
}

router.post('/', protect, async (req, res) => {
  const { roomSlug, arrival, departure, guests } = req.body;
  const room = await Room.findOne({ slug: roomSlug });
  if (!room) return res.status(404).json({ error: 'Room not found' });
  const a = new Date(arrival);
  const d = new Date(departure);
  if (isNaN(a.getTime()) || isNaN(d.getTime()) || a >= d) {
    return res.status(400).json({ error: 'Invalid dates: departure must be after arrival' });
  }
  const nights = Math.round((d - a) / (1000 * 60 * 60 * 24));
  const booking = await Booking.create({
    ref: makeRef('VC-'),
    user: req.user._id,
    roomSlug: room.slug,
    roomName: room.name,
    arrival: a,
    departure: d,
    guests,
    nights,
    total: room.price * nights,
  });
  res.status(201).json(booking);
});

router.get('/all', protect, admin, async (req, res) => {
  const bookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(bookings);
});

router.get('/', protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(bookings);
});

router.patch('/:id/cancel', protect, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  const isOwner = booking.user.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }
  booking.status = 'cancelled';
  await booking.save();
  res.json(booking);
});

export default router;
