var Scratch = (function (){
  var distanceBetween = function(point1, point2) {
    return Math.sqrt(((point2.x - point1.x) ** 2) + ((point2.y - point1.y) ** 2));
  }
  var angleBetween = function(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  }

  function Scratch(canvas/*HTMLCanvasElement*/, coverImgURL/*string*/){
    this.supportTouch = ('ontouchstart' in window);
    this.isDrawing = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.canvas = canvas;
    var context = canvas.getContext('2d');
    this.context = context;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    var self = this;
    var imgBG = new Image();
    this.img = imgBG;
    imgBG.src = coverImgURL;
    imgBG.onload = function (){
      var w = imgBG.width;
      var h = imgBG.height;
      
      canvas.width = w;
      canvas.height = h;
      context.fillStyle = "#333333";
      context.fillRect( 0, 0, w, h );
      context.lineWidth = 30;
      context.lineJoin = 'round';
      context.lineCap = 'round';

      var pat = context.createPattern(imgBG, "repeat");
      context.rect(0,0,w,h);
      context.fillStyle=pat;
      context.fill();

      if (self.supportTouch){
        canvas.addEventListener('touchstart', self.handleMouseDown);
        canvas.addEventListener('touchmove', self.handleMouseMove);
        canvas.addEventListener('touchend', self.handleMouseUp);	
      }else{
        canvas.addEventListener('mousedown', self.handleMouseDown);
        canvas.addEventListener('mousemove', self.handleMouseMove);
        canvas.addEventListener('mouseup', self.handleMouseUp);
      }
    };
  }
  Scratch.prototype.getMousePosition = function (event) {
    const pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const pageScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    const evt = this.supportTouch ? event.touches[0] : event;
    const coverPos = this.canvas.getBoundingClientRect();
    return {
      x: evt.pageX - coverPos.left - pageScrollLeft,
      y: evt.pageY - coverPos.top - pageScrollTop,
    };
  };
  Scratch.prototype.handleMouseDown = function (event){
    event.preventDefault();
    const position = this.getMousePosition(event);
    this.mouseX = position.x;
    this.mouseY = position.y;
    this.isDrawing = true;
    this.context.beginPath();
    this.context.moveTo(this.mouseX, this.mouseY);
    this.handleMouseMove( event );
  }
  Scratch.prototype.handleMouseMove = function (event){
    if(!this.isDrawing){
      return;
    }
    var lastPoint = { x: this.mouseX || 0, y: this.mouseY || 0 };

    const position = this.getMousePosition(event);
    const dist = distanceBetween(lastPoint, position);
    const angle = angleBetween(lastPoint, position);
    var ctx = this.context;
  
    for (let i = 0; i < dist; i += 5) {
      const newX = lastPoint.x + (Math.sin(angle) * i);
      const newY = lastPoint.y + (Math.cos(angle) * i);
      ctx.beginPath();
      ctx.fillStyle = '#FFFFFF';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.arc(newX, newY, 25, 0, 2 * Math.PI);
      ctx.fill(); 
      /* this.context.globalCompositeOperation = 'destination-out';
      // this.context.lineTo( newX, newY );
      this.context.stroke();
    
      this.context.globalCompositeOperation = 'destination-over';
      this.context.drawImage( this.img, 0, 0 ) */
    }
    this.mouseX = position.x;
    this.mouseY = position.y;
  }
  Scratch.prototype.handleMouseUp = function (event){
    this.isDrawing = false;
  }
  Scratch.prototype.destory = function (){
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseup', this.handleMouseUp);
    this.canvas.removeEventListener('touchstart', this.handleMouseDown);
    this.canvas.removeEventListener('touchmove', this.handleMouseMove);
    this.canvas.removeEventListener('touchend', this.handleMouseUp);
  }
  return Scratch;
})();


var app = new Scratch(document.querySelector('.scratch__canvas'), 'img/cover.png')