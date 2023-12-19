class Pred1 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.hierarchy = 1; //represents position in food chain
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        //this.wrld = wlrd;
        this.mode = "searching"; //whether the predator is searching for prey, has found prey, or is orbiting (killing) prey


        this.orbitalRadius = 100;
        this.angularVelocity = 0.07;
        this.orbiting = false;  //tells if the object is currently orbiting or not
        this.angle;
    }

    run() {
        this.update();
        super.checkEdges();
        this.render();
    }


    update() {
        let creatures = this.wrld.creatures; //passing in array of creatures in global world
        let orbitalRadius = this.orbitalRadius; //passing in orbital radius into simpler variable

        if (this.mode == "searching") { //runs block iff predator is in searching mode
            //this is just regular straight-line movement
            this.vel.limit(this.maxSpeed);
            this.vel.add(this.acc);
            this.loc.add(this.vel);
        }

        for (let i = 0; i < creatures.pred2.length; i++) { //running through array of pred2s
            let target = creatures.pred2[i]; //making target variable equal to the predator in question
            let d = target.loc.distance(this.loc); //calculating the distance between itself and the predator
            if (d < 200 && d > orbitalRadius + 5 && target.dataBlock.isDead == false) { //if the target is within 200 pixels and isn't dead
                this.mode = "seeking"; //turns to seeking mode
                this.acc = JSVector.subGetNew(target.loc, this.loc);//setting acceleration vector toward target
                this.acc.normalize();
                this.acc.multiply(0.2);
                this.vel.limit(this.maxSpeed);
                this.vel.add(this.acc);
                this.loc.add(this.vel);
            } else if (d < orbitalRadius + 5 && this.mode != "searching" && target.dataBlock.isDead == false) { //if target is within the orbital radius and it isn't in searching mode
                this.mode = "orbiting"; //puts it into orbiting mode

                if (!this.orbiting) { //this is just a way to only calculate this.angle once
                    this.angle = this.loc.angleBetween(target.loc);
                    this.orbiting = true;
                }
                this.angle += this.angularVelocity; //changing angle to make it rotate
                this.orbitalRadius -= 0.7; //slowly decreasing orbital radius
                this.loc.x = Math.cos(this.angle) * this.orbitalRadius + target.loc.x; //code for orbital x-location 
                this.loc.y = Math.sin(this.angle) * this.orbitalRadius + target.loc.y; //code for orbital y-location
                //slowly decreases the velocity of the target
                target.vel.x -= 0.001;
                target.vel.y -= 0.001;

                if (this.orbitalRadius < 3) { //once the orbital radius is very small
                    target.dataBlock.isDead = true; //kills the target
                    this.mode = "searching"; //reverts to search mode
                    this.orbiting = false; //deactivates orbiting mode
                    this.acc = new JSVector(0, 0); //reverts acceleration so that checkEdges will work
                }
            }
        }
        console.log(this.acc.x + ", " + this.acc.y);
    }



}