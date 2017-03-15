'use strict';

/**
 * Namespace of game.
 */
var Game = {};

Game.canvas = null;
Game.context = null;

/**
 * Initialize Game.
 */
Game.init = function() {
	Game.canvas = document.getElementById('canvas');
	Game.context = Game.canvas.getContext('2d');

	// Set width and height of canvas the same as the animation div.
	var animationDiv = document.getElementById('animationDiv');
	Game.canvas.width = animationDiv.clientWidth;
	Game.canvas.height = animationDiv.clientHeight;

	Game.drawRole();
	
	document.getElementById('playBtn').addEventListener('click', Game.play);

	window.onresize = Game.onresize;
};

Game.drawRole = function() {
	var img = new Image();

	img.onload = function() {
		Game.context.drawImage(img, 0, 0, 100, 100);
	};
	img.src = 'img/worm.png';
};

Game.onresize = function() {
	var animationDiv = document.getElementById('animationDiv');
	Game.canvas.width = animationDiv.clientWidth;
	Game.canvas.height = animationDiv.clientHeight;

	Game.drawRole();
};

Game.play = function() {
	var code = Blockly.JavaScript.workspaceToCode(App.workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	try {
		eval(code);
	} catch(e) {
		alert(MSG['badCode'].replace('%1', e));
	}
};

window.addEventListener('load', Game.init, false);