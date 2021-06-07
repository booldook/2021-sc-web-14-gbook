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
		console.log(r);
		var id = r.data.id;
		var writer = r.data.writer;
		var content = r.data.content;
		var savename = r.data.savename;
		var fid = r.data.fid;
		$('.form-wrapper').addClass('active');
		$('.form-wrapper').find('input[name="id"]').val(id);
		$('.form-wrapper').find('input[name="writer"]').val(writer);
		$('.form-wrapper').find('input[name="content"]').val(content);
		if(savename) {
			$('.form-wrapper').find('.img-wrap').show();
			$('.form-wrapper').find('.img-wrap img').attr('src', savename);
		}
		else {
			$('.form-wrapper').find('.img-wrap').hide();
		}
		$('.form-wrapper').find('.img-remove').data('id', id);
		$('.form-wrapper').find('.img-remove').data('fid', fid);
	}
	function onErr(err) {
		console.log(err);
	}
}