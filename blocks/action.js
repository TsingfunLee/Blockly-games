'use strict';

goog.provide('Blockly.Blocks.action');

goog.require('Blockly.Blocks');

// Blockly.Blocks.action.HUE = 230;

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
};

Blockly.Blocks['action_turnleft'] = {
	/**
	 * Block for turning left.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ACTION_TURN_LEFT,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.ACTION_TURN_LEFT_TOOLTIP
		});
	}
};

Blockly.Blocks['action_collect'] = {
	/**
	 * Block for collecting stuff.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.ACTION_COLLECT,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.ACTION_COLLECT_TOOLTIP
		});
	}
}
