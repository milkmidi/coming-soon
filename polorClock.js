var lib = {};
function init () {
  var canvas, stage;

  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", stage);


  var COLOR_PATTERN = ['#1abc9c' , '#3498db' ,'#9b59b6', '#e67e22' ,'#f1c40f'];
  var shapeArr = [];


  var updateTime = function(){
    var d = new Date();
    var month = (d.getMonth()+1);
    var day = d.getDate();
    var hours = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    shapeArr[0].update( sec );
    shapeArr[1].update( min );
    shapeArr[2].update( hours );
    shapeArr[3].update( day );
    shapeArr[4].update( month );
  }

  var createShape = function( radius , value , color ){
    var shape = new lib.PolorShape( radius , value , color );
    shape.x = canvas.width/2;
    shape.y = canvas.height/2;
    stage.addChild( shape );
    shapeArr.push(shape);
  }

  var date = new Date();
  // Seconds
  createShape( 280 , date.getSeconds() , COLOR_PATTERN[0] );
  // miuntes
  createShape( 230 , date.getMinutes() , COLOR_PATTERN[1]);
  // hour
  createShape( 180 , date.getHours() , COLOR_PATTERN[2]);
  // date
  createShape( 130 , date.getDate() , COLOR_PATTERN[3]);
  // month
  createShape( 80 , date.getMonth() +1 , COLOR_PATTERN[4]);
  setInterval( updateTime ,1000);
}



(function( lib , cjs){
  function PolorShape( radius , value , color ){
    this.Container_constructor();
    this.radius = radius;
    this.color = color;
    
    this.angle = 0;
    this.thickness = 30;

    this.shape = new cjs.Shape();
    this.addChild( this.shape );

    this.displayText = new createjs.Text("Hello World!", "30px Arial", "#fff");
    this.displayText.width = radius / 2;
    this.displayText.textAlign = "left";
    this.addChild( this.displayText );

    this.update( value );
  }
  var p = createjs.extend(PolorShape, createjs.Container);
  p.handleChange = function() {
    var s = this.shape;
    var displayText = this.displayText;
    var endAngle = this.angle * Math.PI / 180;
    s.graphics.clear();
    s.graphics
        .ss( this.thickness, 0,0)
        .s( this.color)
        .arc( 0, 0, this.radius,  endAngle,0, true);

    var radius = this.radius  - 15;
    displayText.x = Math.cos( endAngle ) * radius;
    displayText.y = Math.sin( endAngle ) * radius;

    displayText.rotation = this.angle;
    
  }
  p.update = function( value ){
    if ( this.value == value) {
        return;
    };
    this.value = value;

    if ( value == 0) {
      value = 60;
    };
    this.displayText.text = value;

    TweenMax.to(this,1, {
      angle: value * 6,
      onUpdate: this.handleChange,
      onUpdateScope: this
    });
  }

  lib.PolorShape = createjs.promote(PolorShape , "Container");

})( lib , createjs )




