const express = require('express');
const router = express.Router();
const { pool } = require('../modules/mysql-init');
const { upload } = require('../modules/multer-init');
const { error, alert, transDate, transFrontSrc } = require('../modules/utils');

const ejs = {
	tabTitle: 'Express 방명록',
	pageTitle: 'Express를 활용한 방명록 서비스',
	pageDesc: 'express, ejs, multer, mysql 등을 사용한 방명록',
}

router.get('/', async (req, res, next) => {
	try {
		let sql, values;
		sql = 'SELECT G.*, F.savename FROM gbook G LEFT JOIN gbookfile F ON G.id = F.gid ORDER BY G.id DESC';
		const [r] = await pool.execute(sql);
		r.forEach(v => v.createdAt = transDate(v.createdAt, 'YMD-KO'));
		r.forEach(v => v.savename = transFrontSrc(v.savename));
		res.render('gbook/gbook', { ...ejs, lists: r });
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
		res.send(alert('저장되었습니다', '/gbook'));
	}
	catch(err) {
		next(error(err));
	}
});

module.exports = router;