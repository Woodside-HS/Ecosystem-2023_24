class Food7 extends Food{
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.clr = this.getRandomColor();
        this.ctx = wrld.ctxMain;
        this.size = sz;
        this.numTeleports=0;
    }
    run(){
        this.update();
        this.render();
    }
    update(){
        //teleport when health drops too much
        if(this.statBlock.health<=50||this.statBlock.health<=25||this.statBlock.health<=10&&this.numTeleports<3){
            let x=Math.random()*this.wWidth;
            let y=Math.random()*this.wHeight;
            this.loc.x=x;
            this.loc.y=y;
            this.numTeleports++;
        }
        
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
        ctx.closePath();
        ctx.strokeStyle="orange";
        ctx.stroke();
    }
}