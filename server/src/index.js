require('dotenv').config({ path: 'config.env' });
const cookieParser = require('cookie-parser');

const AppError = require('./Error/AppError');
const { globalErrorHandler } = require('./Error/globalErrorHandler');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./Route/Route');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB).then((res) => {
  console.log('Connection to MongoDb successful!');
});

app.use('/', route);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`The ${req.originalUrl} not found in the server!`, 400)
  );
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
