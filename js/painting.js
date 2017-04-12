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
	['brush_moveforward', 'brush_turnright'],
	['brush_moveforward', 'brush_turnright', 'controls_repeat'],
	['brush_moveforward', 'brush_turnright', 'controls_repeat', 'brush_set_color'],
	['brush_moveforward', 'brush_turnright', 'controls_repeat', 'brush_set_color', 'brush_pen_up', 'brush_pen_down']
];

/**
 * Positions of stars.
 */
Painting.stars = [];

/**
 * List of image sources.
 */
Painting.src = ['img/pen.png', 'img/star_blue.png', 'img/star_green.png', 'img/star_purple.png', 'img/star_yellow.png'];

/**
 * Default pen constants.
 */
Painting.DEFAULT_LINEWIDTH = 5;
Painting.DEFAULT_COLOR = 'white';
Painting.DEFAULT_DIS = 100;

/**
 * Max number of milliseconds that execution should delay.
 */
Painting.MAXPAUSE = 160;

/**
 * Min number of milliseconds that execution should delay.
 */
Painting.MINPAUSE = 40;

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

	// Background image.
	var img = document.createElement('img');
	img.src = 'img/bg.jpg';
	img.width = Painting.WIDTH;
	img.height = Painting.HEIGHT;
	visilization.appendChild(img);

	// Set width and height of canvas.
	canvasScratch.width = Painting.WIDTH;
	canvasScratch.height = Painting.HEIGHT;
	canvasAnswer.width = Painting.WIDTH;
	canvasAnswer.height = Painting.HEIGHT;
	canvasDisplay.width = Painting.WIDTH;
	canvasDisplay.height = Painting.HEIGHT;

	Game.initToolbox(Painting);
	Game.initWorkspace();
	Painting.initSlider();

	// Load images.
	Painting.loadImage(function(){
		Painting.drawAnswer();
		Painting.reset();
	});

	Game.bindClick(document.getElementById('playBtn'), Painting.run);
	Game.bindClick(document.getElementById('resetBtn'), Painting.reset);
};

/**
* Speed slider.
*/
Painting.initSlider = function() {
	// display slider bar.
	document.querySelector('.slider').style.display = 'block';

	Painting.sliderHandle = document.getElementById('sliderHandle');
	Painting.sliderHandle.value = 0.5;

	var onDrag = function(e) {
		// calculate offset and assign it to left style attribute.
		var offset = e.clientX - this.startX;
		this.percent = (this.currentLeft !== undefined ? this.currentLeft : 50) + offset / 2;
		if (this.percent < 0) {
			this.percent = 0;
		}
		if (this.percent > 100) {
			this.percent = 100;
		}
		this.style.left = this.percent + '%';
	};

	var onDragend = function(e) {
		this.currentLeft = this.percent;
		this.value = this.percent / 100;
		this.removeEventListener('mousemove', onDrag);
	};

	sliderHandle.addEventListener('mousedown', function(e){
		this.startX = e.clientX;
		sliderHandle.addEventListener('mousemove', onDrag);
	});
	sliderHandle.addEventListener('mouseup', onDragend);
	sliderHandle.addEventListener('mouseleave', onDragend);
};

Painting.loadImage = function(callback) {
	var num = 0
	Painting.imgs = [];
	for(var i in Painting.src){
		Painting.imgs[i] = new Image();
		Painting.imgs[i].src = Painting.src[i];
		Painting.imgs[i].onload = function() {
			num ++;
			if(num >= Painting.src.length){
				callback();
			}
		};
	}
};

Painting.initAnswer = function() {
    var star = function() {
    	for (var i = 0; i < 5; i++) {
				Painting.move();
				Painting.stars.push([Painting.x, Painting.y]);
				Painting.turnright(144);
			}
    };

	switch(Game.LEVEL) {
		case 1:
			Painting.move();
			Painting.stars.push([Painting.x, Painting.y]);
			for(var i = 0; i < 3; i++) {
				Painting.heading += 90;
				Painting.move();
				Painting.stars.push([Painting.x, Painting.y]);
			}
			break;
		case 2:
			for(var i = 0; i < 5; i++) {
				Painting.move();
				Painting.stars.push([Painting.x, Painting.y]);
				Painting.turnright(72);
			}
			break;
		case 3:
			for(var i = 0; i < 6; i++) {
				Painting.move();
				Painting.stars.push([Painting.x, Painting.y]);
				Painting.turnright(60);
			}
			break;
		case 4:
			Painting.setColor('#ffff33');
			star();
			break;
		case 5:
			Painting.setColor('#ff6666');
			star();
			Painting.penUp();
			Painting.heading += 180;
			Painting.move();
			Painting.move();
			Painting.heading += 180;
			Painting.penDown();
			Painting.setColor('#ffff33');
			star();
			break;
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

Painting.drawStar = function() {
	// Draw stars.
	Painting.ctxDisplay.globalCompositeOperation = 'source-over';
	Painting.ctxDisplay.globalAlpha = 0.8;
	console.log(Painting.stars)
	console.log(Painting.stars.length)
	for (var i = 0; i < Painting.stars.length; i++) {
		var index = Math.ceil(Math.random() * 4);
		Painting.ctxDisplay.drawImage(Painting.imgs[index], Painting.stars[i][0] - 15, Painting.stars[i][1] - 15, 30, 30);
	}
};

Painting.display = function() {
	// Clear canvas.
	Painting.ctxDisplay.canvas.width = Painting.ctxDisplay.canvas.width;

	// Draw the answer layer.
	Painting.ctxDisplay.globalCompositeOperation = 'source-over';
	Painting.ctxDisplay.globalAlpha = 0.2;
	Painting.ctxDisplay.drawImage(Painting.ctxAnswer.canvas, 0, 0);

	// Draw the answer star layer.
	Painting.drawStar();

	// Draw the user layer.
	//Painting.ctxDisplay.globalCompositeOperation = 'source-over';
	Painting.ctxDisplay.globalAlpha = 1;
	Painting.ctxDisplay.drawImage(Painting.ctxScratch.canvas, 0, 0);

	// Draw the pen.
	Painting.ctxDisplay.drawImage(Painting.imgs[0], Painting.x - 25, Painting.y - 25);
};

Painting.animate = function(id) {
	Painting.display();
	if(id) {
		Game.highlight(id);
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
	console.log('mo')
};

Painting.turnright = function(angle, id) {
	Painting.heading += angle;
	Painting.animate(id);
};

Painting.setColor = function(color, id) {
	Painting.ctxScratch.strokeStyle = color;
	Painting.animate(id);
};

Painting.penUp = function(id) {
	Painting.penDownValue = false;
	Painting.animate(id);
};

Painting.penDown = function(id) {
	Painting.penDownValue = true;
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
		console.log(id)
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

	wrapper = function(id) {
		id = id ? id.toString() : '';
		Painting.heading = 180;
		return interpreter.createPrimitive(Painting.move(id));
	};
	interpreter.setProperty(scope, 'movesouth',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		id = id ? id.toString(): '';
		Painting.heading = 270;
		return interpreter.createPrimitive(Painting.move(id));
	};
	interpreter.setProperty(scope, 'movewest',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		id = id ? id.toString(): '';
		return interpreter.createPrimitive(Painting.move(id));
	};
	interpreter.setProperty(scope, 'moveforward',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(angle, id) {
		id = id ? id.toString(): '';
		angle = angle.data;
		return interpreter.createPrimitive(Painting.turnright(angle, id));
	};
	interpreter.setProperty(scope, 'turnright',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(color, id) {
		id = id ? id.toString() : '';
		color = color.data;
		console.log(color)
		return interpreter.createPrimitive(Painting.setColor(color, id));
	};
	interpreter.setProperty(scope, 'setcolor',
		interpreter.createNativeFunction(wrapper));

	wrapper = function(id) {
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(Painting.penUp(id));
	};
	interpreter.setProperty(scope, 'penUp',
		interpreter.createNativeFunction(wrapper));

		wrapper = function(id) {
			id = id ? id.toString() : '';
			return interpreter.createPrimitive(Painting.penDown(id));
		};
		interpreter.setProperty(scope, 'penDown',
			interpreter.createNativeFunction(wrapper));
};

Painting.excute = function(interpreter) {
	var go = interpreter.step();
	if(!go){
		clearInterval(Painting.pid);

		Painting.checkAnswer();
	}
};

Painting.run = function() {
	var code = Blockly.JavaScript.workspaceToCode(Game.workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	var interpreter = new Interpreter(code, Painting.initApi);
	var pause = Game.clamp(Painting.MINPAUSE, (Painting.MAXPAUSE - Painting.MINPAUSE) * Painting.sliderHandle.value + Painting.MINPAUSE, Painting.MAXPAUSE)
	try {
		Painting.pid = setInterval(function(){
			Painting.excute(interpreter);
		}, pause);

	} catch(e) {
		alert(MSG['badCode'].replace('%1', e));
	}
};

Painting.reset = function() {
	// Stop interval.
	clearInterval(Painting.pid);

	// Starting location and heading of the pen.
	Painting.x = Painting.HEIGHT / 2;
	Painting.y = Painting.WIDTH / 2;
	Painting.heading = 0;
	Painting.penDownValue = true;

	// Clear the canvas.
	Painting.ctxScratch.canvas.width = Painting.ctxScratch.canvas.width;
	Painting.ctxScratch.strokeStyle = Painting.DEFAULT_COLOR;
	Painting.ctxScratch.lineWidth = Painting.DEFAULT_LINEWIDTH;
	Painting.ctxScratch.lineCap = 'round';
	Painting.display();
};

/**
 * Verify if the answer is correct.
 * If so, move on to next level.
 */
Painting.checkAnswer = function() {
  // Compare the Alpha (opacity) byte of each pixel in the user's image and
  // the sample answer image.
  var userImage =
      Painting.ctxScratch.getImageData(0, 0, Painting.WIDTH, Painting.HEIGHT);
  var answerImage =
      Painting.ctxAnswer.getImageData(0, 0, Painting.WIDTH, Painting.HEIGHT);
  var len = Math.min(userImage.data.length, answerImage.data.length);
  var delta = 0;
  // Pixels are in RGBA format.  Only check the Alpha bytes.
  for (var i = 3; i < len; i += 4) {
    // Check the Alpha byte.
    if (Math.abs(userImage.data[i] - answerImage.data[i]) > 64) {
      delta++;
    }
  }
  if (Painting.isCorrect(delta)) {
    //BlocklyInterface.saveToLocalStorage();
    if (Game.LEVEL < Game.MAX_LEVEL) {
      // No congrats for last level, it is open ended.
      //BlocklyGames.workspace.playAudio('win', 0.5);
      //BlocklyDialogs.congratulations();
      alert('Complete!')
    }
  } else {
    //Painting.penColour('#ff0000');
    alert('error')
  }
};

/**
 * Validate whether the user's answer is correct.
 * @param {number} pixelErrors Number of pixels that are wrong.
 * @return {boolean} True if the level is solved, false otherwise.
 */
Painting.isCorrect = function(pixelErrors) {
  if (Game.LEVEL == Game.MAX_LEVEL) {
    // Any non-null answer is correct.
    return Game.workspace.getAllBlocks().length > 1;
  }
  console.log('Pixel errors: ' + pixelErrors);
  if (pixelErrors > 100) {
    // Too many errors.
    return false;
  }
//if ((Game.LEVEL <= 2 &&
//     Game.workspace.getAllBlocks().length > 3) ||
//    (Game.LEVEL == 3 &&
//     Game.workspace.getAllBlocks().length > 4)) {
//  // Use a loop, dummy.
//  //var content = document.getElementById('helpUseLoop');
////  var style = {
////    'width': '30%',
////    'left': '35%',
////    'top': '12em'
////  };
////  BlocklyDialogs.showDialog(content, null, false, true, style,
////      BlocklyDialogs.stopDialogKeyDown);
////  BlocklyDialogs.startDialogKeyDown();
//  return false;
//}
  return true;
};

window.addEventListener('load', Painting.init);
