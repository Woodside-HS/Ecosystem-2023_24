class SKHerb4 extends Creture {

  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld)
    this.loc = loc;
    this.vel = vel;
    this.acc = new JSVector(0, 0);
    this.sz = 8;
    this.lifeSpan = 1500;
    this.maxLifeSpan = this.lifeSpan;
    this.camoColor=
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.loc.add(this.vel);
    this.row = Math.floor((this.loc.y - this.wrld.dims.top) / this.wrld.rowHeight);
    this.col = Math.floor((this.loc.x - this.wrld.dims.left) / this.wrld.colWidth);
    //  draw a line to the closest entity in my cell
    this.closest = 1000000;
    this.clsIndex = -1;
    if (this.lifeSpan >= 0) {
      lifeSpan--;
    }
  }
  render() {
    let ctx = this.ctx;
    ctx.strokestyle = "rgba(255,255,255,1)";
    //random color for camo
    ctx.fillStyle = this.getRandomColor();
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI, false);
    ctx.fill();
  }



}