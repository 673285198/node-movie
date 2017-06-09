const mongoose = require('mongoose');
const MovieSchema = require('../schemas/movie');

const Movie = mongoose.model('Movie',MovieSchema); // 默认的collection名称为 movies

module.exports = Movie;
