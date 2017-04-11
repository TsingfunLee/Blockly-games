var btnRun = document.querySelector('#playBtn');
var btnReset = document.querySelector('#resetBtn');
var btnShowcode = document.querySelector('.showcode');
var btnEvent = function() {
	btnRun.classList.toggle('active');
	btnReset.classList.toggle('active');	
}
btnRun.addEventListener('click', btnEvent);
btnReset.addEventListener('click', btnEvent);

var codebtnEvent = function(){
	alert("显示代码窗口");
}
btnShowcode.addEventListener('click', codebtnEvent);

