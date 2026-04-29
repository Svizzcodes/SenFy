import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

// Validation & Status Logging
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const optionalEnv = ['GEMINI_API_KEY', 'OPENAI_API_KEY', 'SERP_API_KEY', 'EMAIL_USER', 'EMAIL_PASS'];

console.log('\n🔍 Validating Environment...');
let fatal = false;
requiredEnv.forEach(env => {
  if (!process.env[env]) {
    console.error(`❌ CRITICAL: ${env} is missing!`);
    fatal = true;
  } else {
    console.log(`✅ ${env} Configured`);
  }
});

if (fatal) {
  console.error('🛑 System cannot start without required configuration. Exiting...\n');
  process.exit(1);
}

optionalEnv.forEach(env => {
  if (!process.env[env]) {
    console.warn(`⚠️  WARNING: ${env} is missing. Some features will be disabled.`);
  } else {
    console.log(`✅ ${env} Connected`);
  }
});
console.log('----------------------------\n');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Move to top
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: false, // Loosen for development to ensure external images/APIs work
}));
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500 // Increased for development/demo
});
app.use('/api', limiter);

// Routes
import authRoutes from './routes/auth';
import dataRoutes from './routes/data';
import marketingRoutes from './routes/marketing';
import reportRoutes from './routes/report';
import { seedDemoData } from './utils/seedData';

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/report', reportRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Senfy AI Backend is running' });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || '';
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Database Connected');
    await seedDemoData();
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

app.listen(PORT, () => {
  console.log(`🚀 SENFY AI BACKEND ACTIVE ON PORT ${PORT}`);
});
