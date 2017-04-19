//var mousewheelEvent = window.navigator.userAgent.indexOf('Firefox') > 0 ? 'DOMMouseScroll' : 'mousewheel';
			
//var menubar = document.getElementsByClassName('toolbar')[0];
//window.addEventListener(mousewheelEvent, function(event) {
//	if(event.deltaY) {
//		if(event.deltaY > 0) {
//			menubar.classList.add('anim');
//		}
//		if(event.deltaY <= 0) {
//			menubar.classList.remove('anim');
//		}
//	} else if(event.detail) {
//		if(event.detail > 0) {
//			menubar.classList.add('anim');
//		}
//		if(event.detail <= 0) {
//			menubar.classList.remove('anim');
//		}
//	}
//
//});
/*绑定scroll事件*/
//window.addEventListener('scroll', function(event) {
//	/*获取页面初始滚动条位置*/
//	var scrollTop=document.body.scrollTop;
//	/*判断滚动条的位置变化*/
//	if(scrollTop > 0) {
//			menubar.classList.add('anim');
//	}
//  if(scrollTop <= 0){
//			menubar.classList.remove('anim');
//  }
//
//});
/*为了兼容火狐浏览器*/
$(document).on("scroll",function(){
	var scrollTop=document.body.scrollTop;
	if($(document).scrollTop() > 0){
		$(".toolbar").addClass("anim");
	}
	if($(document).scrollTop() <= 0){
		$(".toolbar").removeClass("anim");
	}
});
