'use strict';

var Painting = {};

Painting.WIDTH = 400;
Painting.HEIGHT = 400;

Painting.blocks = [
	['brush_moveforward'],
	[],
	[],
	[],
	[]
];

Painting.init = function() {
	var visilization = document.getElementById('visilazation');
	Painting.canvas = document.createElement('canvas');
	Painting.canvas.id = 'canvas';
	visilization.appendChild(Painting.canvas);
	Painting.context = Painting.canvas.getContext('2d');
	Painting.canvas2 = document.createElement('canvas');
	Painting.canvas2.id = 'canvas-bg';
	visilization.appendChild(Painting.canvas2);
	Painting.context2 = Painting.canvas2.getContext('2d');

	// Set width and height of canvas.
	Painting.canvas.width = Painting.WIDTH;
	Painting.canvas.height = Painting.HEIGHT;
	Painting.canvas2.width = Painting.WIDTH;
	Painting.canvas2.height = Painting.HEIGHT;
	
	App.initToolbox(Painting);
	App.initWorkspace();	
	
	Painting.initBg();
};

Painting.initBg = function() {
	Painting.context2.strokeRect(10, 10, 100, 100)
};

window.addEventListener('load', Painting.init);