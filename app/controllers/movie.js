const Movie = require('../modules/movie');
const underscroe = require('underscore');


exports.movie = (req, res, next) => {
    console.log('user in session' + req.session.user);
    res.render('list', {'title': 'Movie Details'})
};

exports.listAll = (req, res, next) => {

    Movie.list((err, movies) => {
        if (err) {
            console.log(err);
        }
        res.send({
            movies: movies
        });
    })
};

exports.detailPage = (req, res, next) => {
    let id = req.query.id; // 获取GET请求中的参数值
    console.log(id);
    res.render('details', {'movieId': id});
};

exports.details = (req, res, next) => {
    let id = req.query.id;
    Movie.findById(id, (err, movie) => {
        res.send({
            movie: movie
        })
    })
};

exports.add = (req, res, next) => {
    let id = req.body._id;
    let movieObj = JSON.parse(req.body.movie);
    let _movie;
    if (id !== null && id !== undefined) { // 更新操作
        Movie.findById(id, (err, movie) => {
            if (err) {
                console.log(err);
            }
            _movie = underscroe.extend(movie, movieObj); // 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象
            _movie.save((err, movie) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({result: 'success'});
                }
            });
        })
    } else { // 插入操作
        _movie = new Movie({
            title: movieObj.title,
            director: movieObj.director,
            language: movieObj.language,
            country: movieObj.country,
            summary: movieObj.summary,
            flash: movieObj.flash,
            picture: movieObj.picture,
            year: movieObj.year,
        });

        console.log(_movie);

        _movie.save((err, movie) => {
            if (err) {
                console.log(err);
            } else {
                res.send({result: 'success'});
            }

        });
    }
};

//删除操作
exports.delete = (req, res) => {
    let id = req.query.id;
    let conditions = {_id: id};
    Movie.remove(conditions, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({result: 'success'});
        }
    });
};