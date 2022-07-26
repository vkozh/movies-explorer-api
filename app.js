const bodyParser = require('body-parser');
const { errors: celebrateErrors } = require('celebrate');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const { errors } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const limiter = require('./middlewares/rateLimit');
require('dotenv').config();

const app = express();
const { MONGODB = 'mongodb://localhost:27017/moviesdb' } = process.env;

mongoose.connect(MONGODB);

app.use('*', cors);
app.use(helmet());
app.use(limiter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(celebrateErrors());
app.use(errors);

module.exports = app;
