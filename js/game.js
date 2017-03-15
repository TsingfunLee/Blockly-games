'use strict';

/**
 * Namespace of game.
 */
var Game = {};

/**
 * The animation region.
 */
Game.canvas = null;

/**
 * The context of canvas.
 */
Game.context = null;

/**
 * Role of the game.
 * It is a image.
 */
Game.role = null;

/**
 * Initialize Game.
 */
Game.init = function() {
	Game.canvas = document.getElementById('canvas');
	Game.context = Game.canvas.getContext('2d');
	Game.role = new Image();

	// Set width and height of canvas.
	// var animationDiv = document.getElementById('animationDiv');
	Game.canvas.width = 400;
	Game.canvas.height = 400;

	Game.drawRole();
	
	document.getElementById('playBtn').addEventListener('click', Game.play);

	window.onresize = Game.onresize;
};

Game.drawRole = function() {
	Game.role.onload = function() {
		Game.context.drawImage(Game.role, 0, 0, 50, 50);
	};
	Game.role.src = 'img/role.jpg';
};

Game.drawEarth = function() {
	var earth = new Image();
	earth.onload = function() {
		
	};
};

Game.onresize = function() {

};

Game.step = function() {
	
};

Game.turnright = function() {
	
};

Game.turnleft = function() {
	
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