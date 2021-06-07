const moment = require('moment');
const createError = require('http-errors');
const path = require('path');

const imgExt = ['jpg', 'jpeg', 'png', 'gif'];
const docExt = ['ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'pages', 'numbers', 'key', 'pdf', 'hwp'];
const allowExt = [...imgExt, ...docExt, 'zip', 'alz'];

const error = (err) => {
	console.log(err);
	return createError(500, { code: err.code || undefined, message: err.sqlMessage || err });
}

const alert = (msg, loc='/') => `<script> alert('${msg}'); location.href = '${loc}'; </script>`;

const transDate = (date, type) => {
	switch(type) {
		case 'YMDHMS':
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		case 'MDHMS':
			return moment(date).format('MM-DD HH:mm:ss');
		case 'MDHM':
			return moment(date).format('MM-DD HH:mm');
		case 'YMD':
			return moment(date).format('YYYY-MM-DD');
		case 'MD':
			return moment(date).format('MM-DD');
		case 'YMDHMS-KO':
			return moment(date).format('YYYY년 M월 D일 H시 m분 s초');
		case 'MDHMS-KO':
			return moment(date).format('M월 D일 H시 m분 s초');
		case 'MDHM-KO':
			return moment(date).format('M월 D일 H시 m분');
		case 'YMD-KO':
			return moment(date).format('YYYY년 M월 D일');
		case 'MD-KO':
			return moment(date).format('M월 D일');
		default:
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
	}
} 
const transFrontSrc = name => name ? '/uploads/' + name.substr(0, 6) + '/' + name : null;
const transBackSrc = name => name ? path.join(__dirname, '../storages', name.substr(0, 6), name) : null;

const makePager = (_page, _totalRecord, _listCnt=10, _pagerCnt=5) => {
	let page = Number(_page);
	let totalRecord = Number(_totalRecord);
	let listCnt = Number(_listCnt);
	let pagerCnt = Number(_pagerCnt);
	let totalPage = Math.ceil(totalRecord / listCnt);
	let startIdx = (page - 1) * listCnt;
	let startPage = Math.floor((page - 1) / pagerCnt) * pagerCnt + 1;
	let endPage = (startPage + pagerCnt - 1 > totalPage) ? totalPage : startPage + pagerCnt - 1;
	let nextPage = (page + 1 > totalPage) ? totalPage : page + 1;
	let prevPage = (page - 1 < 1) ? 1 : page - 1;
	let nextPager = (endPage + 1 > totalPage) ? totalPage : endPage + 1;
	let prevPager = (startPage - 1 < 1) ? 1 : startPage - 1;
	return { 
		page, 
		totalRecord, 
		listCnt, 
		pagerCnt, 
		totalPage,
		startIdx,
		startPage,
		endPage,
		nextPage,
		prevPage,
		nextPager,
		prevPager 
	}
}

module.exports = { error, createError, imgExt, docExt, allowExt, alert, transFrontSrc, transBackSrc, transDate, makePager }