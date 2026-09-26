import mongoose from 'mongoose';

const banquetEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    eventDate: { type: String },
    guests: { type: String },
    message: { type: String },
    status: { type: String, enum: ['new', 'contacted', 'booked'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model('BanquetEnquiry', banquetEnquirySchema);
