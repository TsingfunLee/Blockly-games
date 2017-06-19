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

	if(!Maze.checkWall(Maze.role.position.x, Maze.role.position.y, 0)) {
		Maze.displayResult();
		return;
	}

	Game.highlight(id);

	Maze.role.sx = 0;
	Maze.role.sy = 0;
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
	Game.highlight(id);
};

Maze.isPath = function(direction, id) {
	Game.highlight(id);
	return Maze.checkWall(Maze.role.position.x, Maze.role.position.y, direction);
};

/**
 * @param {Number} x. X coodinates of role.
 * @param {Number} y. Y coodinates of role.
 * @param {Number} direction. Direction to look
 *     (0 = forward, 1 = right, 2 = backward, 3 = left).
 */
Maze.checkWall = function(x, y, direction) {
  var i, j;
  var effectiveDirection = Maze.DIRECTION + direction;
  effectiveDirection = effectiveDirection % 4;
  if (effectiveDirection < 0) {
    effectiveDirection += 4;
  }
	switch(effectiveDirection){
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
		Maze.result = Maze.resultType.CRASH;
		//alert('Crash')
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
		//alert('success')
	}else {
		console.log('Failure!!!!');
		Maze.result = Maze.resultType.FAILURE;
		//alert('failure!')
	}

	Maze.displayResult();
};

Maze.displayResult = function() {
	switch (Maze.result) {
		case Maze.resultType.CRASH:

			//break;
		case Maze.resultType.FAILURE:
			var content = DIALOG.maze[Game.LEVEL - 1].lose;
			if (Game.LEVEL == 5 || Game.LEVEL == 3) {
				if(Maze.count != Maze.NUM) {
					console.log('Pick up all collection!');
					content = content[0];
				}else {
					content = content[1];
				}
			}

			Maze.popover(content);
			break;
		case Maze.resultType.SUCCESS:
			if (Game.LEVEL != 10) {
				Maze.successDialog();
			}else {
				Maze.beginDialog();
			}

			break;
	}
};
