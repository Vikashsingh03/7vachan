# 7 Vachan — Hotel, Restaurant & Banquets (Clone)

A luxury hotel / restaurant / wedding-venue website built with **Next.js 14 (App Router) + Tailwind CSS** frontend and an **Express + MongoDB (Mongoose)** backend. Cream + gold + serif luxury design system.

## What's inside

- **Home** — hero, availability widget, Stay/Dine/Celebrate cards, stats, rooms preview
- **Hotel** — room listing (search/filter/sort), 5 room detail pages, 3-step booking wizard, offers, gallery with lightbox, amenities, reviews, FAQs, WhatsApp contact
- **Restaurant** — overview, menu (10 dishes, veg/non-veg/Jain filters), 3-step table reservation wizard, dining spaces, gallery, reviews, FAQs, contact
- **Marriage Hall** — overview, 4 packages, 8 decoration themes, catering, date-availability calendar, gallery, reviews, enquiry form
- **Auth** — login / signup / My Bookings (JWT)
- **Backend** (`server/`) — REST API: auth, rooms, bookings, menu, reservations, banquet enquiries, reviews, Razorpay order + signature verify
- Branded 404 page

The frontend talks to the backend via `NEXT_PUBLIC_API_URL` (see `lib/api.js`). If the backend is not running, pages gracefully fall back to local demo data.

## Run it in VS Code

You need **two terminals**: one for the backend, one for the frontend.

### One-time setup
- Install **Node.js 18+** (LTS) from https://nodejs.org
- Install **MongoDB**: MongoDB Community Server locally, or a free MongoDB Atlas cluster (use its connection string)

### 1. Backend (Terminal 1)
```
cd server
npm install
cp .env.example .env
```
Open `server/.env` and set:
```
MONGODB_URI=mongodb://127.0.0.1:27017/vachan
JWT_SECRET=any_long_random_string_you_make_up
CLIENT_URL=http://localhost:3000
```
(Use your Atlas connection string for `MONGODB_URI` if you go that way.)

Seed the database (5 rooms, 10 menu items, admin user):
```
npm run seed
```
Start the server:
```
npm run dev
```
Backend runs at **http://localhost:5000** — open http://localhost:5000/api/health, you should see `{"status":"ok"}`.
Admin login: `admin@7vachan.com` / `admin123` (change it after first login).

### 2. Frontend (Terminal 2)
```
npm install
cp .env.example .env
npm run dev
```
Open **http://localhost:3000**. `.env` already points to `http://localhost:5000`, so login, bookings, reviews etc. use the real API.

### 3. Production build (optional)
```
npm run build
npm start
```

## Razorpay (optional)
Without keys, the booking wizard offers "Pay at hotel" and bookings stay `pending` — everything else works fully. To enable online payment, add to `server/.env`:
```
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## Project structure
```
app/                  # Next.js routes (page.jsx per route)
components/           # Navbar, Footer, BookingWidget, SectionHeading, PageHero
lib/                  # api.js (backend client), rooms.js, menu.js, marriageHall.js
server/               # Express backend
  server.js           # App entry (mounts all /api/* routers)
  config/db.js        # Mongoose connection
  models/             # User, Room, Booking, MenuItem, Reservation, BanquetEnquiry, Review
  routes/             # auth, rooms, bookings, payments, menu, reservations, banquets, reviews
  middleware/auth.js  # JWT protect + admin guard
  utils/razorpay.js   # Razorpay client (null when keys missing)
  seed/seed.js        # Seed script (npm run seed)
  test/api.test.js    # API test suite, 26 checks (node test/api.test.js)
```

## Notes
- All code is comment-free, as requested.
- Images are Unsplash placeholders — replace with real photos before production.
- WhatsApp number `919829000000` is a placeholder — replace with the real business number.
- Run the backend test suite anytime: `cd server && node test/api.test.js` (uses in-memory MongoDB).
