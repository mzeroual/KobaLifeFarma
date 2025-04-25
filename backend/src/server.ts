import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import publicRoutes from './routes/publicRoutes';
import contactRoutes from './routes/contactRoutes';
import uploadRoutes from './routes/uploadRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.disable('x-powered-by');

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate limiter for auth routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests
  message: 'Too many login attempts from this IP, try again later.'
});
app.use('/auth/login', limiter);

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/products', publicRoutes);
app.use('/contact', contactRoutes);
app.use('/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('KobaLife Backend is running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
