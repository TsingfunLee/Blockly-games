Maze.drawScene = function(drawRole) {
	Maze.drawBg();
	Maze.drawPath().
	then(Maze.drawDestination).
	then(Maze.drawCollection).
	then(drawRole);
};

/**
* @param {Number} x. X coordinates of role position.
* @param {Number} y. Y coordinates of role position.
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

Maze.drawRoleTurn = function(x, y) {

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
