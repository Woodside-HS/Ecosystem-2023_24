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
        this.ctx = wrld.ctxMain;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.desiredCoh=100;
        this.desiredSep=20;
        this.desiredAli=10;
    }
    run(){
        this.flock(this.herb.spores);
        super.update();
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
    separate(spores) {
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
    align(spores) {
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
      
      cohesion(spores) {
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
      render(){
        this.ctx.save();
        this.ctx.translate(this.loc.x, this.loc.y);
        this.ctx.rotate(this.vel.getDirection() + Math.PI / 2); //offset 90 degrees
        //this.ctx.clearRect(0,0,world.dims.width,world.dims.height);
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.clr;
        this.ctx.fillStyle = this.clr;
        this.ctx.ellipse(this.loc.x,this.loc.y,this.size,this.size,0,0,2*Math.PI);
        // for(let i=0;i<this.herb.spores.length-1;i++){
        //     this.ctx.lineTo(this.herb.spores[i+1].loc.x,this.herb.spores[i+1].loc.y);
        // }
        this.ctx.closePath();
        //this.ctx.strokeStyle="red";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
      }
}