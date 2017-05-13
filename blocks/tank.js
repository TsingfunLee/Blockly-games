/**
 * 
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.
Blockly.Blocks['tank_moveForward'] = {
  init: function() {
    this.setColour(208);
    this.appendDummyInput()
        .appendField('向前移动');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('向前移动');
  }
};

Blockly.JavaScript['tank_moveForward'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'moveForward(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['tank_turn'] = {
  /**
   * Block for turning left or right.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [['向左转', 'turnLeft'],
         ['向右转','turnRight']];
    // Append arrows to direction messages.
    DIRECTIONS[0][0] += ' \u21BA';
    DIRECTIONS[1][0] += ' \u21BB';
    this.setColour(208);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('改变坦克方向');
  }
};

Blockly.JavaScript['tank_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var dir = block.getFieldValue('DIR');
  return dir + '(\'block_id_' + block.id + '\');\n';
};

//任意角度转向	
Blockly.Blocks['tank_turn2'] = {

  init: function() {
    this.setColour(208);
    this.appendDummyInput()
        .appendField('转向')
        .appendField(new Blockly.FieldAngle('90'), 'ANGLE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Bird_headingTooltip');
  }
};

Blockly.JavaScript['tank_turn2'] = function(block) {
  // Generate JavaScript for moving bird in a direction.
  var dir = parseFloat(block.getFieldValue('ANGLE'));
  return 'turn2(' + dir + ', \'block_id_' + block.id + '\');\n';
};

//向指定方向前进
Blockly.Blocks['tank_move'] = {
  init: function() {
    this.setColour(208);
    this.appendDummyInput()
        .appendField('向')
        .appendField(new Blockly.FieldAngle('90'), 'ANGLE')
        .appendField('移动');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Bird_headingTooltip');
  }
};

Blockly.JavaScript['tank_move'] = function(block) {
  // Generate JavaScript for moving bird in a direction.
  var dir = parseFloat(block.getFieldValue('ANGLE'));
  return 'move(' + dir + ', \'block_id_' + block.id + '\');\n';
};

//fire
Blockly.Blocks['tank_fire'] = {
  init: function() {
    this.setColour(208);
    this.appendDummyInput()
        .appendField('开炮');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('坦克开炮');
  }
};

Blockly.JavaScript['tank_fire'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'fire(\'block_id_' + block.id + '\');\n';
};

//stop
Blockly.Blocks['tank_stop'] = {
  init: function() {
    this.setColour(208);
    this.appendDummyInput()
        .appendField('停止');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('坦克停止前进');
  }
};

Blockly.JavaScript['tank_stop'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'stop(\'block_id_' + block.id + '\');\n';
};