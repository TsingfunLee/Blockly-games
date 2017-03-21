/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Methods for graphically rendering a block as SVG.
 * @author fenichel@google.com (Rachel Fenichel)
 */

'use strict';

goog.provide('Blockly.BlockSvg.render');

goog.require('Blockly.BlockSvg');


// 渲染块的UI常量
/**
 * Horizontal space between elements.
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_X = 10;//空白处宽度
/**
 * Vertical space between elements.元素之间的垂直空间。
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_Y = 16;//空白处长度
/**
 * Vertical padding around inline elements.在内联元素周围的padding垂直填充。
 * @const
 */
Blockly.BlockSvg.INLINE_PADDING_Y = 6;
/**
 * Minimum height of a block.块的最小高度。
 * @const
 */
Blockly.BlockSvg.MIN_BLOCK_Y =25;
/**
 * Height of horizontal puzzle tab.水平拼图标签的高度。
 * @const
 */
Blockly.BlockSvg.TAB_HEIGHT = 20;
/**
 * Width of horizontal puzzle tab.水平拼图标签的宽度。
 * @const
 */
Blockly.BlockSvg.TAB_WIDTH = 8;
/**
 * Width of vertical tab (inc left margin). 垂直标签的宽度（包括左边距）。
 * @const
 */
Blockly.BlockSvg.NOTCH_WIDTH = 30;//未出现明显效果
/**
 * Rounded corner radius. 圆角半径。
 * @const
 */
Blockly.BlockSvg.CORNER_RADIUS = 4;//圆角半径


/**高亮
 * Distance from shape edge to intersect with a curved corner at 45 degrees.与形状边缘的距离与以45度弯曲的角相交。
 * Applies to highlighting on around the inside of a curve.适用于在曲线内部的突出显示。
 * @const
 */
Blockly.BlockSvg.DISTANCE_45_INSIDE = (1 - Math.SQRT1_2) *
    (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + 0.5;
/**高亮
 * Distance from shape edge to intersect with a curved corner at 45 degrees.  与形状边缘的距离与以45度弯曲的角相交。
 * Applies to highlighting on around the outside of a curve.     适用于在曲线外侧突出显示。
 * @const
 */
Blockly.BlockSvg.DISTANCE_45_OUTSIDE = (1 - Math.SQRT1_2) *
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5) - 0.5;

/**
 * SVG path for drawing next/previous notch from left to right.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_LEFT = 'a 8 8 180 0 0 16 0';  //凹陷圆弧
/**
 * SVG path for drawing next/previous notch from left to right with  highlighting.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT = 'a 8 8 180 0 0 16 0';  //凹陷圆弧高亮
/**
 * SVG path for drawing next/previous notch from right to left. 
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_RIGHT = 'a 8 8 180 0 1 -16 0';//凸起圆弧


//不清楚具体控制哪些参数
/**
 * SVG path for drawing jagged teeth at the end of collapsed blocks. 
 * @const
 */
Blockly.BlockSvg.JAGGED_TEETH = 'a 8 8 180 0 1 -16 0';

/**
 * Height of SVG path for jagged teeth at the end of collapsed blocks.
 * @const
 */
Blockly.BlockSvg.JAGGED_TEETH_HEIGHT = 20;
/**
 * Width of SVG path for jagged teeth at the end of collapsed blocks.
 * @const
 */
Blockly.BlockSvg.JAGGED_TEETH_WIDTH = 15;



/**
 * SVG path for drawing a horizontal puzzle tab from top to bottom.
 * 用于从顶部到底部绘制水平拼图选项卡的SVG路径。
 * @const
 */

//内标签的拼接
Blockly.BlockSvg.TAB_PATH_DOWN = 'v 5 c 0,10 -' + Blockly.BlockSvg.TAB_WIDTH +
',-8 -' + Blockly.BlockSvg.TAB_WIDTH + ',7.5 s ' +
Blockly.BlockSvg.TAB_WIDTH + ',-2.5 ' + Blockly.BlockSvg.TAB_WIDTH + ',7.5';

/**
 * SVG path for drawing a horizontal puzzle tab from top to bottom with highlighting from the upper-right.
 * SVG路径，用于从顶部到底部绘制水平拼图选项卡，并从右上方突出显示。
 * @const
 */
Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL = 'v 6.5 m -' +
  (Blockly.BlockSvg.TAB_WIDTH * 0.97) + ',3 q -' +
  (Blockly.BlockSvg.TAB_WIDTH * 0.05) + ',10 ' +
  (Blockly.BlockSvg.TAB_WIDTH * 0.3) + ',9.5 m ' +
  (Blockly.BlockSvg.TAB_WIDTH * 0.67) + ',-1.9 v 1.4';

/**
 * SVG start point for drawing the top-left corner. 
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START =
    'm 0,' + Blockly.BlockSvg.CORNER_RADIUS;  //左上倒角，倒角半径为4

//循环积木块上方高亮路径
/**
 * SVG start point for drawing the top-left corner's highlight in RTL.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL =
    'm ' + Blockly.BlockSvg.DISTANCE_45_INSIDE + ',' +
    Blockly.BlockSvg.DISTANCE_45_INSIDE;
/**
 * SVG start point for drawing the top-left corner's highlight in LTR.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR =
    'm 0.5,' + (Blockly.BlockSvg.CORNER_RADIUS - 0.5);

/**
 * SVG path for drawing the rounded top-left corner.
 * 左上角倒角
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER =
    'A ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
    Blockly.BlockSvg.CORNER_RADIUS + ',0';
/**
 * SVG path for drawing the highlight on the rounded top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT =
    'A ' + (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ' 0 0,1 ' +
    Blockly.BlockSvg.CORNER_RADIUS + ',0.5';
    
    
    
/**
 * SVG path for drawing the top-left corner of a statement input.
 * 语句输入的左上角。
 * Includes the top notch, a horizontal space, and the rounded inside corner.
 * 
 * @const
 */
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER =
    Blockly.BlockSvg.NOTCH_PATH_RIGHT + ' h -' +
    (Blockly.BlockSvg.NOTCH_WIDTH - 15 - Blockly.BlockSvg.CORNER_RADIUS) +
    ' a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
   Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 -' +
    Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG path for drawing the bottom-left corner of a statement input.
 * Includes the rounded inside corner.
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER =
    'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
    Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' h ' +
    (Blockly.BlockSvg.NOTCH_WIDTH - 15 - Blockly.BlockSvg.CORNER_RADIUS) +
    ' a '+(Blockly.BlockSvg.CORNER_RADIUS*2) + ',' +
   (Blockly.BlockSvg.CORNER_RADIUS*2) + ' 180 0,0 ' +
    (Blockly.BlockSvg.CORNER_RADIUS*4) + ',0';
/**
 * SVG path for drawing highlight on the top-left corner of a statement SVG路径，用于在语句的左上角绘制突出显示
 * input in RTL.从右到左输入
 * @const
 */
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL =
    'a ' + Blockly.BlockSvg.CORNER_RADIUS+ ',' +
    Blockly.BlockSvg.CORNER_RADIUS+ ' 0 0,0 ' +
    (-Blockly.BlockSvg.DISTANCE_45_OUTSIDE - 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS -
    Blockly.BlockSvg.DISTANCE_45_OUTSIDE);
    
    
/**
 * SVG path for drawing highlight on the bottom-left corner of a statement  SVG路径，用于在语句的左下角绘制突出显示
 * input in RTL.从右到左输入
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL =
    'a ' + (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ' 0 0,0 ' +
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5);
/**
 * SVG path for drawing highlight on the bottom-left corner of a statement   SVG路径，用于在语句的左下角绘制突出显示
 * input in LTR.输入从左到右
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR =
    'a ' + (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ' 0 0,0 ' +
    (Blockly.BlockSvg.CORNER_RADIUS -
    Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + ',' +
    (Blockly.BlockSvg.DISTANCE_45_OUTSIDE + 0.5)+ ' h ' +
    (Blockly.BlockSvg.NOTCH_WIDTH - 16 - Blockly.BlockSvg.CORNER_RADIUS) +
    ' a '+(Blockly.BlockSvg.CORNER_RADIUS*2) + ',' +
   (Blockly.BlockSvg.CORNER_RADIUS*2) + ' 180 0,0 ' +
    (Blockly.BlockSvg.CORNER_RADIUS*4+0.5) + ',0';

/**
 * Render the block. 渲染块。
 * Lays out and reflows a block based on its contents and settings. 根据其内容和设置退出并返回块。
 * @param {boolean=} opt_bubble If false, just render this block. 如果为false，只需渲染此块。
 *   If true, also render block's parent, grandparent, etc.  Defaults to true. 如果为true，还会渲染块的父级，祖父级等等。默认为true。
 */
Blockly.BlockSvg.prototype.render = function(opt_bubble) {
  Blockly.Field.startCache();
  this.rendered = true;

  var cursorX = Blockly.BlockSvg.SEP_SPACE_X;
  if (this.RTL) {
    cursorX = -cursorX;
  }
  // Move the icons into position.将图标移动到位置。
  var icons = this.getIcons();
  for (var i = 0; i < icons.length; i++) {
    cursorX = icons[i].renderIcon(cursorX);
  }
  cursorX += this.RTL ?
      Blockly.BlockSvg.SEP_SPACE_X : -Blockly.BlockSvg.SEP_SPACE_X;
  // If there are no icons, cursorX will be 0, otherwise it will be the  如果没有图标，cursorX将为0，否则将为
  // width that the first label needs to move over by.  第一个标签需要移动的宽度。

  var inputRows = this.renderCompute_(cursorX);
  this.renderDraw_(cursorX, inputRows);
  this.renderMoveConnections_();

  if (opt_bubble !== false) {
    // Render all blocks above this one (propagate a reflow).渲染在这一个上面的所有块（传递回流）。
    var parentBlock = this.getParent();
    if (parentBlock) {
      parentBlock.render(true);
    } else {
      // Top-most block.  Fire an event to allow scrollbars to resize.最顶部块。 触发事件以允许滚动条调整大小。
      this.workspace.resizeContents();
    }
  }
  Blockly.Field.stopCache();
};

/**
 * Render a list of fields starting at the specified location.呈现从指定位置开始的字段列表。
 * @param {!Array.<!Blockly.Field>} fieldList List of fields. fieldList字段列表。
 * @param {number} cursorX X-coordinate to start the fields. cursorX X坐标开始字段。
 * @param {number} cursorY Y-coordinate to start the fields. cursorY Y坐标开始字段。
 * @return {number} X-coordinate of the end of the field row (plus a gap). 字段行结束的X坐标（加上一个间隙）。
 * @private
 */
Blockly.BlockSvg.prototype.renderFields_ =
    function(fieldList, cursorX, cursorY) {
  /* eslint-disable indent   eslint禁用缩进*/
  cursorY += Blockly.BlockSvg.INLINE_PADDING_Y;
  if (this.RTL) {
    cursorX = -cursorX;
  }
  for (var t = 0, field; field = fieldList[t]; t++) {
    var root = field.getSvgRoot();
    if (!root) {
      continue;
    }
    if (this.RTL) {
      cursorX -= field.renderSep + field.renderWidth;
      root.setAttribute('transform',
          'translate(' + cursorX + ',' + cursorY + ')');
      if (field.renderWidth) {
        cursorX -= Blockly.BlockSvg.SEP_SPACE_X;
      }
    } else {
      root.setAttribute('transform',
          'translate(' + (cursorX + field.renderSep) + ',' + cursorY + ')');
      if (field.renderWidth) {
        cursorX += field.renderSep + field.renderWidth +
            Blockly.BlockSvg.SEP_SPACE_X;
      }
    }
  }
  return this.RTL ? -cursorX : cursorX;
};  /* eslint-enable indent eslint禁用缩进*/

/**
 * Computes the height and widths for each row and field. 计算每个行和字段的高度和宽度。
 * @param {number} iconWidth Offset of first row due to icons.  由于图标，第一行的偏移量。
 * @return {!Array.<!Array.<!Object>>} 2D array of objects, each containing 二维对象数组，每个包含
 *    position information. 位置信息
 * @private 
 */
Blockly.BlockSvg.prototype.renderCompute_ = function(iconWidth) {
  var inputList = this.inputList;
  var inputRows = [];
  inputRows.rightEdge = iconWidth + Blockly.BlockSvg.SEP_SPACE_X * 2;
  if (this.previousConnection || this.nextConnection) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge,
        Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X);
  }
  var fieldValueWidth = 0;  // Width of longest external value field. 最长外部值字段的宽度。
  var fieldStatementWidth = 0;  // Width of longest statement field.  最长语句字段的宽度。
  var hasValue = false;
  var hasStatement = false;
  var hasDummy = false;
  var lastType = undefined;
  var isInline = this.getInputsInline() && !this.isCollapsed();
  for (var i = 0, input; input = inputList[i]; i++) {
    if (!input.isVisible()) {
      continue;
    }
    var row;
    if (!isInline || !lastType ||
        lastType == Blockly.NEXT_STATEMENT ||
        input.type == Blockly.NEXT_STATEMENT) {
      // Create new row.创建新行。
      lastType = input.type;
      row = [];
      if (isInline && input.type != Blockly.NEXT_STATEMENT) {
        row.type = Blockly.BlockSvg.INLINE;
      } else {
        row.type = input.type;
      }
      row.height = 0;
      inputRows.push(row);
    } else {
      row = inputRows[inputRows.length - 1];
    }
    row.push(input);

    // Compute minimum input size. 计算最小输入。
    input.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
    // The width is currently only needed for inline value inputs.
    //当前仅对内联值输入需要宽度。
    if (isInline && input.type == Blockly.INPUT_VALUE) {
      input.renderWidth = Blockly.BlockSvg.TAB_WIDTH +
          Blockly.BlockSvg.SEP_SPACE_X * 1.25;
    } else {
      input.renderWidth = 0;
    }
    // Expand input size if there is a connection.
    //如果有连接，请扩展输入大小..
    if (input.connection && input.connection.isConnected()) {
      var linkedBlock = input.connection.targetBlock();
      var bBox = linkedBlock.getHeightWidth();
      input.renderHeight = Math.max(input.renderHeight, bBox.height);
      input.renderWidth = Math.max(input.renderWidth, bBox.width);
    }
    // Blocks have a one pixel shadow that should sometimes overhang.
    //块有一个像素阴影，应该有时悬突。
    if (!isInline && i == inputList.length - 1) {
      // Last value input should overhang.最后一个值输入应悬停。
      input.renderHeight--;
    } else if (!isInline && input.type == Blockly.INPUT_VALUE &&
        inputList[i + 1] && inputList[i + 1].type == Blockly.NEXT_STATEMENT) {
      // Value input above statement input should overhang.值输入上面的语句输入应该突出。
      input.renderHeight--;
    }

    row.height = Math.max(row.height, input.renderHeight);
    input.fieldWidth = 0;
    if (inputRows.length == 1) {
      // The first row gets shifted to accommodate any icons.
      //第一行被移动以适应任何图标。
      input.fieldWidth += this.RTL ? -iconWidth : iconWidth;
    }
    var previousFieldEditable = false;
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (j != 0) {
        input.fieldWidth += Blockly.BlockSvg.SEP_SPACE_X;
      }
      // Get the dimensions of the field.获取字段的尺寸。
      var fieldSize = field.getSize();
      field.renderWidth = fieldSize.width;
      field.renderSep = (previousFieldEditable && field.EDITABLE) ?
          Blockly.BlockSvg.SEP_SPACE_X : 0;
      input.fieldWidth += field.renderWidth + field.renderSep;
      row.height = Math.max(row.height, fieldSize.height);
      previousFieldEditable = field.EDITABLE;
    }

    if (row.type != Blockly.BlockSvg.INLINE) {
      if (row.type == Blockly.NEXT_STATEMENT) {
        hasStatement = true;
        fieldStatementWidth = Math.max(fieldStatementWidth, input.fieldWidth);
      } else {
        if (row.type == Blockly.INPUT_VALUE) {
          hasValue = true;
        } else if (row.type == Blockly.DUMMY_INPUT) {
          hasDummy = true;
        }
        fieldValueWidth = Math.max(fieldValueWidth, input.fieldWidth);
      }
    }
  }

  // Make inline rows a bit thicker in order to enclose the values.
  //使内联行更厚一些，以包含值。
  for (var y = 0, row; row = inputRows[y]; y++) {
    row.thicker = false;
    if (row.type == Blockly.BlockSvg.INLINE) {
      for (var z = 0, input; input = row[z]; z++) {
        if (input.type == Blockly.INPUT_VALUE) {
          row.height += 2 * Blockly.BlockSvg.INLINE_PADDING_Y;
          row.thicker = true;
          break;
        }
      }
    }
  }

  // Compute the statement edge.计算语句边缘。
  // This is the width of a block where statements are nested.
  //这是嵌套语句的块的宽度。
  inputRows.statementEdge = 2 * Blockly.BlockSvg.SEP_SPACE_X +
      fieldStatementWidth;
  // Compute the preferred right edge.  Inline blocks may extend beyond.
  //计算首选右边缘。 内联块可以延伸超出。
  // This is the width of the block where external inputs connect.
  //这是外部输入连接的块的宽度。
  if (hasStatement) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge,
        inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH);
  }
  if (hasValue) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth +
        Blockly.BlockSvg.SEP_SPACE_X * 2 + Blockly.BlockSvg.TAB_WIDTH);
  } else if (hasDummy) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth +
        Blockly.BlockSvg.SEP_SPACE_X * 2);
  }

  inputRows.hasValue = hasValue;
  inputRows.hasStatement = hasStatement;
  inputRows.hasDummy = hasDummy;
  return inputRows;
};


/**
 * Draw the path of the block.绘制块的路径。
 * Move the fields to the correct locations.将字段移动到正确的位置。
 * @param {number} iconWidth Offset of first row due to icons.由于图标，第一行的偏移量。
 * @param {!Array.<!Array.<!Object>>} inputRows 2D array of objects, each对象的二维数组，每个
 *     containing position information.包含位置信息
 * @private
 */
Blockly.BlockSvg.prototype.renderDraw_ = function(iconWidth, inputRows) {
  this.startHat_ = false;
  // Reset the height to zero and let the rendering process add in   
  // portions of the block height as it goes. (e.g. hats, inputs, etc.)
  //将高度重置为零，让渲染过程加入块高度的部分。 （例如帽子，输入等）
  this.height = 0;
  // Should the top and bottom left corners be rounded or square?
  //顶部和左下角是圆形还是正方形？
//if (this.outputConnection) {
//  this.squareTopLeftCorner_ = true;
//  this.squareBottomLeftCorner_ = true;
//} else {
//  this.squareTopLeftCorner_ = false;
//  this.squareBottomLeftCorner_ = false;
//  // If this block is in the middle of a stack, square the corners.
//  //如果此块在堆栈的中间，则将角落平方。
//  if (this.previousConnection) {
//    var prevBlock = this.previousConnection.targetBlock();
//    if (prevBlock && prevBlock.getNextBlock() == this) {
//      this.squareTopLeftCorner_ = true;
//    }
//  } else if (Blockly.BlockSvg.START_HAT) {
//    // No output or previous connection.无输出或先前连接。
//    this.squareTopLeftCorner_ = true;
//    this.startHat_ = true;
//    this.height += Blockly.BlockSvg.START_HAT_HEIGHT;
//    inputRows.rightEdge = Math.max(inputRows.rightEdge, 100);
//  }
//  var nextBlock = this.getNextBlock();
//  if (nextBlock) {
//    this.squareBottomLeftCorner_ = true;
//  }
//}

  // Assemble the block's path. 组合块的路径。
  var steps = [];
  var inlineSteps = [];
  // The highlighting applies to edges facing the upper-left corner.
  // Since highlighting is a two-pixel wide border, it would normally overhang
  // the edge of the block by a pixel. So undersize all measurements by a pixel.
  //突出显示适用于面向左上角的边缘。
  //因为突出显示是一个两像素宽的边框，它通常会悬空
  //块的边缘由像素。 因此，通过像素来缩小所有测量。
  var highlightSteps = [];
  var highlightInlineSteps = [];

  this.renderDrawTop_(steps, highlightSteps, inputRows.rightEdge);
  var cursorY = this.renderDrawRight_(steps, highlightSteps, inlineSteps,
      highlightInlineSteps, inputRows, iconWidth);
  this.renderDrawBottom_(steps, highlightSteps, cursorY);
  this.renderDrawLeft_(steps, highlightSteps);

  var pathString = steps.join(' ') + '\n' + inlineSteps.join(' ');
  this.svgPath_.setAttribute('d', pathString);
  //this.svgPathDark_.setAttribute('d', pathString);
  pathString = highlightSteps.join(' ') + '\n' + highlightInlineSteps.join(' ');
  this.svgPathLight_.setAttribute('d', pathString);
  
  if (this.RTL) {
    // Mirror the block's path.镜像块的路径。
    this.svgPath_.setAttribute('transform', 'scale(-1 1)');
    //this.svgPathLight_.setAttribute('transform', 'scale(-1 1)');
    //this.svgPathDark_.setAttribute('transform', 'translate(1,1) scale(-1 1)');
  }
};

/**
 * Update all of the connections on this block with the new locations calculated   
 * in renderCompute.  Also move all of the connected blocks based on the new
 * connection locations.
 * 使用计算的新位置更新此块上的所有连接 还根据新的移动所有连接的块连接位置。
 * @private
 */
Blockly.BlockSvg.prototype.renderMoveConnections_ = function() {
  var blockTL = this.getRelativeToSurfaceXY();
  // Don't tighten previous or output connections because they are inferior
  // connections.
  //不要拧紧先前或输出连接，因为它们较差连接。
  if (this.previousConnection) {
    this.previousConnection.moveToOffset(blockTL);
  }
  if (this.outputConnection) {
    this.outputConnection.moveToOffset(blockTL);
  }

  for (var i = 0; i < this.inputList.length; i++) {
    var conn = this.inputList[i].connection;
    if (conn) {
      conn.moveToOffset(blockTL);
      if (conn.isConnected()) {
        conn.tighten_();
      }
    }
  }

  if (this.nextConnection) {
    this.nextConnection.moveToOffset(blockTL);
    if (this.nextConnection.isConnected()) {
      this.nextConnection.tighten_();
    }
  }

};

/**
 * Render the top edge of the block.   渲染块的顶边。
 * @param {!Array.<string>} steps Path of block outline.  块轮廓的路径。
 * @param {!Array.<string>} highlightSteps Path of block highlights.  块高亮的路径。
 * @param {number} rightEdge Minimum width of block.  块的最小宽度。
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawTop_ =
    function(steps, highlightSteps, rightEdge) {
  /* eslint-disable indent eslint禁用缩进*/
  // Position the cursor at the top-left starting point.   
  //将光标定位在左上角起点。
  if (this.squareTopLeftCorner_) {
    steps.push('m 0,0');
    //highlightSteps.push('m 0.5,0.5');

  } else {
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START);
//  highlightSteps.push(this.RTL ?
//      Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL :
//      Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR);
    // Top-left rounded corner. 左上角的圆角。
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER);
//  highlightSteps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT);
  }

  // Top edge. 顶边
  if (this.previousConnection) {
    steps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 15);
//  highlightSteps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 15);
    steps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT);
//  highlightSteps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT);

    var connectionX = (this.RTL ?
        -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH);
    this.previousConnection.setOffsetInBlock(connectionX, 0);
  }
   steps.push('H',rightEdge);
// highlightSteps.push('H', rightEdge - 0.5);
   this.width = rightEdge+10;//标签容器的宽度
};  /* eslint-enable indent  eslint禁用缩进*/

/**
 * Render the right edge of the block.  渲染块的右边缘。
 * @param {!Array.<string>} steps Path of block outline.  块轮廓的路径。
 * @param {!Array.<string>} highlightSteps Path of block highlights. 块高亮的路径。
 * @param {!Array.<string>} inlineSteps Inline block outlines.  内嵌块轮廓。
 * @param {!Array.<string>} highlightInlineSteps Inline block highlights.  内联块高亮显示
 * @param {!Array.<!Array.<!Object>>} inputRows 2D array of objects, each  对象的二维数组，每个
 *  containing position information.  包含位置信息。
 * @param {number} iconWidth Offset of first row due to icons.  由于图标，第一行的偏移量。
 * @return {number} Height of block.  块的高度。
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawRight_ = function(steps, highlightSteps,
    inlineSteps, highlightInlineSteps, inputRows, iconWidth) {
  var cursorX;
  var cursorY = 0;
  var connectionX, connectionY;
  for (var y = 0, row; row = inputRows[y]; y++) {
    cursorX = Blockly.BlockSvg.SEP_SPACE_X;
    if (y == 0) {
      cursorX += this.RTL ? -iconWidth : iconWidth;
    }
    
    if (this.isCollapsed()) {
      // Jagged right edge. 锯齿状的右边缘。
      var input = row[0];
      var fieldX = cursorX;
      var fieldY = cursorY;
      this.renderFields_(input.fieldRow, fieldX, fieldY);
      steps.push(Blockly.BlockSvg.JAGGED_TEETH );
      //highlightSteps.push('h 8');
      var remainder = row.height - Blockly.BlockSvg.JAGGED_TEETH_HEIGHT;
      steps.push('v', remainder);
      this.width += Blockly.BlockSvg.JAGGED_TEETH_WIDTH;
    } else if (row.type == Blockly.BlockSvg.INLINE) {
      // Inline inputs.  内联输入。
      for (var x = 0, input; input = row[x]; x++) {
        var fieldX = cursorX;
        var fieldY = cursorY;
        if (row.thicker) {
          // Lower the field slightly. 稍微降低场。
          fieldY += Blockly.BlockSvg.INLINE_PADDING_Y;
        }
        // TODO: Align inline field rows (left/right/centre).
        cursorX = this.renderFields_(input.fieldRow, fieldX, fieldY);
        if (input.type != Blockly.DUMMY_INPUT) {
          cursorX += input.renderWidth + Blockly.BlockSvg.SEP_SPACE_X;
        }
        if (input.type == Blockly.INPUT_VALUE) {
          inlineSteps.push('M', (cursorX - Blockly.BlockSvg.SEP_SPACE_X) +
                           ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y+ 
                           	input.renderHeight + 1 - Blockly.BlockSvg.TAB_HEIGHT));
          inlineSteps.push('h', Blockly.BlockSvg.TAB_WIDTH - 2 -
                           input.renderWidth);
          //内嵌块的包含轮廓
          inlineSteps.push('a 8 8 270 0 0 0 16');
          
          inlineSteps.push('h', input.renderWidth + 2 -
                           Blockly.BlockSvg.TAB_WIDTH);
          inlineSteps.push('a 8 8 90 0 0 0 -16');
          inlineSteps.push('z');
          
          // Create inline input connection.创建内联输入连接。
          if (this.RTL) {
            connectionX = -cursorX -
                Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X +
                input.renderWidth + 1;
          } else {
            connectionX = cursorX +
                Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X -
                input.renderWidth - 1;
          }
          connectionY = cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + 1;
          input.connection.setOffsetInBlock(connectionX, connectionY);
        }
      }

      cursorX = Math.max(cursorX, inputRows.rightEdge);
      this.width = Math.max(this.width, cursorX);
      steps.push('H', cursorX);
      //highlightSteps.push('H', cursorX - 0.5);
      steps.push('v', row.height);
      
    } else if (row.type == Blockly.INPUT_VALUE) {
      // External input.  外部输入。
      var input = row[0];
      var fieldX = cursorX;
      var fieldY = cursorY;
      if (input.align != Blockly.ALIGN_LEFT) {
        var fieldRightX = inputRows.rightEdge - input.fieldWidth -
            Blockly.BlockSvg.TAB_WIDTH - 2 * Blockly.BlockSvg.SEP_SPACE_X;
        if (input.align == Blockly.ALIGN_RIGHT) {
          fieldX += fieldRightX;
        } else if (input.align == Blockly.ALIGN_CENTRE) {
          fieldX += fieldRightX / 2;
        }
      }
      this.renderFields_(input.fieldRow, fieldX, fieldY);
      steps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
      var v = row.height - Blockly.BlockSvg.TAB_HEIGHT;
      steps.push('v', v);
      // Create external input connection. 创建外部输入连接。
      connectionX = this.RTL ? -inputRows.rightEdge - 1 :
          inputRows.rightEdge + 1;
      input.connection.setOffsetInBlock(connectionX, cursorY);
      if (input.connection.isConnected()) {
        this.width = Math.max(this.width, inputRows.rightEdge +
            input.connection.targetBlock().getHeightWidth().width -
            Blockly.BlockSvg.TAB_WIDTH + 1);
      }
    } else if (row.type == Blockly.DUMMY_INPUT) {
      // External naked field.  外部
      var input = row[0];
      var fieldX = cursorX;
      var fieldY = cursorY;
      if (input.align != Blockly.ALIGN_LEFT) {
        var fieldRightX = inputRows.rightEdge - input.fieldWidth -
            2 * Blockly.BlockSvg.SEP_SPACE_X;
        if (inputRows.hasValue) {
          fieldRightX -= Blockly.BlockSvg.TAB_WIDTH;
        }
        if (input.align == Blockly.ALIGN_RIGHT) {
          fieldX += fieldRightX;
        } else if (input.align == Blockly.ALIGN_CENTRE) {
          fieldX += fieldRightX / 2;
        }
      }
      this.renderFields_(input.fieldRow, fieldX, fieldY);
      steps.push('v', row.height);
    } else if (row.type == Blockly.NEXT_STATEMENT) {
      // Nested statement.  嵌套语句。
      var input = row[0];
      if (y == 0) {
        // If the first input is a statement stack, add a small row on top.
        //如果第一个输入是语句堆栈，请在顶部添加一个小行。
        steps.push('v', Blockly.BlockSvg.SEP_SPACE_Y);
        
        cursorY += Blockly.BlockSvg.SEP_SPACE_Y;
      }
      var fieldX = cursorX;
      var fieldY = cursorY;
      if (input.align != Blockly.ALIGN_LEFT) {
        var fieldRightX = inputRows.statementEdge - input.fieldWidth -
            2 * Blockly.BlockSvg.SEP_SPACE_X;
        if (input.align == Blockly.ALIGN_RIGHT) {
          fieldX += fieldRightX;
        } else if (input.align == Blockly.ALIGN_CENTRE) {
          fieldX += fieldRightX / 2;
        }
      }
      this.renderFields_(input.fieldRow, fieldX, fieldY);
      cursorX = inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH;
      steps.push('H', cursorX);
      steps.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER);
      steps.push('v', row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS);
      steps.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER);
      steps.push('H', inputRows.rightEdge);

      // Create statement connection.  创建语句连接。
      connectionX = this.RTL ? -cursorX : cursorX + 1;
      input.connection.setOffsetInBlock(connectionX, cursorY + 1);

      if (input.connection.isConnected()) {
        this.width = Math.max(this.width, inputRows.statementEdge +
            input.connection.targetBlock().getHeightWidth().width);
      }
      if (y == inputRows.length - 1 ||
          inputRows[y + 1].type == Blockly.NEXT_STATEMENT) {
        // If the final input is a statement stack, add a small row underneath.
        //如果最终输入是语句堆栈，请在下面添加一个小行。
        // Consecutive statement stacks are also separated by a small divider.
        //连续的语句堆栈也由一个小分隔符分隔。
        steps.push('a', '8 8 90 0 1 0 16');
 
        cursorY += Blockly.BlockSvg.SEP_SPACE_Y;
      }
    }
    cursorY += row.height;
  }
  if (!inputRows.length) {
    cursorY = Blockly.BlockSvg.MIN_BLOCK_Y;
    steps.push('V', cursorY);

  }
  return cursorY;
};

/**
 * Render the bottom edge of the block.  渲染块的底边。
 * @param {!Array.<string>} steps Path of block outline.块轮廓的路径。
 * @param {!Array.<string>} highlightSteps Path of block highlights.块高亮的路径。
 * @param {number} cursorY Height of block. 块的高度
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawBottom_ =
    function(steps, highlightSteps, cursorY) {
  /* eslint-disable indent eslint禁用缩进*/
  this.height += cursorY + 1;  // Add one for the shadow.
  if (this.nextConnection) {
    steps.push('H', (Blockly.BlockSvg.NOTCH_WIDTH + (this.RTL ? 0.5 : - 0.5)) +
        ' ' + Blockly.BlockSvg.NOTCH_PATH_RIGHT);
    // Create next block connection. 创建下一个块连接。
    var connectionX;
    if (this.RTL) {
      connectionX = -Blockly.BlockSvg.NOTCH_WIDTH;
    } else {
      connectionX = Blockly.BlockSvg.NOTCH_WIDTH;
    }
    this.nextConnection.setOffsetInBlock(connectionX, cursorY + 1);
    this.height += 4;  // Height of tab. 标签高度。
  }

  // Should the bottom-left corner be rounded or square? 左下角应该是圆形还是正方形？
  if (this.squareBottomLeftCorner_) {
    steps.push('H 0');
//  if (!this.RTL) {
//    highlightSteps.push('M', '0.5,' + (cursorY - 0.5));
//  }
  } else {
    steps.push('H', Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' +
               Blockly.BlockSvg.CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.CORNER_RADIUS);
//  if (!this.RTL) {
//    highlightSteps.push('M', Blockly.BlockSvg.DISTANCE_45_INSIDE + ',' +
//        (cursorY - Blockly.BlockSvg.DISTANCE_45_INSIDE));
//    highlightSteps.push('A', (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ',' +
//        (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ' 0 0,1 ' +
//        '0.5,' + (cursorY - Blockly.BlockSvg.CORNER_RADIUS));
//  }
  }
};  /* eslint-enable indent  eslint禁用缩进*/

/**
 * Render the left edge of the block. 渲染块的左边缘。
 * @param {!Array.<string>} steps Path of block outline.块轮廓的路径。
 * @param {!Array.<string>} highlightSteps Path of block highlights.块高亮的路径。
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawLeft_ = function(steps, highlightSteps) {
  if (this.outputConnection) {
    // Create output connection.创建输出连接。
    this.outputConnection.setOffsetInBlock(0, 0);
    steps.push('V', (Blockly.BlockSvg.TAB_HEIGHT+10));
//  steps.push('c 0,-10 -' + Blockly.BlockSvg.TAB_WIDTH + ',8 -' +
//      Blockly.BlockSvg.TAB_WIDTH + ',-7.5 s ' + Blockly.BlockSvg.TAB_WIDTH +
//      ',2.5 ' + Blockly.BlockSvg.TAB_WIDTH + ',-7.5');
//  if (this.RTL) {
//    highlightSteps.push('M', (Blockly.BlockSvg.TAB_WIDTH * -0.25) + ',8.4');
//    highlightSteps.push('l', (Blockly.BlockSvg.TAB_WIDTH * -0.45) + ',-2.1');
//  } else {
//    highlightSteps.push('V', Blockly.BlockSvg.TAB_HEIGHT - 1.5);
//    highlightSteps.push('m', (Blockly.BlockSvg.TAB_WIDTH * -0.92) +
//                        ',-0.5 q ' + (Blockly.BlockSvg.TAB_WIDTH * -0.19) +
//                        ',-5.5 0,-11');
//    highlightSteps.push('m', (Blockly.BlockSvg.TAB_WIDTH * 0.92) +
//                        ',1 V 0.5 H 1');
//  }
    this.width += Blockly.BlockSvg.TAB_WIDTH;
  } else if (!this.RTL) {
//  if (this.squareTopLeftCorner_) {
//    // Statement block in a stack.  语句块在堆栈中。
//    highlightSteps.push('V', 0.5);
//  } else {
//    highlightSteps.push('V', Blockly.BlockSvg.CORNER_RADIUS);
//  }
  }
  steps.push('z');
};
