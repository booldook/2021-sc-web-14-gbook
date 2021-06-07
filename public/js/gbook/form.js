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

function onFormReset(f) {
	$(f).find('.form-wrapper').removeClass('active');
	$(f).find('input[name="id"]').val('');
	$(f).find('input[name="writer"]').val('');
	$(f).find('input[name="content"]').val('');
	$(f).find('.img-wrap img').attr('src', '');
	$(f).find('.img-remove').data('id', '');
	$(f).find('.img-remove').data('fid', '');
}

$('.img-remove').click(function() {
	if(confirm('첨부파일을 삭제하시겠습니까? 삭제 후에는 복구가 되지 않습니다.')) {
		var id = $(this).data('id');
		var fid = $(this).data('fid');
		// http://127.0.0.1:3000/gbook/file/remove?id=6&fid=5
		console.log(id, fid);
		$.get('/gbook/file/remove', { id: id, fid: fid }).then(onGet).catch(onErr);
		function onGet(r) {	// res.status(200)
			console.log(r);
		}
		function onErr(err) {	// res.status(500)
			console.log(err.responseText);
		}
	}
});