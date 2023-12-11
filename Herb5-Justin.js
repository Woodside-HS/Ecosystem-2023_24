class Herb5 extends Creature{
    //remember to make this a flock
    //lets do something with spores
    constructor(loc,vel,sz,world){
        super (loc,vel,sz,world);
        this.loc = loc;
        this.vel = vel;
        this.acc = new JSVector(0, 0);
        this.clr = this.getRandomColor();
        this.size = sz;
        this.maxSpeed = .1;
        this.ctx = wrld.ctxMain;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
    }
    Herb5.prototype.align = function (vehicles) {
        let steer = new JSVector(0,0);
        let sum=new JSVector(0,0);
        let count=0;
        for(let i=0;i<vehicles.length;i++){
          if(this.loc.distance(vehicles[i].loc)<this.desiredAli&&vehicles[i]!==this){
            sum.add(vehicles[i].vel);
            count++;
          }
      
        }
        if(count>0){
          sum.divide(vehicles.length);
          sum.setMagnitude(this.maxSpeed);
          steer=JSVector.subGetNew(sum,this.vel);
          steer.limit(this.maxForce);
        }
        return steer;
      }
      
      Herb5.prototype.cohesion = function (vehicles) {
        let coh = new JSVector(0,0);
        let sum=new JSVector(0,0);
        let count=0;
        let d=this.loc.distance(vehicles[i].loc);
        for(let i=0;i<vehicles.length;i++){
          if(d<this.desiredCoh&&d>0){
            sum.add(vehicles[i].loc);
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
      
      Herb5.prototype.seek = function(target) {
        // A vector pointing from the location to the target
        let desired = JSVector.subGetNew(target,this.loc);  
        desired.normalize();
        desired.multiply(this.maxSpeed);
        let steer = JSVector.subGetNew(desired,this.vel);
        steer.limit(this.maxForce);
        return steer;
      }
}