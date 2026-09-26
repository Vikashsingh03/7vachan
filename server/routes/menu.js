import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await MenuItem.find().sort({ category: 1, price: 1 });
  res.json(items);
});

router.post('/', protect, admin, async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
});

export default router;
