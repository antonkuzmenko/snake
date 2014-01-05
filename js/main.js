"use strict";

(function(root) {
  root.app = {
    ctx: document.querySelector('canvas').getContext('2d'),
    frameRate: 60,
    frameTime: 16,
    blockSize: 16,
    targetBlock: null,
    keyboard: {
      arrow: null
    },
    snake: null,
    score: 0,
    paused: false,
    buttons: {
      start: document.getElementById('start'),
      pause: document.getElementById('pause'),
      reset: document.getElementById('reset')
    }
  };

  var app = root.app;
  var lastLoopTime = 0;
  var period = 0;

  /**
   * @param {Number} time
   */
  function loop(time) {
    period = (time - lastLoopTime) | 0;
    lastLoopTime = time;
    app.frames = (period / app.frameTime) | 0;

    if (!app.paused) {
      update();
      draw();
    }

    requestAnimationFrame(loop);
  }

  function update() {
    if (!app.snake) {
      return;
    }

    if (!app.targetBlock && !generateRandomBlock()) {
      gameOver();
    }

    if (app.snake) {
      app.snake.update(app);
    }

    handleCollisions();
  }

  function handleCollisions() {
    var snakeHead = app.snake.blocks[0];
    var block;

    // Game over when snake has gone beyond the scene
    if (snakeHead.x > app.ctx.canvas.width || snakeHead.x < 0 || snakeHead.y > app.ctx.canvas.height || snakeHead.y < 0) {
      gameOver();
      return;
    }

    if (app.snake.blocks.length > 4) {
      for (var i = 1, n = app.snake.blocks.length; i < n; i++) {
        block = app.snake.blocks[i];

        if (block.x == snakeHead.x && block.y == snakeHead.y) {
          gameOver();
          return;
        }
      }
    }

    if (snakeHead.x == app.targetBlock.x && snakeHead.y == app.targetBlock.y) {
      app.snake.addVelocity(0.1);
      app.snake.addBlockToTail();
      // Generate new apple
      if (!generateRandomBlock()) {
        gameOver();
      } else {
        app.score += 1;
      }
    }
  }

  function draw() {
    if (!app.snake) {
      return;
    }

    // Clear canvas
    //noinspection SillyAssignmentJS
    app.ctx.canvas.width = app.ctx.canvas.width;

    var middle = {
      x: app.ctx.canvas.width / 2,
      y: app.ctx.canvas.height / 2
    };

    app.ctx.save();
    app.ctx.font = '50pt Tahoma';
    app.ctx.textAlign = 'center';
    app.ctx.fillStyle = 'white';
    app.ctx.globalAlpha = 0.7;
    app.ctx.fillText('' + app.score, middle.x, middle.y);
    app.ctx.restore();

    for (var i = 0, n = app.snake.blocks.length; i < n; i++) {
      app.snake.blocks[i].draw(app.ctx);
    }

    app.targetBlock.draw(app.ctx);
  }

  function start() {
    if (!app.snake) {
      reset();
      app.snake = new Snake();
    } else {
      alert('Game already started!');
    }
  }

  function pause() {
    app.paused = !app.paused;
  }

  function reset() {
    app.snake = null;
    app.targetBlock = null;
    app.score = 0;
    app.paused = false;
    app.keyboard.arrow = null;

    // Clear canvas
    //noinspection SillyAssignmentJS
    app.ctx.canvas.width = app.ctx.canvas.width;
  }

  function gameOver() {
    app.snake = null;
    app.targetBlock = null;
    app.score = 0;

    alert('Game over!');
  }

  function listenEvents(e) {
    if (e.which > 36 && e.which < 41) {
      app.keyboard.arrow = e.which;
    }
  }

  document.body.addEventListener('keydown', listenEvents, false);
  app.buttons.start.addEventListener('click', start, false);
  app.buttons.pause.addEventListener('click', pause, false);
  app.buttons.reset.addEventListener('click', reset, false);

  requestAnimationFrame(loop);
})(window);