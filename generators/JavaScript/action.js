'use strict';

/**
 * @fileoverview Generating JavaScript for action blocks.
 */

goog.provide('Blockly.JavaScript.action');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['action_forward'] = function(block) {
	return 'moveforward(\'block_id_' + block.id +'\');\n';
};

Blockly.JavaScript['action_turnright'] = function(block) {
	return 'turnright(\'block_id_' + block.id +'\');\n';
};

Blockly.JavaScript['action_turnleft'] = function(block) {
	return 'turnleft(\'block_id_' + block.id +'\');\n';
};

Blockly.JavaScript['action_collect'] = function(block) {
	return 'collect(\'block_id_' + block.id +'\');\n';
};

Blockly.JavaScript['action_if'] = function(block) {
  // Generate JavaScript for 'if' conditional if there is a path.
  var argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = 'if (' + argument + ') {\n' + branch + '}\n';
  return code;
};

Blockly.JavaScript['action_ifElse'] = function(block) {
  // Generate JavaScript for 'if/else' conditional if there is a path.
  var argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')';
  var branch0 = Blockly.JavaScript.statementToCode(block, 'DO');
  var branch1 = Blockly.JavaScript.statementToCode(block, 'ELSE');
  var code = 'if (' + argument + ') {\n' + branch0 +
             '} else {\n' + branch1 + '}\n';
  return code;
};
