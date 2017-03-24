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
]][App.LEVEL];

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
Maze.num = 0;

/**
 * The number of pickup site's stuff respectivily.
 */
//Game.number = [];

/**
 * The number of stuff that have collected.
 */
Maze.count = 0;

Maze.setDirection = function() {
	switch(App.LEVEL) {
		case 1:
			Maze.DIRECTION = Maze.directionType.EAST;
			break;
		case 2:
//			Game.DIRECTION = Game.directionType.NORTH;
//			break;
		case 3:
//			Game.DIRECTION = Game.directionType.NORTH;
//			break;
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
	switch(App.LEVEL) {
		case 1:
			//Game.num = 0;
			//Game.number = [0];
			//break;
		case 2:
			//Maze.num = 0;
			//Game.number = [0];
			break;
		case 3:
			Maze.num = 1;
			//Game.number = [1]
			break;
		case 4:
			Maze.num = 0;
			//Game.number = [0];
			break;
		case 5:
			Maze.num = 4;
			//Game.number = [1, 1, 1, 1];
			break;
		default:
			console.log('Level is undefined.');			
	}
};

Maze.init = function() {
	Maze.canvas = document.getElementById('canvas');
	Maze.context = Maze.canvas.getContext('2d');
	Maze.canvas2 = document.getElementById('canvas-bg');
	Maze.context2 = Maze.canvas2.getContext('2d');

	// Set width and height of canvas.
	Maze.canvas.width = Maze.WIDTH;
	Maze.canvas.height = Maze.HEIGHT;
	Maze.canvas2.width = Maze.WIDTH;
	Maze.canvas2.height = Maze.HEIGHT;
	
	App.initToolbox();
	App.initWorkspace();
	
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

	document.getElementById('playBtn').addEventListener('click', Maze.play);
	document.getElementById('resetBtn').addEventListener('click', Maze.reset);

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
				Maze.context2.drawImage(Maze.earth, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
			}			
		}
	}
};

Maze.drawCollection = function() {
	var i, j, k = 0;
	for (i = 0; i < Maze.ROWS; ++i) {
		for (j = 0; j < Maze.COLS; ++j) {
			if(Maze.map[i][j] === Maze.pathType.PICK) {
				Maze.context2.drawImage(Maze.collection, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
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
				Maze.context2.drawImage(Maze.destination, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
			}
		}
	}	
};



Maze.onresize = function() {
	Blockly.svgResize(App.workspace);
};

// core.
Maze.moveforward = function() {		
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
	Maze.context.clearRect(Maze.role.lastPosition.x, Maze.role.lastPosition.y, Maze.SQUARE, Maze.SQUARE)
	Maze.drawRole(Maze.role.position.x, Maze.role.position.y);
	Maze.context.restore();
	
	var raf = window.requestAnimationFrame(Maze.moveforward);
	if(Maze.delta === Maze.SQUARE){
		Maze.delta = 0;
		window.cancelAnimationFrame(raf);
	}
};

Maze.turnright = function() {
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

Maze.turnleft = function() {
	Maze.context.save();
	Maze.context.rotate(-Math.PI / 2);	
	Maze.context.translate(- (Maze.role.position.y + Maze.role.position.x), Maze.role.position.x - Maze.role.position.y);
	Maze.drawRole(Maze.role.position.x - Maze.SQUARE, Maze.role.position.y);
	Maze.context.restore();
	
	// Set current direction.
	// direction 0 ~ 3.
	Maze.DIRECTION = (Maze.DIRECTION + 3) % 4;
};

Maze.collect = function() {
	var j = Maze.role.position.x / Maze.SQUARE,
		i = Maze.role.position.y / Maze.SQUARE;
	if(Maze.map[i][j] === Maze.pathType.PICK) {
		Maze.count ++;	
//		if(Game.number[Game.num] == 0) {
//			Game.num ++;
//		}
		Maze.context2.save();
		Maze.context2.clearRect(Maze.role.position.x, Maze.role.position.y, Maze.SQUARE, Maze.SQUARE);
		Maze.context2.drawImage(Maze.earth, Maze.role.position.x, Maze.role.position.y, Maze.SQUARE, Maze.SQUARE);
		//Game.context2.drawImage(Game.collection, Game.role.position.x, Game.role.position.y, Game.SQUARE, Game.SQUARE);
		//Game.context2.fillText(--Game.number[Game.num], 
		//j * Game.SQUARE + Game.SQUARE - 8, i * Game.SQUARE + Game.SQUARE - 5);	
		Maze.context2.restore();
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
	// The number of all pick-up stuff.
//	var total = Game.number.reduce(function(acc, val) {
//		return acc + val;
//	});
	console.log(i)
	console.log(j)
	console.log(Maze.map[i][j])
	if(Maze.map[i][j] === Maze.pathType.FINISH && Maze.count === Maze.num) {
		console.log('Success!!!!');
		Maze.result = Maze.resultType.SUCCESS;
	}else {
		// Just picking up stuff, level 3 is success.
		if(App.LEVEL === 3 && Maze.count === Maze.num) {
			console.log('Success!!!!');
			Maze.result = Maze.resultType.SUCCESS;
		}else {
			console.log('Failure!!!!');
			Maze.result = Maze.resultType.FAILURE;
			if(Maze.count != Maze.num) {
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
	var wrapper = function() {
		return interpreter.createPrimitive(Maze.moveforward());
	};
	interpreter.setProperty(scope, 'moveforward', interpreter.createNativeFunction(wrapper));
	
	wrapper = function() {
		return interpreter.createPrimitive(Maze.turnleft());
	};
	interpreter.setProperty(scope, 'turnleft', interpreter.createNativeFunction(wrapper));
	
	wrapper = function() {
		return interpreter.createPrimitive(Maze.turnright());
	};
	interpreter.setProperty(scope, 'turnright', interpreter.createNativeFunction(wrapper));
	
	wrapper = function() {
		return interpreter.createPrimitive(Maze.collect());
	};
	interpreter.setProperty(scope, 'collect', interpreter.createNativeFunction(wrapper));
};

/**
 * Excute code generated from blocks.
 * @param {Interpreter} JS interpreter.
 */
Maze.excute = function(interpreter) {
	if(interpreter.step() && Maze.result === Maze.resultType.UNSET) {
		// Remenber last postion so that judge if the moving length is equal to side length of a square.
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
	var code = Blockly.JavaScript.workspaceToCode(App.workspace);
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
	Maze.canvas.width = Maze.canvas.width;
	Maze.initPath().then(Maze.initRole);
	
	Maze.setDirection();
	Maze.setNum();
//	Maze.num = 0;
	Maze.count = 0;
	
	Maze.result = Maze.resultType.UNSET;
	
	document.getElementById('playBtn').style.visibility = 'visible';
	document.getElementById('resetBtn').style.visibility = 'hidden';
};

Maze.nextLevel = function() {
    if (App.LEVEL < App.MAX_LEVEL) {
        window.location = window.location.protocol + '//' + 
        window.location.host + window.location.pathname +
        '?lang=' + App.LANG + '&level=' + (App.LEVEL + 1);
    } else {
    	console.log('Last level!!!!')
    }
};

window.addEventListener('load', Maze.init, false);