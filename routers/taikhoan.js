var express = require('express');
var router = express.Router();
var TaiKhoan = require('../models/taikhoan');

// GET: Danh sách tài khoản
router.get('/', async (req, res) => {
	var tk = await TaiKhoan.find();
	res.render('taikhoan', {
		title: 'Danh sách tài khoản',
		taikhoan: tk
	});
});

// GET: Thêm tài khoản
router.get('/them', async (req, res) => {

});

// POST: Thêm tài khoản
router.post('/them', async (req, res) => {

});

// GET: Sửa tài khoản
router.get('/sua/:id', async (req, res) => {

});

// POST: Sửa tài khoản
router.post('/sua/:id', async (req, res) => {

});

// GET: Xóa tài khoản
router.get('/xoa/:id', async (req, res) => {

});

module.exports = router;