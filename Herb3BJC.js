class Herb3BJC extends Creature {
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        this.acc = new JSVector(0, 0);
        this.context = wrld.ctxMain;
        this.poisonDarts = [];
        this.col = "rgba(0, 255, 0, 0)";
    }

    run(){
        this.render();
        this.update();
        this.runDarts();
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
     //if close to pred
        this.loadDarts(direction);

    }

   loadDarts(direction){
    let dartCol = "rgba(128, 0, 128, 0)";
    let acc = new JSVector(0, 0);
    let vel = new JSVector(); //shoots in direction of predators
    let diam = 4;
    this.poisonDarts.push(new PoisonDartsBJC(this, dartCol, acc, vel, diam));

   }

   runDarts(){
    for (let i = 0; i < this.poisonDarts.length; i++) {
        this.poisonDarts[i].run();
    }
   }

}