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
}