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
Game.ROLESRC = 'img/role.png';
Game.EARTHSRC = 'img/earth.jpg';
Game.DESTINATIONSRC = 'img/destination.jpg';
Game.COLLECTIONSRC = 'img/star.jpg';

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
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 1, 3, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 0, 1, 0, 0],
	[0, 0, 0, 2, 0, 3, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 4, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 0, 0],
	[0, 1, 0, 0, 0, 1, 0, 0],
	[0, 2, 0, 3, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 3, 0],
	[0, 4, 1, 0, 0, 0, 1, 0],
	[0, 0, 4, 1, 0, 0, 1, 0],
	[0, 0, 0, 4, 1, 0, 1, 0],
	[0, 0, 0, 0, 4, 1, 1, 0],
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
	FINISH: 3,
	PICK: 4
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
 * Results constants.
 */
Game.resultType = {
	UNSET: 0,
	FAILURE: 1,
	SUCCESS: 2,
	CRASH: 3
}

Game.result = Game.resultType.UNSET;

/**
 * Moving distance.
 */
Game.delta = 0;

/**
 * The number of pickup site.
 */
Game.num = 0;

/**
 * The number of pickup site's stuff respectivily.
 */
Game.number = [undefined];

/**
 * The number of stuff that have collected.
 */
Game.count = 0;

Game.setDirection = function() {
	switch(App.LEVEL) {
		case 1:
			Game.DIRECTION = Game.directionType.EAST;
			break;
		case 2:
//			Game.DIRECTION = Game.directionType.NORTH;
//			break;
		case 3:
//			Game.DIRECTION = Game.directionType.NORTH;
//			break;
		case 4:
			Game.DIRECTION = Game.directionType.NORTH;
			break;
		case 5:
			Game.DIRECTION = Game.directionType.SOUTH;
			break;
		default:
			Game.DIRECTION = Game.directionType.EAST;
			console.log('Level is undefined.');
	}
};

Game.setNum = function() {
	switch(App.LEVEL) {
		case 1:
			//Game.num = 0;
			break;
		case 2:
			//Game.num = 0;
			break;
		case 3:
			//Game.num = 1;
			Game.number = [undefined, 1]
			break;
		case 4:
			//Game.num = 0;
			break;
		case 5:
			//Game.num = 4;
			Game.number = [undefined, 1, 1, 1, 1];
			break;
		default:
			console.log('Level is undefined.');			
	}
};

Game.init = function() {
	Game.canvas = document.getElementById('canvas');
	Game.context = Game.canvas.getContext('2d');
	Game.canvas2 = document.getElementById('canvas-bg');
	Game.context2 = Game.canvas2.getContext('2d');

	// Set width and height of canvas.
	Game.canvas.width = Game.WIDTH;
	Game.canvas.height = Game.HEIGHT;
	Game.canvas2.width = Game.WIDTH;
	Game.canvas2.height = Game.HEIGHT;
	
	Game.initToolbox();
	
	Game.setDirection();
	Game.setNum();
	
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
	Game.collection = new Image();
	Game.earth.src = Game.EARTHSRC;
	Game.destination.src = Game.DESTINATIONSRC;
	Game.collection.src = Game.COLLECTIONSRC;
	Game.earth.onload = function() {
		Game.drawPath();
	};
	Game.destination.onload = function() {
		Game.drawDestination();
	};
	Game.collection.onload = function() {
		Game.drawCollection();
	};

	return new Promise((resolve, reject) => {
		resolve();
	});
};

Game.drawPath = function() {
	var i, j;
	for(i = 0; i < Game.ROWS; ++i) {
		for(j = 0; j < Game.COLS; ++j) {
			if(Game.path[i][j] != Game.pathType.WALL) {
				Game.context2.drawImage(Game.earth, j * Game.SQUARE, i * Game.SQUARE, Game.SQUARE, Game.SQUARE);
			}			
		}
	}
};

Game.drawCollection = function() {
	var i, j;
	for (i = 0; i < Game.ROWS; ++i) {
		for (j = 0; j < Game.COLS; ++j) {
			if(Game.path[i][j] === Game.pathType.PICK) {
				Game.num ++;
				Game.context2.drawImage(Game.collection, j * Game.SQUARE, i * Game.SQUARE, Game.SQUARE, Game.SQUARE);
				Game.context2.fillText(Game.number[Game.num].toString(), 
				j * Game.SQUARE + Game.SQUARE - 8, i * Game.SQUARE + Game.SQUARE - 5);				
			}
		}
	}
};

Game.drawDestination = function() {
	var i, j;
	for (i = 0; i < Game.ROWS; ++i) {
		for (j = 0; j < Game.COLS; ++j) {
			if(Game.path[i][j] === Game.pathType.FINISH) {
				Game.context2.drawImage(Game.destination, j * Game.SQUARE, i * Game.SQUARE, Game.SQUARE, Game.SQUARE);
			}
		}
	}	
};

Game.initToolbox = function() {
	var toolbox = document.getElementById('toolbox');
	var block = null;
	var blocks = [];

	// Block type needed.
	switch(App.LEVEL) {
		case 1:
			blocks = ['action_forward'];
			break;
		case 2:
			blocks = ['action_forward', 'action_turnright'];
			break;
		case 3:
			blocks = ['action_forward', 'action_turnright', 'action_collect'];
			break;
		case 4:
			blocks = ['action_forward', 'action_turnright', 'action_collect', 'controls_repeat'];
			break;
		case 5:
			blocks = ['action_forward', 'action_turnright', 'action_turnleft', 'action_collect', 'controls_repeat'];
			break;
		default:
			console.log('Level is undefined.');
	}

	// Create toolbox xml.
	for(var index in blocks) {
		block = document.createElement('block');
		block.setAttribute('type', blocks[index]);
		toolbox.appendChild(block);
	}
	
	var toolboxText = toolbox.outerHTML;
	toolboxText = toolboxText.replace(/{(\w+)}/g,
		function(m, p1) { return MSG[p1]; });
	var toolboxXml = Blockly.Xml.textToDom(toolboxText);

	App.workspace = Blockly.inject('blocklyDiv', {
		grid: {
			spacing: 25,
			length: 3,
			colour: '#ccc',
			snap: true
		},
		media: 'media/',
		toolbox: toolboxXml,
		trashcan: true,
		zoom: {
			controls: true,
			wheel: false
		}
	});
};

Game.onresize = function() {
	Blockly.svgResize(App.workspace);
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
			console.log(Game.DIRECTION);
			console.error('direction is wrong.');
	}
	
	if(!Game.checkWall(Game.role.position.x, Game.role.position.y)) {
		return;	
	}
	
	Game.delta ++;
	
	Game.context.save();
	Game.context.clearRect(Game.role.lastPosition.x, Game.role.lastPosition.y, Game.SQUARE, Game.SQUARE)
	Game.drawRole(Game.role.position.x, Game.role.position.y);
	Game.context.restore();
	
	var raf = window.requestAnimationFrame(Game.moveforward);
	if(Game.delta === Game.SQUARE){
		Game.delta = 0;
		window.cancelAnimationFrame(raf);
	}
};

Game.turnright = function() {
	Game.context.save();
	Game.context.rotate(Math.PI / 2);	
	Game.context.translate(Game.role.position.y - Game.role.position.x, - (Game.role.position.y + Game.role.position.x));
	Game.context.clearRect(Game.role.position.x, Game.role.position.y - Game.SQUARE, Game.SQUARE, Game.SQUARE);
	Game.drawRole(Game.role.position.x, Game.role.position.y - Game.SQUARE);
	Game.context.restore();
	
	// Set current direction.
	// direction 0 ~ 3.
	Game.DIRECTION = (Game.DIRECTION + 1) % 4;
};

Game.turnleft = function() {
	Game.context.save();
	Game.context.rotate(-Math.PI / 2);	
	Game.context.translate(- (Game.role.position.y + Game.role.position.x), Game.role.position.x - Game.role.position.y);
	Game.drawRole(Game.role.position.x - Game.SQUARE, Game.role.position.y);
	Game.context.restore();
	
	// Set current direction.
	// direction 0 ~ 3.
	Game.DIRECTION = (Game.DIRECTION + 3) % 4;
};

Game.collect = function() {
	var j = Game.role.position.x / Game.SQUARE,
		i = Game.role.position.y / Game.SQUARE;
	if(Game.path[i][j] === Game.pathType.PICK) {
		Game.count ++;
		Game.context2.save();
		Game.context2.fillText(--Game.number[Game.count], 
		j * Game.SQUARE + Game.SQUARE - 8, i * Game.SQUARE + Game.SQUARE - 5);
		Game.context2.restore();
	}	
};

/**
 * @param {Number} x. X coodinates of role.
 * @param {Number} y. Y coodinates of role.
 */
Game.checkWall = function(x, y) {
	var i, j;
	if(y < Game.role.lastPosition.y) {
		i = Math.floor(y / Game.SQUARE);
	}else if(y > Game.role.lastPosition.y) {
		i = Math.ceil(y / Game.SQUARE);
	}else {
		i = y / Game.SQUARE;
	}
	
	if(x < Game.role.lastPosition.x) {
		j = Math.floor(x / Game.SQUARE);
	}else if(x > Game.role.lastPosition.x) {
		j = Math.ceil(x / Game.SQUARE);
	}else {
		j = x / Game.SQUARE;
	}
	
	if(Game.path[i][j] === Game.pathType.WALL) {
		console.log('Can\'t walking!!!!');
		Game.result = Game.resultType.CRASH;
		return false;
	}else {
		return true;
	}
};

/**
 * @param {Number} x. X coodinates of role.
 * @param {Number} y. Y coodinates of role.
 */
Game.checkResult = function(x, y) {
	var i = parseInt(y / Game.SQUARE);
	var j = parseInt(x / Game.SQUARE);
	if(Game.path[i][j] === Game.pathType.FINISH) {
		console.log('Success!!!!');
		Game.result = Game.resultType.SUCCESS;
	}else {
		// Just picking up stuff, level 3 is success.
		if(App.LEVEL === 3 && Game.path[i][j] === Game.pathType.PICK) {
			console.log('Success!!!!');
			Game.result = Game.resultType.SUCCESS
		}else {
			console.log('Failure!!!!');
			Game.result = Game.resultType.FAILURE;
		}		
	}
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
	
	wrapper = function() {
		return interpreter.createPrimitive(Game.collect());
	};
	interpreter.setProperty(scope, 'collect', interpreter.createNativeFunction(wrapper));
};

/**
 * Excute code generated from blocks.
 * @param {Interpreter} JS interpreter.
 */
Game.excute = function(interpreter) {
	if(interpreter.step() && Game.result === Game.resultType.UNSET) {
		// Remenber last postion so that judge if the moving length is equal to side length of a square.
		Game.role.lastPosition = {
			x: Game.role.position.x,
			y: Game.role.position.y
		};
		window.setTimeout(function() {
			Game.excute(interpreter);
		}, 250);
	}else{
		// Check result.
		Game.checkResult(Game.role.position.x, Game.role.position.y);
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
	
	Game.setDirection();
	Game.setNum();
	Game.num = 0;
	Game.count = 0;
	
	Game.result = Game.resultType.UNSET;
	
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