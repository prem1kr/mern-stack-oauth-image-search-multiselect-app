import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from './config/passport.js';
import morgan from 'morgan';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isProd = process.env.NODE_ENV === 'production';

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProd,
      httpOnly: true,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRoutes);
app.use('/api', searchRoutes);
app.use('/api', historyRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
