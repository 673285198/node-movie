const User = require('../modules/user');

// 获取当前用户
exports.currentUser = (req, res) => {
    res.send({user: req.session.user});
};

// 注册
exports.signUp = (req, res) => {
    let userObj = JSON.parse(req.body.user);
    User.findOne({name: userObj.name}, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (user) { //如果存在，则跳转至登录连接
            res.json({result: 'exist'}); // 已存在
        } else {
            user = new User({
                name: userObj.name,
                password: userObj.password
            });
            user.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.json({result: 'fail'});
                } else {
                    res.json({result: 'success'});
                }
            })
        }
    })
};

// 登录
exports.signIn = (req, res) => {
    let userObj = JSON.parse(req.body.user);
    let name = userObj.name;
    let password = userObj.password;

    User.findOne({name: name}, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (!user) {
            res.json({result: 'notexist'}); // 未注册
        } else {

            console.log(user.name + user.password);

            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                }

                if (isMatch) {
                    req.session.user = user;
                    res.json({result: 'success'});
                } else {
                    res.json({result: 'wrong'});
                }
            });
        }
    });
};

// 登出
exports.signOut = (req, res) => {
    delete req.session.user;
    res.send({result: 'success'});
};

// 登录页面
exports.showSignIn = (req, res) => {
    res.render('login', {title: '登录页面'});
};

// 列出所有用户
exports.list = (req, res) => {
    User.fetch((err, users) => {
        if (err) {
            console.log(err);
        } else {
            res.send({users: users});
        }
    });
};

exports.delete = (req, res) => {
    let _id = req.query.id; // get请求的data:{id:_id}，从req.query中获取
    let conditions = {_id: _id};
    User.remove(conditions, (err, user) => {
        if (err) {
            console.log(err);
            res.json({result: 'fail'});
        } else {
            res.json({result: 'success'});
        }
    });
};

// 登录 middle ware
exports.signInRequire = (req, res, next) => {
    let user = req.session.user;
    if (!user) { // 未登录
        res.redirect('/user/show-signin');
    } else {
        next();
    }
};

// 管理员 middle ware
exports.isAdminRequire = (req, res, next) => {
    let user = req.session.user;
    if (user.role > 10) { // 10以上为管理员角色
        next();
    } else {
        res.redirect('/');
    }
};



