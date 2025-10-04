require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leaves', require('./routes/leaves'));
app.use('/api/admin', require('./routes/admin'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));