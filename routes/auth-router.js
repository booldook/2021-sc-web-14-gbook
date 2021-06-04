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

router.get('/idchk/:userid', async (req, res, next) => {
	try {
		let sql;
		let userid = req.params.userid;
		sql = 'SELECT userid FROM users WHERE serid=?';
		const [r] = await pool.execute(sql, [userid]);
		if(r.length === 0) res.status(200).json({ validation: true });
		else res.status(200).json({ validation: false });
	}
	catch(err) {
		res.status(500).json({ error: err });
	}
});

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