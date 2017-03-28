'use strict';

goog.provide('Blockly.Blocks.brush');

goog.require('Blockly');
goog.require('Blockly.Blocks');

Blockly.Blocks['brush_move_north'] = {
	/**
	 * Block for moving north.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_MOVE_NORTH,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.BRUSH_MOVE_NORTH_TOOLTIP
		});
	}
};

Blockly.Blocks['brush_move_east'] = {
	/**
	 * Block for moving east.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_MOVE_EAST,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.BRUSH_MOVE_EAST_TOOLTIP
		});
	}
};

Blockly.Blocks['brush_move_south'] = {
	/**
	 * Block for moving south.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_MOVE_SOUTH,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.BRUSH_MOVE_SOUTH_TOOLTIP
		});
	}
};

Blockly.Blocks['brush_move_west'] = {
	/**
	 * Block for moving west.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_MOVE_WEST,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 160,
			"tooltip": Blockly.Msg.BRUSH_MOVE_WEST_TOOLTIP
		});
	}
};

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