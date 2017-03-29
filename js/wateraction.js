$(document).ready(function() {
	var lastPos = $(".select").position().left;

	function updateScale() {
		var pos = $(".select").position().left;
		var speed = Math.abs(pos - lastPos);
		var d = 44;
		var offset = -20;
		var hd = d / 2;
		var scale = 1;
		if(scale > hd) {
			scale = hd - (scale - hd);
		}
		scale = 1 - ((scale / hd) * 0.35);
		TweenMax.to($(".select"), 0.1, { scaleY: scale, scaleX: 1 + (speed * 0.06) })

		lastPos = pos;
		requestAnimationFrame(updateScale);
	}
	requestAnimationFrame(updateScale);
})