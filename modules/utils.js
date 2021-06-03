const moment = require('moment');
const createError = require('http-errors');

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
const transBackSrc = name => name ? '/storages/' + name.substr(0, 6) + '/' + name : null;

module.exports = { error, createError, imgExt, docExt, allowExt, alert, transFrontSrc, transBackSrc, transDate }