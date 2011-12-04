var Pong = Pong || {};
Pong.Game = {
  gameHeight: 240,
  gameWidth: 400,
  paddleHeight: 60,
  paddleWidth: 10,
  paddleSpeed: 10,
  ballDiameter: 10,
  refreshMs: 30,
  init: function() {
    Pong.Paddle.init();
    Pong.KeyListener.initKeyboard();
    this.startGameLoop();
  },
  startGameLoop: function() {
    console.log("game started", Pong.Ball.xPos());
    //while (Pong.Ball.xPos() < Pong.Game.gameWidth) {
      //setTimeout(function(){
        Pong.Ball.update();
      //}, 100);
    //}
    console.log("game stopped");
  },
  continueGame: true
}

Pong.Paddle = {
  yPos: new Number,
  init: function() {
    console.log("yo");
  },
  movePaddle: function(selector, direction) {
    this.yPos = Number($(selector).css("top").replace("px",""));
    if (direction == "up") {
      if (!Pong.Paddle.atTop(this.yPos)) {
        $(selector).css("top", this.yPos - Pong.Game.paddleSpeed);
      }
    } else if (direction == "down") {
      if (!Pong.Paddle.atBottom(this.yPos)) {
        $(selector).css("top", this.yPos + Pong.Game.paddleSpeed);
      }
    }
  },
  atTop: function(pos) {
    if (pos <= 0)
      return true;
    else
      return false;
  },
  atBottom: function(pos) {
    if (pos + Pong.Game.paddleHeight >= Pong.Game.gameHeight)
      return true;
    else
      return false;
  }
}

Pong.Ball= {
  //directions: [
    //{code:"SE","x":-1,"y":-1},
    //{code:"SW","x":1,"y":-1},
    //{code:"NE","x":-1,"y":1},
    //{code:"NW","x":1,"y":1},
  //],
  xPos: function() {
    return Number($("#ball").css("left").replace("px",""));
  },
  yPos: function() {
    return Number($("#ball").css("top").replace("px",""));
  },
  vX: 5,
  vY: 0,

  update: function() {
    //check collisions
    //move from velocity
    console.log("ball updated", this.xPos());
    if (this.xPos() < Pong.Game.gameWidth) {
      setTimeout(function(){
      Pong.Ball.setPosition();
      Pong.Ball.update();
      }, Pong.Game.refreshMs);
    }
  },
  setPosition: function() {
    // update x
    $("#ball").css("left", this.xPos() + this.vX);
    // update y
    $("#ball").css("top", this.yPos() + this.vY);
  }
}

Pong.KeyListener = {
  initKeyboard: function() {
    console.log("keys");
    //window.onkeydown(function(){
    //console.log("key pressed");
    //});
    window.addEventListener('keydown', this.keydown.bind(this), false );
  },
  keydown: function(event) {
    console.log("key code",event.keyCode);
    if (event.keyCode == 40) {
      // down arrow
      Pong.Paddle.movePaddle("#paddle2", "down");
    } else if (event.keyCode == 38) {
      // up arrow
      Pong.Paddle.movePaddle("#paddle2", "up");
    } else if (event.keyCode == 87) {
      // up arrow
      Pong.Paddle.movePaddle("#paddle1", "up");
    } else if (event.keyCode == 83) {
      // up arrow
      Pong.Paddle.movePaddle("#paddle1", "down");
    }
  }
}
