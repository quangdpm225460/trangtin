var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = 3000;
var session = require('express-session');
var path = require('path');

var indexRouter = require('./routers/index');
var authRouter = require('./routers/auth');
var chudeRouter = require('./routers/chude');
var taikhoanRouter = require('./routers/taikhoan');
var baivietRouter = require('./routers/baiviet');

var uri = 'mongodb://admin:admin123@ac-y3g7bmk-shard-00-01.9ctqo1c.mongodb.net:27017/trangtin?ssl=true&authSource=admin';
mongoose.connect(uri).catch(err => console.log(err));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(session({
	name: 'iNews', // T�n session (t? ch?n)
	secret: 'M�o m�o meo m�o meo', // Kh�a b?o v? (t? ch?n)
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 30 * 24 * 60 * 60 * 1000 // H?t h?n sau 30 ng�y
	}
}));

app.use((req, res, next) => {
	// Chuy?n bi?n session th�nh bi?n c?c b?
	res.locals.session = req.session;

	// L?y th�ng b�o (l?i, th�nh c�ng) c?a trang tr�?c �� (n?u c�)
	var err = req.session.error;
	var msg = req.session.success;

	// X�a session sau khi �? truy?n qua bi?n trung gian
	delete req.session.error;
	delete req.session.success;

	// G�n th�ng b�o (l?i, th�nh c�ng) v�o bi?n c?c b?
	res.locals.message = '';
	if (err) res.locals.message = '<span class="text-danger">' + err + '</span>';
	if (msg) res.locals.message = '<span class="text-success">' + msg + '</span>';

	next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/chude', chudeRouter);
app.use('/taikhoan', taikhoanRouter);
app.use('/baiviet', baivietRouter);

app.get('/', (req, res) => {
	res.render('index', {title: 'Trang chủ'});
});

app.listen(port, () => {
	console.log('Server is running at http://127.0.0.1:' + port);
});