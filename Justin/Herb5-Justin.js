class Herb5 extends Creature{
    constructor(loc,vel,sz,wrld,n){
        super (loc,vel,sz,wrld);
        this.loc = loc;
        this.vel = vel;
        this.acc = new JSVector(0, 0);
        this.clr = this.getRandomColor();
        this.size = sz;
        this.maxSpeed = .1;
        this.ctx = wrld.ctxMain;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.spores=[];
        this.loadSpores(n);
        this.dataBlock.health=10000;
        this.antibodies=false;
        this.targetFoodIndex=Math.floor(Math.random()*20);
    }
    run(){//runs array of spores and subtracts health
        if(!this.isDead){
            for(let i=0;i<this.spores.length;i++){
                this.spores[i].run();
            }
            super.checkEdges();
            this.eat();
            this.render();
            this.update();
        }

    }
    loadSpores(n){//load array of circles
        for(let i=0;i<n;i++){
            let dl=new JSVector(Math.random()*(5)-2,Math.random()*(5)-2);
            let dv=new JSVector(Math.random()*(3)-1,Math.random()*(3)-1);
            let l=JSVector.addGetNew(this.loc,dl);
            let v=JSVector.addGetNew(this.vel,dv);
            this.spores.push(new Spore(l,v,this.size,this.wrld,this));
        }
    }
    update(){//subtracts health
        super.update();
        this.dataBlock.health-=0.1;
        if(this.dataBlock.health<0){
            this.isDead=true;
        }
    }
    render(){//trying to draw lines between each ball
    }
    eat(){
        if(this.loc.distance(this.wrld.foods.food7[this.targetFoodIndex].loc)<this.wrld.foods.food7[this.targetFoodIndex].sz){
            this.dataBlock.health++;
            this.wrld.food.food1.nourishment--;
        }
    }
}
class Spore extends Creature{
    constructor(loc,vel,sz,wrld,herb){
        super (loc,vel,sz,wrld);
        this.loc = loc;
        this.vel = vel;
        this.acc = new JSVector(0, 0);
        this.clr = herb.clr;
        this.size = sz;
        this.herb=herb;
        this.maxSpeed = .1;
        this.maxForce=2;
        this.ctx = wrld.ctxMain;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.desiredCoh=150;
        this.desiredSep=20;
        this.desiredAli=10;
    }
    run(){
        this.flock(this.herb.spores);
        super.update();
        if(this.wrld.foods.food7[this.herb.targetFoodIndex].statBlock.health!==0){
          this.acc.add(this.wrld.foods.food7[this.herb.targetFoodIndex].loc);
        }
        this.vel.limit(2);
        super.checkEdges();
        this.render();
    }
    flock(spores){
        //  flock force is the accumulation of all forces
        this.flockForce = new JSVector(0,0);
        // set up force vectors to be added to acc
        let sep = this.separate(spores);
        let ali = this.align(spores);
        let coh = this.cohesion(spores);
        //  add each of these to flockForce
        this.flockForce.add(sep);
        this.flockForce.add(ali);
        this.flockForce.add(coh);
        this.acc.add(this.flockForce);
    }
    separate(spores) {//separate
        let sep = new JSVector(0,0);
        let count=0;
        for(let i=0;i<spores.length;i++){
          let d=spores[i].loc.distance(this.loc);
          if(spores[i]!==this&&d<this.desiredSep){
            let diff=JSVector.subGetNew(this.loc,spores[i].loc)
            diff.divide(d);
            diff.normalize();
            sep.add(diff);
            count++;
          }
        }
        if(count>0){
          sep.divide(count);
        }
        
        return sep;
      }
    align(spores) {//alignment
        let steer = new JSVector(0,0);
        let sum=new JSVector(0,0);
        let count=0;
        for(let i=0;i<spores.length;i++){
          if(this.loc.distance(spores[i].loc)<this.desiredAli&&spores[i]!==this){
            sum.add(spores[i].vel);
            count++;
          }
      
        }
        if(count>0){
          sum.divide(spores.length);
          sum.setMagnitude(this.maxSpeed);
          steer=JSVector.subGetNew(sum,this.vel);
          steer.limit(this.maxForce);
        }
        return steer;
      }
      
      cohesion(spores) {//cohesion
        let coh = new JSVector(0,0);
        let sum=new JSVector(0,0);
        let count=0;
        for(let i=0;i<spores.length;i++){
            let d=this.loc.distance(spores[i].loc);
          if(d<this.desiredCoh&&d>0){
            sum.add(spores[i].loc);
            count++;
          }
      
        }
        if(count>0){
          sum.divide(count);
          return this.seek(sum);
        } else {
          return coh;
        }
      }
      
      seek(target) {
        // A vector pointing from the location to the target
        let desired = JSVector.subGetNew(target,this.loc);  
        desired.normalize();
        desired.multiply(this.maxSpeed);
        let steer = JSVector.subGetNew(desired,this.vel);
        steer.limit(this.maxForce);
        return steer;
      }
      render(){//draws each spore as a circle
        this.ctx.save();
        this.ctx.translate(this.loc.x, this.loc.y);
        this.ctx.rotate(this.vel.getDirection() + Math.PI / 2); //offset 90 degrees
        //this.ctx.clearRect(0,0,world.dims.width,world.dims.height);
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.clr;
        this.ctx.fillStyle = this.clr;
        this.ctx.ellipse(this.loc.x,this.loc.y,this.size,this.size,0,0,2*Math.PI);   
        this.ctx.closePath();
        //this.ctx.strokeStyle="red";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
      }
}