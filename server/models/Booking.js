import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    ref: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomSlug: { type: String },
    roomName: { type: String },
    arrival: { type: String },
    departure: { type: String },
    guests: { type: Number },
    nights: { type: Number },
    total: { type: Number },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    payment: {
      orderId: { type: String },
      paymentId: { type: String },
      status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
