const express = require('express');
const cors = require('cors');
const path = require('path');
const generateRoute = require('./routes/generate');
const adminRoute = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/generate', generateRoute);
app.use('/api/admin', adminRoute);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
