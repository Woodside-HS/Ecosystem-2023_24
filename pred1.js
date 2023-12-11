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
        let distance = 20; //radius of awareness
        if (target === false) {
            for (let i = 2; i < 4; i++) {
                let array = "pred" + i; //looping through the predators 2 and 3 within the creatures object literal in the world class
                console.log(array);
                for (let j = 0; j < creatures.pred2.length; j++) { //looping through the given predator array
                    if (creatures.pred2[j] != this && this.loc.distance(creatures.pred2[j].loc) < distance) { //checking if that predator is within distance of awareness
                        //target = true;
                        this.acc = JSVector.subGetNew(creatures.array[j].loc, this.loc);//setting acceleration vector toward it
                        this.acc.normalize();
                        this.acc.multiply(0.2);

                    }
                }
            }
        }
        // this.acc = JSVector.subGetNew(creatures.pred2[0].loc, this.loc);//setting acceleration vector toward it
        this.acc.normalize();
        this.acc.multiply(0.2);
        this.vel.limit(this.maxSpeed);
        this.vel.add(this.acc);
        this.loc.add(this.vel);
    }



}