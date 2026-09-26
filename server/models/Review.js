import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    section: { type: String, enum: ['hotel', 'restaurant', 'marriage-hall'], required: true },
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'approved'], default: 'approved' },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
