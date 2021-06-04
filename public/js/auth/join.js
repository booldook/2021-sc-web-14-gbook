$('form[name="joinForm"]').find('input[name="userid"]').focus(onFocus).blur(onBlurId);
$('form[name="joinForm"]').find('input[name="userpw"]').focus(onFocus).blur(onBlurPw);
$('form[name="joinForm"]').find('input[name="userpw2"]').focus(onFocus).blur(onBlurPw2);
$('form[name="joinForm"]').find('input[name="username"]').focus(onFocus).blur(onBlurName);
$('form[name="joinForm"]').find('input[name="email"]').focus(onFocus).blur(onBlurMail);

function showMsg(el, valid, msg) {
	if(valid === true) {
		$(el).removeClass('danger active').addClass('success')
		$(el).parent().next().addClass('success').show().text(msg);
	}
	else if(valid === false){
		$(el).addClass('danger').removeClass('active success');
		$(el).parent().next().removeClass('success').show().text(msg);
	}
	else {
		$(el).removeClass('danger success').addClass('active');
		$(el).parent().next().removeClass('success').hide().text('');
	}
}

function onFocus() {
	var $el = $(this);
	showMsg($el);
}

function onBlurId() {
	var $userid = $(this);
	var userid = $userid.val().trim();
	if(userid.length < 4) {
		showMsg($userid, false, '아이디는 4자 이상입니다.');
		return false;
	}
	$.get('/auth/idchk/'+userid).then(function(r) {
		console.log(r);
		if(r.validation) showMsg($userid, true, '너무 마음에 드는 아이디에요~');
		else showMsg($userid, false, '사용할 수 없어요. 다른아이디를 사용하세요.');
	}).catch(function(err) {
		console.log(err);
	})
}

function onBlurPw() {
	var $el = $(this);
	var pass = $el.val().trim();
	if(validPass(pass)) showMsg($el, true, '사용하실 수 있습니다.');
	else showMsg($el, false, '비밀번호는 숫자, 문자, 특수문자를 포함한 8 ~ 16자리 입니다.');
}

function onBlurPw2() {
	var $el = $(this);
	var pass = $el.val().trim();
	var passOriginal = $('form[name="joinForm"]').find('input[name="userpw"]').val().trim();
	if(pass === passOriginal && pass.length >= 8) showMsg($el, true, '사용하실 수 있습니다.');
	else showMsg($el, false, '비밀번호가 일치하지 않습니다.');
}

function onBlurName() {
	var $el = $(this);
	var name = $el.val().trim();
	if(name.length > 0) showMsg($el, true, '사용하실 수 있습니다.');
	else showMsg($el, false, '이름은 한글자 이상입니다.');
}

function onBlurMail() {
	var $el = $(this);
	var email = $el.val().trim();
	if(validEmail(email)) showMsg($el, true, '사용하실 수 있습니다.');
	else showMsg($el, false, '이메일을 정확히 입력하세요.');
}

function onJoinSubmit(f) {
	// 1. form 안의 모든 input이 success를 가지고 있는지 체크하고... 
	// 2. 다 가지고 있으면 전송하고...
	// 3. 가지고 있지 않으면 안가지고 있는 input에 커서를 위치시키기...
	var $form = $(f);
	var $input = $form.find('input');
	$input.each(function() { $(this).trigger('blur') });
	var success = Array.from($input).every(function(v) { return $(v).hasClass('success') });
	if(success) return true;
	else {
		console.log( $form.find('input:not(.success)').eq(0) );
		$form.find('input:not(.success)').eq(0).focus();
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
