class PartSyst {
    constructor(world,x, y) {
        this.wrld = world;
        this.ctx = this.wrld.ctxMain;
        this.loc = new JSVector(x, y);
        this.food4 = [];
        this.loadParticle(1);
        this.count = 0;
    }

    run() {
        this.render();
        this.update();
        this.runParticle();
        if(this.count == 600){
            this.loadParticle(1);
            this.count = 0;
        }
       
    }

    render() {
        //Renders in the system
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, this.r, Math.PI * 2, 0);
        ctx.stroke();
        ctx.fill();
    }

    update(){
        this.count ++;
        

    }

    loadParticle(n) { // loads all the food4 particles into the array
        for (let i = 0; i < n; i++) {
            let ranNum = Math.random() * (15 - 1) + 1
            let vel = new JSVector(Math.random() * 6 - 3, Math.random() * 6 - 3);
            let r = 10;
            this.food4.push(new Food4(this.loc, vel, r, this.wrld, ranNum));
        }
    }

    runParticle() {
        for (let i = 0; i < this.food4.length; i++) { // if the lifespan is 0 or less, remove that food4 particle
            if (this.lifespan <= 0) {
                this.food4[i].splice(i, 1);
            }
        }

        for (let i = 0; i < this.food4.length; i++) { // runs all the particles
            this.food4[i].run();
        }
    }
}
