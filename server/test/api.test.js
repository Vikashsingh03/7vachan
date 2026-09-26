import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

let failures = 0;

function check(name, cond) {
  if (cond) {
    console.log('PASS ' + name);
  } else {
    console.log('FAIL ' + name);
    failures++;
  }
}

const mongod = await MongoMemoryServer.create();
process.env.MONGODB_URI = mongod.getUri();
process.env.JWT_SECRET = 'testsecret';
delete process.env.RAZORPAY_KEY_ID;
delete process.env.RAZORPAY_KEY_SECRET;

const { default: app } = await import('../server.js');
const { default: User } = await import('../models/User.js');
const { default: Room } = await import('../models/Room.js');

const api = request(app);

const h = await api.get('/api/health');
check('GET /api/health -> 200 {status:ok}', h.status === 200 && h.body.status === 'ok');

const s1 = await api.post('/api/auth/signup').send({ name: 'Test User', email: 'test@example.com', password: 'secret123' });
check('POST /api/auth/signup -> 201 + token', s1.status === 201 && typeof s1.body.token === 'string');
const userToken = s1.body.token;

const dup = await api.post('/api/auth/signup').send({ name: 'Test User', email: 'test@example.com', password: 'secret123' });
check('POST /api/auth/signup duplicate email -> error', dup.status !== 201);

const l1 = await api.post('/api/auth/login').send({ email: 'test@example.com', password: 'secret123' });
check('POST /api/auth/login -> token', l1.status === 200 && typeof l1.body.token === 'string');

const l2 = await api.post('/api/auth/login').send({ email: 'test@example.com', password: 'wrongpass' });
check('POST /api/auth/login wrong password -> 401', l2.status === 401);

const me1 = await api.get('/api/auth/me').set('Authorization', 'Bearer ' + userToken);
check('GET /api/auth/me with token -> user', me1.status === 200 && me1.body.user.email === 'test@example.com');

const me2 = await api.get('/api/auth/me');
check('GET /api/auth/me without token -> 401', me2.status === 401);

await Room.create({ slug: 'test-room', name: 'Test Room', price: 4500, size: '240 sq ft', guests: 2, image: 'x', amenities: ['WiFi'] });
const rooms = await api.get('/api/rooms');
check('GET /api/rooms contains seeded room', rooms.status === 200 && Array.isArray(rooms.body) && rooms.body.some((r) => r.slug === 'test-room'));

const room1 = await api.get('/api/rooms/test-room');
check('GET /api/rooms/test-room -> 200', room1.status === 200 && room1.body.slug === 'test-room');

const roomBad = await api.get('/api/rooms/nope-slug');
check('GET /api/rooms/nope-slug -> 404', roomBad.status === 404);

const roomNoAdmin = await api.post('/api/rooms').set('Authorization', 'Bearer ' + userToken).send({ slug: 'x-room', name: 'X Room', price: 100 });
check('POST /api/rooms as non-admin -> 403', roomNoAdmin.status === 403);

const adminHash = await bcrypt.hash('adminpass', 10);
await User.create({ name: 'Admin', email: 'admin@example.com', password: adminHash, role: 'admin' });
const adminLogin = await api.post('/api/auth/login').send({ email: 'admin@example.com', password: 'adminpass' });
const adminToken = adminLogin.body.token;
const roomAdmin = await api.post('/api/rooms').set('Authorization', 'Bearer ' + adminToken).send({ slug: 'admin-room', name: 'Admin Room', price: 9000 });
check('POST /api/rooms as admin -> 201', roomAdmin.status === 201 && roomAdmin.body.slug === 'admin-room');

const badBook = await api.post('/api/bookings').set('Authorization', 'Bearer ' + userToken).send({ roomSlug: 'test-room', arrival: '2026-10-05', departure: '2026-10-02', guests: 2 });
check('POST /api/bookings bad dates -> 400', badBook.status === 400);

const goodBook = await api.post('/api/bookings').set('Authorization', 'Bearer ' + userToken).send({ roomSlug: 'test-room', arrival: '2026-10-02', departure: '2026-10-05', guests: 2 });
check('POST /api/bookings valid -> VC- ref, total=price*nights', goodBook.status === 201 && goodBook.body.ref.startsWith('VC-') && goodBook.body.total === 13500 && goodBook.body.nights === 3);
const bookingId = goodBook.body._id;

const myBooks = await api.get('/api/bookings').set('Authorization', 'Bearer ' + userToken);
check('GET /api/bookings contains booking', myBooks.status === 200 && Array.isArray(myBooks.body) && myBooks.body.some((b) => b._id === bookingId));

const menu = await api.get('/api/menu');
check('GET /api/menu -> 200 array', menu.status === 200 && Array.isArray(menu.body));

const resBad = await api.post('/api/reservations').send({ name: 'R', date: '2026-10-02', time: '7:00 PM', guests: 2 });
check('POST /api/reservations missing phone -> 400', resBad.status === 400);

const resGood = await api.post('/api/reservations').send({ name: 'R', phone: '9999999999', date: '2026-10-02', time: '7:00 PM', guests: 2 });
check('POST /api/reservations valid -> RS- ref', resGood.status === 201 && resGood.body.ref.startsWith('RS-'));

const bqBad = await api.post('/api/banquets').send({ phone: '9999999999', eventDate: '2026-12-01' });
check('POST /api/banquets missing name -> 400', bqBad.status === 400);

const bqGood = await api.post('/api/banquets').send({ name: 'B', phone: '9999999999', eventDate: '2026-12-01' });
check('POST /api/banquets valid -> 201', bqGood.status === 201);

const revBad = await api.post('/api/reviews').send({ section: 'hotel', name: 'N', rating: 6, text: 't' });
check('POST /api/reviews rating 6 -> 400', revBad.status === 400);

const revGood = await api.post('/api/reviews').send({ section: 'hotel', name: 'Nina', rating: 5, text: 'Lovely stay' });
check('POST /api/reviews valid -> 201', revGood.status === 201);

const revList = await api.get('/api/reviews?section=hotel');
check('GET /api/reviews?section=hotel contains review', revList.status === 200 && Array.isArray(revList.body) && revList.body.some((r) => r.name === 'Nina'));

const pay = await api.post('/api/payments/order').set('Authorization', 'Bearer ' + userToken).send({ bookingId });
check('POST /api/payments/order no keys -> 503 payments not configured', pay.status === 503 && pay.body.error === 'payments not configured');

const cancel = await api.patch('/api/bookings/' + bookingId + '/cancel').set('Authorization', 'Bearer ' + userToken);
check('PATCH /api/bookings/:id/cancel owner -> cancelled', cancel.status === 200 && cancel.body.status === 'cancelled');

await mongoose.disconnect();
await mongod.stop();
console.log(failures === 0 ? 'ALL TESTS PASSED' : failures + ' TESTS FAILED');
process.exit(failures === 0 ? 0 : 1);
