function onSignSubmit(f) {
	if(f.userid.value.trim() === '') {
		f.userid.focus();
		return false;
	}
	if(f.userpw.value.trim() === '') {
		f.userpw.focus();
		return false;
	}
	return true;
}