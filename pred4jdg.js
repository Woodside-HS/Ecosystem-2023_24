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
        this.maxSpeed = 1;
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
        this.flock(this.wrld.creatures.pred4);
        //if(this.closestTarget() );
        //console.log("running");
    }

    update() {
        if (this.dataBlock.lifeSpan-- <= 0) {
            this.dataBlock.isDead = true;
        }
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.loc.add(this.vel);

    }


    flock(array) {
        //  flock force is the accumulation of all forces
        this.flockForce = new JSVector(0, 0);
        // set up force vectors to be added to acc
        let sep = this.separate(array);
        let ali = this.align(array);
        let coh = this.cohesion(array);
        // multipliersssss!!!!!!
        let sepMult = 10;
        let aliMult = 25.5;
        let cohMult = 1;
        //  calculate three forces
        sep.multiply(sepMult);
        ali.multiply(aliMult);
        coh.multiply(cohMult);
        //  add each of these to flockForce
        this.flockForce.add(sep);
        this.flockForce.add(ali);
        this.flockForce.add(coh);
        this.acc.add(this.flockForce);
       // console.log("flocking!");
    }
    //+++++++++++++++++++++++++++++++++  Flocking functions
    separate(array) {
        let escapeVector = new JSVector(0, 0);
        let count = 0;
        let dir = new JSVector();
        for (let i = 0; i < array.length; i++) {
            let distance = this.loc.distance(array[i].loc);
            if (distance > 0 && distance < this.desiredSep) {
                let oppVector = JSVector.subGetNew(this.loc, array[i].loc);
                oppVector.normalize();
                oppVector.divide(distance);
                escapeVector.add(oppVector);
                count++;
            }
        }
        if (count > 0) {
            escapeVector.divide(count);
            escapeVector.normalize();
            escapeVector.multiply(this.maxSpeed);
            dir = JSVector.subGetNew(escapeVector, this.vel);
            dir.limit(this.maxForce);
        }
       //console.log("separating!");
        return dir;
    }

    align(array) {
        let sum = new JSVector(0, 0);
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            let distance = this.loc.distance(array[i].loc);
            if (distance > 0 && distance < 50) {
                sum.add(array[i].vel);
                count++;
            }
        }
        if (count > 0) {
            sum.divide(count);
            sum.normalize();
        }
        //console.log("aligning!");
        return sum;
    }
  
cohesion(array) {
    let seekVector = new JSVector(0, 0);
    let count = 0;
    let dir = new JSVector();
    for (let i = 0; i < array.length; i++) {
        let distance = this.loc.distance(array[i].loc);
        if (distance > 0 && distance < 50) {
            let oppVector = JSVector.subGetNew(array[i].loc, this.loc);
            oppVector.normalize();
            oppVector.divide(distance);
            seekVector.add(oppVector);
            count++;
        }
    }
    if (count > 0) {
        seekVector.divide(count);
        seekVector.normalize();
        seekVector.multiply(this.maxSpeed);
        dir = JSVector.subGetNew(seekVector, this.vel);
        dir.limit(this.maxForce);
    }
    //console.log("cohesioning!");
    return dir;
}

 hunt(target) {
    // A vector pointing from the location to the target
    let desired = JSVector.subGetNew(target, this.loc);
    let dir = JSVector.subGetNew(desired, this.vel);
    return dir;
}
 closestTarget() {
    let distance = 0;
    let closestCreature;
    for (let i = 1; i < wrld.creatures.herb1.length; i++) {
        const currentDistance = this.loc.distance(wrld.creatures.herb1.length[i]);
        if (currentDistance < distance) {
            distance = creatures[i];
            distance = currentDistance;
        }
    }
    return (distance, closestCreature);
}
 attack(target) {

}
//+++++++++++++++++++++++++++++++++  Flocking functions
/* 
 Vehicle.prototype.render = function () {
     let ctx = game.ctx;
     ctx.save();
     ctx.translate(this.loc.x, this.loc.y);
     ctx.rotate(this.vel.getDirection() + Math.PI / 2); //offset 90 degrees
     ctx.beginPath();
     ctx.strokeStyle = this.clr;
     ctx.fillStyle = this.clr;
     ctx.moveTo(0, -this.scl);
     ctx.lineTo(-this.scl, this.scl);
     ctx.lineTo(0, 0);
     ctx.lineTo(this.scl, this.scl);
     ctx.closePath();
     ctx.stroke();
     ctx.fill();
     ctx.restore();
 }
 */
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
    ctx.beginPath();
    ctx.fillStyle = this.clr;
    ctx.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI, false);
    ctx.fill();
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
        "#02ab00",
        "#AAAA02",
        "#77FFFF",
        "#ab0006",
        "#000874",
        "#782000"
    ];
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
 }