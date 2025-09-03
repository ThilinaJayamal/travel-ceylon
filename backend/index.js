import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import serviceProviderRouter from './routes/serviceProviderRoute.js';
import taxiRouter from './routes/taxiRoute.js';
import staysRouter from './routes/staysRoute.js';
import guideRouter from './routes/guideRoute.js';
import rentRouter from './routes/rentRoute.js';
import reviewRouter from './routes/reviewRoute.js';
import { storage } from './storage/storage.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://travel-ceylon-80bg5q3ka-thilina-jayamals-projects-f4c15415.vercel.app/'

  ],
  credentials: true,
}));
app.use(cookieParser());

// Multer upload
const upload = multer({ storage });

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optional: EJS for testing
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res) => {
  res.render('home');
});

// --- Cloudinary Upload Route ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ message: 'Upload successful', file: req.file });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API routes
app.use('/api/user', userRouter);
app.use('/api/service-provider', serviceProviderRouter);
app.use('/api/service/taxi', taxiRouter);
app.use('/api/service/stays', staysRouter);
app.use('/api/service/guide', guideRouter);
app.use('/api/service/rent', rentRouter);
app.use('/api/reviews', reviewRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
