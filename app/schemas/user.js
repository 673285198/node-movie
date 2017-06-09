const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // 加盐后hash
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function (next) { // 若此处改为箭头函数 则会出现问题
    const user = this;

    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        } else {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                } else {
                    user.password = hash;
                    next();
                }
            })
        }


    })
});

UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            } else {
                cb(null, isMatch);
            }
        })
    }
};

UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

module.exports = UserSchema;