const { alert } = require('../modules/utils');

const isGuest = (req, res, next) => {
	if(!req.session.user) next();
	else res.send(alert('회원은 사용하실 수 없습니다.', '/'));
}

const isDormant = (req, res, next) => {
	if(req.session.user && req.session.user.grade === 1) next();
	else res.send(alert('유휴회원만 사용하실 수 있습니다.', '/'));
}

const isUser = (req, res, next) => {
	if(req.session.user) next();
	else res.send(alert('회원만 사용하실 수 있습니다. 로그인 후 사용해 주세요.', '/'));
}

const isVip = (req, res, next) => {
	if(req.session.user && req.session.user.grade === 3) next();
	else res.send(alert('VIP회원만 사용하실 수 있습니다.', '/'));
}

const isAdmin = (req, res, next) => {
	if(req.session.user && req.session.user.grade === 9) next();
	else res.send(alert('관리자만 사용하실 수 있습니다.', '/'));
}

module.exports = { isGuest, isDormant, isUser, isVip, isAdmin };