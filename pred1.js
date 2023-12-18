class Pred1 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.hierarchy = 1; //represents position in food chain
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        //this.wrld = wlrd;


        this.orbitalRadius = 100;
        this.angularVelocity = 0.07;
        this.orbiting = false;
        this.angle;
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
        let orbitalRadius = this.orbitalRadius;
        let d = pt.distance(this.loc);

        for (let i = 0; i < creatures.pred2.length; i++) {
            let target = creatures.pred2[i];
            let d = target.loc.distance(this.loc);
            if (d < 200 && d > orbitalRadius + 5) {
                this.acc = JSVector.subGetNew(target.loc, this.loc);//setting acceleration vector toward it
                this.acc.normalize();
                this.acc.multiply(0.2);
                this.vel.limit(this.maxSpeed);
                this.vel.add(this.acc);
                this.loc.add(this.vel);
            } else if (d < orbitalRadius + 5) {
                if (!this.orbiting) {
                    this.angle = this.loc.angleBetween(target.loc);
                    this.orbiting = true;
                }
                this.angle += this.angularVelocity;
                this.orbitalRadius -= 0.2;
                this.loc.x = Math.cos(this.angle) * this.orbitalRadius + target.loc.x;
                this.loc.y = Math.sin(this.angle) * this.orbitalRadius + target.loc.y;
            } else {
                this.acc = new JSVector(0, 0);
                this.vel.limit(this.maxSpeed * 2);
                this.vel.add(this.acc);
                this.loc.add(this.vel);
            }
        }


    }



}