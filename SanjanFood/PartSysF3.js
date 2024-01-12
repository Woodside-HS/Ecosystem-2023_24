function PartSysF3(x, y, world){
    this.world = world
    this.loc = new JSVector(x, y)
    this.locPart = new JSVector(x+1, y+1)
    this.locPartVel = new JSVector(3, 3)
    this.foods = []
    this.lifespan = 300
    this.i = 0
    this.ctx = world.ctxMain;

    


    // this.locationParticle = new JSVector(300, 300)
    // particle = new Particle(locationParticle, 100, 5)
    this.vel = new JSVector(Math.random() * 4 -2 , Math.random() * -3 -2)
    this.vel1 = new JSVector(Math.random() * 4 -2 , Math.random() * -3 -2)

    this.foods.push(new Food3(this.locPart.copy(), this.vel, 5, world))
    // this.foods.push(new Food3(new JSVector(200, 200), this.vel1, 5, world))
    this.foods.push(new Food3(this.locPart.copy(), this.vel1, 5, world))

    console.log(this.foods)

    this.limit = 0

}


PartSysF3.prototype.run = function(){

    this.checkEdges()

    this.i++

    let w = Math.floor(Math.random() * (500 - 100) ) + 100;   
    // console.log(w)

        if(this.limit % 20 == 0){

            let vels = new JSVector(Math.random() * 4 -2 , Math.random() * -3 -2)

            this.foods.push(new Food3(this.locPart.copy(), vels, 5, this.world))
        }



    // console.log("AHHH")
    // console.log(this.particles)
    this.update();

    this.limit ++
}

PartSysF3.prototype.update = function(){
    // particle.run();

    // console.log(this.foods)

    console.log(this.locPart.y )

    this.locPart.add(this.locPartVel)

    let ctx = this.ctx;
    ctx.strokeStyle = "rgba(255, 0, 0, 55)"
    ctx.fillStyle = "rgba(255, 0, 0, 55)"
    ctx.beginPath();
    ctx.arc(this.locPart.x, this.locPart.y, 0.2, Math.PI * 2, 0, false);
    ctx.stroke();
    ctx.fill() 

    for(let i = 0; i < this.foods.length; i++){
        if(this.foods[i].getLifeSpan() < 0){
            console.log("SPLICE")
            this.foods.splice(i, 1)
        } else {
            this.foods[i].run();

        }
    }

    // this.particles[0].run()
    // this.particles[1].run()
}

PartSysF3.prototype.checkEdges = function(){

    let newxVel = Math.abs(Math.random() * 2.5 -1)
    let newyVel = Math.abs(Math.random() * 2.5 -1)

    if(this.locPart.x > 800 && this.locPartVel.x > 0){
        // console.log("BREACHED")
        this.locPartVel.x *= -1 * newxVel
    } else if(this.locPart.x < 0 && this.locPartVel.x < 0){
        this.locPartVel.x *= -1 * newxVel
    } else if(this.locPart.y > 600 && this.locPart.y > 0){
        this.locPart.y = 599
        this.locPartVel.y *= -1 * newyVel
        // console.log("BREACHED")
    } else if(this.locPart.y < 0 && this.locPartVel.y < 0){
        this.locPartVel.y *= -1 * newyVel
    }

    

}



