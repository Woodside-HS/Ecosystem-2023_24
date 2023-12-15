class Herb4 extends Creature {
    constructor(loc, vel, sz, world) {
        super(loc, vel, sz, world);
        this.loc = loc;
        this.vel = vel;
        this.sz = 10;
        this.wrld = world;
        this.hunted = false;
        this.desiredSep = 30;
        this.scl = 10;
        this.clr = "rgba(244, 255, 43,.8)"

    }

    run(herbivore) {
        this.render();
        this.update();
        this.isHunted(); // need to wait since I don't have pred code yet.
        this.foodSeek();
        this.flock(herbivore);
        this.checkEdges();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(1);
        this.loc.add(this.vel);
    }

    render() {
        let ctx = this.wrld.ctxMain;
        
        ctx.strokeStyle = this.clr;
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, this.sz, Math.PI * 2, 0)
        ctx.stroke();
        ctx.fill();

    }

    isHunted() {

    }

    foodSeek() {

    }

    flock(herbivores) {
        //  flock force is the accumulation of all forces
        let flockForce = new JSVector(0, 0);

        // set up force vectors to be added to acc
        let sep = this.separate(herbivores);
        let ali = this.align(herbivores);
        let coh = this.cohesion(herbivores);

        sep.multiply(5);
        ali.multiply(6);
        coh.multiply(5);

        //  add each of these to flockForce
        flockForce.add(sep);
        flockForce.add(ali);
        flockForce.add(coh);
        this.acc.add(flockForce);
    }

    separate(h) {
        let sum = new JSVector(0, 0);
        let count = 0;
        for (let i = 0; i < h.length; i++) {
            let dist = this.loc.distance(h[i].loc);
            if (dist > 0 && dist < this.desiredSep) {
                let diff = JSVector.subGetNew(this.loc, h[i].loc)
                diff.normalize();
                // diff.divide(dist); // might be cause of some issues
                sum.add(diff);
                count++;
            }
        }

        if (count > 0) {
            sum.divide(count);
            sum.normalize();
            sum.multiply(200) //speed
            let steer = JSVector.subGetNew(sum, this.vel);
            steer.limit(30);
            return steer;
        }
        return new JSVector();
    }

    align(h) {
        let steer = new JSVector(0, 0);
        let neardist = 40;
        let count = 0;
        for (let i = 0; i < h.length; i++) {
            let d = this.loc.distance(h[i].loc);
            if (d > 0 && d <= neardist) {
                steer.add(h[i].vel);
                count++;
            }
        }

        if (count > 0) {
            steer.divide(count);
        }
        return steer;
    }

    cohesion(h) {
        let coh = new JSVector(0, 0);
        let neardist = 40;
        let count = 0;
        for (let i = 0; i < h.length; i++) {
            let dist = this.loc.distance(h[i].loc);
            if (dist > 0 && dist < neardist) {
                coh.add(h[i].loc);
                count++;
            }
        }

        if (count > 0) {
            coh.divide(count);
            return this.seek(coh);
        } else {
            return new JSVector(0, 0);
        }
    }

    seek(target) {
        // A vector pointing from the location to the target
        let desired = JSVector.subGetNew(target, this.loc);
        let steer = JSVector.subGetNew(desired, this.vel);
        return steer;
    }

    checkEdges() {
        if (this.loc.x >= this.wrld.dims.width / 2 || this.loc.x <= -this.wrld.dims.width / 2) {
            this.vel.x *= -1;
        }

        if (this.loc.y >= this.wrld.dims.height / 2 || this.loc.y < -this.wrld.dims.height / 2) {
            this.vel.y *= -1;
        }
    }




}