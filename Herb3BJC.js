// Bryan Calder
class Herb3BJC extends Creature {
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        this.acc = new JSVector(0, 0);
        this.context = wrld.ctxMain;
    //    this.poisonDarts = [];
       this.col = this.getRandomColor();
        this.colorState = false; //false = normal color, true = invisible for defense 
        this.antibodies = false;
        this.maxLifeSpan = this.dataBlock.lifeSpan;
    }

    run(){
        this.render();
        this.update();
        this.checkEdges();
      //  this.runDarts();
    }

    render(){
        let ctx = this.context;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(this.vel.getDirection() + Math.PI /2);
        ctx.beginPath();

        if(this.colorState == false){ //normal color
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        ctx.fillStyle = this.col;
        }

        if(this.colorState == true){ //invisible for defense
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        }

        ctx.moveTo(0, -20);
        ctx.lineTo(-10, 10);
        ctx.lineTo(0, 0);
        ctx.lineTo(10, 10);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    update(){

        if (this.dataBlock.lifeSpan >= 0) {
            this.dataBlock.lifeSpan -= 1.5;

        }
        if (this.dataBlock.lifeSpan <= 2000) {
            this.dataBlock.isDead = true;

        }

        this.dataBlock.health = (this.dataBlock.lifeSpan / this.maxLifeSpan) * 100;
        this.vel.add(this.acc);
        this.vel.limit(1.5);
        this.vel.multiply(this.dataBlock.health / 100);
        this.loc.add(this.vel);
        this.vel.divide(this.dataBlock.health / 100);

    //if close to pred
    if(this.colorState = false){
    for(let i = 0; i < world.creatures.pred1.length; i++){
        let dist1 = this.loc.distance(world.creatures.pred1[i].loc);
        //let direction = world.creatures.pred1[i].getDirection();
        if(dist1 <= 200){
        //this.loadDarts(direction); //shoot out poison darts to pred
        this.colorState = true; //turn invisible
        }
    }

    for(let i = 0; i < world.creatures.pred2.length; i++){
        let dist2 = this.loc.distance(world.creatures.pred2[i].loc);
        //let direction = world.creatures.pred2[i].getDirection();
        if(dist2 <= 200){
            //this.loadDarts(direction); 
            this.colorState = true; 
            }
    }

    for(let i = 0; i < world.creatures.pred3.length; i++){
        let dist3 = this.loc.distance(world.creatures.pred3[i].loc);
        //let direction = world.creatures.pred3[i].getDirection();
        if(dist3 <= 200){
           // this.loadDarts(direction);
            this.colorState = true;
            }
    }

}


    //if need food
    if(this.dataBlock.health < 100){
for(let i = 0; i < world.foods.food1; i++){
let dist = this.loc.distance(food1[i].loc);
if(dist<200){
    this.seek(food1[i].loc);
}

}
    }

    if(this.dataBlock.health < 100){
        for(let i = 0; i < world.foods.food2; i++){
        let dist = this.loc.distance(food1[i].loc);
        if(dist<200){
            this.seek(food1[i].loc);
        }
        
        }
            }


    }

    seek(target) {
        let desired = JSVector.subGetNew(target, this.loc);
        desired.normalize();
        desired.multiply(this.maxSpeed);
        let steer = JSVector.subGetNew(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

   loadDarts(direction){
    let dartCol = "rgba(128, 0, 128, 0)";
    let acc = new JSVector(0, 0);
    let vel = new JSVector(); //shoots in direction of predators
    let diam = 4;
    this.poisonDarts.push(new PoisonDartsBJC(this, dartCol, acc, vel, diam));

   }

   runDarts(){
    for (let i = 0; i < this.poisonDarts.length; i++) {
        this.poisonDarts[i].run();
    }
   }

}