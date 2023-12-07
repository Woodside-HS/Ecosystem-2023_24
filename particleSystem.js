class PartSyst {
    constructor(world, x, y) {
        this.wrld = world;
        this.ctx = this.wrld.ctxMain;
        this.loc = new JSVector(x, y);
        this.foods4 = [];
        this.loadParticle(1);
        this.shootCount = 0; // determines time when particle is shot out
        this.pollenCount = 0; // determines whether 
    }

    run() {
        this.render();
        this.update();
        this.runParticle();
        for (let i = 0; i < this.foods4.length; i++) {
            let temp = Math.floor(Math.random() *(2-1) +1 );
            if (this.shootCount == 600) {
                this.loadParticle(temp);
                this.shootCount = 0;
            }
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

    update() {
        this.shootCount++;
        // this chonky piece of code checks whether any cells created are healthy, 
        // and if it is, it checks if there is another one, and if there is one near it
        // then it will create a new particle system. This is the reproduction system.
        for (let i = 0; i < this.foods4.length; i++) {
            if (this.foods4[i].cellType === "Healthy") {
                for (let k = 0; k < this.foods4.length; k++) {
                    if (this.foods4[k].cellType === "Healthy" && this.foods4[k] != this.foods4[i]) {
                        let dist = this.foods4[i].loc.distance(this.foods4[k].loc);
                        if (dist <= 100) {
                            this.pollenCount++;
                            if (this.pollenCount === 1) {
                                this.wrld.foods.food4.push(new PartSyst(this.wrld, this.foods4[i].loc.x, this.foods4[k].loc.y));
                            }
                        }

                    }
                }
            }
        }
    }

    loadParticle(n) { // loads all the foods4    particles into the array
        for (let i = 0; i < n; i++) {
            let ranNum = Math.random() * (15 - 1) + 1
            let vel = new JSVector(Math.random() * 6 - 3, Math.random() * 6 - 3);
            let r = 10;
            this.foods4.push(new Food4(this.loc, vel, r, this.wrld, ranNum));
        }
    }

    runParticle() {
        for (let i = 0; i < this.foods4.length; i++) { // if the lifespan is 0 or less, remove that foods4   particle
            if (this.lifespan <= 0) {
                this.foods4[i].splice(i, 1);
            }
        }

        for (let i = 0; i < this.foods4.length; i++) { // runs all the particles
            this.foods4[i].run();
        }
    }
}
