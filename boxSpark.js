var cjs = createjs;
var DECAY = 0.9;
var GRAVITY = 1;
var IMAGE_WIDTH = 500;
var IMAGE_HEIGHT = 500;
var CUBE_SIZE = 20;
var isMouseDown = false;
/**
 * @type {Particle[]}
 */
var particleArr = [];

var Particle = (function (){
  function Particle(img, pX, pY, pSize){
    this.Bitmap_constructor(img);
    this.regX = pSize >> 1;
    this.regY = pSize >> 1;
    this.x = pX;
    this.y = pY;
    this.initX = pX;
    this.initY = pY;
    this.lock = true;
    this.vx = 0;
    this.vy = 0;
    this.onFloor = false;
    this.sourceRect = new cjs.Rectangle( pX, pY, pSize, pSize );
  }
  var p = cjs.extend( Particle , cjs.Bitmap );    
  p.smash = function (pVX, pVY){
    this.vx = pVX;
    this.vy = pVY;
    this.lock = false;
  }
  p.tick = function() {
    if ( this.lock ) {
        return;
    }
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.vx;
    this.alpha = 0.75;
    if ( this.onFloor ) {
        this.vx *= DECAY;
        if ( Math.abs( this.vx ) < 0.5 ) {
            this.lock = true;
            TweenMax.to( this, 0.3, {
                x: this.initX,
                y: this.initY,
                rotation: 0,
                alpha: 1,
                delay: 1.6,
                onComplete: function () {
                    this.onFloor = false;
                },
                onCompleteScope: this
            });
        }
    } else {
      this.vy += GRAVITY;
      if ( Math.abs( this.vy ) < 0.5 && this.y >= innerHeight - 20 ) {
        this.onFloor = true;
        this.vy = 0;
        this.y = innerHeight;
      }
    }
    if ( this.x < 0 ) {
        this.vx *= -0.5;
    } else if ( this.x > innerWidth ) {
        this.x = innerWidth;
        this.vx *= -0.5;
    }
    if ( this.y > innerHeight - 10 ) {
        this.y = innerHeight - 10;
        this.vy *= -0.5;
    }
  }
  return createjs.promote(Particle, "Bitmap");        
})();

var img = new Image();
img.src = 'img/coming-soon.png';
img.onload = handleComplete;
function handleComplete() {
    var stage = new createjs.Stage( canvas );
    stage.update();
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.setFPS( 60 );
    createjs.Ticker.addEventListener( 'tick', ()=> {
        stage.update();
        for ( var a in particleArr ) {
            particleArr[a].tick();
        }
    });

    var C = IMAGE_WIDTH / CUBE_SIZE;
    var R = IMAGE_HEIGHT / CUBE_SIZE;
    var COUNT = R * C;
    console.log( COUNT );
    for ( var i = 0; i < COUNT; i++ ) {
        var col = i % R;
        var row = Math.floor( i / R );
        var x = col * CUBE_SIZE;
        var y = row * CUBE_SIZE;
        var p = new Particle( img, x, y, CUBE_SIZE );
        stage.addChild( p );
        particleArr.push( p );
    }
    stage.on( 'stagemousedown', ()=> {
        isMouseDown = true;
        smash( stage.mouseX, stage.mouseY );
    });
    stage.on( 'stagemousemove', ()=> {
        if ( isMouseDown ) {
            smash( stage.mouseX, stage.mouseY );
        }
    });
    stage.on( 'stagemouseup', ()=> {
        isMouseDown = false;
    });
}
function smash( pX, pY ) {
    // console.log('smash' , pX,pY);
    // es6
  for( var p of particleArr){	
    var radius = Math.sqrt( Math.pow( p.x - pX, 2 ) + Math.pow( p.y - pY, 2 ) );
    if ( radius < 40 ) {
      if ( p.lock ) {
        var vx = ( ( Math.random() * 10 ) - 5 ) * 4;
        var vy = ( ( Math.random() * 10 ) - 5 ) * 4;
        p.smash( vx, vy );
      }
    }
  }
}

var resizeHandler =  function (){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeHandler();
window.addEventListener('resize', resizeHandler)