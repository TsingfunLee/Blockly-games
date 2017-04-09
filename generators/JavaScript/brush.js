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

Blockly.JavaScript['brush_move_south'] = function(block) {
	return 'movesouth(\'' + block.id + '\');\n';
};

Blockly.JavaScript['brush_move_west'] = function(block) {
	return 'movewest(\'' + block.id + '\');\n';
};

Blockly.JavaScript['brush_moveforward'] = function(block) {
	return 'moveforward(\'' + block.id + '\');\n';
};

Blockly.JavaScript['brush_turnright'] = function(block) {
	var angle = block.getFieldValue('ANGLE');
	return 'turnright(' + angle + ', \'' + block.id + '\');\n';
};

Blockly.JavaScript['brush_set_color'] = function(block) {
	var color = '\'' + block.getFieldValue('COLOUR') + '\'';
	return 'setcolor(' + color + ', \'' + block.id + '\');\n';
};
