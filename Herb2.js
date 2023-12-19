class Herb2 extends Creature{
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld)

        this.loc = loc
        this.vel = vel
        this.targetLoc = new JSVector(100, 100)
    }

    run(){
        super.run()
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    update(){

        let runAway = false

        let num = getRndInteger(0, 1)
        console.log(num)

        // let targetLoc = new JSVector(100, 100)

        if(this.loc.distance(this.targetLoc) < 100){
            let randX = Math.floor(Math.random() * (800 - 0 + 1) + 0);
            let randY = Math.floor(Math.random() * (600 - 0 + 1) + 0);

            this.targetLoc = new JSVector(randX, randY)
        }

        let dir = JSVector.subGetNew(this.targetLoc, this.loc)


        // dir.multiply(0.1)
        // let acceleration = dir;
        // this.vel.add(acceleration)
        // this.loc.add(this.vel)
        // let dir = JSVector.subGetNew(targetLoc, this.loc)

        let ctx = this.ctx;
        ctx.strokeStyle = "rgba(255, 0, 0, 55)"
        ctx.fillStyle = "rgba(255, 0, 0, 55)"
        ctx.beginPath();
        ctx.arc(this.targetLoc.x, this.targetLoc.y, 10, Math.PI * 2, 0, false);
        ctx.stroke();
        ctx.fill() 

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
            let newVel = new JSVector(1, 1)
            this.loc.add(newVel)
        }
        

    }
}