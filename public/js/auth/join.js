$('form[name="joinForm"]').find('input[name="userid"]').focus(onFocus);
$('form[name="joinForm"]').find('input[name="userpw"]').focus(onFocus);
$('form[name="joinForm"]').find('input[name="userpw2"]').focus(onFocus);
$('form[name="joinForm"]').find('input[name="username"]').focus(onFocus);
$('form[name="joinForm"]').find('input[name="email"]').focus(onFocus);

var fn = [onBlurId, onBlurPw, onBlurPw2, onBlurName, onBlurMail];
var successMsg = [
	'너무 마음에 드는 아이디에요~',
	'사용하실 수 있습니다.',
	'사용하실 수 있습니다.',
	'사용하실 수 있습니다.',
	'사용하실 수 있습니다.'
];
var errorMsg = [
	'아이디는 4자 이상입니다.',
	'비밀번호는 숫자, 문자, 특수문자를 포함한 8 ~ 16자리 입니다.',
	'비밀번호가 일치하지 않습니다.',
	'이름은 한글자 이상입니다.',
	'이메일을 정확히 입력하세요.'
];

function showMsg(el, valid, msg) {
	if(valid === true) {
		$(el).removeClass('danger active').addClass('success')
		$(el).parent().next().addClass('success').show().text(msg);
	}
	else if(valid === false){
		$(el).addClass('danger').removeClass('active success');
		$(el).parent().next().removeClass('success').show().text(msg);
	}
	else if(valid == 'RESET') {
		$(el).removeClass('active success danger');
		// $(el).parent().next().removeClass('success').hide().text('');
	}
	else {
		$(el).removeClass('danger success').addClass('active');
		$(el).parent().next().removeClass('success').hide().text('');
	}
}

function onFocus() {
	var $form = $('form[name="joinForm"]');
	var $input = $form.find('input');
	var $el = $(this);
	var idx = $el.data('id')
	for(var i=0; i<$input.length; i++) {
		if(i < idx) fn[i]($input.eq(i));
		else if(i > idx) showMsg($input.eq(i), 'RESET');
		else showMsg($el);
	}
}

function onBlurId(el) {
	var $el = $(el);
	var userid = $el.val().trim();
	var idx = $el.data('id');
	if(userid.length < 4) {
		showMsg($el, false, errorMsg[idx]);
		return false;
	}
	$.get('/auth/idchk/'+userid).then(function(r) {
		console.log(r);
		if(r.validation) showMsg($el, true, successMsg[idx]);
		else showMsg($el, false, '사용할 수 없습니다. 다른 아이디를 사용해 주세요.');
	}).catch(function(err) {
		console.log(err);
	})
}

function onBlurPw(el) {
	var $el = $(el);
	var pass = $el.val().trim();
	var idx = $el.data('id');
	if(validPass(pass)) showMsg($el, true, successMsg[idx]);
	else showMsg($el, false, errorMsg[idx]);
}

function onBlurPw2(el) {
	var $el = $(el);
	var pass = $el.val().trim();
	var idx = $el.data('id');
	var passOriginal = $('form[name="joinForm"]').find('input[name="userpw"]').val().trim();
	if(pass === passOriginal && pass.length >= 8) showMsg($el, true, successMsg[idx]);
	else showMsg($el, false, errorMsg[idx]);
}

function onBlurName(el) {
	var $el = $(el);
	var name = $el.val().trim();
	var idx = $el.data('id');
	if(name.length > 0) showMsg($el, true, successMsg[idx]);
	else showMsg($el, false, errorMsg[idx]);
}

function onBlurMail(el) {
	var $el = $(el);
	var email = $el.val().trim();
	var idx = $el.data('id');
	if(validEmail(email)) showMsg($el, true, successMsg[idx]);
	else showMsg($el, false, errorMsg[idx]);
}

function onJoinSubmit(f) {
	// 1. form 안의 모든 input이 success를 가지고 있는지 체크하고... 
	// 2. 다 가지고 있으면 전송하고...
	// 3. 가지고 있지 않으면 안가지고 있는 input에 커서를 위치시키기...
	var $form = $(f);
	var $input = $form.find('input');
	for(var i=0; i<$input.length; i++) {
		fn[i]($input.eq(i));
	}
	var success = Array.from($input).every(function(v) { return $(v).hasClass('success') });
	if(success) return true;
	else {
		var $el = $form.find('input:not(.success)').eq(0);
		$el.focus();
		$el.parent().next().show().text(errorMsg[$el.data('id')]);
		return false;
	}
}




/* var successChk = Array.from($('form[name="joinForm"]').find('input')).every(function(v) {
	return $(v).hasClass('form-control');
});
console.log(successChk);

var successChk = true;
$('form[name="joinForm"]').find('input').each(function(i) {
	if(!$(this).hasClass('success')) successChk = false;
});
console.log(successChk)
*/
