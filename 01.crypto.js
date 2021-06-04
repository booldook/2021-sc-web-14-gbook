/*  
암호화(encrypt)): 평문 -> 암호
복호화(decrypt): 암호 -> 평문

1. crypto(단방향 암호화): 한번 암호화하면 복호화 할 수 없는 기술 => 비밀번호 암호화
2. cipher(양방향 암호화): 복호화 가능한 기술 => 보안통신
*/

const crypto = require('crypto');
const bcrypt = require('bcrypt');

let salt = 'J213cfas412&^&*taq';

let pass = '1111';
let sha512 = crypto.createHash('sha512').update(pass+salt).digest('base64');

let pass2 = '1112';
let sha5122 = crypto.createHash('sha512').update(pass2+salt).digest('base64');
if(sha512 === sha5122) console.log('로그인되었습니다.');
else console.log('비밀번호를 확인하세요.');


let hash = null;
const genPass = async (pass) => {
	hash = await bcrypt.hash(pass, 4);
	console.log(hash);
}
const comparePass = async (pass) => {
	let compare = await bcrypt.compare(pass, hash);
	console.log(compare);
}
genPass('1234');
setTimeout(function() { comparePass('1235') }, 1000);