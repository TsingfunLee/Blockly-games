'use strict';

goog.provide('Blockly.Blocks.brush');

goog.require('Blockly');
goog.require('Blockly.Blocks');

Blockly.Blocks['brush_moveforward'] = {
	/**
	 * Block for moving forward brush.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_MOVE_FORWARD + "%1",
			"args0": [{
				"type": "field_dropdown",
				"name": "",
				"options": [
					["50", "50"],
					["100", "100"],
					["150", "150"]
				]
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.BRUSH_MOVE_FORWARD_TOOLTIP
		});
	}
};