const bodyParser = require('body-parser');
const { errors: celebrateErrors } = require('celebrate');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const { errorHandler } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const limiter = require('./middlewares/rateLimit');
require('dotenv').config();
const MONGO_URL = require('./config');

const app = express();

mongoose.connect(MONGO_URL);

app.use(requestLogger);
app.use(limiter);
app.use('*', cors);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);
app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

module.exports = app;
