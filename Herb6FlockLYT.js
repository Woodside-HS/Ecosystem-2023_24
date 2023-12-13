//Logan 121223
class Herb6FlockLYT extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.acc = new JSVector(0, 0);
        this.wrld = wrld;
        this.acc = new JSVector(0, 0);
        this.sz = sz;
        this.dataBlock.lifeSpan = 12000;
        this.dataBlock.health;
        this.dataBlock.isDead;
        this.maxForce = 3.5;
        this.maxSpeed = 1.5;
        this.maxLifeSpan = this.dataBlock.lifeSpan;
        this.desiredSep = 25;
        this.clr = this.getRandomColor();
        this.count;
    }



    run() {
        this.update();
        this.render();
        this.flock(world.creatures.herb6);
        this.checkEdges();
    }
    checkEdges() {//idk the creature checkEdges does not work very well

        if (this.loc.x >= this.wrld.dims.width / 2 || this.loc.x <= -this.wrld.dims.width / 2) {
            this.vel.x *= -1;
        }
        if (this.loc.y >= this.wrld.dims.height / 2 || this.loc.y <= -this.wrld.dims.height / 2) {
            this.vel.y *= -1;

        }
    }

    flock(l) {

        let flockForce = new JSVector(0, 0);

        let sep = this.separate(l);
        let ali = this.align(l);
        let coh = this.cohesion(l);
        sep.multiply(3);
        ali.multiply(5);
        coh.multiply(3);
        //  add each of these to flockForce
        flockForce.add(sep);
        flockForce.add(ali);
        flockForce.add(coh);

        this.acc.add(flockForce);
    }
    update() {
        this.vel.add(this.acc);
        this.vel.limit(0.5);
        this.loc.add(this.vel);

    }

    render() {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y)
        ctx.rotate(this.vel.getDirection() + Math.PI / 2)
        ctx.strokeStyle = "rgba(0,0,0,1)";//idk black outline looks better rn for me

        ctx.fillStyle = this.clr;
        ctx.beginPath();




        // this.sz *= this.health;
        //ill attempt to get with to work but so far this is going to be very annoying 
        ctx.moveTo(-this.sz * 4, 0, this.sz, Math.PI * 2, 0, false);
        ctx.ellipse(-this.sz * 4, 0, this.sz * 1.2, this.sz * 7, Math.PI * 0.75, 0, Math.PI * 2);
        ctx.moveTo(this.sz * 4, 0, this.sz, Math.PI * 2, 0, false);
        ctx.ellipse(this.sz * 4, 0, this.sz * 1.2, this.sz * 7, -Math.PI * 0.75, 0, Math.PI * 2);
        ctx.moveTo(0, this.sz * 8)
        ctx.ellipse(0, this.sz * 8, this.sz * 2, this.sz * 5, Math.PI, 0, Math.PI * 2);
        ctx.moveTo(this.sz * 5, this.sz * 7)
        ctx.ellipse(this.sz * 5, this.sz * 7, this.sz * 2, this.sz * 5, Math.PI * 0.75, 0, Math.PI * 2);
        ctx.moveTo(-this.sz * 5, this.sz * 7);
        ctx.ellipse(-this.sz * 5, this.sz * 7, this.sz * 2, this.sz * 5, -Math.PI * 0.75, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();

    }

    separate(l) {
        let count = 0;

        let sum = new JSVector(0, 0);
        for (let i = 0; i < l.length; i++) {
            let d = this.loc.distance(l[i].loc);
            if (d < 2 && d > 0) {//really stupid way of fixxing a bug
                this.loc.x = Math.random() * world.dims.width;
                this.loc.y = Math.random() * world.dims.height;
            }
            if (d > 0 && d < this.desiredSep) {
                let diff = JSVector.subGetNew(this.loc, l[i].loc);

                diff.normalize();
                sum.add(diff);
                count++;
            }

        }
        if (count > 0) {
            sum.divide(count);
            sum.multiply(this.maxSpeed);
            let steer = JSVector.subGetNew(sum, this.vel);
            steer.limit(this.maxForce);
            return steer;
        }
        return new JSVector(0, 0);

    }

    align(l) {
        let count = 0;
        let neighbordist = 70;
        let sum = new JSVector(0, 0);
        let steer = new JSVector(0, 0);
        for (let i = 0; i < l.length; i++) {
            let d = this.loc.distance(l[i].loc)
            if ((d > 0) && (d < neighbordist)) {
                sum.add(l[i].vel);
                count++;
            }
        }
        if (count > 0) {
            sum.divide(count);
            sum.normalize();
            sum.multiply(this.maxSpeed);
            steer = JSVector.subGetNew(sum, this.vel)
            steer.limit(this.maxForce);
            return steer;
        }
        return new JSVector(0, 0);

    }


    cohesion(l) {
        let neighbordist = 50;
        let sum = new JSVector(0, 0);
        let count = 0;
        for (let i = 0; i < l.length; i++) {
            let d = this.loc.distance(l[i].loc)

            if ((d > 0) && (d < neighbordist)) {
                sum.add(l[i].loc);
                count++;
            }
        }
        if (count > 0) {
            sum.divide(count);
            return this.seek(sum);
        } else {
            return new JSVector(0, 0)
        }

    }

    seek(target) {
        let desired = JSVector.subGetNew(target, this.loc);
        desired.normalize();
        desired.multiply(this.maxSpeed);
        let steer = JSVector.subGetNew(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }
}