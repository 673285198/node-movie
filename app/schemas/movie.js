const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	title:String,
	director:String,
	language: String,
    country: String,
    summary: String,
    flash: String,
    picture:String,
    year: Number,
    // meta 更新或录入数据的时间记录
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        },
    }
});

MovieSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});

// movieSchema 模式的静态方法
MovieSchema.statics = {
    list: function (cb) {
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

// 导出movieSchema模式
module.exports = MovieSchema;