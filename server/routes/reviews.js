import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

const validSections = ['hotel', 'restaurant', 'marriage-hall'];

router.get('/', async (req, res) => {
  const filter = { status: 'approved' };
  if (req.query.section) filter.section = req.query.section;
  const reviews = await Review.find(filter).sort({ createdAt: -1 });
  res.json(reviews);
});

router.post('/', async (req, res) => {
  const { section, name, rating, text } = req.body;
  if (!validSections.includes(section)) {
    return res.status(400).json({ error: 'Invalid section' });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be an integer from 1 to 5' });
  }
  if (!name || !text) {
    return res.status(400).json({ error: 'name and text are required' });
  }
  const review = await Review.create({ section, name, rating, text });
  res.status(201).json(review);
});

export default router;
