var b64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAF1CAYAAAAjjS64AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4QTgwNzMwOTYyOTExRTg5M0FDODhGM0IzNjczNjRCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI4QTgwNzMxOTYyOTExRTg5M0FDODhGM0IzNjczNjRCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBODA3MkU5NjI5MTFFODkzQUM4OEYzQjM2NzM2NEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjhBODA3MkY5NjI5MTFFODkzQUM4OEYzQjM2NzM2NEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Mp1sTAAAgc0lEQVR42uyd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"

function init(){
  var Texture = PIXI.Texture;
  var Sprite = PIXI.Sprite;
  var mouse = {x:window.innerWidth/2,y:window.innerHeight*0.3}
  var GRAVITY = 1;
  var DECAY = 0.98;
  var STATES = ["fall", "game", "kill"];
  var logic = {
    dropCounter: 40,
    state: STATES[0],
    setState(pState) {
      this.state = pState;
      if (this.state == "fall") {        
        sheep.visible = true;
        sheep.filters = [sheepBlurFilter];
      };
    },
    updatePointer() {
      // var p = renderer.plugins.interaction.mouse.global;
      var p = mouse;
      if (p.x < 0 || p.y < 0) {
        p.x = window.innerWidth >> 1;
        p.y = window.innerHeight / 3;
      };
      pointer.x += (p.x - pointer.x) * 0.17;
      pointer.y += (p.y - pointer.y) * 0.17;
      return p;
    },
    reset() {
      sheep.y = -400;
      sheep.vx = sheep.vy = 0;
      this.dropCounter = 40;
    },
    onTick() {
      switch (this.state) {
        case STATES[0]:
          sheep.vy += GRAVITY;
          sheep.vx *= DECAY;
          sheep.vy *= DECAY;
          sheep.x += sheep.vx;
          sheep.y += sheep.vy;
          if (sheep.y > pointer.y) {
            ball.visible = true;
            this.setState(STATES[1]);
          };
          var p = this.updatePointer();
          sheep.x = p.x;
          ball.x = sheep.x;
          ball.y = sheep.y;
          sheepBlurFilter.blurX = 0;
          sheepBlurFilter.blurY = 8;
          break;
        case STATES[1]:
          this.updatePointer();

          var absVX = Math.abs(sheep.vx);
          var absVY = Math.abs(sheep.vy);
          if (absVX > 34 || absVY > 34) {
            if (this.dropCounter > 0) {
              this.dropCounter--;
            } else if (sheep.vy <= 0 && sheep.y < 260) {
              this.setState(STATES[2]);
            }
          }
          chainerBall(ball, 250);
          chainerSheep(ball, sheep, 5);
          break;
        case STATES[2]:
          this.updatePointer();
          sheep.vy += GRAVITY;
          sheep.vx *= DECAY;
          sheep.vy *= DECAY;
          sheep.x += sheep.vx;
          sheep.y += sheep.vy;
          shape.clear();
          ball.visible = false;
          if (sheep.y > window.innerHeight + 100) {
            this.reset();
            this.setState(STATES[0]);
          };
          break;
      }
    }
  };


  const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
    antialias: true,
    transparent: false,
    view: document.getElementById('canvas'),
    forceCanvas: false,
    backgroundColor: 0,
    roundPixels: true,
  });

  const {stage, renderer} = app;

  var shape = new PIXI.Graphics();
  stage.addChild(shape);
 
  var sheep = new PIXI.Sprite(PIXI.Texture.fromImage(b64));
  sheep.pivot.set(100, 187);
  sheep.vx = 0;
  sheep.vy = 0;
  sheep.visible = false;
  stage.addChild(sheep);

  var sheepBlurFilter = new PIXI.filters.BlurFilter();
  sheep.filters = [sheepBlurFilter];

  var pointer = new PIXI.Graphics();
  pointer.beginFill(0x576574);
  pointer.drawCircle(0,0,10)
  stage.addChild(pointer);

  var ball = new PIXI.Graphics();
  ball.vx = 0;
  ball.vy = 0;
  ball.beginFill(0);
  ball.drawCircle(0, 0, 8);
  stage.addChild(ball);

  var w2 = window.innerWidth >> 1;
  var h2 = window.innerHeight / 3;
  sheep.y = -1000;
  sheep.rotation = Math.PI / -2;
  sheep.x = pointer.x = ball.x = w2;
  pointer.y = ball.y = h2;


  function chainerBall(ball, lineLength) {
    var pointerX = pointer.x;
    var pointerY = pointer.y;
    var ballX = ball.x;
    var ballY = ball.y;
    var ballNewX = ball.x;
    var ballNewY = ball.y;
    ball.vy += GRAVITY;
    ball.vx *= DECAY;
    ball.vy *= DECAY;
    ballNewX += ball.vx;
    ballNewY += ball.vy;
    var a = pointerX - ballNewX;
    var b = pointerY - ballNewY;
    var distance = Math.sqrt(a * a + b * b);
    var g = shape;
    if (distance > lineLength) {
      ballNewX = pointerX - (a / distance * lineLength);
      ballNewY = pointerY - (b / distance * lineLength);
      ball.vx = ballNewX - ballX;
      ball.vy = ballNewY - ballY;
      g.clear();
      g
      g.lineStyle(3, 0xc8d6e5);
      g.moveTo(ballNewX, ballNewY);
      g.lineTo(pointerX, pointerY);
    } else {
      g.clear();
      g.lineStyle(4, 0xc8d6e5);
      g.moveTo(ballNewX, ballNewY);
      var controlX = (ballNewX + pointerX) / 2;
      var controlY = (ballNewY + pointerY) / 2;
      g.quadraticCurveTo(controlX, controlY + (lineLength - distance), pointerX, pointerY);
    }
    // 3.0.7 Graphics Bug
    g.currentPath.shape.closed = false;
    //
    ball.x = ballNewX;
    ball.y = ballNewY;
  }

  function chainerSheep(ball, sheep, lineLength) {
    var ballX = ball.x;
    var ballY = ball.y;
    var oldx = sheep.x;
    var oldy = sheep.y;
    var newX = sheep.x;
    var newY = sheep.y;
    sheep.vy += GRAVITY;
    sheep.vx *= DECAY;
    sheep.vy *= DECAY;
    newX += sheep.vx;
    newY += sheep.vy;
    var a = ballX - newX;
    var b = ballY - newY;
    var distance = Math.sqrt(a * a + b * b);
    var PI = Math.PI;
    var rotation = sheep.rotation;
    var angle = Math.atan2(b, a);
    var radian = angle;
    var newAngle = radian - rotation;
    if (newAngle > PI) {
      newAngle -= PI * 2;
    } else if (newAngle < -PI) {
      newAngle += PI * 2;
    }
    rotation += newAngle * 0.3;
    sheep.rotation = rotation;

    if (distance > lineLength) {
      newX = ballX - a / distance * lineLength;
      newY = ballY - b / distance * lineLength;
      sheep.vx = newX - oldx;
      sheep.vy = newY - oldy;
    }
    sheep.x = newX;
    sheep.y = newY;
    sheepBlurFilter.blurX = Math.abs(sheep.vx) / 10;
    sheepBlurFilter.blurY = Math.abs(sheep.vy) / 10;
  }
  
  window.addEventListener('mousemove', function (e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  });
  window.addEventListener('touchmove', function (e){
    var touch = e.touches[0]
    mouse.x = touch.pageX;
    mouse.y = touch.pageY;
  });
  window.addEventListener('resize', function(){
    app.renderer.resize(window.innerWidth, window.innerHeight);
  })


  app.ticker.add(function(){
    logic.onTick();
  });
  logic.setState(STATES[0]);
}

init();