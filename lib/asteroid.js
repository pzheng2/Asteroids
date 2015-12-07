(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function (hash) {
    var argsHash = {
      game: hash.game,
      pos: hash.pos || hash.game.randomPos(),
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      vel: hash.vel || Asteroids.Util.randomVec(Asteroid.SPEED)
    };

    console.log(argsHash.pos);

    Asteroids.MovingObject.call(this, argsHash);
  };

  Asteroid.COLOR = "0XFFFF";
  Asteroid.RADIUS = 20;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject, decrementLives) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
      decrementLives();
    }
  };

})();
