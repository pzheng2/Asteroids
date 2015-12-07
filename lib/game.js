(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.ships = [];
    this.bullets = [];
    this.addAsteroids();
    this.lives = 3;
    this.score = 0;
  };


  Game.BG_COLOR = "#000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 5;

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
    console.log(this.asteroids.length);
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.randomPos(),
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.prototype.allObjects = function () {
    return this.ships.concat(this.asteroids, this.bullets);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          if (obj1 instanceof Asteroids.Asteroid)
            obj1.collideWith(obj2, this.decrementLives.bind(this));
          if (obj1 instanceof Asteroids.Bullet)
            obj1.collideWith(obj2, this.incrementScore.bind(this));
        }
      }.bind(this));
    }.bind(this));
  };

  Game.prototype.decrementLives = function () {
    this.lives--;
    console.log(this.lives);
  };

  Game.prototype.incrementScore = function () {
    this.score++;
    console.log(this.score);
  };

  Game.prototype.randomPos = function () {
    return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    // ctx.font = "10px serif";
    // ctx.fillStyle = "blue";
    // ctx.fillText("score: " + this.score + " lives: " + this.lives);

  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) ||
           (pos[1] < 0) ||
           (pos[0] > Game.DIM_X) ||
           (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function (distance) {
    this.allObjects().forEach(function (object) {
      object.move(distance);
    });
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(object);
      // change
      this.asteroids[index] = new Asteroids.Asteroid({ game: this });
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    }
  };

  Game.prototype.step = function (distance) {
    this.moveObjects(distance);
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    function wrap(coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }

    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];
  };
})();
