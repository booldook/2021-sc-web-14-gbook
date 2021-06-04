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
	var userid = $userid.val();
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
	var pass = $el.val();
	if(validPass(pass)) showMsg($el, true, '사용하실 수 있습니다.');
	else showMsg($el, false, '비밀번호는 숫자, 문자, 특수문자를 포함한 8 ~ 16자리 입니다.');
}

