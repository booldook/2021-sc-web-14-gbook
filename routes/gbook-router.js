const express = require('express');
const router = express.Router();
const moment = require('moment');
const { pool } = require('../modules/mysql-init');
const { upload } = require('../modules/multer-init');
const { error } = require('../modules/utils');

const ejs = {
	tabTitle: 'Express 방명록',
	pageTitle: 'Express를 활용한 방명록 서비스',
	pageDesc: 'express, ejs, multer, mysql 등을 사용한 방명록',
}

router.get('/', async (req, res, next) => {
	try {
		let sql, values;
		const toast = req.query.toast;
		sql = 'SELECT G.*, F.savename FROM gbook G LEFT JOIN gbookfile F ON G.id = F.gid ORDER BY G.id DESC';
		const [r] = await pool.execute(sql);
		r.forEach(v => {
			v.createdAt = moment(v.createdAt).format('YYYY-MM-DD');
			v.savename = v.savename ? '/uploads/'+ v.savename.substr(0, 6) + '/' + v.savename : null;
		});
		res.render('gbook/gbook', { ...ejs, lists: r, toast });
	}
	catch(err) {
		next(error(err));
	}
});

router.post('/create', upload.single('upfile'), async (req, res, next) => {
	try {
		let sql, values; 

		// gbook 저장
		let { writer, content } = req.body;
		sql = 'INSERT INTO gbook SET writer=?, content=?';
		values = [writer, content];
		const [r] = await pool.execute(sql, values);

		if(req.file) {
			//gbookfile 저장
			let { originalname, filename, size, mimetype } = req.file;
			sql = 'INSERT INTO gbookfile SET oriname=?, savename=?, size=?, type=?, gid=?';
			values = [originalname, filename, size, mimetype, r.insertId];
			const [r2] = await pool.execute(sql, values);
		}

		res.redirect('/gbook?toast=C');
	}
	catch(err) {
		next(error(err));
	}
});

module.exports = router;