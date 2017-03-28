'use strict';

var Game = {};

/**
 * The supported languages.
 */
Game.LANGUAGE_NAME = {
	'zh': '中文',
	'en': 'English'
};

/**
 * List of tab names.
 * @private
 */
Game.TABS_ = ['javascript', 'python', 'dart', 'php', 'lua'];

Game.selected = 'javascript';

Game.workspace = null;

Game.MAX_LEVEL = 5;

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
	var lang = Game.getStringParamFromUrl('lang', '');
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
 * Current language.
 */
Game.LANG = Game.getLang();

/**
 * Current game level.
 */
Game.LEVEL = Game.getLevel();

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
		Blockly.Xml.domToWorkspace(xml, Game.workspace);
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
		search = '?lang=' + newLang;
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
		el = document.getElementById(el);
	}
	el.addEventListener('click', func, true);
	el.addEventListener('touchend', func, true);
};

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Game.tabClick = function(clickedName) {
	// Deselect all tabs and hide all panes.
	for(var i = 0; i < Game.TABS_.length; i++) {
		var name = Game.TABS_[i];
		document.getElementById('tab_' + name).className = 'taboff';
		document.getElementById('content_' + name).style.display = 'none';
	}

	// Select the active tab.
	Game.selected = clickedName;
	document.getElementById('tab_' + clickedName).className = 'tabon';
	// Show the selected pane.
	document.getElementById('content_' + clickedName).style.display =
		'block';
	Game.renderContent();

	Blockly.svgResize(Game.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Game.renderContent = function() {
	var content = document.getElementById('content_' + Game.selected);
	// Initialize the pane.
	if(content.id == 'content_javascript') {
		var code = Blockly.JavaScript.workspaceToCode(Game.workspace);
		content.textContent = code;
		if(typeof prettyPrintOne == 'function') {
			code = content.textContent;
			code = prettyPrintOne(code, 'js');
			content.innerHTML = code;
		}
	} else if(content.id == 'content_python') {
		code = Blockly.Python.workspaceToCode(Game.workspace);
		content.textContent = code;
		if(typeof prettyPrintOne == 'function') {
			code = content.textContent;
			code = prettyPrintOne(code, 'py');
			content.innerHTML = code;
		}
	} 
};

/**
 * 
 */
Game.displayLevelLink = function() {
	var levelLink = document.getElementById('levelLink');
	var a = null;
	for(var i = 1; i <= Game.MAX_LEVEL; ++i){
		a = document.createElement('a');
		a.innerHTML = i;
		a.href = '?lang=' + Game.LANG + '&level=' + i;
		a.classList.add('circle');
		if( i === Game.LEVEL){
			a.classList.add('selected');
		}
		levelLink.appendChild(a);
	}
};

/**
 * Initialize Blockly.
 */
Game.init = function() {
	Game.initLanguage();

	// Add to reserved word list: Local variables in execution environment (runJS)
	// and the infinite loop detection function.
	Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

	Game.loadBlocks('');

	if('BlocklyStorage' in window) {
		// Hook a save function onto unload.
		BlocklyStorage.backupOnUnload(Game.workspace);
	}
	
	Game.displayLevelLink();
	
	// Switch to zero-based indexing so that later JS levels match the blocks.
    Blockly.Blocks && (Blockly.Blocks.ONE_BASED_INDEXING = false);
    Blockly.JavaScript && (Blockly.JavaScript.ONE_BASED_INDEXING = false);

	// Lazy-load the syntax-highlighting.
	window.setTimeout(Game.importPrettify, 1);
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
};

/**
 * Initialize workspace.
 */
Game.initWorkspace = function() {
	// Interpolate translated messages into toolbox.
	var toolboxText = document.getElementById('toolbox').outerHTML;
	toolboxText = toolboxText.replace(/{(\w+)}/g,
		function(m, p1) { return MSG[p1]; });
	var toolboxXml = Blockly.Xml.textToDom(toolboxText);

	Game.workspace = Blockly.inject('blocklyDiv', {
		grid: {
			spacing: 25,
			length: 3,
			colour: '#ccc',
			snap: true
		},
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
	switch(Game.LEVEL) {
		case 1:
			blocks = game.blocks[0];
			break;
		case 2:
			blocks = game.blocks[1];
			break;
		case 3:
			blocks = game.blocks[2];
			break;
		case 4:
			blocks = game.blocks[3];
			break;
		case 5:
			blocks = game.blocks[4];
			break;
		default:
			console.log('Level is undefined.');
	}

	// Create toolbox xml.
	for(var index in blocks) {
		block = document.createElement('block');
		block.setAttribute('type', blocks[index]);
		toolbox.appendChild(block);
	}
};

/**
* Discard all blocks from the workspace.
*/
//App.discard = function() {
//	var count = App.workspace.getAllBlocks().length;
//	if (count < 2 ||
//	      window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
//	    App.workspace.clear();
//	    if (window.location.hash) {
//	      window.location.hash = '';
//	    }
//	}
//};

// Load the language strings.
document.write('<script src="msg/' + Game.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="blockly/msg/js/' + Game.LANG + '.js"></script>\n');

window.addEventListener('load', Game.init);