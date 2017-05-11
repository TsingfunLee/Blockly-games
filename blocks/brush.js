'use strict';

goog.provide('Blockly.Blocks.brush');

goog.require('Blockly');
goog.require('Blockly.Blocks');

Blockly.Blocks.brush.HUE = 208;

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
			"colour": Blockly.Blocks.brush.HUE,
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
			"colour": Blockly.Blocks.brush.HUE,
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
			"colour": Blockly.Blocks.brush.HUE,
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
			"colour": Blockly.Blocks.brush.HUE,
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
			"message0": Blockly.Msg.BRUSH_MOVE_FORWARD,
			"previousStatement": null,
			"nextStatement": null,
			"colour": Blockly.Blocks.brush.HUE,
			"tooltip": Blockly.Msg.BRUSH_MOVE_FORWARD_TOOLTIP
		});
	}
};

Blockly.Blocks['brush_moveback'] = {
	/**
	 * Block for moving back brush.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_MOVE_BACK,
			"previousStatement": null,
			"nextStatement": null,
			"colour": Blockly.Blocks.brush.HUE,
			"tooltip": Blockly.Msg.BRUSH_MOVE_BACK_TOOLTIP
		});
	}
};

Blockly.Blocks['brush_turnright'] = {
	/**
	 * Block for turning right brush.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_TURN_RIGHT + "%1",
			"args0": [{
				"type": "field_dropdown",
				"name": "ANGLE",
				"options": [
					["15°", "15"],
					["18°", "18"],
					["30°", "30"],
					["45°", "45"],
					["60°", "60"],
					["90°", "90"],
					["72°", "72"],
					["120°", "120"],
					["144°", "144"]
				]
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": Blockly.Blocks.brush.HUE,
			"tooltip": Blockly.Msg.BRUSH_TURN_RIGHT_TOOLTIP
		});
	}
};

Blockly.Blocks['brush_turnleft'] = {
	/**
	 * Block for turning left brush.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_TURN_LEFT + "%1",
			"args0": [{
				"type": "field_dropdown",
				"name": "ANGLE",
				"options": [
					["15°", "15"],
					["18°", "18"],
					["30°", "30"],
					["45°", "45"],
					["60°", "60"],
					["90°", "90"],
					["72°", "72"],
					["120°", "120"],
					["144°", "144"]
				]
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": Blockly.Blocks.brush.HUE,
			"tooltip": Blockly.Msg.BRUSH_TURN_LEFT_TOOLTIP
		});
	}
};

Blockly.Blocks['brush_set_color'] = {
	/**
	 * Block for setting color brush.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_SET_COLOR + "%1",
			"args0": [{
				"type": "field_colour",
				"name": "COLOUR",
				"colour": "#ffff33"
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": Blockly.Blocks.brush.HUE,
			"tooltip": Blockly.Msg.BRUSH_SET_COLOR_TOOLTIP
		});
	}
};

Blockly.Blocks['brush_pen_up'] = {
	/**
	 * Block for lifting up brush block.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_PEN_UP,
			"previousStatement": null,
			"nextStatement": null,
			"colour": Blockly.Blocks.brush.HUE,
			"tooltip": Blockly.Msg.BRUSH_PEN_UP_TOOLTIP
		});
	}
};

Blockly.Blocks['brush_pen_down'] = {
	/**
	 * Block for putting down brush block.
	 * @this Blockly.Block
	 */
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.BRUSH_PEN_DOWN,
			"previousStatement": null,
			"nextStatement": null,
			"colour": Blockly.Blocks.brush.HUE,
			"tooltip": Blockly.Msg.BRUSH_PEN_DOWN_TOOLTIP
		});
	}
};
