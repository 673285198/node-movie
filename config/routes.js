const Index = require('../app/controllers/index');
const User = require('../app/controllers/user');
const Movie = require('../app/controllers/movie');
const Admin = require('../app/controllers/admin');

module.exports = function (app) {

    // Index
    app.get('/', Index.index);

    // User
    app.get('/user/current-user', User.currentUser);
    app.post('/user/signup', User.signUp);
    app.post('/user/signin', User.signIn);
    app.get('/user/signout', User.signOut);

    // Movie
    app.get('/movie', Movie.movie);
    app.get('/movie/all', Movie.listAll);
    app.get('/movie/details-page', Movie.detailPage);
    app.get('/movie/details', Movie.details);
    app.post('/movie/add', Movie.add);
    app.get('/movie/delete', Movie.delete);

    //Admin
    app.get('/admin', Admin.adminPage);
    app.get('/admin/add', Admin.add);

};