//Yoyo food

class Food4 extends Food{ //THESE ARE THE PARTCLES THAT ARE SHOT OUT. NOT THE ACTUAL SYSTEM
    constructor(loc, vel, sz, wrld, ranNum) {
        super(loc, vel, sz, wrld)
        this.r = sz;
        this.ctx = wrld.ctxMain;
        this.ranNum = ranNum;
        this.cellType = ["Poison", "Antibody", "Healthy"];
        this.colList = ['rgb(59, 163, 62)', 'rgb(141, 64, 161)', 'rgb(52, 117, 130)'];
    }

    run() {
        this.render();
        this.update();
        // this.checkEdges();

    }

    checkEdges() {
        // bounce on walls
        if (this.loc.x > canvas.width) this.vel.x = -this.vel.x;
        if (this.loc.x < 0) this.vel.x = -this.vel.x;
        if (this.loc.y > canvas.height) this.vel.y = -this.vel.y;
        if (this.loc.y < 0) this.vel.y = -this.vel.y;
    }

    render() { // render movers
        let ctx = this.ctx;
        if (this.ranNums <= 3) { // poison particles
            ctx.strokeStyle = this.colList[1];
            ctx.fillStyle = this.colList[1];
            ctx.beginPath();
            ctx.arc(this.loc.x, this.loc.y, this.r, Math.PI * 2, 0);
            ctx.stroke();
            ctx.fill();
        } else if(this.ranNums <= 5){ // healthy/reproduction particles
            ctx.strokeStyle = this.colList[0];
            ctx.fillStyle = this.colList[0];
            ctx.beginPath();
            ctx.arc(this.loc.x, this.loc.y, this.r, Math.PI * 2, 0);
            ctx.stroke();
            ctx.fill();
        } else if(this.ranNums === 6){ //antibody particles
            ctx.strokeStyle = this.colList[2];
            ctx.fillStyle = this.colList[2];
            ctx.beginPath();
            ctx.arc(this.loc.x, this.loc.y, this.r, Math.PI * 2, 0);
            ctx.stroke();
            ctx.fill();
        }
    }

    update() {
        this.loc.add(this.vel);
        this.vel.limit(10)
        // this.vel.add(this.acc);
        this.lifespan--;
    }

    
        
    
}