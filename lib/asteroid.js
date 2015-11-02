(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  Asteroids.Asteroid = function(hash) {
    this.COLOR = 0xFFFF;
    this.RADIUS = 10;
    var argsHash = {
      'game' : hash['game'],
      'pos' : hash['pos'],
      'color' : this.COLOR,
      'radius' : this.RADIUS,
      'vel' : Asteroids.randomVec(10)
    };
    Asteroids.MovingObject.call(this, argsHash);

  }

  Asteroids.inherits(Asteroids.Asteroid, Asteroids.MovingObject);
})();
