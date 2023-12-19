function Segment(x, y){
  
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, 0);
    this.diam = 10;
    this.theta = 0;
    //this.clr = clr;
    return this;
  }
  Segment.prototype.run = function () {
    
    this.update();
    this.render();
    this.checkEdges();
  }

  Segment.prototype.checkEdges = function () {
    if(this.loc.x > canvas.width){
      this.vel.x = -this.vel.x;
    }
    if(this.loc.x < 0){
      this.vel.x = -this.vel.x;
    }
    if(this.loc.y > canvas.height){
      this.vel.y = -this.vel.y;
    }
    if(this.loc.y < 0){
      this.vel.y = -this.vel.y;
    }
  }
  
  
  
  
  //renders a bubble to the canvas
  Segment.prototype.render = function () {
    if (this.isOverlapping) {
    //   context.strokeStyle = this.clr;  // color to fill
      context.strokeStyle = "blue";  // color to fill


    //    context.fillStyle = this.clr;     // color to stroke
       context.fillStyle = "blue";     // color to stroke

    } else {
    //   context.strokeStyle = this.clr;  // color to fill
    //    context.fillStyle = this.clr;     // color to stroke
       context.strokeStyle = "blue";  // color to fill
       context.fillStyle = "blue";     // color to stroke
    }
    // create the circle path
    //context.beginPath();    // clear old path
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    context.save();
    context.beginPath();
    context.translate(this.loc.x, this.loc.y);
    context.rotate(this.vel.getDirection());
    context.rotate(Math.PI);
    context.moveTo(0, 0);
    context.lineCap = "round";
    // context.lineTo(30, -10);
    // context.lineTo(25, 0);
    // context.lineTo(30, 10);
    // context.closePath();
    
    context.lineTo(10, 0);
    context.lineWidth = 10;
    context.stroke();
    
    
  
    context.fill();     // render the fill
    //context.stroke();   // render the stroke
    
    context.closePath();
    context.restore();
  }

  Segment.prototype.update = function (){
    this.acc.normalize();
    this.acc.multiply(0.03);
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.loc.add(this.vel);

  }
  Segment.prototype.getRandomColor = function(){
    //  List of hex color values for movers
    let colors = [
      "#7102AB",
      "#ab0256",
      "#0285ab",
      "#02ab1a",
      "#ab5302",
      "#773e26",
      "#ab0256",
      "#257874",
      "#78254e",
      "#787725"
    ];
    let index = Math.floor(Math.random()*colors.length);
    return colors[index];
  }
  