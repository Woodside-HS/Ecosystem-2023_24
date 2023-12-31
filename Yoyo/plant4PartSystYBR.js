class Plant4YBR {
    constructor(world, x, y) {
        this.wrld = world;
        this.ctx = this.wrld.ctxMain;
        this.loc = new JSVector(x, y);
        this.foods4 = [];
        this.r = 15;
        this.loadParticle(1);
        this.shootCount = 0; // determines time when particle is shot out
        this.pollenCount = 0; // determines whether
    }

    run() {
        this.render();
        this.update();
        this.runParticle();

        if (this.shootCount === 600) {
            this.loadParticle(1);
            this.shootCount = 0;
        }
    }

    render() {
        //Renders in the system
        let ctx = this.ctx;
        
        ctx.strokeStyle = 'rgba(43, 196, 84, 1)'
        ctx.fillStyle = 'rgba(43, 196, 84, 1)'
        ctx.beginPath();
        //creates base
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.roundRect(this.loc.x, this.loc.y, 6, 80, 60)
        ctx.strokeStyle = 'rgba(102, 224, 54, 1)'
        //left top branch
        ctx.moveTo(this.loc.x , this.loc.y + 20)
        ctx.lineTo(this.loc.x-40, this.loc.y - 30)

        // right top branch
        ctx.moveTo(this.loc.x, this.loc.y + 40)
        ctx.lineTo(this.loc.x + 30, this.loc.y - 20)

        //left bottom branch
        ctx.moveTo(this.loc.x , this.loc.y + 55)
        ctx.lineTo(this.loc.x-40, this.loc.y + 15)

        // right bottom branch
        ctx.moveTo(this.loc.x, this.loc.y + 60)
        ctx.lineTo(this.loc.x + 40, this.loc.y - 10)
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        // Flower
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(94, 69, 0, 1)'
        ctx.fillStyle = 'rgba(94, 69, 0, 1)'
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.arc(this.loc.x, this.loc.y, this.r, Math.PI * 2, 0);
        

        
  
    }

    update() {
        this.shootCount++;

        /*
        This chonky piece of code is the reproduction system, which checks whether any
        cells created are healthy, and if it is, it checks if there is another one,
        and if there is one near it then it will create a new particle system.
        */

        for (let i = 0; i < this.foods4.length; i++) { // traverse particle array once
            if (this.foods4[i].cellType === "Healthy") { //find healthy particle
                for (let k = 0; k < this.foods4.length; k++) { //traverse particle array second time
                    if (this.foods4[k].cellType === "Healthy" && this.foods4[k] != this.foods4[i]) { // find dif healthy particle
                        let dist = this.foods4[i].loc.distance(this.foods4[k].loc);
                        if (dist <= 100) {
                            this.pollenCount++;
                            if (this.pollenCount === 10) {
                                this.wrld.foods.food4.push(new Plant4YBR(this.wrld, this.foods4[i].loc.x, this.foods4[k].loc.y));
                            }
                        }
                    }
                }
            }
        }
    }

    loadParticle(n) { // loads all the foods4 particles into the array
        for (let i = 0; i < n; i++) {
            let ranNum = Math.random() * (15 - 1) + 1
            let vel = new JSVector(Math.random() * 6 - 3, Math.random() * 6 - 3);
            let r = 10;
            this.foods4.push(new Food4YBR(this.loc, vel, r, this.wrld, ranNum));
        }
    }

    runParticle() {
        for (let i = 0; i < this.foods4.length; i++) { // runs all the particles
            this.foods4[i].run();
        }

        for (let i = 0; i < this.foods4.length; i++) { // if the lifespan is 0 or less, remove that foods4   particle
            if (this.foods4[i].lifeSpan <= 0) {
                this.foods4.splice(i, 1);
            }
        }
    }
}
