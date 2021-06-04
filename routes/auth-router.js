const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
		sql = 'SELECT userid FROM users WHERE userid=?';
		const [r] = await pool.execute(sql, [userid]);
		if(r.length === 0) res.status(200).json({ validation: true });
		else res.status(200).json({ validation: false });
	}
	catch(err) {
		res.status(500).json({ error: err });
	}
});

router.get('/sign', (req, res, next) => {
	res.render('auth/sign', { ...ejs, pageMode: 'SIGN', pageDesc: '회원이 아니신 분은 아래의 버튼을 클릭하여 회원가입 해 주세요.' });
});

router.post('/sign', async (req, res, next) => {

});

router.get('/signout', (req, res, next) => {
	res.send('로그아웃처리');
});

router.get('/join', (req, res, next) => {
	res.render('auth/join', { ...ejs, pageMode: 'JOIN', pageDesc: '기존회원분은 아래의 버튼을 클릭하여 로그인 해 주세요.' });
});

router.post('/join', async (req, res, next) => {
	try {
		let sql, values;
		let { userid, userpw, username, email } = req.body;
		userpw = await bcrypt.hash(userpw, 6);
		sql = 'INSERT INTO users SET userid=?, userpw=?, username=?, email=?';
		values = [userid, userpw, username, email];
		const [r] = await pool.execute(sql, values);
		res.send(alert('회원가입이 완료되었습니다.', '/'));
	}
	catch(err) {
		next(error(err));
	}
});


module.exports = router;