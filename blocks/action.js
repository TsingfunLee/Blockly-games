'use strict';

goog.provide('Blockly.Blocks.action');

goog.require('Blockly');
goog.require('Blockly.Blocks');

Blockly.Blocks.action.HUE = 208;

/**
 * Left turn arrow to be appended to messages.
 */
Blockly.Blocks.LEFT_TURN = ' \u21BA';

/**
 * Left turn arrow to be appended to messages.
 */
Blockly.Blocks.RIGHT_TURN = ' \u21BB';

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
			"colour": Blockly.Blocks.action.HUE,
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
			"colour": Blockly.Blocks.action.HUE,
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
			"colour": Blockly.Blocks.action.HUE,
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
			"colour": Blockly.Blocks.action.HUE,
			"tooltip": Blockly.Msg.ACTION_COLLECT_TOOLTIP
		});
	}
};

Blockly.Blocks['action_if'] = {
  /**
   * Block for 'if' conditional if there is a path.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [[Blockly.Msg.ACTION_IF_FORWARD, 'isPathForward'],
         [Blockly.Msg.ACTION_IF_LEFT, 'isPathLeft'],
         [Blockly.Msg.ACTION_IF_RIGHT, 'isPathRight']];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += Blockly.Blocks.LEFT_TURN;
    DIRECTIONS[2][0] += Blockly.Blocks.RIGHT_TURN;
    this.setColour(Blockly.Blocks.action.HUE);
    this.appendDummyInput()
				.appendField(Blockly.Msg.ACTION_IF)
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.ACTION_DO);
    this.setTooltip('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['action_ifElse'] = {
	/**
   * Block for 'if/else' conditional if there is a path.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
		[[Blockly.Msg.ACTION_IF_FORWARD, 'isPathForward'],
		 [Blockly.Msg.ACTION_IF_LEFT, 'isPathLeft'],
		 [Blockly.Msg.ACTION_IF_RIGHT, 'isPathRight']];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += Blockly.Blocks.LEFT_TURN;
    DIRECTIONS[2][0] += Blockly.Blocks.RIGHT_TURN;
    this.setColour(Blockly.Blocks.action.HUE);
    this.appendDummyInput()
				.appendField(Blockly.Msg.ACTION_IF)
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.ACTION_DO);
    this.appendStatementInput('ELSE')
        .appendField(Blockly.Msg.ACTION_ELSE);
    this.setTooltip('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	}
};
