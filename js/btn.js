var btnRun = document.querySelector('.runbtn');
var btnReset = document.querySelector('.resetbtn');
var btnShowcode = document.querySelector('.showcode');
var btnEvent = function() {
	btnRun.classList.toggle('hidden');
	btnReset.classList.toggle('active');
}
btnRun.addEventListener('click', btnEvent);
btnReset.addEventListener('click', btnEvent);

var codebtnEvent = function(){
	alert("显示代码窗口");
}
btnShowcode.addEventListener('click', codebtnEvent);

