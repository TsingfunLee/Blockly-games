Maze.drawScene = function(drawRole) {
	Maze.drawBg();
	Maze.drawNum();
	Maze.drawCollection().
	then(drawRole);
};

/**
* @param {Number} x. X coordinates of role position.
* @param {Number} y. Y coordinates of role position.
*/
Maze.drawRoleIdle = function(x, y) {
	Maze.context.globalCompositeOperation = 'source-over';
	Maze.context.drawImage(Maze.role.img, Maze.role.sx, Maze.role.sy, 150, 210,
		x, y -  70 + Maze.SQUARE, Maze.SQUARE, 70);
};

Maze.drawRoleJump = function(x, y) {
	Maze.context.globalCompositeOperation = 'source-over';
	Maze.context.drawImage(Maze.role.img, Maze.role.sx, Maze.role.sy, 150, 320,
		x, y -  105 + Maze.SQUARE, Maze.SQUARE, 105);
};

Maze.drawRoleTurn = function(x, y) {
	Maze.context.globalCompositeOperation = 'source-over';
	Maze.context.drawImage(Maze.role.img, Maze.role.sx, Maze.role.sy, 150, 210,
		x, y -  70 + Maze.SQUARE, Maze.SQUARE, 70);
};

Maze.drawBg = function() {
	Maze.context.drawImage(Maze.bg, 0, 0, Maze.WIDTH, Maze.HEIGHT);

	return new Promise((resolve, reject) => {
		resolve();
	});
};

Maze.drawCollection = function() {
	var i, j, k = 0;
	for (i = 0; i < Maze.ROWS; ++i) {
		for (j = 0; j < Maze.COLS; ++j) {
			if(Maze.map[i][j] === Maze.pathType.PICK) {
				k++;
				if (k > Maze.count) {
					Maze.context.globalCompositeOperation = 'source-over';
					Maze.context.drawImage(Maze.carrot, j * Maze.SQUARE, i * Maze.SQUARE, Maze.SQUARE, Maze.SQUARE);
				}			
			}
		}
	}

	return new Promise((resolve, reject) => {
		resolve();
	});
};

Maze.drawNum = function() {
	Maze.context.globalCompositeOperation = 'source-over';
	Maze.context.drawImage(Maze.number[Maze.count], 385, 16, 11, 21);
};
