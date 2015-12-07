(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var MovingObject = Asteroids.MovingObject = function (argsHash) {
    this.game = argsHash.game;
    this.pos = argsHash.pos;
    this.vel = argsHash.vel;
    this.radius = argsHash.radius;
    this.color = argsHash.color;
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );

    ctx.fill();
  };

  MovingObject.prototype.collideWith = function (otherObject) {

  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Asteroids.Util.distance(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };

  var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  MovingObject.prototype.move = function (timeDiff) {
    var velocityScale = timeDiff / NORMAL_FRAME_TIME_DELTA;
    var offsetX = this.vel[0] * velocityScale;
    var offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  };

})();
