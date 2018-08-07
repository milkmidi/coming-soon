function init() {
  var cjs = createjs;
  var BALL_RADIUS = 40;
  var ELASTIC = 0.8;
  var GRAVITY = 1.0;
  var DECAY = 0.98;
  var canvas = document.getElementById( "canvas" );
  var CW = canvas.width;
  var CH = canvas.height;
  var score = 0;
  var vx = 10;
  var vy = 10;

  var stage = new cjs.Stage( canvas );
  var ball = new cjs.Bitmap( "img/ball.png" );
  ball.regX = 40;
  ball.regY = 40;
  ball.on( 'mousedown', function ( event ) {
    score++;
    vx = ( ball.x - stage.mouseX ) / 5 + Math.random() * 6 - 3;
    vy = ( ball.y - stage.mouseY ) / 5 - 30;
  });
  stage.addChild( ball );

  var scoreText = new cjs.Text( "Score:0", "20px Arial", "#777" );
  stage.addChild( scoreText );

  cjs.Ticker.timingMode = cjs.Ticker.RAF;
  //createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  cjs.Ticker.on( "tick", function () {
    vy += GRAVITY;
    vx *= DECAY;
    vy *= DECAY;

    ball.x += vx;
    ball.y += vy;

    ball.rotation += vx;

    if ( ball.x < BALL_RADIUS ) {
      ball.x = BALL_RADIUS;
      vx *= -ELASTIC;
    } else if ( ball.x > CW - BALL_RADIUS ) {
      ball.x = CW - BALL_RADIUS;
      vx *= -ELASTIC;
    }

    if ( ball.y < BALL_RADIUS ) {
      ball.y = BALL_RADIUS;
      vy *= -ELASTIC;
    } else if ( ball.y > CH - BALL_RADIUS ) {
      ball.y = CH - BALL_RADIUS;
      vy *= -ELASTIC;
      score = 0;
    }
    scoreText.text = "Score:" + score;
    stage.update();
  });

}