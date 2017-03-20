'use strict';

goog.provide('Game');

goog.require('App');

var Game = {};

Game.WIDTH = 400;
Game.HEIGHT = Game.WIDTH;

Game.COLS = 8;
Game.ROWS = Game.COLS;

/**
 * Length of a square's side.
 */
Game.SQUARE = Game.WIDTH / Game.COLS;

/**
 * Pictures source.
 */
Game.ROLESRC = 'img/role.jpg';
Game.EARTHSRC = 'img/earth.jpg';
Game.DESTINATIONARC = 'img/destination.jpg';

/**
 * 1 --- path; 0 --- wall; 2 --- start; 3 --- finish.
 */
Game.path = [
	undefined,
[
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0],
	[0, 0, 2, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 3, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
]][App.LEVEL];

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

/**
 * Moving distance.
 */
Game.delta = 0;


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
					x: j * Game.SQUARE,
					y: i * Game.SQUARE
				};
			}else if(Game.path[i][j] == Game.pathType.FINISH){
				Game.finish = {
					x: j * Game.SQUARE,
					y: i * Game.SQUARE
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
		Game.context.drawImage(Game.role, Game.start.x, Game.start.y, Game.SQUARE, Game.SQUARE);
	};
	Game.role.src = Game.ROLESRC;
};

/**
 * @param {Number} x. X coodinate of role.
 * @param {Number} y. Y coodinate of role.
 */
Game.drawRole = function(x, y) {
	Game.context.drawImage(Game.role, x, y, Game.SQUARE, Game.SQUARE);
};

Game.initPath = function() {
	Game.earth = new Image();
	Game.destination = new Image();
	Game.earth.src = Game.EARTHSRC;
	Game.destination.src = Game.DESTINATIONARC;
	Game.earth.onload = function() {
		Game.drawPath();
	};	

	return new Promise((resolve, reject) => {
		resolve();
	});
};

Game.drawPath = function() {
	var i, j;
	for(i = 0; i < Game.ROWS; ++i) {
		for(j = 0; j < Game.COLS; ++j) {
			if(Game.path[i][j] === Game.pathType.PATH || Game.path[i][j] === Game.pathType.START) {
				Game.context.drawImage(Game.earth, j * Game.SQUARE, i * Game.SQUARE, Game.SQUARE, Game.SQUARE);
			} else if(Game.path[i][j] === Game.pathType.FINISH) {
				// draw destination image.					
				Game.context.drawImage(Game.destination, j * Game.SQUARE, i * Game.SQUARE, Game.SQUARE, Game.SQUARE);
			}
		}
	}
};

Game.onresize = function() {

};

// core.
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
	
	Game.delta ++;

	Game.drawPath();
	Game.drawRole(Game.role.position.x, Game.role.position.y);
	
	var raf = window.requestAnimationFrame(Game.moveforward);
	if(Game.delta === Game.SQUARE){
		Game.delta = 0;
		window.cancelAnimationFrame(raf);
	}
};

Game.turnright = function() {
	Game.drawPath();
	Game.context.save();
	Game.context.rotate(Math.PI / 2);	
	Game.context.translate(Game.role.position.y - Game.role.position.x, -(Game.role.position.y + Game.role.position.x));
	Game.drawRole(Game.role.position.x, Game.role.position.y - Game.SQUARE);
	Game.context.restore();
	
	// Set current direction.
	// direction 0 ~ 3.
	Game.DIRECTION = (Game.DIRECTION + 1) % 4;
};

Game.turnleft = function() {
	Game.drawPath();
	Game.context.save();
	Game.context.rotate(-Math.PI / 2);	
	Game.context.translate(- (Game.role.position.y + Game.role.position.x), Game.role.position.x - Game.role.position.y);
	Game.drawRole(Game.role.position.x - Game.SQUARE, Game.role.position.y);
	Game.context.restore();
	
	// Set current direction.
	// direction 0 ~ 3.
	Game.DIRECTION = (Game.DIRECTION - 1) % 4;
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
	
	wrapper = function() {
		return interpreter.createPrimitive(Game.turnleft());
	};
	interpreter.setProperty(scope, 'turnleft', interpreter.createNativeFunction(wrapper));
	
	wrapper = function() {
		return interpreter.createPrimitive(Game.turnright());
	};
	interpreter.setProperty(scope, 'turnright', interpreter.createNativeFunction(wrapper));
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
		}, 250);
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
	
	Game.DIRECTION = Game.directionType.EAST;
	
	document.getElementById('playBtn').style.visibility = 'visible';
	document.getElementById('resetBtn').style.visibility = 'hidden';
};

Game.nextLevel = function() {
    if (App.LEVEL < App.MAX_LEVEL) {
        window.location = window.location.protocol + '//' + 
        window.location.host + window.location.pathname +
        '?lang=' + App.LANG + '&level=' + (App.LEVEL + 1);
    } else {
    	console.log('Last level!!!!')
    }
};

window.addEventListener('load', Game.init, false);