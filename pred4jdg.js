class Pred4jdg extends Creature {
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld)
    //mover properties
    this.desiredSep = 5;
    this.loc = loc;
    this.vel = vel;
    this.acc = new JSVector(0, 0);
    this.clr = this.getRandomColor();
    this.size = sz;
    this.wrld = wrld;
    this.target = new JSVector(0, 0);
    this.maxSpeed = 1;
    this.maxForce = 1;
    this.ctx = wrld.ctxMain;
    this.wWidth = wrld.dims.width;
    this.wHeight = wrld.dims.height;

    this.statusBlock = {
      searchFood: true,
      searchMate: true,
      hunting: true,
      eating: false,
      sprint: false,
      sleeping: false,
      attack: false,
      deathProc: false

    }

    this.dataBlock = {//  status block 
      health: 100,
      isDead: false,
      nourishment: 100,
      lifeSpan: Math.random() * 3000,//  miliseconds
      age: 0,
      numOffspring: 3,
      maxSpeed: 1,
      maxSprintSpeed: 1,
      scentValue: 100,
      sightValue: 100,
      weight: 10,
    };

  }       //++++++++++++++++++++++++++++++++ end creature constructor

  //++++++++++++++++++++++++++++++++ creature methods
  run() {
    this.update();
    this.checkEdges();
    this.render();

    let d = this.loc.distance(this.closestTarget());
    if ((d > 10) && (d < 50000)) {
      this.flock(this.wrld.creatures.pred4);
      //console.log("Flocking");
    } else {
      // console.log("Here");
    }
  }

  update() {
    if (this.dataBlock.lifeSpan-- <= 0) {
      this.dataBlock.isDead = true;
    }
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.loc.add(this.vel);
    // Check if the position is updating correctly
    // console.log(this.loc.x, this.loc.y);
  }


  seek(target) {
    let desired = JSVector.subGetNew(target, this.loc);
    desired.normalize();
    desired.multiply(this.maxSpeed);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxForce);
   // console.log(steer);
    return (steer);
  }


  applyForce(force) {
    this.acc.add(force);
  }
  // arrive(target) {
  //   let desired = JSVector.subGetNew(target, this.loc);
  //   let d = desired.getMagnitude();
  //   desired.normalize();

  //   if (d < 100) {
  //   //  let m = map(d, 0, 100, 0, this.maxSpeed);
  //   let m = d;
  //     desired.mult(m);
  //   } else {
  //     desired.mult(this.maxSpeed);
  //   }

  //   let steer = JSVector.subGetNew(desired, this.vel);
  //   steer.limit(this.maxForce);

  //   this.applyForce(steer);
  // }



  flock(arr) {
    //  flock force is the accumulation of all forces
    this.flockForce = new JSVector(0, 0);
   // this.flockForce.add(this.seek(this.closestTarget));
    // set up force vectors to be added to acc
    let sep = this.separate(arr).copy();

    let ali = this.align(arr).copy();
    let coh = this.cohesion(arr).copy();
    // multipliersssss!!!!!!
    let sepMult = .9;
    let aliMult = .5;
    let cohMult = .15;
    //  calculate three forces
    sep.multiply(sepMult);
    ali.multiply(aliMult);
    coh.multiply(cohMult);
    //  add each of these to flockForce
    this.flockForce.add(sep);
    this.flockForce.add(ali);
    this.flockForce.add(coh);
   // 
    this.flockForce.limit(this.maxForce);
    this.applyForce(this.flockForce);
    //this.acc.add(this.flockForce);
    // console.log("flocking!");
  }
  //+++++++++++++++++++++++++++++++++  Flocking functions
  separate(arr) {
    let desiredseparation = 10;
    let sum = new JSVector();
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      let d = this.loc.distance(arr[i].loc);
      if ((d > 0) && (d <= desiredseparation)) {

        let diff = JSVector.subGetNew(this.loc, arr[i].loc);
        diff.normalize();
        if (d > 0.0001) {
          diff.divide(d * d);
          sum.add(diff);
          count++;
        }
      }
    }
    if (count > 0) {
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.maxSpeed);
      let steer = JSVector.subGetNew(sum, this.vel);
      steer.limit(this.maxForce);
      //console.log("steer");
      return steer;

    } else {
      return new JSVector(0, 0);
      //console.log("seeking");
      //return this.seek(this.closestTarget);
    }

  }
  align(arr) {
    let neighbordist = 10;
    let sum = new JSVector(0, 0);
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      let d = this.loc.distance(arr[i].loc);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(arr[i].vel);
        count++;
      }
    }
    if (count > 0) {
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.maxSpeed);
      let steer = JSVector.subGetNew(sum, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return new JSVector(0, 0);
    }
  }

  cohesion(arr) {
    let neighbordist = 50;
    let sum = new JSVector(0, 0);
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      let d = this.loc.distance(arr[i].loc);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(arr[i].loc);
        count++;
      }
    }
    if (count > 0) {
      sum.divide(count);
      return this.seek(sum);
    } else {
      return new JSVector(0, 0);
    }
  }

  hunt(target) {
    // A vector pointing from the location to the target
    let desired = JSVector.subGetNew(target, this.loc);
    let dir = JSVector.subGetNew(desired, this.vel);
    return dir;
  }
  closestTarget() {
    let distance = 0;
    let closestCreatureLoc = new JSVector(1000, 100);
    //  for (let i = 1; i < wrld.creatures.herb1.length; i++) {
    //  const currentDistance = this.loc.distance(wrld.creatures.herb1.length[i]);
    //  if (currentDistance < distance) {
    //    distance = creatures[i];
    //   distance = currentDistance;
    //  }
    // }
    //closestCreatureLoc = new JSVector(creatures[i].loc.x, creature[i].loc.y);
    closestCreatureLoc = new JSVector(1000, 100);

    return (closestCreatureLoc);

    // return(0,0)
    //return (distance, closestCreature);
    //
  }
  attack(target) {

  }
  checkEdges() {
    if (this.loc.x >= world.dims.width / 2 || this.loc.x <= -world.dims.width / 2) {
      this.vel.x *= -1;
    }
    if (this.loc.y >= world.dims.height / 2 || this.loc.y < -world.dims.height / 2) {
      this.vel.y *= -1;
    }
  }
  render() {
    //  render balls in world

    let ctx = this.ctx;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.vel.getDirection() + Math.PI / 2);
    ctx.beginPath();

    ctx.moveTo(0, -15);
    ctx.lineTo(-5, 5);
    ctx.lineTo(0, 0);
    ctx.lineTo(5, 5);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = this.clr;
    ctx.fill();
    ctx.restore();
    //  render balls in mini map
  }

  getRandomColor() {
    //  List of hex color values for movers
    let colors = [
      // "#7102AB",
      "#ab0256",
      "#0285ab",
      "#02ab1a",
      "#ab5302",
      "#773e26",
      "#ab0256",
      "#257874",
      "#78254e",
      "#787725",
      "#1102AB",
      "#000256",
      "#0200ab",
      "#77FFFF",
      "#ab0006",
      "#000874",
      "#782000"
    ];
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }
}