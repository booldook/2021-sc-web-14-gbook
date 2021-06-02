const createError = require('http-errors');

const error404 = (req, res, next) => {
	// 경로를 못찾으면 도착
	next(createError(404, '요청하신 페이지를 찾을 수 없습니다.'));
}

const error500 = (err, req, res, next) => {
	// 모든 에러의 종착점
	// console.log('===========ERROR==========');
	// res.json({ code: err.status, message: err.message });
	const ejs = { 
		status: err.status === 404 ? 404 : 500, 
		message: err.code || err.message, 
		description: err.description || err.message,
		headTitle: `ERROR ${err.status === 404 ? 404 : 500}`,
	}
	res.render('error/error', ejs);
};

module.exports = { createError, error404, error500 };
