const express = require('express');
const router = express.Router();
const { pool } = require('../modules/mysql-init');
const { upload } = require('../modules/multer-init');
const fs = require('fs-extra');
const { error, alert, transDate, transFrontSrc, transBackSrc, makePager } = require('../modules/utils');
const { isGuest, isUser, isDormant, isVip, isAdmin } = require('../middlewares/auth-mw');

const ejs = {
	tabTitle: 'Express 방명록',
	pageTitle: 'Express를 활용한 방명록 서비스',
	pageDesc: 'express, ejs, multer, mysql 등을 사용한 방명록',
}

router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	try {
		let sql, values;
		sql = 'SELECT COUNT(id) FROM gbook';
		const [[r]] = await pool.execute(sql);
		let [totalRecord] = Object.values(r);
		let page = req.params.page || 1;
		let pager = makePager(page, totalRecord, 4, 3);
		sql = `SELECT G.*, F.savename FROM gbook G LEFT JOIN gbookfile F ON G.id = F.gid ORDER BY G.id DESC LIMIT ?, ?`;
		values = [String(pager.startIdx), String(pager.listCnt)];
		const [r2] = await pool.execute(sql, values);
		r2.forEach(v => v.createdAt = transDate(v.createdAt, 'YMD-KO'));
		r2.forEach(v => v.savename = transFrontSrc(v.savename));
		res.render('gbook/gbook', { ...ejs, lists: r2, pager });
	}
	catch(err) {
		next(error(err));
	}
});

router.post('/create', isUser, upload.single('upfile'), async (req, res, next) => {
	try {
		let sql, values; 

		// gbook 저장
		let { writer, content } = req.body;
		sql = 'INSERT INTO gbook SET writer=?, content=?, uid=?';
		values = [writer, content, req.session.user.id];
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

router.get('/remove/:id', isUser, async (req, res, next) => {
	try {
		let sql, values;
		let id = req.params.id;
		sql = 'SELECT * FROM gbookfile WHERE gid=?';	// 일단 첨부파일을 가져옴
		const [r] = await pool.execute(sql, [id]);
		sql = 'DELETE FROM gbook WHERE id=? AND uid=?'; // 글 레코드 삭제함 -> 첨부파일 레코드도 삭제됨
		const [r2] = await pool.execute(sql, [id, req.session.user.id]);
		if(r2.affectedRows === 1) { // 글 레코드 및 첨부파일 레코드가 삭제됐다면...
			await fs.remove(transBackSrc(r[0].savename));	// 실제 첨부파일 삭제
			res.redirect('/');
		}
		else {
			next(error('삭제가 실패하였습니다.')); // 글 삭제 실패
		}
	}
	catch(err) {
		next(error(err));
	}
});

module.exports = router;