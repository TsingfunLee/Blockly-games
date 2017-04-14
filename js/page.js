var mousewheelEvent = window.navigator.userAgent.indexOf('Firefox') > 0 ? 'DOMMouseScroll' : 'mousewheel';

var menubar = document.getElementsByClassName('toolbar')[0];
window.addEventListener(mousewheelEvent, function(event) {
	if(event.deltaY) {
		if(event.deltaY > 0) {
			menubar.classList.add('anim');
		}
		if(event.deltaY <= 0) {
			menubar.classList.remove('anim');
		}
	} else if(event.detail) {
		if(event.detail > 0) {
			menubar.classList.add('anim');
		}
		if(event.detail <= 0) {
			menubar.classList.remove('anim');
		}
	}
});
