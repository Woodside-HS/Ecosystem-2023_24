class Pred1 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.hierarchy = 1; //represents position in food chain
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        //this.wrld = wlrd;
        this.mode = "searching";


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
        let pt = new JSVector(120, 200);
        let orbitalRadius = this.orbitalRadius;

        if (this.mode == "searching") {
            this.vel.limit(this.maxSpeed * 2);
            this.vel.add(this.acc);
            this.loc.add(this.vel);
        }

        for (let i = 0; i < creatures.pred2.length; i++) {
            let target = creatures.pred2[i];
            let d = target.loc.distance(this.loc);
            if (d < 200 && d > orbitalRadius + 5 && target.dataBlock.isDead == false) {
                this.mode = "seeking";
                this.acc = JSVector.subGetNew(target.loc, this.loc);//setting acceleration vector toward it
                this.acc.normalize();
                this.acc.multiply(0.2);
                this.vel.limit(this.maxSpeed);
                this.vel.add(this.acc);
                this.loc.add(this.vel);
            } else if (d < orbitalRadius + 5 && this.mode != "searching" && target.dataBlock.isDead == false) {
                this.mode = "orbiting";
                if (!this.orbiting) {
                    this.angle = this.loc.angleBetween(target.loc);
                    this.orbiting = true;
                }
                this.angle += this.angularVelocity;
                this.orbitalRadius -= 0.7;
                this.loc.x = Math.cos(this.angle) * this.orbitalRadius + target.loc.x;
                this.loc.y = Math.sin(this.angle) * this.orbitalRadius + target.loc.y;
                target.vel.x -= 0.001;
                if (this.orbitalRadius < 3) {
                    target.dataBlock.isDead = true;
                    this.mode = "searching";
                }
            }
        }
    }



}