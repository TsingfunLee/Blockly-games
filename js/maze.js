'use strict';

var Maze = {};

Maze.WIDTH = 500;
Maze.HEIGHT = Maze.WIDTH;

Maze.COLS = 10;
Maze.ROWS = Maze.COLS;

/**
 * Length of a square's side.
 */
Maze.SQUARE = Maze.WIDTH / Maze.COLS;

/**
* Sprite 一格的宽度
*/
Maze.SPRITEWIDTH = 150;

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

Maze.animationState = 0;

Maze.animationStateType = {
	UNSET: 0,
	MOVEFORWARD: 1,
	TURNRIGHT: 2,
	TURNLEFT: 3
};

/**
 * The number of pickup site.
 */
Maze.NUM = 0;

/**
 * The number of stuff that have collected.
 */
Maze.count = 0;

// /**
// * If decrease difficultity.
// */
// Maze.easy = false;

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
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
			Maze.DIRECTION = Maze.directionType.EAST;
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
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
			Maze.NUM = 0;
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

	// Set width and height of canvas.
	canvas.width = Maze.WIDTH;
	canvas.height = Maze.HEIGHT;

	// Preparatory works.
	Game.initToolbox(Maze);
	Game.initWorkspace(Maze.maxBlocks);
	Game.loadImages(Maze.src, Maze.initImages);
	if (Game.LEVEL == 1) {
		Maze.beginDialog();
	}else {
		Maze.popover(DIALOG.maze[Game.LEVEL - 1].begin);
	}

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

	Game.workspace.addChangeListener(function() {Maze.updateCapacity()});

	Game.bindClick(document.getElementById('playBtn'), Maze.play);
	Game.bindClick(document.getElementById('resetBtn'), Maze.reset);

	window.onresize = Maze.onresize;
};

Maze.beginDialog = function() {
	var dialogHeader = document.querySelector('#dialogTip h6');
	var dialogContent = '';
	dialogContent = DIALOG.maze[0].begin;
	if (Game.LEVEL == 10) {
		dialogContent = DIALOG.maze[9].win;
	}
	dialogHeader.textContent = dialogContent;
	Game.showDialog('dialogTip');
};

Maze.successDialog = function() {
	var dialogP = document.querySelector('#dialogWin .dialog-p');
	var dialogContent = '';
	dialogContent = DIALOG.maze[Game.LEVEL - 1].win;
	dialogP.textContent = dialogContent;
	Game.showDialog('dialogWin');
};

Maze.popover = function(content) {
	var popover = document.getElementById('popover');
	var popoverP = document.querySelector('#popover p');
	var popoverBtn = document.querySelector('#popover button');
	var isDisplay = false;
	if (Game.LEVEL == 10 && Maze.result == Maze.resultType.FAILURE) {
		isDisplay = true;
		popoverBtn.style.display = 'block';
		popoverBtn.addEventListener('click', function(){
			var defaultXml = '<xml>' +
			'<block type="controls_repeat" x="38" y="63">' +
			'<field name="TIMES">10</field>' +
			'<statement name="DO">' +
			'<block type="action_ifElse">' +
			'<field name="DIR">isPathForward</field>' +
			'<statement name="DO">' +
			'<block type="action_if">' +
			'<field name="DIR">isPathRight</field>' +
			'</block></statement>' +
			'<statement name="ELSE">' +
			'<block type="action_if">' +
			'<field name="DIR">isPathLeft</field>' +
			'</block></statement></block></statement></block></xml>'
			Game.loadBlocks(defaultXml);
			Maze.reset();
		});
	}
	popoverP.textContent = content;
	popover.style.display = 'block';
	popover.addEventListener('mouseenter', function(){
		isDisplay = true;
	});
	popover.addEventListener('mouseleave', function(){
		popover.style.display = 'none';
	});
	setTimeout(function() {
		if (!isDisplay) {
			popover.style.display = 'none';
		}
	}, 4000);
};

Maze.initImages = function() {
	Maze.idle = Game.imgs[Maze.src.indexOf(Maze.IDLESRC)];
	Maze.frontJump = Game.imgs[Maze.src.indexOf(Maze.FRONT_JUMPSRC)];
	Maze.backJump = Game.imgs[Maze.src.indexOf(Maze.BACK_JUMPSRC)];
	Maze.rightJump = Game.imgs[Maze.src.indexOf(Maze.RIGHT_JUMPSRC)];
	Maze.leftJump = Game.imgs[Maze.src.indexOf(Maze.LEFT_JUMPSRC)];
	Maze.turn = Game.imgs[Maze.src.indexOf(Maze.TRUNSRC)];
	Maze.bg = Game.imgs[Maze.src.indexOf(Maze.BGSRC)];
	Maze.carrot = Game.imgs[Maze.src.indexOf(Maze.COLLECTIONSRC)];
	Maze.number = [];
	for (var i = 0; i < 10; i++) {
		var s = 'NUMSRC' + i;
		Maze.number[i] = Game.imgs[Maze.src.indexOf(Maze[s])];
	}

	// Draw game scene.
	Maze.initScene();
};

Maze.initScene = function() {
	Maze.drawScene(Maze.initRole);
};

Maze.initRole = function() {
	Maze.role = {};
	Maze.role.img = Maze.idle;
	Maze.role.position = {
		x: Maze.start.x,
		y: Maze.start.y
	};
	switch (Maze.DIRECTION) {
		case Maze.directionType.NORTH:
			Maze.role.sx = 0;
			break;
		case Maze.directionType.EAST:
			Maze.role.sx = Maze.SPRITEWIDTH;
			break;
		case Maze.directionType.SOUTH:
			Maze.role.sx = 2 * Maze.SPRITEWIDTH;
			break;
		case Maze.directionType.WEST:
			Maze.role.sx = 3 * Maze.SPRITEWIDTH;
			break;
		default:
			console.log('direction is undifined.');
	}
	Maze.context.globalCompositeOperation = 'source-over';
	Maze.role.sy = 0;
	Maze.drawRoleIdle(Maze.start.x, Maze.start.y);
};

Maze.onresize = function() {
	Blockly.svgResize(Game.workspace);
};

Maze.updateCapacity = function() {
  var cap = Game.workspace.remainingCapacity();
	var capacity = document.getElementById('capacity');
	var p = document.getElementById('capacityNum');
	p.textContent = Number(cap);
	if (cap != Infinity) {
		capacity.style.display = 'block';
	}
	if (cap == 0) {
		console.log('积木块已用完');
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
		Maze.moveforward(id);
	};
	interpreter.setProperty(scope, 'moveforward', interpreter.createNativeFunction(wrapper));
	
	wrapper = function(id) {
		id = id ? id.toString() : '';
		Maze.turnleft(id);
	};
	interpreter.setProperty(scope, 'turnleft', interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		id = id ? id.toString() : '';
		Maze.turnright(id);
	};
	interpreter.setProperty(scope, 'turnright', interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		id = id ? id.toString() : '';
		Maze.collect(id);
	};
	interpreter.setProperty(scope, 'collect', interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		console.log('ispathforward');
    return interpreter.createPrimitive(Maze.isPath(0, id.toString()));
  };
  interpreter.setProperty(scope, 'isPathForward',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(id) {
    return interpreter.createPrimitive(Maze.isPath(1, id.toString()));
  };
  interpreter.setProperty(scope, 'isPathRight',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(id) {
    return interpreter.createPrimitive(Maze.isPath(2, id.toString()));
  };
  interpreter.setProperty(scope, 'isPathBackward',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(id) {
    return interpreter.createPrimitive(Maze.isPath(3, id.toString()));
  };
  interpreter.setProperty(scope, 'isPathLeft',
      interpreter.createNativeFunction(wrapper));
};

/**
 * Excute code generated from blocks.
 * @param {Interpreter} JS interpreter.
 */
Maze.excute = function(interpreter) {
	if(interpreter.step()) {
		window.setTimeout(function() {
			Maze.excute(interpreter);
		}, 300);
	}else{
		//Check result.
		if (Maze.result == Maze.resultType.UNSET) {
			Maze.checkResult(Maze.role.position.x, Maze.role.position.y);
		}
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
	Maze.context.canvas.width = Maze.context.canvas.width;
	Maze.initScene();

	Maze.setDirection();
	Maze.setNum();
	Maze.count = 0;

	Maze.result = Maze.resultType.UNSET;

	document.getElementById('playBtn').style.visibility = 'visible';
	document.getElementById('resetBtn').style.visibility = 'hidden';
};

window.addEventListener('load', Maze.init, false);
