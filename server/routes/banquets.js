import express from 'express';
import BanquetEnquiry from '../models/BanquetEnquiry.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, phone, email, eventDate, guests, message } = req.body;
  if (!name || !phone || !eventDate) {
    return res.status(400).json({ error: 'name, phone and eventDate are required' });
  }
  const enquiry = await BanquetEnquiry.create({ name, phone, email, eventDate, guests, message });
  res.status(201).json(enquiry);
});

router.get('/', protect, admin, async (req, res) => {
  const enquiries = await BanquetEnquiry.find().sort({ createdAt: -1 });
  res.json(enquiries);
});

export default router;
