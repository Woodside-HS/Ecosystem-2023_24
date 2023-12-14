class SKHerb4 extends Creature {

  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld)
    this.loc = loc;
    this.vel = vel;
    this.acc = new JSVector(0, 0);
    this.sz = 8;
    this.lifeSpan = 1500;
    this.maxLifeSpan = this.lifeSpan;
    let colors = ["red", "black", "orange", "yellow", "green", "blue", "violet", "indigo"];
    this.color = colors[Math.floor(Math.random() * colors.length)];

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
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  camouflage() {
    if (this.color == black) {
      //need to make attr=0 with other entities, will all entities have attraction/repulsion? 
    }
  }

  bigfish(herbs){
    this.flock(herbs);
    this.update();
    this.checkEdges()
    this.render();
  }

  flock(herbs){
     // flock force is the accumulation of all forces
  let flockForce = new JSVector(0, 0);
  // set up force vectors to be added to acc
  let sep = this.separate(herbs);
  let ali = this.align(herbs);
 let coh = this.cohesion(herbs);
  //  set multiples via sliders 
  let sepMult = document.getElementById("slider3").value; // Get slider VAlue%%%%%%%%%%%%%%%%%%
  let aliMult = document.getElementById("slider4").value;;  // Get slider VAlue%%%%%%%%%%%%%%%%%%
  let cohMult = document.getElementById("slider5").value;;    // Get slider VAlue%%%%%%%%%%%%%%%%%%
  //  calculate three forces
 sep.multiply(sepMult);
  ali.multiply(aliMult);
  coh.multiply(cohMult);
  //  add each of these to flockForce
 flockForce.add(sep);
  flockForce.add(ali);
  flockForce.add(coh);
  this.acc.add(flockForce);
  }

  seperate(h){
    let count = 0;
    let sep = new JSVector(0, 0);
    for (let i = 0; i < h.length; i++) {
      let d = this.loc.distance(h[i].loc)
      if ((d > 0) && (d < this.desiredSep)) {
        let diff = JSVector.subGetNew(this.loc, h[i].loc);
        sep.add(diff);
        count++;
  
      }
    }
    if (count > 0) {
      sep.divide(count);
      sep.normalize();
      sep.multiply(this.maxForce);
    }
    return sep;
  }

  align(h){
    let steer = new JSVector(0, 0);
  let perceptionRadius = 50;
  let total = 0;
  for (let i = 0; i < h.length; i++) {
    let d = this.loc.distance( h[i].loc);
    if ((h[i] != this.loc) && (d < perceptionRadius)) {
      steer.add(h[i].vel);
      total++;
    }
  }
  if (total > 0) {
    
    steer.divide(total);
    steer.normalize();
    steer.multiply(this.maxForce)
   
  }
  return steer;
  }
  cohesion(h){
    let coh = new JSVector(0, 0);
    let neighborDist = 100;
    let count = 0;
  
    for (let i = 0; i < h.length; i++) {
      let d = this.loc.distance( h[i].loc);
      if ((d > 0) && (d < neighborDist)) {
        coh.add(h[i].loc);
        count++;
      }
    }
   
      if (count > 0) {
        coh.divide(count);
        return this.seek(coh);
      }
      return new JSVector(0, 0);
  }

  seek(target){
    let desired = JSVector.subGetNew(target, this.loc);
    desired.normalize();
    desired.multiply(this.maxSpeed);
    let steer = JSVector.subGetNew(desired, this.vel);
    return steer;
  }



}