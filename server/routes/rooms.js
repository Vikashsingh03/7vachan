import express from 'express';
import Room from '../models/Room.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const rooms = await Room.find().sort({ price: 1 });
  res.json(rooms);
});

router.get('/:slug', async (req, res) => {
  const room = await Room.findOne({ slug: req.params.slug });
  if (!room) return res.status(404).json({ error: 'Room not found' });
  res.json(room);
});

router.post('/', protect, admin, async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
});

router.put('/:slug', protect, admin, async (req, res) => {
  const room = await Room.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!room) return res.status(404).json({ error: 'Room not found' });
  res.json(room);
});

router.delete('/:slug', protect, admin, async (req, res) => {
  const room = await Room.findOneAndDelete({ slug: req.params.slug });
  if (!room) return res.status(404).json({ error: 'Room not found' });
  res.json({ message: 'Room deleted' });
});

export default router;
