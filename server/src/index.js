import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { connectDB, dbReady } from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';
import contentRoutes from './routes/content.js';
import leadRoutes from './routes/leads.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());
app.use(cors({ origin: origins, credentials: true }));

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'dostsol-api',
    db: dbReady() ? 'connected' : 'disconnected',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', contentRoutes);
app.use('/api', leadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Serve the built SPA in production.
if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n  DostSol API → http://localhost:${PORT}/api/health`);
    console.log(`  Allowed origins: ${origins.join(', ')}\n`);
  });
});

export default app;
