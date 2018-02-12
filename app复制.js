var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('express-http-proxy');

var app = express();

// 设置模板文件及模板类型
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 设置默认ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//加载日志组件
app.use(logger('dev'));
//加载文件体解析
app.use(bodyParser.json());
//加载文件体解析
app.use(bodyParser.urlencoded({
	extended: false
}));
//引入cookie解析模块
app.use(cookieParser());
//文件静态化
app.use(express.static(path.join(__dirname, 'public')));
//引入路由
var routes = require('./routes/index');
app.use('/', routes);

//代理服务器
app.use('/data', proxy('http://localhost:8081'));

//设置404和转发错误处理程序
app.use(function(req, res, next) {

	//官方默认错误页面,可以传错误参数等信息
	var err = new Error('Not Found');
	err.status = 404;
	next(err);

	//res.status(404);
	//res.sendfile('public/error.html');
});

//错误处理程序
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;