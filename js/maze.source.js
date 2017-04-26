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
	['action_forward', 'action_turnright', 'action_turnleft', 'action_collect', 'controls_repeat'],
	['action_forward', 'controls_repeat', 'action_if', 'action_turnleft'],
	['action_forward', 'controls_repeat', 'action_if', 'action_turnright'],
	['action_forward', 'controls_repeat', 'action_if', 'action_turnright', 'action_turnleft'],
	['action_forward', 'controls_repeat', 'action_if', 'action_ifElse', 'action_turnright', 'action_turnleft'],
	['action_forward', 'controls_repeat', 'action_if', 'action_ifElse', 'action_turnright', 'action_turnleft']
];

/**
 * 1 --- path; 0 --- wall; 2 --- start; 3 --- finish.
 */
Maze.map = [
	undefined,
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 1
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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 0, 3, 0, 0],
	[0, 0, 1, 4, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 1, 4, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 1, 4, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 1, 4, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 1, 1, 3, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 2, 1, 1, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 7
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
	[0, 0, 2, 1, 1, 1, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
	[0, 1, 1, 3, 0, 0, 0, 1, 0, 0],
	[0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 8
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
	[0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
	[0, 0, 2, 1, 1, 0, 0, 3, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 9
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 3, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
	[0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 2, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 10
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 3, 0, 1, 0],
	[0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
	[0, 1, 1, 1, 0, 1, 0, 1, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 0, 0, 2, 1, 1, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
],
][Game.LEVEL];
