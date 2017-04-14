'use strict';

var Maze = {};

Maze.WIDTH = 400;
Maze.HEIGHT = Maze.WIDTH;

Maze.COLS = 8;
Maze.ROWS = Maze.COLS;

/**
 * Length of a square's side.
 */
Maze.SQUARE = Maze.WIDTH / Maze.COLS;

/**
 * Pictures source.
 */
Maze.ROLESRC = 'img/role.png';
Maze.EARTHSRC = 'img/earth.jpg';
Maze.DESTINATIONSRC = 'img/destination.png';
Maze.COLLECTIONSRC = 'img/star.png';

Maze.blocks = [
	['action_forward'],
	['action_forward', 'action_turnright'],
	['action_forward', 'action_turnright', 'action_collect'],
	['action_forward', 'action_turnright', 'action_collect', 'controls_repeat'],
	['action_forward', 'action_turnright', 'action_turnleft', 'action_collect', 'controls_repeat']
];

/**
 * 1 --- path; 0 --- wall; 2 --- start; 3 --- finish.
 */
Maze.map = [
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
]][Game.LEVEL];

/**
 * Path constants.
 */
Maze.pathType = {
	WALL: 0,
	PATH: 1,
	START: 2,
	FINISH: 3,
	PICK: 4
};

/**
 * Direction constants.
 */
Maze.directionType = {
	NORTH: 0,
	EAST: 1,
	SOUTH: 2,
	WEST: 3
};

/**
 * Results constants.
 */
Maze.resultType = {
	UNSET: 0,
	FAILURE: 1,
	SUCCESS: 2,
	CRASH: 3
}

Maze.result = Maze.resultType.UNSET;

/**
 * Moving distance.
 */
Maze.delta = 0;

/**
 * The number of pickup site.
 */
Maze.NUM = 0;

/**
 * The number of stuff that have collected.
 */
Maze.count = 0;

Maze.setDirection = function() {
	switch(Game.LEVEL) {
		case 1:
			Maze.DIRECTION = Maze.directionType.EAST;
			break;
		case 2:

		case 3:

		case 4:
			Maze.DIRECTION = Maze.directionType.NORTH;
			break;
		case 5:
			Maze.DIRECTION = Maze.directionType.SOUTH;
			break;
		default:
			Maze.DIRECTION = Maze.directionType.EAST;
			console.log('Level is undefined.');
	}
};

Maze.setNum = function() {
	switch(Game.LEVEL) {
		case 1:

		case 2:

			break;
		case 3:
			Maze.NUM = 1;
			break;
		case 4:
			Maze.NUM = 0;
			break;
		case 5:
			Maze.NUM = 4;
			break;
		default:
			console.log('Level is undefined.');
	}
};

Maze.init = function() {
	var visilization = document.getElementById('visilazation');
	var canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.className = 'canvas';
	visilization.appendChild(canvas);
	Maze.context = canvas.getContext('2d');

	var canvasBg = document.createElement('canvas');
	canvasBg.id = 'canvas-bg';
	canvasBg.className = 'canvas';
	visilization.appendChild(canvasBg);
	Maze.contextBg = canvasBg.getContext('2d');

	// Set width and height of canvas.
	canvas.width = Maze.WIDTH;
	canvas.height = Maze.HEIGHT;
	canvasBg.width = Maze.WIDTH;
	canvasBg.height = Maze.HEIGHT;

	Game.initToolbox(Maze);
	Game.initWorkspace();

	Maze.setDirection();
	Maze.setNum();

	// Set start point and finish point.
	for (var i = 0, j = 0; i < Maze.ROWS; ++i) {
		for (j = 0; j < Maze.COLS; ++j) {
			if(Maze.map[i][j] == Maze.pathType.START){
				Maze.start = {
					x: j * Maze.SQUARE,
					y: i * Maze.SQUARE
				};
			}else if(Maze.map[i][j] == Maze.pathType.FINISH){
				Maze.finish = {
					x: j * Maze.SQUARE,
					y: i * Maze.SQUARE
				};
			}
		}
	}

	Maze.initPath().then(Maze.initRole);

	Game.bindClick(document.getElementById('playBtn'), Maze.play);
	Game.bindClick(document.getElementById('resetBtn'), Maze.reset);

	window.onresize = Maze.onresize;
};

Maze.initRole = function() {
	Maze.role = new Image();
	Maze.role.position = {
		x: Maze.start.x,
		y: Maze.start.y
	};
	Maze.role.lastPosition = {
		x: Maze.role.position.x,
		y: Maze.role.position.y
	};
	Maze.role.onload = function() {
		Maze.context.drawImage(Maze.role, Maze.start.x, Maze.start.y, Maze.SQUARE, Maze.SQUARE);
	};
	Maze.role.src = Maze.ROLESRC;
};

/**
 * @param {Number} x. X coodinate of role.
 * @param {Number} y. Y coodinate of role.
 */
Maze.drawRole = function(x, y) {
	Maze.context.drawImage(Maze.role, x, y, Maze.SQUARE, Maze.SQUARE);
};

Maze.initPath = function() {
	Maze.earth = new Image();
	Maze.destination = new Image();
	Maze.collection = new Image();
	Maze.earth.src = Maze.EARTHSRC;
	Maze.destination.src = Maze.DESTINATIONSRC;
	Maze.collection.src = Maze.COLLECTIONSRC;
	Maze.earth.onload = function() {
		Maze.drawPath();
	};
	Maze.destination.onload = function() {
		Maze.drawDestination();
	};
	Maze.collection.onload = function() {
		Maze.drawCollection();
	};

	return new Promise((resolve, reject) => {
		resolve();
	});
};

Maze.drawPath = function() {
	var i, j;
	for(i = 0; i < Maze.ROWS; ++i) {
		for(j = 0; j < Maze.COLS; ++j) {
			if(Maze.map[i][j] != Maze.pathType.WALL) {
				Maze.contextBg.drawImage(Maze.earth, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
			}
		}
	}
};

Maze.drawCollection = function() {
	var i, j, k = 0;
	for (i = 0; i < Maze.ROWS; ++i) {
		for (j = 0; j < Maze.COLS; ++j) {
			if(Maze.map[i][j] === Maze.pathType.PICK) {
				Maze.contextBg.drawImage(Maze.collection, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
				//Game.context2.fillText(Game.number[k++],
				//j * Game.SQUARE + Game.SQUARE - 8, i * Game.SQUARE + Game.SQUARE - 5);
			}
		}
	}
};

Maze.drawDestination = function() {
	var i, j;
	for (i = 0; i < Maze.ROWS; ++i) {
		for (j = 0; j < Maze.COLS; ++j) {
			if(Maze.map[i][j] === Maze.pathType.FINISH) {
				Maze.contextBg.drawImage(Maze.destination, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
			}
		}
	}
};



Maze.onresize = function() {
	Blockly.svgResize(Game.workspace);
};

Maze.animate = function() {

};

// core.
Maze.moveforward = function(id) {
	console.log('moveforward');
	switch(Maze.DIRECTION){
		case Maze.directionType.NORTH:
			Maze.role.position.y -= 1;
			break;
		case Maze.directionType.EAST:
			Maze.role.position.x += 1;
			break;
		case Maze.directionType.SOUTH:
			Maze.role.position.y += 1;
			break;
		case Maze.directionType.WEST:
			Maze.role.position.x -= 1;
			break;
		default:
			console.log(Maze.DIRECTION);
			console.error('direction is wrong.');
	}

	if(!Maze.checkWall(Maze.role.position.x, Maze.role.position.y)) {
		return;
	}

	Maze.delta ++;

	Maze.context.save();
	Maze.context.clearRect(Maze.role.lastPosition.x, Maze.role.lastPosition.y, Maze.SQUARE, Maze.SQUARE);
	Maze.drawRole(Maze.role.position.x, Maze.role.position.y);
	Maze.context.restore();
	Game.highlight(id);

	var raf = window.requestAnimationFrame(Maze.moveforward);
	if(Maze.delta === Maze.SQUARE){
		Maze.delta = 0;
		window.cancelAnimationFrame(raf);
	}
};

Maze.turnright = function(id) {
	console.log('turnright');
	Maze.context.save();
	Maze.context.rotate(Math.PI / 2);
	Maze.context.translate(Maze.role.position.y - Maze.role.position.x, - (Maze.role.position.y + Maze.role.position.x));
	Maze.context.clearRect(Maze.role.position.x, Maze.role.position.y - Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
	Maze.drawRole(Maze.role.position.x, Maze.role.position.y - Maze.SQUARE);
	Maze.context.restore();

	// Set current direction.
	// direction 0 ~ 3.
	Maze.DIRECTION = (Maze.DIRECTION + 1) % 4;
};

Maze.turnleft = function(id) {
	console.log('turnleft');
	Maze.context.save();
	Maze.context.rotate(-Math.PI / 2);
	Maze.context.translate(- (Maze.role.position.y + Maze.role.position.x), Maze.role.position.x - Maze.role.position.y);
	Maze.drawRole(Maze.role.position.x - Maze.SQUARE, Maze.role.position.y);
	Maze.context.restore();

	// Set current direction.
	// direction 0 ~ 3.
	Maze.DIRECTION = (Maze.DIRECTION + 3) % 4;
};

Maze.collect = function(id) {
	console.log('collect');
	var j = Maze.role.position.x / Maze.SQUARE,
		i = Maze.role.position.y / Maze.SQUARE;
	if(Maze.map[i][j] === Maze.pathType.PICK) {
		Maze.count ++;
		Maze.contextBg.save();
		Maze.contextBg.clearRect(Maze.role.position.x, Maze.role.position.y, Maze.SQUARE, Maze.SQUARE);
		Maze.contextBg.drawImage(Maze.earth, Maze.role.position.x, Maze.role.position.y, Maze.SQUARE, Maze.SQUARE);
		Maze.contextBg.restore();
	}else {
		alert('There is none!!!!');
	}
};

/**
 * @param {Number} x. X coodinates of role.
 * @param {Number} y. Y coodinates of role.
 */
Maze.checkWall = function(x, y) {
	var i, j;
	if(y < Maze.role.lastPosition.y) {
		i = Math.floor(y / Maze.SQUARE);
	}else if(y > Maze.role.lastPosition.y) {
		i = Math.ceil(y / Maze.SQUARE);
	}else {
		i = y / Maze.SQUARE;
	}

	if(x < Maze.role.lastPosition.x) {
		j = Math.floor(x / Maze.SQUARE);
	}else if(x > Maze.role.lastPosition.x) {
		j = Math.ceil(x / Maze.SQUARE);
	}else {
		j = x / Maze.SQUARE;
	}

	if(Maze.map[i][j] === Maze.pathType.WALL) {
		console.log('Can\'t walking!!!!');
		Maze.result = Maze.resultType.CRASH;
		return false;
	}else {
		return true;
	}
};

/**
 * @param {Number} x. X coodinates of role.
 * @param {Number} y. Y coodinates of role.
 */
Maze.checkResult = function(x, y) {
	var i = Math.floor(y / Maze.SQUARE);
	var j = Math.floor(x / Maze.SQUARE);

	console.log(i)
	console.log(j)
	console.log(Maze.map[i][j])
	if(Maze.map[i][j] === Maze.pathType.FINISH && Maze.count === Maze.NUM) {
		console.log('Success!!!!');
		Maze.result = Maze.resultType.SUCCESS;
	}else {
		// Just picking up stuff, level 3 is success.
		if(Game.LEVEL === 3 && Maze.count === Maze.NUM) {
			console.log('Success!!!!');
			Maze.result = Maze.resultType.SUCCESS;
		}else {
			console.log('Failure!!!!');
			Maze.result = Maze.resultType.FAILURE;
			if(Maze.count != Maze.NUM) {
				console.log('Pick up all collection!')
			}
		}
	}
};

/**
 * API added to interpreter.
 * @param {Interpreter} JS interpreter.
 * @param {Object} scope.
 */
Maze.initApi = function(interpreter, scope) {
	// Add an API function for moveforward() block.
	var wrapper = function(id) {
		id = id ? id.toString() : '';
		console.log(id)
		return interpreter.createPrimitive(Maze.moveforward(id));
	};
	interpreter.setProperty(scope, 'moveforward', interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(Maze.turnleft(id));
	};
	interpreter.setProperty(scope, 'turnleft', interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(Maze.turnright(id));
	};
	interpreter.setProperty(scope, 'turnright', interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(Maze.collect(id));
	};
	interpreter.setProperty(scope, 'collect', interpreter.createNativeFunction(wrapper));
};

/**
 * Excute code generated from blocks.
 * @param {Interpreter} JS interpreter.
 */
Maze.excute = function(interpreter) {
	if(interpreter.step() && Maze.result === Maze.resultType.UNSET) {
		// Remenber last postion.
		Maze.role.lastPosition = {
			x: Maze.role.position.x,
			y: Maze.role.position.y
		};
		window.setTimeout(function() {
			Maze.excute(interpreter);
		}, 250);
	}else{
		// Check result.
		Maze.checkResult(Maze.role.position.x, Maze.role.position.y);
	}
};

Maze.play = function() {
	var code = Blockly.JavaScript.workspaceToCode(Game.workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	var interpreter = new Interpreter(code, Maze.initApi);
	try {
		Maze.excute(interpreter);
	} catch(e) {
		alert(MSG['badCode'].replace('%1', e));
	}

	document.getElementById('resetBtn').style.visibility = 'visible';
	document.getElementById('playBtn').style.visibility = 'hidden';
};

Maze.reset = function() {
	// Clear canvas.
	Maze.context.clearRect(0, 0, Maze.WIDTH, Maze.HEIGHT);
	Maze.initPath().then(Maze.initRole);

	Maze.setDirection();
	Maze.setNum();
	Maze.count = 0;

	Maze.result = Maze.resultType.UNSET;

	document.getElementById('playBtn').style.visibility = 'visible';
	document.getElementById('resetBtn').style.visibility = 'hidden';
};

Maze.nextLevel = function() {
    if (Game.LEVEL < Game.MAX_LEVEL) {
        window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname +
        '?lang=' + Game.LANG + '&level=' + (Game.LEVEL + 1);
    } else {
    	console.log('Last level!!!!')
    }
};

window.addEventListener('load', Maze.init, false);
