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
        let radiusOfAwareness = 200; //radius of awareness
        let orbitalRadius = 100;
        let d = pt.distance(this.loc);
        console.log(d);
        if (d < radiusOfAwareness && d > orbitalRadius) {
            this.acc = JSVector.subGetNew(pt, this.loc);//setting acceleration vector toward it
            this.acc.normalize();
            this.acc.multiply(0.02);
            this.vel.limit(this.maxSpeed);
        } else {
            this.acc = new JSVector(0, 0);
            this.vel.limit(this.maxSpeed * 2);
        }
        this.vel.add(this.acc);
        this.loc.add(this.vel);
    }



}