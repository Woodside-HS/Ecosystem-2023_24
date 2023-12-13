class Herb5 extends Creature{
    //remember to make this a flock
    //lets do something with this.spores
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
    }
    run(){
        for(let i=0;i<this.spores.length;i++){
            this.spores[i].run();
        }
        super.checkEdges();
        this.render();
    }
    loadSpores(n){
        for(let i=0;i<n;i++){
            let dl=new JSVector(Math.random()*(5)-2,Math.random()*(5)-2);
            let dv=new JSVector(Math.random()*(3)-1,Math.random()*(3)-1);
            let l=JSVector.addGetNew(this.loc,dl);
            let v=JSVector.addGetNew(this.vel,dv);
            this.spores.push(new Spore(l,v,this.size,this.wrld,this));
        }
    }
    render(){
        let ctx=this.ctx;
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        for(let i=0;i<this.spores.length-1;i++){
            ctx.lineTo(this.spores[i+1].loc.x,this.spores[i+1].loc.y);
        }
        ctx.closePath();
        ctx.strokeStyle="red";
        ctx.stroke();
    }
}