class Herb2 extends Creature{
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld)

        this.loc = loc
        this.vel = vel
    }

    run(){
        super.run()
    }

    update(){

        let runAway = false

        let targetLoc = new JSVector(100, 100)

        let dir = JSVector.subGetNew(targetLoc, this.loc)


        // dir.multiply(0.1)
        // let acceleration = dir;
        // this.vel.add(acceleration)
        // this.loc.add(this.vel)
        // let dir = JSVector.subGetNew(targetLoc, this.loc)
        if (dir.getMagnitude() > 1) {
            dir.setMagnitude(1)

        }
        dir.multiply(0.5)
        let acceleration = dir;



        if(!runAway){
            this.vel.add(acceleration)
            this.vel.setMagnitude(3)
    
            this.loc.add(this.vel)
        } else {
            let newVel = 
        }
        

    }
}