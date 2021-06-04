$('form[name="joinForm"]').find('input[name="userid"]').focus(onFocus).blur(onBlur);
$('form[name="joinForm"]').find('input[name="userpw"]').focus(onFocus).blur(onBlur);
$('form[name="joinForm"]').find('input[name="userpw2"]').focus(onFocus).blur(onBlur);
$('form[name="joinForm"]').find('input[name="username"]').focus(onFocus).blur(onBlur);
$('form[name="joinForm"]').find('input[name="email"]').focus(onFocus).blur(onBlur);

function onFocus() {
	var el = $(this).attr('name');
	$(this).removeClass('danger').addClass('active');
}

function onBlur() {
	var el = $(this).attr('name');
	var valid = false;
	switch(el) {
		case userid:
			// 통신
			break;
	}
}