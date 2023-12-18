class Food7 extends Food{
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.clr = this.getRandomColor();
        this.ctx = wrld.ctxMain;
        this.size = sz;
    }
    run(){
        this.update();
        this.render();
    }
    update(){

    }
    render(){
        super.render();
        let ctx=this.ctx;
        let sz=this.size;
        ctx.beginPath();
        ctx.moveTo(this.loc.x-sz,this.loc.y-sz);
        ctx.lineTo(this.loc.x+sz,this.loc.y-sz);
        ctx.lineTo(this.loc.x+sz,this.loc.y+sz);
        ctx.lineTo(this.loc.x-sz,this.loc.y+sz);
        //ctx.closePath();
        ctx.strokeStyle="purple";
        ctx.stroke();
    }
}