'use strict';

var Game = {};

/**
 * The supported languages.
 */
Game.LANGUAGE_NAME = {
	'zh': '中文',
	'en': 'English'
};

Game.workspace = null;

Game.MAX_LEVEL = 10;

/**
 * Return a value that between min and max.
 * @param {Number} min
 * @param {Number} val
 * @param {Number} max
 */
Game.clamp = function(min, val, max) {
	if(val < min){
		val = min;
	}else if(val > max){
		val = max;
	}

	return val;
};

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
Game.getStringParamFromUrl = function(name, defaultValue) {
	var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
	return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Extracts a numeric parameter from the URL.
 * If the parameter is absent or less than min_value, min_value is
 * returned.  If it is greater than max_value, max_value is returned.
 * @param {string} name The name of the parameter.
 * @param {number} minValue The minimum legal value.
 * @param {number} maxValue The maximum legal value.
 * @return {number} A number in the range [min_value, max_value].
 */
Game.getNumberParamFromUrl = function(name, minValue, maxValue) {
    var val = Number(Game.getStringParamFromUrl(name, 'NaN'));
    return isNaN(val) ? minValue : Game.clamp(minValue, val, maxValue);
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Game.getLang = function() {
	var lang = Game.getStringParamFromUrl('lang', 'zh');
	if(Game.LANGUAGE_NAME[lang] === undefined) {
		// Default to Chinese.
		lang = 'zh';
	}
	return lang;
};

/**
 * Get the level of this game from the URL.
 * @return {Number} Game's level.
 */
Game.getLevel = function() {
	var level = Game.getNumberParamFromUrl('level', 1, Game.MAX_LEVEL);
	return level;
};

/**
* Get the name of this game frome the URL.
* @return {String} Game's name.
*/
Game.getGameName = function() {
	var name = Game.getStringParamFromUrl('name', 'maze');

	return name;
};

/**
 * Current language.
 */
Game.LANG = Game.getLang();

/**
 * Current game level.
 */
Game.LEVEL = Game.getLevel();

/**
* Current game name.
*/
Game.NAME = Game.getGameName();

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Game.loadBlocks = function(defaultXml) {
	try {
		var loadOnce = window.sessionStorage.loadOnceBlocks;
	} catch(e) {
		// Firefox sometimes throws a SecurityError when accessing sessionStorage.
		// Restarting Firefox fixes this, so it looks like a bug.
		var loadOnce = null;
	}
	if('BlocklyStorage' in window && window.location.hash.length > 1) {
		// An href with #key trigers an AJAX call to retrieve saved blocks.
		BlocklyStorage.retrieveXml(window.location.hash.substring(1));
	} else if(loadOnce) {
		// Language switching stores the blocks during the reload.
		delete window.sessionStorage.loadOnceBlocks;
		var xml = Blockly.Xml.textToDom(loadOnce);
		Blockly.Xml.domToWorkspace(xml, Game.workspace);
	} else if(defaultXml) {
		// Load the editor with default starting blocks.
		var xml = Blockly.Xml.textToDom(defaultXml);
		// Clear the workspace to avoid merge.
		Game.workspace.clear();
		Blockly.Xml.domToWorkspace(xml, Game.workspace);
		Game.workspace.clearUndo();
	} else if('BlocklyStorage' in window) {
		// Restore saved blocks in a separate thread so that subsequent
		// initialization is not affected from a failed load.
		window.setTimeout(BlocklyStorage.restoreBlocks, 0);
	}
};

/**
 * Save the blocks and reload with a different language.
 */
Game.changeLanguage = function() {
	// Store the blocks for the duration of the reload.
	// This should be skipped for the index page, which has no blocks and does
	// not load Blockly.
	// MSIE 11 does not support sessionStorage on file:// URLs.
	if(typeof Blockly != 'undefined' && window.sessionStorage) {
		var xml = Blockly.Xml.workspaceToDom(Game.workspace);
		var text = Blockly.Xml.domToText(xml);
		window.sessionStorage.loadOnceBlocks = text;
	}

	var languageMenu = document.getElementById('languageMenu');
	var newLang = encodeURIComponent(
		languageMenu.options[languageMenu.selectedIndex].value);
	var search = window.location.search;
	if(search.length <= 1) {
		search = '?lang=' + newLang + '&level=' + Game.LEVEL + '&name=' + Game.NAME;
	} else if(search.match(/[?&]lang=[^&]*/)) {
		search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
	} else {
		search = search.replace(/\?/, '?lang=' + newLang + '&');
	}

	window.location = window.location.protocol + '//' +
		window.location.host + window.location.pathname + search;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Game.bindClick = function(el, func) {
	if(typeof el == 'string') {
		el = document.querySelector(el);
	}
	el.addEventListener('click', func, true);
	el.addEventListener('touchend', func, true);
};

/**
 * Create level link button with water action effect.
 */
Game.displayLevelLink = function() {
	var levelLink = document.getElementById('levelLink');
		var a = null,
			button = null;
		var cur = null;

		var wateraction = function() {
			var cur = $(this);
			var dest = cur.position().left;
			var t = 0.4;
			dest -= 50 * (Game.LEVEL - 1);
			TweenMax.to($('.select'), t, { x: dest, ease: Back.easeOut });
	//		动态获得关卡数字
			$('.select').html(cur.html());

		};

	//  动态生成关卡按钮
		for(var i = 1; i <= Game.MAX_LEVEL; ++i) {
			a = document.createElement('a');
			a.innerHTML = i;
			a.href = '?lang=' + Game.LANG + '&level=' + i + '&name=' + Game.NAME;
			a.addEventListener('mouseover', wateraction);
			a.classList.add('levelbtn');
			levelLink.appendChild(a);

			if(i === Game.LEVEL){
				cur = $(a);
			}
		}
	//	鼠标离开dots时,select返回选中关卡
	  var dest = cur.position().left;
		var t = 0.4;
		dest -= 50 * (Game.LEVEL - 1);
		$('.dots').mouseleave(function(){
			TweenMax.to($('.select'), t, { x: dest, ease: Back.easeOut });
			$('.select').html(cur.html());
		})
	//	选中关卡后,水滴停留在对应关卡
		$('.select').css('left', cur.position().left + 15).html(Game.LEVEL);
};

/**
* Bind button click events.
*/
Game.btnEvent = function() {
  // Run and reset button.
	var btnRun = document.getElementById('playBtn');
	var btnReset = document.getElementById('resetBtn');
	var btnEvent = function() {
		btnRun.classList.toggle('active');
		btnReset.classList.toggle('active');
	};
	Game.bindClick(btnRun, btnEvent);
	Game.bindClick(btnReset, btnEvent);

  // Toggle code button.
	var codebtnEvent = function(){
		//alert("显示代码窗口");
		var dialogCode = document.getElementById('dialogCode');
		var dialogP = document.querySelector('#dialogCode p');
		var layer = document.getElementsByClassName('layer')[0];
		var code = Blockly.JavaScript.workspaceToCode(Game.workspace);
		code = code.replace(/(,\s*)?'block_id_[^']+'\)/g, ')');
		dialogP.textContent = code;
		dialogCode.style.display = 'block';
		layer.style.display = 'block';
	};
	Game.bindClick('.showcode', codebtnEvent);

	// Dialog button.
	var btnConfirm = document.getElementsByClassName('dialog-btn');
	console.log(btnConfirm[0]);
	Game.bindClick(btnConfirm[0], function() {
		Game.hideDialog('dialogCode');
	});
	Game.bindClick(btnConfirm[1], function() {
		Game.hideDialog('dialogTip')
	});
	Game.bindClick(btnConfirm[2], function() {
		Game.hideDialog('dialogWin')
	});
	Game.bindClick(btnConfirm[3], Game.nextLevel);
};

/**
 * Initialize Blockly.
 */
Game.init = function() {

	Game.initLanguage();
	Game.displayLevelLink();
	Game.btnEvent();

	Game.loadBlocks('');

	if('BlocklyStorage' in window) {
		// Hook a save function onto unload.
		BlocklyStorage.backupOnUnload(Game.workspace);
	}

	// Switch to zero-based indexing so that later JS levels match the blocks.
  Blockly.Blocks && (Blockly.Blocks.ONE_BASED_INDEXING = false);
  Blockly.JavaScript && (Blockly.JavaScript.ONE_BASED_INDEXING = false);

	// Lazy-load the syntax-highlighting.
	// window.setTimeout(Game.importPrettify, 1);
	//Game.importGameScript();
	//window.setTimeout(Game.importGameScript, 1000);
};

/**
 * Initialize the page language.
 */
Game.initLanguage = function() {
	// Set the HTML's language.
	document.head.parentElement.setAttribute('lang', Game.LANG);

	// Sort languages alphabetically.
	var languages = [];
	for(var lang in Game.LANGUAGE_NAME) {
		languages.push([Game.LANGUAGE_NAME[lang], lang]);
	}

	// Populate the language selection menu.
	var languageMenu = document.getElementById('languageMenu');
	console.log(languageMenu);
	languageMenu.options.length = 0;
	for(var i = 0; i < languages.length; i++) {
		var tuple = languages[i];
		var lang = tuple[tuple.length - 1];
		var option = new Option(tuple[0], lang);
		if(lang == Game.LANG) {
			option.selected = true;
		}
		languageMenu.options.add(option);
	}
	languageMenu.addEventListener('change', Game.changeLanguage, true);

	// Inject language strings.
	document.getElementById('playBtn').textContent = MSG['play'];
	document.getElementById('resetBtn').textContent = MSG['reset'];
	document.getElementsByClassName('showcode')[0].textContent = MSG['showcode'];
};

/**
* Load game JavaScript.
*/
Game.importGameScript = function() {
	var script = '';
	if (Game.NAME == 'maze') {
		script = ['<script type="text/javascript" src="js/maze.js"></script>\n',
		'<script type="text/javascript" src="js/maze.source.js"></script>\n',
		'<script type="text/javascript" src="js/maze.draw.js"></script>\n',
		'<script type="text/javascript" src="js/maze.core.js"></script>\n'].join('');
	}else if (Game.NAME == 'painting') {
		script = '<script type="text/javascript" src="js/painting.js"></script>';
	}else {
		script = ['<script src="./js/lib/jquery.min.js"></script>\n',
	'<script src="./js/plugins/json-2.3.min.js"></script>\n',
	'<script src="./js/crafty-dev.js"></script>',
	'<script src="./js/soundmanager.js"></script>',
	'<script src="./js/class.js"></script>',
	'<script src="./js/classes/settings.js"></script>',
	'<script src="./js/classes/sound.js"></script>',
	'<script src="./js/classes/app.js"></script>',
	// '<script src="./js/classes/overlay.js"></script>',
	'<script src="./js/classes/program.js"></script>',
	'<script src="./js/classes/blocklyprogram.js"></script>',
	'<script src="./js/classes/level.js"></script>',
	'<script src="./js/classes/map_object.js"></script>',
	'<script src="./js/classes/map.js"></script>',
	'<script src="./js/classes/dir.js"></script>',
	'<script src="./js/classes/pos.js"></script>',
	'<script src="./js/classes/tank.js"></script>',
	'<script src="./js/classes/mine.js"></script>',
	'<script src="./js/classes/base.js"></script>',
	'<script src="./js/classes/tree.js"></script>',
	'<script src="./js/classes/rock.js"></script>',
	'<script src="./js/classes/wall.js"></script>',
	'<script src="./js/classes/bullet.js"></script>',
	'<script src="./js/classes/beam_tower.js"></script>',
	'<script src="./js/classes/beam.js"></script>',
	'<script src="./js/classes/explosion.js"></script>',
	'<script src="./blocks/tank.js"></script>',
	'<script src="./js/planeWar.js"></script>',
  '<script src="./js/planeWar.app.js"></script>'].join('');
	}
	document.write(script);
};

/**
* ----------------------------------------------
* Common functions for game below.
* ----------------------------------------------
*/

/**
 * Initialize workspace.
 * @param {Number} maxBlocks. Maximum number of blocks that may be created.
 */
Game.initWorkspace = function(maxBlocks) {
	// Interpolate translated messages into toolbox.
	var toolboxText = document.getElementById('toolbox').outerHTML;
	toolboxText = toolboxText.replace(/{(\w+)}/g,
		function(m, p1) { return MSG[p1]; });
	var toolboxXml = Blockly.Xml.textToDom(toolboxText);

	if (maxBlocks == void 0) {
		maxBlocks = Infinity;
	}

	Game.workspace = Blockly.inject('workspce_block', {
		grid: {
			spacing: 25,
			length: 3,
			colour: '#ccc',
			snap: true
		},
		maxBlocks: maxBlocks,
		media: 'media/',
		toolbox: toolboxXml,
		trashcan: true,
		zoom: {
			controls: true,
			wheel: false
		}
	});
};

/**
 * Initialize toolbox.
 * @param {Object} game. Current game type.
 */
Game.initToolbox = function(game) {
	var toolbox = document.getElementById('toolbox');
	var block = null;
	var blocks = [];

	// Block type needed.
	blocks = game.blocks[Game.LEVEL - 1];

	// Create toolbox xml.
	for(var index in blocks) {
		block = document.createElement('block');
		block.setAttribute('type', blocks[index]);
		toolbox.appendChild(block);
	}
};

/**
 * Highlight the block (or clear highlighting).
 * @param {String} id ID of block that triggered this action.
 */
Game.highlight = function(id) {
	if (id) {
    var m = id.match(/^block_id_([^']+)$/);
    if (m) {
      id = m[1];
    }
  }
  Game.workspace.highlightBlock(id);
};

/**
* Preload images.
* @param {Array} src. List of string of Images sources.
*/
Game.loadImages = function(src, onComplete) {
	var num = 0
	Game.imgs = [];
	for(var i in src) {
		Game.imgs[i] = new Image();
		Game.imgs[i].src = src[i];
		Game.imgs[i].onload = function() {
			num ++;
			if(num >= src.length) {
				onComplete();
			}
		};
	}
};

Game.nextLevel = function() {
    if (Game.LEVEL < Game.MAX_LEVEL) {
        window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname +
        '?lang=' + Game.LANG + '&level=' + (Game.LEVEL + 1) + '&name=' + Game.NAME;
    } else {
    	alert('Exceed max level!!!!');
    }
};

/**
* @param {String} id. id of dialog html.
*/
Game.showDialog = function(id) {
	var dialog = document.getElementById(id);
	var layer = document.getElementsByClassName('layer')[0];
	dialog.style.display = 'block';
	layer.style.display = 'block';
};

Game.hideDialog = function(id) {
	var dialog = document.getElementById(id);
	var layer = document.getElementsByClassName('layer')[0];
	dialog.style.display = 'none';
	layer.style.display = 'none';
}

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// Load the language strings.
document.write('<script src="msg/' + Game.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="blockly/msg/js/' + Game.LANG + '.js"></script>\n');
// Load dialog language strings.
document.write('<script src="msg/dialogContent_' + Game.LANG + '.js"></script>\n');
// Load game JavaScript.
Game.importGameScript();

window.addEventListener('load', Game.init);
