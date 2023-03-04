

(function () {
  amp.plugin("jwt", function (options) {
    
    let player = this;
    var init = function () {
      console.log("plugin jwt initialized with player ", player);
    };
    fetch('http://localhost:3001/jwtHive');

    init();
  });
}.call(this));
