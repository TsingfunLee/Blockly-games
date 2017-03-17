'use strict';

goog.provide('Game');

goog.require('App');

var Game = {};

Game.WIDTH = 400;
Game.HEIGHT = Game.WIDTH;

Game.COLS = 8;
Game.ROWS = Game.COLS;

Game.SQUERE = Game.WIDTH / Game.COLS;

/**
 * Pictures source.
 */
Game.ROLESRC = 'img/role.jpg';
Game.EARTHSRC = 'img/earth.jpg';
Game.DESTINATION = 'img/destination.jpg';

///**
// * The animation region.
// */
//Game.canvas = null;
//
///**
// * The context of canvas.
// */
//Game.context = null;
//
///**
// * Role of the game.
// * It is a image.
// */
//Game.role = null;
//
///**
// * Path image.
// */
//Game.earth = null;
//
///**
// * Destination image.
// */
//Game.destination = null;

/**
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
 * Path constants.
 */
Game.pathType = {
	WALL: 0,
	PATH: 1,
	START: 2,
	FINISH: 3
};

/**
 * Direction constants.
 */
Game.directionType = {
	NORTH: 0,
	EAST: 1,
	SOUTH: 2,
	WEST: 3
};

///**
// * JS interpreter.
// */
//Game.interpreter = null;

/**
 * Initialize Game.
 */
Game.init = function() {
	Game.canvas = document.getElementById('canvas');
	Game.context = Game.canvas.getContext('2d');

	// Set width and height of canvas.
	Game.canvas.width = Game.WIDTH;
	Game.canvas.height = Game.HEIGHT;
	
	Game.DIRECTION = Game.directionType.EAST;
	
	// Set start point and finish point.
	for (var i = 0, j = 0; i < Game.ROWS; ++i) {
		for (j = 0; j < Game.COLS; ++j) {
			if(Game.path[i][j] == Game.pathType.START){
				Game.start = {
					x: j * Game.SQUERE,
					y: i * Game.SQUERE
				};
			}else if(Game.path[i][j] == Game.pathType.FINISH){
				Game.finish = {
					x: j * Game.SQUERE,
					y: i * Game.SQUERE
				};
			}
		}
	}

	Game.initPath().then(Game.initRole);

	document.getElementById('playBtn').addEventListener('click', Game.play);
	document.getElementById('resetBtn').addEventListener('click', Game.reset);

	window.onresize = Game.onresize;
};

Game.initRole = function() {
	Game.role = new Image();
	Game.role.position = {
		x: Game.start.x,
		y: Game.start.y
	};
	Game.role.lastPosition = {
		x: Game.role.position.x,
		y: Game.role.position.y
	};
	Game.role.onload = function() {
		Game.context.drawImage(Game.role, Game.start.x, Game.start.y, Game.SQUERE, Game.SQUERE);
	};
	Game.role.src = Game.ROLESRC;
};

/**
 * @param {Number} x. X coodinate of role.
 * @param {Number} y. Y coodinate of role.
 */
Game.drawRole = function(x, y) {
	Game.context.drawImage(Game.role, x, y, Game.SQUERE, Game.SQUERE);
};

Game.initPath = function() {
	Game.earth = new Image();
	Game.destination = new Image();
	Game.earth.onload = function() {
		Game.drawPath();
	};
	Game.earth.src = Game.EARTHSRC;
	Game.destination.src = Game.DESTINATION;

	return new Promise((resolve, reject) => {
		resolve();
	});
};

Game.drawPath = function() {
	var i, j;
	for(i = 0; i < Game.ROWS; ++i) {
		for(j = 0; j < Game.COLS; ++j) {
			if(Game.path[i][j] === Game.pathType.PATH || Game.path[i][j] === Game.pathType.START) {
				Game.context.drawImage(Game.earth, j * Game.SQUERE, i * Game.SQUERE, Game.SQUERE, Game.SQUERE);
			} else if(Game.path[i][j] === Game.pathType.FINISH) {
				// draw destination image.					
				Game.context.drawImage(Game.destination, j * Game.SQUERE, i * Game.SQUERE, Game.SQUERE, Game.SQUERE);
			}
		}
	}
};

Game.onresize = function() {

};

/**
 * @param {Number} direction. Game.directionType.
 */
Game.moveforward = function() {
	switch(Game.DIRECTION){
		case Game.directionType.NORTH:
			Game.role.position.y --;
			break;
		case Game.directionType.EAST:
			Game.role.position.x ++;
			break;
		case Game.directionType.SOUTH:
			Game.role.position.y ++;
			break;
		case Game.directionType.WEST:
			Game.role.position.x --;
			break;
		default: 
			console.error('direction is wrong.');
	}

	Game.drawPath();
	Game.drawRole(Game.role.position.x, Game.role.position.y);

	var raf = window.requestAnimationFrame(Game.moveforward);

	if(Game.role.position.x >= Game.role.lastPosition.x + Game.SQUERE) {
		window.cancelAnimationFrame(raf);
	}
};

Game.turnright = function() {

};

Game.turnleft = function() {

};

/**
 * API added to interpreter.
 * @param {Interpreter} JS interpreter.
 * @param {Object} scope.
 */
Game.initApi = function(interpreter, scope) {
	// Add an API function for moveforward() block.
	var wrapper = function() {
		return interpreter.createPrimitive(Game.moveforward());
	};
	interpreter.setProperty(scope, 'moveforward', interpreter.createNativeFunction(wrapper));
};

/**
 * Excute code generated from blocks.
 * @param {Interpreter} JS interpreter.
 */
Game.excute = function(interpreter) {
	if(interpreter.step()) {
		// Remenber last postion so that judge if the moving length is equal to side length of a square.
		Game.role.lastPosition = {
			x: Game.role.position.x,
			y: Game.role.position.y
		};
		window.setTimeout(function() {
			Game.excute(interpreter);
		}, 50);
	}
};

Game.play = function() {
	var code = Blockly.JavaScript.workspaceToCode(App.workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	var interpreter = new Interpreter(code, Game.initApi);
	try {
		Game.excute(interpreter);
	} catch(e) {
		alert(MSG['badCode'].replace('%1', e));
	}
	
	document.getElementById('resetBtn').style.visibility = 'visible';
	document.getElementById('playBtn').style.visibility = 'hidden';
};

Game.reset = function() {
	// Clear canvas.
	Game.canvas.width = Game.canvas.width;
	Game.initPath().then(Game.initRole);
	
	document.getElementById('playBtn').style.visibility = 'visible';
	document.getElementById('resetBtn').style.visibility = 'hidden';
}

window.addEventListener('load', Game.init, false);