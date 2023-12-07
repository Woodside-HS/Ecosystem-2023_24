class Pred1 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.hierarchy = 1;
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        this.wrld = wlrd;
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
            for (let i = 1; i < 4; i++) {
                let array = "pred" + i;
                for (let j = 0; j < array.length; j++) {
                    if (this.loc.distance(array[j].loc) < distance) {
                        target
                    }
                }
            }
        }
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.loc.add(this.vel);
    }



}