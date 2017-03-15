'use strict';

/**
 * @fileoverview Generating JavaScript for action blocks.
 */

goog.provide('Blockly.JavaScript.action');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['action_forward'] = function(block) {
	return 'moveforward();' + '\n';
}

Blockly.JavaScript['action_turnright'] = function(block) {
	return 'turnright();' + '\n';
}
