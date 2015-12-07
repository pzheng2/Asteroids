(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Bullet = Asteroids.Bullet = function (hash) {
    hash.radius = Bullet.RADIUS;
    Asteroids.MovingObject.call(this, hash);
  };

  Bullet.RADIUS = 10;
  Bullet.SPEED = 15;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject, incrementScore) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.remove();
      otherObject.remove();
      incrementScore();
    }
  };

  Bullet.prototype.isWrappable = false;
})();
