import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    size: { type: String },
    guests: { type: Number },
    image: { type: String },
    amenities: [{ type: String }],
    description: { type: String },
    rating: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

export default mongoose.model('Room', roomSchema);
