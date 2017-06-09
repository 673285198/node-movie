// 跳转至首页

exports.index = (req, res, next) => {
    res.render('index', { title: 'Express' });
};
