
var GAP = 20;
var DOT_SIZE = 8;
var isAnimate = true;
var animateTimeID = -1;

var canvas = document.getElementById( "canvas" );
var context = canvas.getContext( "2d" );
var stage = new createjs.Stage( canvas );
var container = new createjs.Container();
var containerWidth = 0;
var containerHeight = 0;
stage.addChild( container );
var text = new createjs.Text( "COMING SOON", "20px Arial", "#fff" );

stage.addChild( text );

createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.setFPS( 60 );
stage.update();
createjs.Ticker.addEventListener( "tick", function () {
  if ( isAnimate ) {
    container.x -= 10;
    if ( container.x < -containerWidth ) {
      container.x = canvas.width;
    }
  }
  stage.update();
});


var input = document.querySelector( 'input' );
input.addEventListener( 'input', getPixelData );
getPixelData();


var resizeHandler= function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  container.y = window.innerHeight * 0.25;
}
resizeHandler();
window.addEventListener('resize', resizeHandler);



function getPixelData() {
  text.alpha = 1;
  text.text = input.value;
  container.removeAllChildren();
  container.x = 0;
  isAnimate = false;
  clearTimeout( animateTimeID );
  animateTimeID = setTimeout( function () {
    isAnimate = true;
  }, 1000 );
  stage.update();
  var WIDTH = text.getMeasuredWidth() | 0;
  var HEIGHT = text.getMeasuredHeight() | 0;
  HEIGHT += 5;
  if ( WIDTH === 0 || HEIGHT === 0 ) {
    return;
  }
  console.log( 'getPixelData', WIDTH, HEIGHT );
  text.alpha = 0;
  var imgData = context.getImageData( 0, 0, WIDTH, HEIGHT ).data;
  var x;
  var y;
  for ( y = 0; y < HEIGHT; y++ ) {
    for ( x = 0; x < WIDTH; x++ ) {
      var i = ( ( WIDTH * y ) + x ) * 4;
      /*var r = imgData[i];
      var g = imgData[i+1];
      var b = imgData[i+2];
      */
      var a = imgData[i + 3];
      if ( a !== 0 ) {
        var shape = new createjs.Shape();
        shape.graphics
          .f( "#eb695b" )
          .dc( 0, 0, DOT_SIZE );
        shape.x = x * GAP;
        shape.y = y * GAP;
        container.addChild( shape );
      }
    }
  }

  containerWidth = x * GAP;
  containerHeight = y * GAP;
  container.shadow = new createjs.Shadow( "#ff0000", 0, 0, 32 );

  container.cache( 0, 0, containerWidth, containerHeight );
  console.log( 'containerWidth:' + containerWidth );
}
