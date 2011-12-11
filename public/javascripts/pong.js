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
  },
  paddleTop: function(selector) {
    return Number($(selector).css("top").replace("px",""));
  },
  paddleBottom: function(selector) {
    return Number($(selector).css("top").replace("px","")) + Number($(selector).css("height").replace("px",""));
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
  vY: 4,
  reverseX: function() {
    this.vX = -this.vX
  },
  reverseY: function() {
    this.vY = -this.vY
  },

  update: function() {
    //check collisions
    //move from velocity
    console.log("ball updated", this.xPos());
    if (this.inBounds()) {
      Pong.Ball.checkCollision();
      setTimeout(function(){
        Pong.Ball.setPosition();
        Pong.Ball.update();
      }, Pong.Game.refreshMs);
    }
  },
  inBounds: function() {
    return (this.xPos() < (Pong.Game.gameWidth - Pong.Game.ballDiameter) && (this.xPos() > 0))
  },
  checkCollision: function() {
    // right paddle
    if (((this.yPos() - Pong.Game.ballDiameter/2) > Pong.Paddle.paddleTop("#paddle2")) && (this.yPos() + Pong.Game.ballDiameter/2) < (Pong.Paddle.paddleBottom("#paddle2")) && (this.xPos() > (Pong.Game.gameWidth - Pong.Game.paddleWidth - Pong.Game.ballDiameter))) {
      //reverse x
      this.reverseX();
      console.log("right paddel!");
    } else if (((this.yPos() - Pong.Game.ballDiameter/2) > Pong.Paddle.paddleTop("#paddle1")) && (this.yPos() + Pong.Game.ballDiameter/2) < (Pong.Paddle.paddleBottom("#paddle1")) && (this.xPos() < (Pong.Game.paddleWidth ))) {
      // left paddle
      this.reverseX();
      console.log("left paddel!");
    } else if (this.yPos() <= 0) {
    // top
      //reverse y
      this.reverseY();
    } else if (this.yPos() >= (Pong.Game.gameHeight - Pong.Game.ballDiameter)) {
    // bottom
      //reverse y
      this.reverseY();
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
