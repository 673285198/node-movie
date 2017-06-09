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
   res.send({result:'success'});
};

