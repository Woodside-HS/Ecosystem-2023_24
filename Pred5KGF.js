class Pred5KGF extends Creature {
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    this.target = new JSVector(Math.random() * wrld.dims.width, Math.random() * wrld.dims.height) // change to world dimensions
    this.arr = [];
    this.a = Math.random();
    this.dis = true;
    this.sz = sz;
    for (let i = 0; i < 5; i++) {
      this.arr.push(new Segment(this.loc.x, this.loc.y));
    }
    this.antibodies = false;
  }

  run() {
    this.update();
    this.render();
    // this.checkEdges();
  }

  render() {
    //  render balls in world
    let ctx = this.ctx;
    ctx.lineCap = "round";
    ctx.lineWidth = this.sz;;
    ctx.strokeStyle = this.clr;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.clr;
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.vel.getDirection());
    ctx.moveTo(0, 0);
    ctx.lineTo(0, (this.sz + this.sz));
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    ctx.fill();
    //  render balls in mini map
  }

  update() {
    if (this.dataBlock.lifeSpan-- <= 0) {
      this.dataBlock.isDead = true;
    }
    if (this.target.distance(this.arr[0].loc) < 50) {

      this.target.x = Math.random() * 600;
      this.target.y = Math.random() * 600;
    }
    this.arr[0].acc = JSVector.subGetNew(this.loc, this.target);
    this.arr[0].acc.normalize();
    this.arr[0].acc.multiply(0.03);
    this.arr[0].vel.add(this.arr[0].acc);
    this.arr[0].vel.limit(this.maxSpeed);
    this.arr[0].loc.add(this.arr[0].vel);
    for (let i = 1; i < this.arr.length; i++) {
      this.arr[i].vel = JSVector.subGetNew(this.arr[i - 1].loc, this.arr[i].loc);
      this.arr[i].vel.multiply(this.a);
      // this.arr[i].acc.normalize();
      // this.arr[i].acc.multiply(0.03);
      // this.arr[i].vel.add(this.arr[i].acc);
      // this.arr[i].vel.limit(1);
      // this.arr[i].loc.add(this.arr[i].vel);

    }
    //expand and collapse length
    if (this.a > .99) {
      this.dis = true;
    }
    if (this.a < .2) {
      this.dis = false;
    }
    if (this.dis == true) {
      this.a -= 0.0003;
    }
    if (this.dis == false) {
      this.a += 0.0006;
    }

  }

}

//#########################################  segment code

function Segment(x, y) {

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
  if (this.loc.x > canvas.width) {
    this.vel.x = -this.vel.x;
  }
  if (this.loc.x < 0) {
    this.vel.x = -this.vel.x;
  }
  if (this.loc.y > canvas.height) {
    this.vel.y = -this.vel.y;
  }
  if (this.loc.y < 0) {
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

Segment.prototype.update = function () {
  this.acc.normalize();
  this.acc.multiply(0.03);
  this.vel.add(this.acc);
  this.vel.limit(3);
  this.loc.add(this.vel);

}
Segment.prototype.getRandomColor = function () {
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
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

