//Yoyo food

class Food4YBR extends Food{ //THESE ARE THE PARTCLES THAT ARE SHOT OUT. NOT THE ACTUAL SYSTEM
    constructor(loc, vel, sz, wrld, ranNum) {
        super(loc, vel, sz, wrld)
        this.loc = new JSVector(loc.x, loc.y);
        this.vel = vel;
        this.acc = new JSVector(0, 0);
        this.wrld = wrld;
        this.r = 5;
        this.lifeSpan = 4500;
        this.ctx = wrld.ctxMain;
        this.ranNum = ranNum;
        this.cellType;
        this.colList = ['rgba(59, 163, 62, 1)', 'rgba(141, 64, 161, 1)', 'rgba(52, 117, 130, 1)'];
    }

    run() {
        this.render();
        this.update();
        this.checkEdges();
    }

    checkEdges() {
        // bounce on walls
        if (this.loc.x >= this.wrld.dims.width / 2 || this.loc.x <= -this.wrld.dims.width / 2) {
            this.vel.x *= -1;
          }
          if (this.loc.y >= this.wrld.dims.height / 2 || this.loc.y < -this.wrld.dims.height  / 2) {
            this.vel.y *= -1;
          }
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
        
        this.lifeSpan--;
        

        // this to tell what type each cell is for creature that will eat the cells
        if(this.ranNum <= 10){
            this.cellType = "Poison";
            this.vel.multiply(0.968);
        } else if(this.ranNum <= 14){
            this.cellType = "Healthy";
            this.vel.multiply(0.999);
        } else if(this.ranNum > 14){
            this.cellType = "Antibody";
            this.vel.multiply(0.993);
        }
    }
}
