'use strict';

goog.provide('Blockly.Blocks.action');

goog.require('Blockly.Blocks');

Blockly.Blocks['brush_moveforward'] = {
	/**
	 * Block for moving forward brush.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_MOVE_FORWARD,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.BRUSH_MOVE_FORWARD_TOOLTIP			
		});
	}
};
