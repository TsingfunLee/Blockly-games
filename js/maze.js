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
 * Pictures source.
 */
Maze.IDLESRC = 'img/idle.png';
Maze.FRONT_JUMPSRC = 'img/front_jump.png';
Maze.BACK_JUMPSRC = 'img/back_jump.png';
Maze.RIGHT_JUMPSRC = 'img/right_jump.png';
Maze.LEFT_JUMPSRC = 'img/left_jump.png';
Maze.TRUNSRC = 'img/turn.png';
Maze.BGSRC = 'img/level' + Game.LEVEL +'.jpg';
Maze.COLLECTIONSRC = 'img/carrot.png';

Maze.NUMSRC0 = 'img/number/0.png';
Maze.NUMSRC1 = 'img/number/1.png';
Maze.NUMSRC2 = 'img/number/2.png';
Maze.NUMSRC3 = 'img/number/3.png';
Maze.NUMSRC4 = 'img/number/4.png';
Maze.NUMSRC5 = 'img/number/5.png';
Maze.NUMSRC6 = 'img/number/6.png';
Maze.NUMSRC7 = 'img/number/7.png';
Maze.NUMSRC8 = 'img/number/8.png';
Maze.NUMSRC9 = 'img/number/9.png';

Maze.src = [Maze.IDLESRC,
Maze.FRONT_JUMPSRC,
Maze.BACK_JUMPSRC,
Maze.RIGHT_JUMPSRC,
Maze.LEFT_JUMPSRC,
Maze.TRUNSRC,
Maze.BGSRC,
Maze.COLLECTIONSRC,
Maze.NUMSRC0,
Maze.NUMSRC1,
Maze.NUMSRC2,
Maze.NUMSRC3,
Maze.NUMSRC4,
Maze.NUMSRC5,
Maze.NUMSRC6,
Maze.NUMSRC7,
Maze.NUMSRC8,
Maze.NUMSRC9];

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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 1, 1, 3, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 3, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 4, 1, 1, 3, 0, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 2, 0, 3, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 0, 3, 0, 0],
	[0, 0, 1, 4, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 1, 4, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 1, 4, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 1, 4, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
 * .
 */
// Maze.delta = 0;

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

	// Set width and height of canvas.
	canvas.width = Maze.WIDTH;
	canvas.height = Maze.HEIGHT;

	// Preparatory works.
	Game.initToolbox(Maze);
	Game.initWorkspace();
	Game.loadImages(Maze.src, Maze.initImages);

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

	Game.bindClick(document.getElementById('playBtn'), Maze.play);
	Game.bindClick(document.getElementById('resetBtn'), Maze.reset);

	window.onresize = Maze.onresize;
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
		// console.log(Maze.number[i]);
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
	// Maze.role.lastPosition = {
	// 	x: Maze.role.position.x,
	// 	y: Maze.role.position.y
	// };
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

/**
* @param {Number} fps. Frames per second.
* @param {Canvas2DContext} ctx.
* @param {Number} sx.
* @param {Function} draw.
*/
Maze.startAnimation = function(fps) {
	Maze.fpsInterval = 1000 / fps;
	Maze.totalTime = Maze.fpsInterval * fps;
  Maze.then = Date.now();
  Maze.startTime = Maze.then;
  Maze.animate();
};

/**
* Animation.
* @param {Canvas2DContext} ctx.
* @param {Number} sx.
* @param {Function} draw.
*/
Maze.animate = function() {
	// request another frame
    Maze.raf = requestAnimationFrame(Maze.animate);

    // calc elapsed time since last loop
    Maze.now = Date.now();
    Maze.elapsed = Maze.now - Maze.then;

    // if enough time has elapsed, draw the next frame
    if (Maze.elapsed > Maze.fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        Maze.then = Maze.now - (Maze.elapsed % Maze.fpsInterval);

        // Put your drawing code here
				if (Maze.now - Maze.startTime > Maze.totalTime) {
					Maze.stopAnimation();
				}

				if (Maze.animationState == Maze.animationStateType.MOVEFORWARD) {
					switch(Maze.DIRECTION){
						case Maze.directionType.NORTH:
							Maze.role.position.y -= 6.25;
							Maze.role.img = Maze.backJump;
							break;
						case Maze.directionType.EAST:
							Maze.role.position.x += 6.25;
							Maze.role.img = Maze.rightJump;
							break;
						case Maze.directionType.SOUTH:
							Maze.role.position.y += 6.25;
							Maze.role.img = Maze.frontJump;
							break;
						case Maze.directionType.WEST:
							Maze.role.position.x -= 6.25;
							Maze.role.img = Maze.leftJump;
							break;
						default:
							console.log(Maze.DIRECTION);
							console.error('direction is wrong.');
					}
					// Draw game scene.
					Maze.drawScene(function(){
						Maze.drawRoleJump(Maze.role.position.x, Maze.role.position.y);
						Maze.role.sx += 150;
					});
				}else if (Maze.animationState == Maze.animationStateType.TURNRIGHT) {
					// Draw game scene.
					Maze.drawScene(function(){
						Maze.drawRoleTurn(Maze.role.position.x, Maze.role.position.y);
						Maze.role.sx -= 150;
					});
				}else if (Maze.animationState == Maze.animationStateType.TURNLEFT) {
					// Draw game scene.
					// console.log(Maze.role.img);
					Maze.drawScene(function(){
						Maze.drawRoleTurn(Maze.role.position.x, Maze.role.position.y);
						Maze.role.sx += 150;
					});
				}
				console.log('animate');
    }
};

Maze.stopAnimation = function() {
		cancelAnimationFrame(Maze.raf);
};

// core.
Maze.moveforward = function(id) {
	console.log('moveforward' + Maze.DIRECTION);

	if(!Maze.checkWall(Maze.role.position.x, Maze.role.position.y)) {
		return;
	}

	Game.highlight(id);

	Maze.role.sx = 0;
	Maze.role.sy = 0;
	// Maze.role.img = Maze.jump;
	Maze.animationState = Maze.animationStateType.MOVEFORWARD;
	Maze.startAnimation(8);
};

Maze.turnright = function(id) {
	console.log('turnright');

  Game.highlight(id);

	switch(Maze.DIRECTION){
		case Maze.directionType.NORTH:
			Maze.role.sx = 4 * Maze.SPRITEWIDTH;
			break;
		case Maze.directionType.EAST:
			Maze.role.sx = 2 * Maze.SPRITEWIDTH;
			break;
		case Maze.directionType.SOUTH:
			Maze.role.sx = 8 * Maze.SPRITEWIDTH;
			break;
		case Maze.directionType.WEST:
			Maze.role.sx = 6 * Maze.SPRITEWIDTH;
			break;
		default:
			console.log(Maze.DIRECTION);
			console.error('direction is wrong.');
	}
	Maze.role.sy = 0;
	Maze.role.img = Maze.turn;
	Maze.animationState = Maze.animationStateType.TURNRIGHT;
	Maze.startAnimation(3);

	// Set current direction.
	// direction 0 ~ 3.
	Maze.DIRECTION = (Maze.DIRECTION + 1) % 4;
};

Maze.turnleft = function(id) {
	console.log('turnleft');
	Game.highlight(id);

	switch(Maze.DIRECTION){
		case Maze.directionType.NORTH:
			Maze.role.sx = 4 * Maze.SPRITEWIDTH;
			break;
		case Maze.directionType.EAST:
			Maze.role.sx = 2 * Maze.SPRITEWIDTH;
			break;
		case Maze.directionType.SOUTH:
			Maze.role.sx = 0;
			break;
		case Maze.directionType.WEST:
			Maze.role.sx = 6 * Maze.SPRITEWIDTH;
			break;
		default:
			console.log(Maze.DIRECTION);
			console.error('direction is wrong.');
	}
	Maze.role.sy = 0;
	Maze.role.img = Maze.turn;
	Maze.animationState = Maze.animationStateType.TURNLEFT;
	Maze.startAnimation(3);

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
		Maze.role.img = Maze.idle;
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
		Maze.drawScene(function() {
			Maze.drawRoleIdle(Maze.role.position.x, Maze.role.position.y);
		});
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
	// if(y < Maze.role.lastPosition.y) {
	// 	i = Math.floor(y / Maze.SQUARE);
	// }else if(y > Maze.role.lastPosition.y) {
	// 	i = Math.ceil(y / Maze.SQUARE);
	// }else {
	// 	i = y / Maze.SQUARE;
	// }
	//
	// if(x < Maze.role.lastPosition.x) {
	// 	j = Math.floor(x / Maze.SQUARE);
	// }else if(x > Maze.role.lastPosition.x) {
	// 	j = Math.ceil(x / Maze.SQUARE);
	// }else {
	// 	j = x / Maze.SQUARE;
	// }

	switch(Maze.DIRECTION){
		case Maze.directionType.NORTH:
			y -= Maze.SQUARE;
			break;
		case Maze.directionType.EAST:
			x += Maze.SQUARE;
			break;
		case Maze.directionType.SOUTH:
			y += Maze.SQUARE;
			break;
		case Maze.directionType.WEST:
			x -= Maze.SQUARE;
			break;
		default:
			console.log(Maze.DIRECTION);
			console.error('direction is wrong.');
	}

	i = y / Maze.SQUARE;
	j = x / Maze.SQUARE;

	if(Maze.map[i][j] === Maze.pathType.WALL) {
		console.log('Can\'t walking!!!!');
		Maze.result = Maze.resultType.CRASH;
		alert('Crash')
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

	// console.log(i)
	// console.log(j)
	// console.log(Maze.map[i][j])
	if(Maze.map[i][j] === Maze.pathType.FINISH && Maze.count === Maze.NUM) {
		console.log('Success!!!!');
		Maze.result = Maze.resultType.SUCCESS;
		alert('success')
	}else {
		// Just picking up stuff, level 3 is success.
		if(Game.LEVEL === 3 && Maze.count === Maze.NUM) {
			console.log('Success!!!!');
			Maze.result = Maze.resultType.SUCCESS;
		}else {
			console.log('Failure!!!!');
			Maze.result = Maze.resultType.FAILURE;
			alert('failure!')
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
};

/**
 * Excute code generated from blocks.
 * @param {Interpreter} JS interpreter.
 */
Maze.excute = function(interpreter) {
	if(interpreter.step() /*&& Maze.result === Maze.resultType.UNSET*/) {
		// Remenber last postion.
		// Maze.role.lastPosition = {
		// 	x: Maze.role.position.x,
		// 	y: Maze.role.position.y
		// };
		// console.log('excute');
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
