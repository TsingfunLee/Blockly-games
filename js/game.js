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
 * Path that role can walk.
 * Create an array to store path block.
 * 1 --- path; 0 --- wall; 2 --- start; 3 --- finish.
 */
Game.path = [
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 2, 1, 3, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0]
];

/**
 * Path constants
 */
Game.pathType = {
	WALL: 0,
	PATH: 1,
	START: 2,
	FINISH: 3
};

/**
 * Initialize Game.
 */
Game.init = function() {
	Game.canvas = document.getElementById('canvas');
	Game.context = Game.canvas.getContext('2d');
	Game.role = new Image();

	// Set width and height of canvas.
	Game.canvas.width = 400;
	Game.canvas.height = 400;

    Game.drawPath();
	Game.drawRole();
	
	document.getElementById('playBtn').addEventListener('click', Game.play);

	window.onresize = Game.onresize;
};

Game.drawRole = function() {
	Game.role.onload = function() {
		Game.context.drawImage(Game.role, Game.role.start_.x, Game.role.start_.y, 50, 50);
	};
	Game.role.src = 'img/role.jpg';
};

Game.drawPath = function() {
	var earth = new Image();
	var destination = new Image();
	earth.onload = function() {
		var i, j;
		for(i = 0; i < 8; ++i){
			for(j = 0; j < 8; ++j){
				if(Game.path[i][j] === Game.pathType.PATH){
					Game.context.drawImage(this, j * 50, i * 50, 50, 50);
				}else if(Game.path[i][j] === Game.pathType.START){
					Game.role.start_ = {
						x: j * 50,
						y: i * 50
					};
				}else if(Game.path[i][j] === Game.pathType.FINISH){
					Game.role.finish_ = {
						x: j * 50,
						y: i * 50
					};
					
					// draw destination image.					
					Game.context.drawImage(destination, j * 50, i * 50, 50, 50);					
				}
			}		
		}		
	};
	earth.src = 'img/earth.jpg';
	destination.src = 'img/destination.jpg';
};

Game.onresize = function() {

};

Game.moveforward = function() {
	
};

Game.turnright = function() {
	
};

Game.turnleft = function() {
	
};

Game.interpreter = function() {
	
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