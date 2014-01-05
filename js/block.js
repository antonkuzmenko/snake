"use strict";

(function(root) {
  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} size Block size in pixels
   *
   * @constructor
   */
  function Block(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  /**
   * @param {Number} x
   * @param {Number} y
   */
  Block.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
  };

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  Block.prototype.draw = function(ctx) {
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };

  root.Block = Block;
})(window);