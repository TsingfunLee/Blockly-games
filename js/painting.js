'use strict';

var Painting = {};

/**
 * Width and height of canvas.
 */
Painting.WIDTH = 500;
Painting.HEIGHT = 500;

/**
 * Block type each level need.
 */
Painting.blocks = [
	['brush_move_north', 'brush_move_east', 'brush_move_south', 'brush_move_west'],
	[],
	[],
	[],
	[]
];

Painting.direction = {
	NORTH: 0,
	EAST: 1,
	SOUTH: 2,
	WEST: 3
};

/**
 * Frame schedules of animation.
 */
Painting.pidList = [];

/**
 * Default pen constants.
 */
Painting.DEFAULT_LINEWIDTH = 5;
Painting.DEFAULT_COLOR = 'white';
Painting.DEFAULT_DIS = 100;

/**
 * Number of milliseconds that execution should delay.
 */
Painting.PAUSE = 500;

Painting.init = function() {
	var visilization = document.getElementById('visilazation');
	var canvasScratch = document.createElement('canvas');
	canvasScratch.id = 'canvas-scratch';
	canvasScratch.className = 'canvas';
	visilization.appendChild(canvasScratch);
	Painting.ctxScratch = canvasScratch.getContext('2d');

	var canvasAnswer = document.createElement('canvas');
	canvasAnswer.id = 'canvas-answer';
	canvasAnswer.className = 'canvas';
	visilization.appendChild(canvasAnswer);
	Painting.ctxAnswer = canvasAnswer.getContext('2d');

	var canvasDisplay = document.createElement('canvas');
	canvasDisplay.id = 'canvas-display';
	canvasDisplay.className = 'canvas';
	visilization.appendChild(canvasDisplay);
	Painting.ctxDisplay = canvasDisplay.getContext('2d');

	// Set width and height of canvas.
	canvasScratch.width = Painting.WIDTH;
	canvasScratch.height = Painting.HEIGHT;
	canvasAnswer.width = Painting.WIDTH;
	canvasAnswer.height = Painting.HEIGHT;
	canvasDisplay.width = Painting.WIDTH;
	canvasDisplay.height = Painting.HEIGHT;

	// Initialize pen width and pen color.
	Painting.ctxScratch.lineWidth = Painting.DEFAULT_LINEWIDTH;
	Painting.ctxScratch.strokeStyle = Painting.DEFAULT_COLOR;
	Painting.ctxAnswer.lineWidth = Painting.DEFAULT_LINEWIDTH;
	Painting.ctxAnswer.strokeStyle = Painting.DEFAULT_COLOR;
	Painting.ctxDisplay.lineWidth = Painting.DEFAULT_LINEWIDTH;
	Painting.ctxDisplay.strokeStyle = Painting.DEFAULT_COLOR;

	// Initial pen x/y coodinates.
	Painting.x = Painting.WIDTH / 2;
	Painting.y = Painting.HEIGHT / 2;

	// Set initial point in focus of canvas.
	Painting.ctxScratch.moveTo(Painting.x, Painting.y);
	Painting.ctxAnswer.moveTo(Painting.x, Painting.y);
	Painting.ctxDisplay.moveTo(Painting.x, Painting.y);

	Game.initToolbox(Painting);
	Game.initWorkspace();

	// Display backgroung.
	var bgImg = new Image();
	bgImg.src = 'img/bg.jpg';
	bgImg.onload = function() {		
		Painting.ctxDisplay.drawImage(this, 0, 0, Painting.WIDTH, Painting.HEIGHT);
	
		
		Painting.drawAnswer();
	};

	Game.bindClick(document.getElementById('playBtn'), Painting.run);
	Game.bindClick(document.getElementById('resetBtn'), Painting.reset);
};

Painting.initAnswer = function() {
//	Painting.ctxScratch.globalAlpha = 0.2
	switch(Game.LEVEL) {
		case 1:
			Painting.move();
			Painting.heading = 90;
			Painting.move();
			break;
		case 2:
		case 3:
		case 4:
		case 5:
		default:
			console.error('Level is undifined!');
	}
};

/**
 * On startup draw the expected answer and save it to the answer canvas.
 */
Painting.drawAnswer = function() {
	Painting.reset();
	Painting.initAnswer();
	Painting.ctxAnswer.globalCompositeOperation = 'copy';
	Painting.ctxAnswer.drawImage(Painting.ctxScratch.canvas, 0, 0);
	Painting.ctxAnswer.globalCompositeOperation = 'source-over';
};

/**
 *
 */
Painting.display = function() {
	// Draw the answer layer.
	Painting.ctxDisplay.globalCompositeOperation = 'source-over';
//	Painting.ctxDisplay.globalAlpha = 0.2;
//	Painting.ctxDisplay.beginPath()
//	Painting.ctxDisplay.rect(0, 0, 100, 100)
//	Painting.ctxDisplay.stroke()
	Painting.ctxDisplay.drawImage(Painting.ctxAnswer.canvas, 0, 0);
	Painting.ctxDisplay.globalAlpha = 1;

	// Draw the user layer.
	Painting.ctxDisplay.globalCompositeOperation = 'source-over';
	Painting.ctxDisplay.drawImage(Painting.ctxScratch.canvas, 0, 0);
};

/**
 * Animate pidList.
 */
Painting.animate = function(id) {
	Painting.display();
	if(id) {
		BlocklyInterface.highlight(id);
		// Scale the speed non-linearly, to give better precision at the fast end.
		// var stepSpeed = 1000 * Math.pow(1 - Painting.speedSlider.getValue(), 2);
		// Painting.pause = Math.max(1, stepSpeed);
	}
};

/**
 *
 */
Painting.move = function(id) {
	if(Painting.penDownValue) {
		Painting.ctxScratch.beginPath();
		Painting.ctxScratch.moveTo(Painting.x, Painting.y);
	}
	//if (distance) {
	Painting.x += Painting.DEFAULT_DIS * Math.sin(2 * Math.PI * Painting.heading / 360);
	Painting.y -= Painting.DEFAULT_DIS * Math.cos(2 * Math.PI * Painting.heading / 360);
	//   var bump = 0;
	// } else {
	//   // WebKit (unlike Gecko) draws nothing for a zero-length line.
	//   var bump = 0.1;
	// }
	if(Painting.penDownValue) {
		Painting.ctxScratch.lineTo(Painting.x, Painting.y);
		Painting.ctxScratch.stroke();
	}
	Painting.animate(id);
};

/**
 * API added to interpreter.
 * @param {Interpreter} JS interpreter.
 * @param {Object} scope.
 */
Painting.initApi = function(interpreter, scope) {
	var wrapper = function(id) {
		id = id ? id.toString() : '';
		Painting.heading = 0;
		return interpreter.createPrimitive(Painting.move(id));
	};
	interpreter.setProperty(scope, 'movenorth',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		id = id ? id.toString() : '';
		Painting.heading = 90;
		return interpreter.createPrimitive(Painting.move(id));
	};
	interpreter.setProperty(scope, 'moveeast',
		interpreter.createNativeFunction(wrapper));
};

Painting.excute = function(interpreter) {
	if(interpreter.step()) {
		Painting.animate();
		window.setTimeout(function() {
			Painting.excute(interpreter);
		}, Painting.PUASE);
	}
};

Painting.run = function() {
	var code = Blockly.JavaScript.workspaceToCode(Game.workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	var interpreter = new Interpreter(code, Painting.initApi);
	try {
		Painting.excute(interpreter);
	} catch(e) {
		alert(MSG['badCode'].replace('%1', e));
	}
};

Painting.reset = function() {
	// Starting location and heading of the pen.
	Painting.x = Painting.HEIGHT / 2;
	Painting.y = Painting.WIDTH / 2;
	Painting.heading = 0;
	Painting.penDownValue = true;

	// Clear the canvas.
	Painting.ctxScratch.canvas.width = Painting.ctxScratch.canvas.width;
	Painting.ctxScratch.globalAlpha = 0.2;
	Painting.ctxScratch.strokeStyle = Painting.DEFAULT_COLOR;
	//Painting.ctxScratch.fillStyle = '#ffffff';
	Painting.ctxScratch.lineWidth = Painting.DEFAULT_LINEWIDTH;
	Painting.ctxScratch.lineCap = 'round';
	Painting.display();
};

window.addEventListener('load', Painting.init);