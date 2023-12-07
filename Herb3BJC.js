class Herb3BJC extends Creature {
    constructor(loc, vel, sz, wrld, lifeSpan){
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        this.context = wrld.ctxMain;
        this.lifeSpan = lifeSpan;

    }

    run(){
        this.render();
        this.update();
        this.defense(); //invisibility
        this.attack(); //poison darts
    }

    render(){
        let ctx = this.context;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(this.vel.getDirection() + Math.PI /2);
        ctx.beginPath();
        ctx.strokeStyle = this.col;
        ctx.fillStyle = this.col;
        ctx.moveTo(0, -15);
        ctx.lineTo(-5, 5);
        ctx.lineTo(0, 0);
        ctx.lineTo(5, 5);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    update(){
        lifeSpan -= 1;

    }

    defense(){

    }

    attack(){

    }
}