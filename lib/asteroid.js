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

    this.frame = 1;
    this.count = 0;
    this.previousDate = Date.now();

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

  var sprite = function (options) {
    var sp = {};
    sp.x = options.x;
    sp.y = options.y;
    sp.context = options.context;
    sp.width = options.width;
    sp.height = options.height;
    sp.image = options.image;
    sp.frame = options.frame;

    sp.render = function () {
      sp.context.drawImage(
        sp.image,
        sp.frame,
        0,
        sp.width,
        sp.height,
        sp.x - sp.width / 2,
        sp.y - sp.height / 2,
        sp.width,
        sp.height
      );
    };

    return sp;
  };

  Asteroid.prototype.draw = function (ctx) {
    var asteroidImage = new Image();
    asteroidImage.src = "images/asteroids_sprite_sheet_burned.png";

    var asteroid = sprite({
      context: ctx,
      x: this.pos[0],
      y: this.pos[1],
      width: 56.25,
      height: 56.25,
      image: asteroidImage,
      frame: this.frame * 56.25
    });

    if (Date.now() - this.previousDate > 100) {
      this.frame = (this.frame + 1) % 4;
      this.previousDate = Date.now();
    }

    // ctx.save();
    // this.degrees++;
    asteroid.render();
    // ctx.restore();
  };

})();
