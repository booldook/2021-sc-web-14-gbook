const express = require('express');
const router = express.Router();
const { pool } = require('../modules/mysql-init');
const { upload } = require('../modules/multer-init');
const { error, alert, transDate, transFrontSrc, makePager } = require('../modules/utils');

const ejs = {
	tabTitle: 'Express 방명록',
	pageTitle: 'Express를 활용한 회원인증 서비스',
	pageDesc: '',
	pageMode: ''
}

router.get('/signin', (req, res, next) => {
	res.render('auth/join', { ...ejs, pageMode: 'LOGIN', pageDesc: '기존회원분은 아래의 버튼을 클릭하여 로그인 해 주세요.' });
});

router.post('/signin', (req, res, next) => {
	res.send('로그인처리');
});

router.get('/signout', (req, res, next) => {
	res.send('로그아웃처리');
});

router.get('/join', (req, res, next) => {
	res.render('auth/join', { ...ejs, pageDesc: '기존회원분은 아래의 버튼을 클릭하여 로그인 해 주세요.' });
});

router.post('/join', (req, res, next) => {
	res.send('회원가입처리');
});


module.exports = router;