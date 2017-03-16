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
 * Path constants.
 */
Game.pathType = {
	WALL: 0,
	PATH: 1,
	START: 2,
	FINISH: 3
};

/**
 * JS interpreter.
 */
Game.interpreter = null;

/**
 * Initialize Game.
 */
Game.init = function() {
	Game.canvas = document.getElementById('canvas');
	Game.context = Game.canvas.getContext('2d');
	Game.role = new Image();
	Game.role.start_ = {
		x: 0,
		y: 0
	};
	Game.role.finish_ = {
		x: 0,
		y: 0
	};
	Game.role.position_ = {
		x: 0,
		y: 0
	};
	Game.role.lastPosition_ = {
		x: 0,
		y: 0
	}
	Game.role.direction = {
		FORWARD: 0,
		LEFT: 1,
		RIGHT: 2,
		BACK: 3
	};

	// Set width and height of canvas.
	Game.canvas.width = 400;
	Game.canvas.height = 400;

    Game.initPath();
	Game.initRole();
	
	document.getElementById('playBtn').addEventListener('click', Game.play);
	document.getElementById('resetBtn').addEventListener('click', Game.reset);

	window.onresize = Game.onresize;
};

Game.initRole = function() {
	Game.role.onload = function() {
		Game.context.drawImage(Game.role, Game.role.start_.x, Game.role.start_.y, 50, 50);
	};
	Game.role.src = 'img/role.jpg';
};

/**
 * 
 * @param {Number} x. X coodinate of role.
 * @param {Number} y. Y coodinate of role.
 */
Game.drawRole = function(x, y) {
	Game.context.drawImage(Game.role, x, y, 50, 50);
};

Game.initPath = function() {
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
					Game.role.position_ = {
						x: Game.role.start_.x,
						y: Game.role.start_.y
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
	
	Game.role.position_.x += 1;
	Game.drawRole(Game.role.position_.x, Game.role.position_.y);
	
	var raf = window.requestAnimationFrame(Game.moveforward);
	
	if(Game.role.position_.x >= Game.role.lastPosition_.x + 50){
		window.cancelAnimationFrame(raf);
	}	
};

Game.turnright = function() {
	
};

Game.turnleft = function() {
	
};

/**
 * API added to interpreter.
 * @param {Interpreter} Game.interpreter.
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
 */
Game.excute = function() {
	if(Game.interpreter.step()){
		// Remenber last postion so that judge if the moving length is equal to side length of a square.
		Game.role.lastPosition_ = {
			x: Game.role.position_.x,
			y: Game.role.position_.y
	    };
		window.setTimeout(Game.excute, 50);
	}
};

Game.play = function() {
	var code = Blockly.JavaScript.workspaceToCode(App.workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	Game.interpreter = new Interpreter(code, Game.initApi);
	try {
		Game.excute();
	} catch(e) {
		alert(MSG['badCode'].replace('%1', e));
	}
};

Game.reset = function() {
	init();
}

window.addEventListener('load', Game.init, false);