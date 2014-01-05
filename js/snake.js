"use strict";

(function(root) {

  /**
   * @constructor
   */
  function Snake() {
    // 3 blocks per 60 frames
    this.velocity = 3;
    this.blocks = [];
    this.direction = Snake.RIGHT;
    this.blocksCounter = 0;

    this.addBLock(root.app.blockSize, 0);
    this.addBLock(0, 0);
  }

  Snake.UP = 38;
  Snake.RIGHT = 39;
  Snake.DOWN = 40;
  Snake.LEFT = 37;

  /**
   * @param {Object} app
   */
  Snake.prototype.update = function(app) {
    this.blocksCounter = this.blocksCounter + app.frames / app.frameRate * this.velocity;
    var blocksQuantity = this.blocksCounter | 0;

    if (blocksQuantity < 1) {
      return;
    }

    this.blocksCounter -= blocksQuantity;
    // If arrow pressed and new direction isn't opposite to old
    if (app.keyboard.arrow && Math.abs(app.keyboard.arrow - this.direction) != 2) {
      this.direction = app.keyboard.arrow;
    }

    this.move(blocksQuantity, app.blockSize);
  };

  /**
   * @param {Number} blocksQuantity
   * @param {Number} blockSize
   */
  Snake.prototype.move = function(blocksQuantity, blockSize) {
    var pixelsQuantity = blockSize * blocksQuantity;
    var moveBy = {x: 0, y: 0};

    switch (this.direction) {
      case Snake.UP:
        moveBy.y = -pixelsQuantity;
        break;
      case Snake.RIGHT:
        moveBy.x = pixelsQuantity;
        break;
      case Snake.DOWN:
        moveBy.y = pixelsQuantity;
        break;
      case Snake.LEFT:
        moveBy.x = -pixelsQuantity;
        break;
    }

    this.moveBlocks(moveBy.x, moveBy.y);
  };

  /**
   * @param {Number} x
   * @param {Number} y
   */
  Snake.prototype.moveBlocks = function(x, y) {
    for (var i = this.blocks.length - 1; i > 0; i--) {
      this.blocks[i].x = this.blocks[i - 1].x;
      this.blocks[i].y = this.blocks[i - 1].y;
    }

    this.blocks[0].move(x, y);
  };

  /**
   * @param {Number} x
   * @param {Number} y
   */
  Snake.prototype.addBLock = function(x, y) {
    this.blocks.push(new Block(x, y, root.app.blockSize));
  };

  Snake.prototype.addBlockToTail = function() {
    var lastBlock = this.blocks[this.blocks.length - 1];

    this.addBLock(lastBlock.x, lastBlock.y);
  };

  /**
   * @param {Number} velocity
   */
  Snake.prototype.addVelocity = function(velocity) {
    this.velocity += velocity;
  };

  root.Snake = Snake;
})(window);