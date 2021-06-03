/************************ form validation ************************/
function onCreate(f) {
	if(f.writer.value.trim() === '') {
		$(f.writer).addClass('require');
		$(f).find('.require-comment').show().text('작성자를 입력하세요.');
		f.writer.focus();
		return false;
	}
	if(f.content.value.trim() === '') {
		$(f.content).addClass('require');
		$(f).find('.require-comment').show().text('내용을 입력하세요.');
		f.content.focus();
		return false;
	}
	return true;
}

function onKeyup(el) {
	if(el.value.trim().length > 0) {
		$(el).removeClass('require');
		$(el.form).find('.require-comment').hide().text('');
	}
}

function onBlur(el) {
	if(el.value.trim().length === 0) {
		$(el).addClass('require');
		$(el.form).find('.require-comment').show().text(($(el).attr('name') === 'writer' ? '작성자를' : '내용을') + ' 입력하세요.');
	}
}

