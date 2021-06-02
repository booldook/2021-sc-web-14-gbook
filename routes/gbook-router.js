const express = require('express');
const router = express.Router();
const { pool } = require('../modules/mysql-init');
const { upload } = require('../modules/multer-init');
const { error } = require('../modules/utils');

const ejs = {
	tabTitle: 'Express 방명록',
	pageTitle: 'Express를 활용한 방명록 서비스',
	pageDesc: 'express, ejs, multer, mysql 등을 사용한 방명록',
	css: 'gbook',
	js: 'gbook'
}

router.get('/', async (req, res, next) => {
	res.render('gbook/gbook', { ...ejs });
});

router.post('/create', upload.single('upfile'), async (req, res, next) => {
	try {
		let { writer, content } = req.body;
		if(req.file) {
			let { originalname, filename, size, mimetype } = req.file;
			res.json({ writer, content, originalname, filename, size, mimetype });
		}
		else {
			res.json({ writer, content });
		}
	}
	catch(err) {
		next(error(err));
	}
});

module.exports = router;