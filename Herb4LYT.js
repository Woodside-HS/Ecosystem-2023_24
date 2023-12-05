//This Herb is going to be a Gazelle 
//It has horns and the ability to burst leaping speed
//Logan Thomas 12523
class Herb4LYT extends Creature{
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.world = wrld;
    }
    run() {
        this.render();
        this.update();
        this.checkEdges();
    }
    render() {
        let ctx = context;
        ctx.strokeStyle = this.getRandomColor();
        console.log(this.getRandomColor())
        ctx.fillStyle = this.getRandomColor();
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, this.sz, Math.PI * 2, 0, false);
        ctx.stroke();
        ctx.fill();

    }
    update(){

    }
    checkEdges() {
        if (this.loc.x >= world.dims.width / 2 || this.loc.x <= -world.dims.width / 2) {
           this.vel.x *= -1;
        }
        if (this.loc.y >= world.dims.height / 2 || this.loc.y < -world.dims.height / 2) {
           this.vel.y *= -1;
        }
     }
}