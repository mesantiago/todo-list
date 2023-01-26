const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { initializeDb } = require('./helpers/dbHelper');
const routes = require('./routes');

// Load environment variables
dotenv.config();
const PORT = process.env.port || 3000;
const ORIGIN = process.env.reactNativeUrl;
const SEEDDB = process.env.recreatedb;

// Create express app
const app = express();

// Setup middlewares
app.use(
  cors({
    origin: ORIGIN
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDb(SEEDDB);

// Initialize routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
