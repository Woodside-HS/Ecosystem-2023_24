class PoisonDartsBJC {
    constructor(parent, dartCol, acc, vel, diam){
        this.loc = parent.loc.copy();
        this.col = dartCol;
        this.acc = acc;
        this.vel = vel;
        this.diam = diam;
        this.lifeSpan = 300;
    }

    run(){
        this.update();
        this.render();
    }

    update(){
        this.acc = new JSVector(0, 0.06);
        this.vel.add(this.acc);
        this.vel.limit(4)
        this.loc.add(this.vel);
        this.lifeSpan -= 1;
    }

    render(){
        context.strokeStyle = this.col;
        context.fillStyle = this.col;
        context.beginPath();
        context.arc(this.loc.x, this.loc.y, this.diam, Math.PI * 2, 0);
        context.stroke();
        context.fill();
    }
}