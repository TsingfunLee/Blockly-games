'use strict';

goog.provide('Blockly.Blocks.action');

goog.require('Blockly.Blocks');

Blockly.Blocks.action.HUE = 230;

Blockly.Blocks['action_forward'] = {
	/**
	 * Block for moving forward.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ACTION_MOVE_FORWARD,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.ACTION_MOVE_FORWARD_TOOLTIP
		});
	}
};

Blockly.Blocks['action_turnright'] = {
	/**
	 * Block for turning right.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ACTION_TURN_RIGHT,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.ACTION_TURN_RIGHT_TOOLTIP
		});
	}
}
