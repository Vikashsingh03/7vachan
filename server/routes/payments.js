import express from 'express';
import crypto from 'crypto';
import Booking from '../models/Booking.js';
import { getRazorpay } from '../utils/razorpay.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/order', protect, async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  const razorpay = getRazorpay();
  if (!razorpay) return res.status(503).json({ error: 'payments not configured' });
  const order = await razorpay.orders.create({
    amount: booking.total * 100,
    currency: 'INR',
    receipt: booking.ref,
  });
  booking.payment.orderId = order.id;
  await booking.save();
  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    key: process.env.RAZORPAY_KEY_ID,
  });
});

router.post('/verify', protect, async (req, res) => {
  const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  if (expected !== razorpay_signature) {
    return res.status(400).json({ verified: false });
  }
  booking.payment.paymentId = razorpay_payment_id;
  booking.payment.status = 'paid';
  booking.status = 'confirmed';
  await booking.save();
  res.json({ verified: true });
});

export default router;
