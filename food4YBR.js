//Yoyo food

class Food4 extends Food{ //THESE ARE THE PARTCLES THAT ARE SHOT OUT. NOT THE ACTUAL SYSTEM
    constructor(loc, vel, sz, wrld, ranNum) {
        super(loc, vel, sz, wrld)
        this.loc = new JSVector(loc.x, loc.y);
        this.vel = vel;
        this.acc = new JSVector(0, 0);
        this.wrld = wrld;
        this.r = sz;
        this.ctx = wrld.ctxMain;
        this.ranNum = ranNum;
        this.lifeSpan = food.statBlock.lifeSpan;
        this.cellType;
        this.colList = ['rgb(59, 163, 62)', 'rgb(141, 64, 161)', 'rgb(52, 117, 130)'];
    }

    run() {
        this.render();
        this.update();
        this.checkEdges();

    }

    checkEdges() {
        // bounce on walls
        if (this.loc.x > this.wrld.width) this.vel.x = -this.vel.x;
        if (this.loc.x < 0) this.vel.x = -this.vel.x;
        if (this.loc.y > this.wrld.height) this.vel.y = -this.vel.y;
        if (this.loc.y < 0) this.vel.y = -this.vel.y;
    }

    render() { // render movers
        let ctx = this.ctx;
        if (this.ranNum <= 10) { // poison particles
            ctx.strokeStyle = this.colList[1];
            ctx.fillStyle = this.colList[1];
            ctx.beginPath();
            ctx.arc(this.loc.x, this.loc.y, this.r, Math.PI * 2, 0);
            ctx.stroke();
            ctx.fill();
        } else if(this.ranNum <= 14){ // healthy/reproduction particles
            ctx.strokeStyle = this.colList[0];
            ctx.fillStyle = this.colList[0];
            ctx.beginPath();
            ctx.arc(this.loc.x, this.loc.y, this.r, Math.PI * 2, 0);
            ctx.stroke();
            ctx.fill();
        } else if(this.ranNum > 14){ //antibody particles
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
        this.vel.add(this.acc);
        this.statBlock.lifeSpan--;

        if(this.ranNum <= 10){
            this.cellType = "Poison";
        } else if(this.ranNum <= 14){
            this.cellType = "Healthy";
        } else if(this.ranNum > 14){
            this.cellType = "Antibody";
        }

    }

    
        
    
}