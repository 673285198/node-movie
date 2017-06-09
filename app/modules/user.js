/**
 * Created by lujing on 2017/6/8.
 */
const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');

const User = mongoose.model('User',UserSchema);

module.exports = User;
