'use strict';

goog.provide('App');

/**
 * The namespace of the application.
 */
var App = {};

/**
 * The supported languages.
 */
App.LANGUAGE_NAME = {
	'zh': '中文',
	'en': 'English'
};

App.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
App.getStringParamFromUrl = function(name, defaultValue) {
	var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
	return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
App.getLang = function() {
	var lang = App.getStringParamFromUrl('lang', '');
	if(App.LANGUAGE_NAME[lang] === undefined) {
		// Default to Chinese.
		lang = 'zh';
	}
	return lang;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
App.loadBlocks = function(defaultXml) {
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
		Blockly.Xml.domToWorkspace(xml, App.workspace);
	} else if(defaultXml) {
		// Load the editor with default starting blocks.
		var xml = Blockly.Xml.textToDom(defaultXml);
		Blockly.Xml.domToWorkspace(xml, App.workspace);
	} else if('BlocklyStorage' in window) {
		// Restore saved blocks in a separate thread so that subsequent
		// initialization is not affected from a failed load.
		window.setTimeout(BlocklyStorage.restoreBlocks, 0);
	}
};

/**
 * Save the blocks and reload with a different language.
 */
App.changeLanguage = function() {
	// Store the blocks for the duration of the reload.
	// This should be skipped for the index page, which has no blocks and does
	// not load Blockly.
	// MSIE 11 does not support sessionStorage on file:// URLs.
	if(typeof Blockly != 'undefined' && window.sessionStorage) {
		var xml = Blockly.Xml.workspaceToDom(App.workspace);
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
App.bindClick = function(el, func) {
	if(typeof el == 'string') {
		el = document.getElementById(el);
	}
	el.addEventListener('click', func, true);
	el.addEventListener('touchend', func, true);
};

/**
 * Current language.
 */
App.LANG = App.getLang();

/**
 * List of tab names.
 * @private
 */
App.TABS_ = ['javascript', 'python', 'dart', 'php', 'lua'];

App.selected = 'javascript';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
App.tabClick = function(clickedName) {
	// Deselect all tabs and hide all panes.
	for(var i = 0; i < App.TABS_.length; i++) {
		var name = App.TABS_[i];
		document.getElementById('tab_' + name).className = 'taboff';
		document.getElementById('content_' + name).style.display = 'none';
	}

	// Select the active tab.
	App.selected = clickedName;
	document.getElementById('tab_' + clickedName).className = 'tabon';
	// Show the selected pane.
	document.getElementById('content_' + clickedName).style.display =
		'block';
	App.renderContent();

	Blockly.svgResize(App.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
App.renderContent = function() {
	var content = document.getElementById('content_' + App.selected);
	// Initialize the pane.
	if(content.id == 'content_javascript') {
		var code = Blockly.JavaScript.workspaceToCode(App.workspace);
		content.textContent = code;
		if(typeof prettyPrintOne == 'function') {
			code = content.textContent;
			code = prettyPrintOne(code, 'js');
			content.innerHTML = code;
		}
	} else if(content.id == 'content_python') {
		code = Blockly.Python.workspaceToCode(App.workspace);
		content.textContent = code;
		if(typeof prettyPrintOne == 'function') {
			code = content.textContent;
			code = prettyPrintOne(code, 'py');
			content.innerHTML = code;
		}
	} else if(content.id == 'content_php') {
//		code = Blockly.PHP.workspaceToCode(App.workspace);
//		content.textContent = code;
//		if(typeof prettyPrintOne == 'function') {
//			code = content.textContent;
//			code = prettyPrintOne(code, 'php');
//			content.innerHTML = code;
//		}
	} else if(content.id == 'content_dart') {
//		code = Blockly.Dart.workspaceToCode(App.workspace);
//		content.textContent = code;
//		if(typeof prettyPrintOne == 'function') {
//			code = content.textContent;
//			code = prettyPrintOne(code, 'dart');
//			content.innerHTML = code;
//		}
	} else if(content.id == 'content_lua') {
//		code = Blockly.Lua.workspaceToCode(App.workspace);
//		content.textContent = code;
//		if(typeof prettyPrintOne == 'function') {
//			code = content.textContent;
//			code = prettyPrintOne(code, 'lua');
//			content.innerHTML = code;
//		}
	}
};

/**
 * Initialize Blockly.
 */
App.init = function() {
	App.initLanguage();

	// Interpolate translated messages into toolbox.
	var toolboxText = document.getElementById('toolbox').outerHTML;
	toolboxText = toolboxText.replace(/{(\w+)}/g,
		function(m, p1) { return MSG[p1]; });
	var toolboxXml = Blockly.Xml.textToDom(toolboxText);

	App.workspace = Blockly.inject('blocklyDiv', {
		grid: {
			spacing: 25,
			length: 3,
			colour: '#ccc',
			snap: true
		},
		media: 'media/',
		toolbox: toolboxXml,
		zoom: {
			controls: true,
			wheel: true
		}
	});

	// Add to reserved word list: Local variables in execution environment (runJS)
	// and the infinite loop detection function.
	Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

	App.loadBlocks('');

	if('BlocklyStorage' in window) {
		// Hook a save function onto unload.
		BlocklyStorage.backupOnUnload(App.workspace);
	}

	App.tabClick(App.selected);
	for(var i = 0; i < App.TABS_.length; i++) {
		var name = App.TABS_[i];
		App.bindClick('tab_' + name,
			function(name_) { return function() { App.tabClick(name_); }; }(name));
	}
	
	// Render code while programming blockly.So when workspace changed, render content again.
	App.workspace.addChangeListener(App.renderContent);
	
	// onresize();
	Blockly.svgResize(App.workspace);
	
	// Switch to zero-based indexing so that later JS levels match the blocks.
    Blockly.Blocks && (Blockly.Blocks.ONE_BASED_INDEXING = false);
    Blockly.JavaScript && (Blockly.JavaScript.ONE_BASED_INDEXING = false);

	// Lazy-load the syntax-highlighting.
	window.setTimeout(App.importPrettify, 1);
};

/**
 * Initialize the page language.
 */
App.initLanguage = function() {
	// Set the HTML's language.
	document.head.parentElement.setAttribute('lang', App.LANG);

	// Sort languages alphabetically.
	var languages = [];
	for(var lang in App.LANGUAGE_NAME) {
		languages.push([App.LANGUAGE_NAME[lang], lang]);
	}

	// Populate the language selection menu.
	var languageMenu = document.getElementById('languageMenu');
	languageMenu.options.length = 0;
	for(var i = 0; i < languages.length; i++) {
		var tuple = languages[i];
		var lang = tuple[tuple.length - 1];
		var option = new Option(tuple[0], lang);
		if(lang == App.LANG) {
			option.selected = true;
		}
		languageMenu.options.add(option);
	}
	languageMenu.addEventListener('change', App.changeLanguage, true);

	// Inject language strings.
	document.getElementById('playBtn').textContent = MSG['play'];
	document.getElementById('resetBtn').textContent = MSG['reset'];
};

///**
// * Discard all blocks from the workspace.
// */
//App.discard = function() {
//var count = App.workspace.getAllBlocks().length;
//if (count < 2 ||
//    window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
//  App.workspace.clear();
//  if (window.location.hash) {
//    window.location.hash = '';
//  }
//}
//};

// Load the language strings.
document.write('<script src="msg/' + App.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="blockly/msg/js/' + App.LANG + '.js"></script>\n');

window.addEventListener('load', App.init);