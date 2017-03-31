'use strict';

/**
 * @fileoverview Generating JavaScript for brush blocks.
 */

goog.provide('Blockly.JavaScript.brush');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['brush_move_north'] = function(block) {
	return 'movenorth(\'' + block.id + '\');\n';
};

Blockly.JavaScript['brush_move_east'] = function(block) {
	return 'moveeast(\'' + block.id + '\');\n';
};

Blockly.JavaScript['brush_moveforward'] = function(block) {
	return 'moveforward(\'' + block.id + '\');\n';
};
