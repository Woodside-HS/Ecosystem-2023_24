class Bone{

    constructor(loc, sz, wrld){
        this.loc = loc;
        this.sz = sz;
        this.wrld = wrld;
        this.ctx = wrld.ctxMain;

    }

    run(){
        this.render();
    }
    render(){
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate();
        ctx.strokeStyle = "rgba(0,0,0,1)";//idk black outline looks better rn for me
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.rect(0, 0, this.sz, this.sz);
        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }
    update(){

    }
}