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
* Sprite 一格的宽度和高度
*/
Maze.SPRITEWIDTH = 50;
Maze.SPRITEHEIGHT = 70;

/**
 * Pictures source.
 */
Maze.src = ['img/idle.png',
'img/front_jump.png',
'img/maze_bg.jpg',
'img/earth.jpg',
'img/destination.png',
'img/star.png'];
Maze.IDLESRC = 'img/idle.png';
Maze.FRONT_JUMPSRC = 'img/front_jump.png';
Maze.BGSRC = 'img/maze_bg.jpg';
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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 1, 3, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 4, 0, 0, 0, 0],
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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
	[0, 2, 0, 3, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 3, 0, 0, 0],
	[0, 4, 1, 0, 0, 0, 1, 0, 0, 0],
	[0, 0, 4, 1, 0, 0, 1, 0, 0, 0],
	[0, 0, 0, 4, 1, 0, 1, 0, 0, 0],
	[0, 0, 0, 0, 4, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
Maze.delta = 0;

Maze.animationState = 0;

Maze.animationStateType = {
	UNSET: 0,
	MOVEFORWARD: 1,
	TURNRIGHT: 2
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
	Maze.jump = Game.imgs[Maze.src.indexOf(Maze.FRONT_JUMPSRC)];
	Maze.bg = Game.imgs[Maze.src.indexOf(Maze.BGSRC)];
	Maze.earth = Game.imgs[Maze.src.indexOf(Maze.EARTHSRC)];
	Maze.destination = Game.imgs[Maze.src.indexOf(Maze.DESTINATIONSRC)];
	Maze.carrot = Game.imgs[Maze.src.indexOf(Maze.COLLECTIONSRC)];

	// Draw game scene.
	Maze.initScene();
};

Maze.initScene = function() {
	Maze.drawBg();
	Maze.drawPath().
	then(Maze.drawCollection).
	then(Maze.drawDestination).
	then(Maze.initRole);
};

Maze.initRole = function() {
	Maze.role = {};
	Maze.role.img = Maze.idle;
	Maze.role.position = {
		x: Maze.start.x,
		y: Maze.start.y
	};
	Maze.role.lastPosition = {
		x: Maze.role.position.x,
		y: Maze.role.position.y
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

Maze.drawScene = function(drawRole) {
	Maze.drawBg();
	Maze.drawPath().
	then(Maze.drawDestination).
	then(Maze.drawCollection).
	then(drawRole);

	// return new Promise((resolve, reject) => {
	// 	resolve();
	// });
};

/**
* @param {Number} x.
* @param {Number} y.
*/
Maze.drawRoleIdle = function(x, y) {
	Maze.context.globalCompositeOperation = 'source-over';
	Maze.context.drawImage(Maze.role.img, Maze.role.sx, Maze.role.sy, Maze.SPRITEWIDTH, Maze.SPRITEHEIGHT,
		x, y -  Maze.SPRITEHEIGHT + Maze.SQUARE, Maze.SQUARE, Maze.SPRITEHEIGHT);
};

Maze.drawRoleJump = function(x, y) {
	Maze.context.globalCompositeOperation = 'source-over';
	Maze.context.drawImage(Maze.role.img, Maze.role.sx, Maze.role.sy, Maze.SPRITEWIDTH, 105,
		x, y -  105 + Maze.SQUARE, Maze.SQUARE, 105);
};

Maze.drawBg = function() {
	Maze.context.drawImage(Maze.bg, 0, 0, Maze.WIDTH, Maze.HEIGHT);
};

Maze.drawPath = function() {
	var i, j;
	for(i = 0; i < Maze.ROWS; ++i) {
		for(j = 0; j < Maze.COLS; ++j) {
			if(Maze.map[i][j] != Maze.pathType.WALL) {
				Maze.context.globalCompositeOperation = 'source-over';
				Maze.context.drawImage(Maze.earth, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
			}
		}
	}

	return new Promise((resolve, reject) => {
		resolve();
	});
};

Maze.drawCollection = function() {
	var i, j, k = 0;
	for (i = 0; i < Maze.ROWS; ++i) {
		for (j = 0; j < Maze.COLS; ++j) {
			if(Maze.map[i][j] === Maze.pathType.PICK) {
				Maze.context.globalCompositeOperation = 'source-over';
				Maze.context.drawImage(Maze.collection, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
			}
		}
	}

	return new Promise((resolve, reject) => {
		resolve();
	});
};

Maze.drawDestination = function() {
	var i, j;
	for (i = 0; i < Maze.ROWS; ++i) {
		for (j = 0; j < Maze.COLS; ++j) {
			if(Maze.map[i][j] === Maze.pathType.FINISH) {
				Maze.context.globalCompositeOperation = 'source-over';
				Maze.context.drawImage(Maze.destination, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
			}
		}
	}

	return new Promise((resolve, reject) => {
		resolve();
	});
};

Maze.onresize = function() {
	Blockly.svgResize(Game.workspace);
};

// Maze.animate = function() {
// 	if (Maze.delta === 0) {
// 		Maze.role.sx = 0;
// 		Maze.role.img = Maze.jump;
// 	}
//
// 	console.log('animate' + Maze.delta);
//
// 	 if (Maze.delta < 8) {
// 		 Maze.role.sx += Maze.SPRITEWIDTH;
// 		 Maze.drawScene().then(function() {
// 	 		Maze.drawRole(Maze.role.position.x, Maze.role.position.y);
// 	 	});
//
// 	 	Maze.delta ++;
// 		 window.setTimeout(Maze.moveforward, 125);
// 	}else {
// 		Maze.delta = 0;
// 		Maze.role.img = Maze.idle;
// 		switch(Maze.DIRECTION){
// 			case Maze.directionType.NORTH:
// 				Maze.role.sx = 0;
// 				break;
// 			case Maze.directionType.EAST:
// 				Maze.role.sx = Maze.SPRITEWIDTH;
// 				break;
// 			case Maze.directionType.SOUTH:
// 				Maze.role.sx = 2 * Maze.SPRITEWIDTH;
// 				break;
// 			case Maze.directionType.WEST:
// 				Maze.role.sx = 3 * Maze.SPRITEWIDTH;
// 				break;
// 			default:
// 				console.log(Maze.DIRECTION);
// 				console.error('direction is wrong.');
// 		}
// 		Maze.context.drawImage(Maze.role.img, Maze.role.sx, Maze.role.sy, Maze.SPRITEWIDTH, Maze.SPRITEHEIGHT,
// 			Maze.role.position.x, Maze.role.position.y -  Maze.SPRITEHEIGHT + Maze.SQUARE, Maze.SQUARE, Maze.SPRITEHEIGHT);
// 	}
//
// };

/**
* @param {Number} fps. Frames per second.
* @param {Canvas2DContext} ctx.
* @param {Number} sx.
* @param {Function} draw.
*/
Maze.startAnimation = function(fps) {
	Maze.fpsInterval = 1000 / fps;
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
				Maze.role.sx += 50;

				if (Maze.now - Maze.startTime > Maze.fpsInterval * 8) {
					Maze.stopAnimation();
				}

				if (Maze.animationState == Maze.animationStateType.MOVEFORWARD) {
					switch(Maze.DIRECTION){
						case Maze.directionType.NORTH:
							Maze.role.position.y -= 6.25;
							break;
						case Maze.directionType.EAST:
							Maze.role.position.x += 6.25;
							break;
						case Maze.directionType.SOUTH:
							Maze.role.position.y += 6.25;
							break;
						case Maze.directionType.WEST:
							Maze.role.position.x -= 6.25;
							break;
						default:
							console.log(Maze.DIRECTION);
							console.error('direction is wrong.');
					}
					// Draw game scene.
					Maze.drawScene(function(){
						Maze.drawRoleJump(Maze.role.position.x, Maze.role.position.y);
					});

					console.log('animate');
				}
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
	Maze.role.img = Maze.jump;
	Maze.animationState = Maze.animationStateType.MOVEFORWARD;
	Maze.startAnimation(8);
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
		// Maze.contextBg.save();
		// Maze.contextBg.clearRect(Maze.role.position.x, Maze.role.position.y, Maze.SQUARE, Maze.SQUARE);
		// Maze.contextBg.drawImage(Maze.earth, Maze.role.position.x, Maze.role.position.y, Maze.SQUARE, Maze.SQUARE);
		// Maze.contextBg.restore();
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
		console.log('excute');
		window.setTimeout(function() {
			Maze.excute(interpreter);
		}, 250);
	}//else{
		// Check result.
		//Maze.checkResult(Maze.role.position.x, Maze.role.position.y);
	//}
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
