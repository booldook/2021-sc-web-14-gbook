const express = require('express');
const router = express.Router();

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

module.exports = router;