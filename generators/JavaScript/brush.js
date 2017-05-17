'use strict';

/**
 * @fileoverview Generating JavaScript for brush blocks.
 */

goog.provide('Blockly.JavaScript.brush');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['brush_move_north'] = function(block) {
	return 'movenorth(\'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_move_east'] = function(block) {
	return 'moveeast(\'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_move_south'] = function(block) {
	return 'movesouth(\'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_move_west'] = function(block) {
	return 'movewest(\'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_moveforward'] = function(block) {
	return 'moveforward(\'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_moveback'] = function(block) {
	return 'moveback(\'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_turnright'] = function(block) {
	var angle = block.getFieldValue('ANGLE');
	return 'turnright(' + angle + ', \'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_turnleft'] = function(block) {
	var angle = block.getFieldValue('ANGLE');
	return 'turnleft(' + angle + ', \'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_set_color'] = function(block) {
	var color = '\'' + block.getFieldValue('COLOUR') + '\'';
	return 'setcolor(' + color + ', \'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_pen_up'] = function(block) {
  return 'penUp(\'block_id_' + block.id + '\');\n';
};

Blockly.JavaScript['brush_pen_down'] = function(block) {
  return 'penDown(\'block_id_' + block.id + '\');\n';
};
