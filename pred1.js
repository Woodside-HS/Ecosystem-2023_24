class Pred1 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.hierarchy = 1;
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
        let creatures = this.wrld.creatures;
        let target;
        let distance = 30;
        if (target = false) {
            for (let i = 2; i < 4; i++) {
                let array = "pred" + i;
                for (let j = 0; j < array.length; j++) {
                    if (this.loc.distance(array[j].loc) < distance) {
                        target = true;
                        this.acc = JSVector.subGetNew(array[j].loc, this.loc);
                        this.acc.normalize();
                        this.acc.multiply(0.2);

                    }
                }
            }
        }
        this.vel.limit(this.maxSpeed);
        this.vel.add(this.acc);
        this.loc.add(this.vel);
    }



}