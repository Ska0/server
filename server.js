const express = require('express');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware')
const { append } = require('express/lib/response');
require('dotenv').config();
const connectDB = require('./config/db');
const req = require('express/lib/request');
const port = process.env.port || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/journals', require('./routes/journalRoutes'))
app.use('/api/entries', require('./routes/entryRoutes'))

app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`.underline.cyan));

app.use((req, res, next) => {
  console.log( `${req.method} ${req.path}`.underline.red)
  next()
})