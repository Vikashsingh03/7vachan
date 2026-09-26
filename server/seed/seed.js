import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Room from '../models/Room.js';
import MenuItem from '../models/MenuItem.js';
import User from '../models/User.js';
import { rooms } from '../../lib/rooms.js';
import { menuItems } from '../../lib/menu.js';

dotenv.config();

async function seed() {
  await connectDB();

  await Room.deleteMany({});
  await MenuItem.deleteMany({});
  await User.deleteMany({});

  await Room.insertMany(
    rooms.map(({ slug, name, price, size, guests, image, amenities, description, rating }) => ({
      slug,
      name,
      price,
      size,
      guests,
      image,
      amenities,
      description,
      rating,
    }))
  );

  await MenuItem.insertMany(
    menuItems.map(({ name, category, price, veg, jain, tags, description, image }) => ({
      name,
      category,
      price,
      veg,
      jain,
      tags,
      description,
      image,
    }))
  );

  const hashed = await bcrypt.hash('admin123', 10);
  await User.create({ name: 'Admin', email: 'admin@7vachan.com', password: hashed, role: 'admin' });

  const roomCount = await Room.countDocuments();
  const menuCount = await MenuItem.countDocuments();
  const userCount = await User.countDocuments();
  console.log('Seeded rooms: ' + roomCount);
  console.log('Seeded menu items: ' + menuCount);
  console.log('Seeded users: ' + userCount);
  console.log('Done');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
