/************************ 이미지 모달 ************************/
function onImgModal(el) {
	var src = $(el).attr('src');
	$('.modal-wrapper').show(0, function(){
		$(this).addClass('active');
		$(this).find('img').attr('src', src);
	});
}

function onDelete(id) {
	if(confirm('삭제하시겠습니까?')) {
		location.href = '/gbook/remove/'+id;
	}
}

function onUpdate(id) {
	$.get('/gbook/view/'+id).then(onGet).catch(onErr);
	function onGet(r) {
		var id = r.data.id;
		var writer = r.data.writer;
		var content = r.data.content;
		var savename = r.data.savename;
		$('.form-wrapper').addClass('active');
		$('.form-wrapper').find('input[name="id"]').val(id);
		$('.form-wrapper').find('input[name="writer"]').val(writer);
		$('.form-wrapper').find('input[name="content"]').val(content);
		$('.form-wrapper').find('.img-wrap img').attr('src', savename);
	}
	function onErr(err) {
		console.log(err);
	}
}