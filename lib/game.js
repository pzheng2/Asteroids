(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  Asteroids.Game = function(dimX, dimY, numAsteroids) {
    this.DIM_X = dimX;
    this.DIM_Y = dimY;
    this.NUM_ASTEROIDS = numAsteroids;
    this.asteroids = [];

    this.addAsteroids();
  }


  Asteroids.Game.prototype.addAsteroids = function() {
    var i = 0;
    while (i < this.NUM_ASTEROIDS) {
      this.asteroids.push(new Asteroids.Asteroid({'game': this,
        'pos': this.randomPos()}));
      i++;
    }
  }

  Asteroids.Game.prototype.randomPos = function() {
      return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
  }

  Asteroids.Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  }

  Asteroids.Game.prototype.moveObjects = function(ctx) {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  }

  Asteroids.Game.prototype.wrap = function(pos) {
    pos[0] = pos[0] % this.DIM_X;
    pos[1] = pos[1] % this.DIM_Y;
    return pos;
  }
})();
