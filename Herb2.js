class Herb2 extends Creature{
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld)

        this.loc = loc
        this.vel = vel
        this.targetLoc = new JSVector(100, 100)
        this.vec = new JSVector(200, 200)
        this.time = 0;
        this.timeDiff = 0;
        this.dontDoAnything = false
        this.foodRadii = 10
    }

    run(){
        super.run()
    }

    

    update(){
        this.time++

        let runAway = false



        // let targetLoc = new JSVector(100, 100)

        

        let ctx = this.ctx;
        ctx.strokeStyle = "rgba(255, 0, 0, 55)"
        ctx.fillStyle = "rgba(255, 0, 0, 55)"
        ctx.beginPath();
        ctx.arc(this.targetLoc.x, this.targetLoc.y, this.foodRadii, Math.PI * 2, 0, false);
        ctx.stroke();
        ctx.fill() 


        let dir = JSVector.subGetNew(this.targetLoc, this.loc)

        if (dir.getMagnitude() > 1) {
            dir.setMagnitude(1)

        }
        dir.multiply(0.5)
        let acceleration = dir;

        let radius = 75

        if(this.time % 75 == 0){
            this.vec = new JSVector(Math.floor(Math.random() * (800 - 0 + 1) + 0), Math.floor(Math.random() * (800 - 0 + 1) + 0))

        }

        ctx.strokeStyle = "rgba(255, 0, 0, 55)"
        ctx.fillStyle = "rgba(255, 0, 0, 55)"
        ctx.beginPath();
        ctx.arc(this.vec.x, this.vec.y, radius, Math.PI * 2, 0, false);
        ctx.stroke();
        ctx.fill() 

        let newrandX = Math.floor(Math.random() * (800 - 0 + 1) + 0);
        let newrandY = Math.floor(Math.random() * (600 - 0 + 1) + 0);
        let newRandVec = new JSVector(newrandX, newrandY)

        let dirNew = JSVector.subGetNew(newRandVec, this.loc)

        if (dirNew.getMagnitude() > 1) {
            dirNew.setMagnitude(1)

        }
        dirNew.multiply(1)

        if(this.loc.distance(this.vec) < radius){
            runAway = true
        }

        if(this.loc.distance(this.targetLoc) < 10){
            if(this.timeDiff == 0){
                this.timeDiff = this.time
                this.dontDoAnything = true
            }

            this.foodRadii-= 0.1

            if(this.time - this.timeDiff == 50){
                this.dontDoAnything = false
                this.timeDiff = 0
                this.foodRadii = 10
                let randX = Math.floor(Math.random() * (800 - 0 + 1) + 0);
                let randY = Math.floor(Math.random() * (600 - 0 + 1) + 0);
                this.targetLoc = new JSVector(randX, randY)
            }
           
        }

        if(!this.dontDoAnything){
            if(!runAway){
                this.vel.add(acceleration)
                this.vel.setMagnitude(3)
        
                this.loc.add(this.vel)
            } else {
                this.vel.add(dirNew)
                this.vel.setMagnitude(5)
        
                this.loc.add(this.vel)
            }
        } else {

        }

       
        

    }
}