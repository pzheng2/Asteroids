(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
  };

  GameView.MOVES = {
    "w": [0, -1],
    "a": [-1, 0],
    "s": [0, 1],
    "d": [1, 0]
  };

  GameView.prototype.bindKeyHandlers = function () {

    Object.keys(GameView.MOVES).forEach(function (k) {
      key(k, function () {
        this.ship.power(GameView.MOVES[k]);
      }.bind(this));
    }.bind(this));

    key("h", function () {
      this.ship.fireBullet();
    }.bind(this));
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.prevTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function (time) {
    if (this.game.lives > 0) {
      var timeDiff = time - this.prevTime;
      this.game.step(timeDiff);
      this.game.draw(this.ctx);
      this.prevTime = time;
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.ctx.font = "100px serif";
      this.ctx.fillText("You Lose", 400, 240);
    }
  };

})();
