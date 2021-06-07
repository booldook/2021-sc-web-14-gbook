const { alert } = require('../modules/utils');

const isGuest = (req, res, next) => {
	if(!req.session.user) next();
	else res.send(alert('회원은 사용하실 수 없습니다.', '/'));
}

const isDormant = (req, res, next) => {
	// if(req.session.user)
}

const isUser = (req, res, next) => {
	// if(req.session.user)
}

const isVip = (req, res, next) => {
	// if(req.session.user)
}

const isAdmin = (req, res, next) => {
	// if(req.session.user)	
}

module.exports = { isGuest, isDormant, isUser, isVip, isAdmin };