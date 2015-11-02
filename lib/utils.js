(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  Asteroids.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  }

  Asteroids.randomVec = function (length) {
    var x = Math.random();
    var y = Math.random();

    var norm = Math.sqrt(Math.pow(y, 2) - Math.pow(x, 2));

    x = x/norm * length;
    y = y/norm * length;

    return [x,y];
  }
})();
