$('form[name="joinForm"]').find('input[name="userid"]').focus(onFocus).blur(onBlurId);
$('form[name="joinForm"]').find('input[name="userpw"]').focus(onFocus).blur(onBlur);
$('form[name="joinForm"]').find('input[name="userpw2"]').focus(onFocus).blur(onBlur);
$('form[name="joinForm"]').find('input[name="username"]').focus(onFocus).blur(onBlur);
$('form[name="joinForm"]').find('input[name="email"]').focus(onFocus).blur(onBlur);

function onFocus() {
	var el = $(this).attr('name');
	$(this).removeClass('danger').addClass('active');
}

function onBlurId() {
	var valid = false;
	$.get('/auth/idchk/'+$(this).val()).then(function(r) {
		console.log(r);
	}).catch(function(err) {
		console.log(err);
	})
}

function onBlur() {
	var el = $(this).attr('name');
}