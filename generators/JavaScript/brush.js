'use strict';

/**
 * @fileoverview Generating JavaScript for brush blocks.
 */

goog.provide('Blockly.JavaScript.action');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['brush_moveforward'] = function() {
	return 'moveforward();' + '\n';
};
