const MONGO_DEFAULT_URL = 'mongodb://localhost:27017/moviesdb';

module.exports = process.env.MONGO_URL || MONGO_DEFAULT_URL;
