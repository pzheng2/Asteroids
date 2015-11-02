(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  Asteroids.GameView = function(height, width) {
    this.Game = new Asteroids.Game(height, width, 10);
  }

  Asteroids.GameView.prototype.start = function(ctx) {
    var that = this;
    window.setInterval(function() {
      that.Game.moveObjects(ctx);
    }, 20);
    window.setInterval(function() {
      that.Game.draw(ctx);
    }, 20);
  }
})();
