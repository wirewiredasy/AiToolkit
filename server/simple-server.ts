import express from 'express';
import routes from './routes';

const app = express();
const PORT = 5000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic response for root
app.get('/', (req, res) => {
  res.json({ message: 'Suntyn AI Express Server Running', status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Simple server running on http://0.0.0.0:${PORT}`);
});