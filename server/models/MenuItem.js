import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    veg: { type: Boolean, default: true },
    jain: { type: Boolean, default: false },
    tags: [{ type: String }],
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
