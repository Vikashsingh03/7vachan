import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    ref: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number },
    seating: { type: String },
    occasion: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model('Reservation', reservationSchema);
