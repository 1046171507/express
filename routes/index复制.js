/*
var express = require('express');
var router = express.Router();

//GET home page.
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
*/

var express = require('express');
var router = express.Router();

// 该路由使用的中间件(好像也没用)
//router.use(function timeLog(req, res, next) {
//	next();
//});

// '/'好像默认指向index,这里设置没意义
router.get('/', function(req, res, next) {
	res.render('index'); //渲染视图模板。
});

router.get('/index', function(req, res, next) {
	//console.log(req.query) //获取url?后的内容(json化)
	let now = new Date();
	now.setDate(now.getDate() + 1);

	//获取cookie
	//console.log('cookie:name='+req.cookies.name) 

	//设置cookie
	res.cookie('name', 'wangli', {
		path: '/', //cookie生效区域范围
		expires: now, //cookie失效时间
		httpOnly: true //只允许web服务器访问
	});
	res.sendfile('public/index.html'); //以八位字节流的形式发送文件。
	//res.redirect('/my'); //重定向请求。
	//res.download('public/index.html'); //下载文件
});

router.get('/users', function(req, res, next) {
	res.send('respond with a resource'); //发送各种类型的响应。
});

router.get('/my', function(req, res, next) {
	res.render('my', {
		title: 'my'
	});
});

router.get('/new', function(req, res, next) {
	res.sendfile('public/new.html');
});

module.exports = router;