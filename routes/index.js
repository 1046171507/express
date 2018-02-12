var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.get(function timeLog(req, res, next) {
	next();
});

router.get('/', function(req, res) {
	res.redirect('/index'); //重定向请求。
	//res.sendfile('public/oIndex.html'); //以文件流发送文件。
});

router.get('/index', function(req, res, next) {
	res.sendfile('public/oIndex.html'); //以文件流发送文件。
});

router.get('/new', function(req, res, next) {
	let now = new Date();
	now.setDate(now.getDate() + 1);
	//设置cookie
	res.cookie('name', 'wang', {
		path: '/', //cookie生效区域范围
		expires: now, //cookie失效时间
		httpOnly: true //只允许web服务器访问
	});

	res.sendfile('public/new.html');
});

router.get('/my', function(req, res, next) {
	//获取cookie
	let name = req.cookies.name;

	res.render('my', { //渲染模板
		'name': name
	});
});

router.get('/users', function(req, res, next) {
	//console.log(req.query) //获取url?后的内容(json化)
	let oAlert = '';
	if(req.query.name) {
		oAlert = `
	<script>
		alert('${req.query.name}')
	</script>
		`;
	}

	let aLink = `
	<a href="/">root</a>
	<a href="/index">index</a>
	<a href="/new">new</a>
	<a href="/users">users</a>
	<a href="/users?name=wangli">users?name=wangli</a>
	<a href="/my">my</a>
	<a href="/download">download</a>
	`;
	res.send(aLink + '<div>任意内容</div>' + oAlert); //发送各种类型的响应。
});

router.get('/download', function(req, res, next) {
	res.download('public/oIndex.html'); //下载文件
});

module.exports = router;