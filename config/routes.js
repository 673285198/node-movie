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
    app.get('/user/show-signin', User.showSignIn);
    app.get('/user/list', User.list);
    app.get('/user/delete',User.delete);

    // Movie
    app.get('/movie', Movie.movie);
    app.get('/movie/all', Movie.listAll);
    app.get('/movie/details-page', Movie.detailPage);
    app.get('/movie/details', Movie.details);
    app.post('/movie/add', Movie.add);
    app.get('/movie/delete', Movie.delete);

    //Admin
    app.get('/admin/movie/list', User.signInRequire, User.isAdminRequire, Admin.movieList);
    app.get('/admin/movie/add', User.signInRequire, User.isAdminRequire, Admin.addMovie);
    app.get('/admin/user/list', User.signInRequire, User.isAdminRequire, Admin.userList)

};