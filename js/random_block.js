"use strict";

(function(root) {
  /**
   * @param {Array<Block>} blocksInUse
   * @param {HTMLCanvasElement} canvas
   * @param {Number} blockSize
   *
   * @returns {Array}
   */
  function getFreeBlocksCoordinates(blocksInUse, canvas, blockSize) {
    var freeBlocks = [];
    var cordsHash = {};

    var rowsCount = canvas.width / blockSize;
    var columnsCount = canvas.height / blockSize;
    var uniqueBase = (columnsCount / 10 | 0) * 10;

    // Creates a hash of coordinates of blocks to speed up the search process.
    var block;
    for (var i = 0, n = blocksInUse.length; i < n; i++) {
      block = blocksInUse[i];
      cordsHash[block.x + block.y * uniqueBase] = true;
    }

    for (var row = 0; row < rowsCount; row++) {
      for (var column = 0; column < columnsCount; column++) {
        if (undefined === cordsHash[row + column * uniqueBase]) {
          freeBlocks.push([row * blockSize, column * blockSize]);
        }
      }
    }

    return freeBlocks;
  }

  /**
   * @returns {boolean}
   */
  root.generateRandomBlock = function() {
    var app = root.app;
    var freeBlocks = getFreeBlocksCoordinates(app.snake.blocks, app.ctx.canvas, app.blockSize);

    var randIndex = (Math.random() * freeBlocks.length) | 0;
    var blockCords = freeBlocks[randIndex];

    if (blockCords) {
      app.targetBlock = new Block(blockCords[0], blockCords[1], app.blockSize);

      return true;
    } else {
      return false;
    }
  };
})(window);