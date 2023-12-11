class Pred1 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.hierarchy = 1; //represents position in food chain
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        //this.wrld = wlrd;
    }

    run() {
        this.update();
        super.checkEdges();
        this.render();
    }


    update() {
        let creatures = this.wrld.creatures; //passing in array of creatures in global world
        let target = false;
        let pt = new JSVector(120, 200);
        let distance = 100; //radius of awareness
        let d = pt.distance(this.loc);
        console.log(d);
        if (d < distance) {
            this.acc = JSVector.subGetNew(pt, this.loc);//setting acceleration vector toward it
            this.acc.normalize();
            this.acc.multiply(0.02);
        }
        this.vel.limit(this.maxSpeed);
        this.vel.add(this.acc);
        this.loc.add(this.vel);
    }



}