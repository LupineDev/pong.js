var Pong = Pong || {};
Pong.Game = {
  gameHeight: 240,
  gameWidth: 400,
  paddleHeight: 60,
  paddleWidth: 10,
  paddleSpeed: 10,
  ballDiameter: 10,
  init: function() {
    Pong.Paddle.init();
    Pong.KeyListener.initKeyboard();
  }
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
