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
        this.dataBlock.health = 100;
        this.isDead;
        this.maxForce = 3.5;
        this.maxSpeed = 1.5;
        this.maxLifeSpan = this.dataBlock.lifeSpan;
        this.desiredSep = 16;
        this.clr = this.getRandomColor();
        this.numClose = 0;
        this.cc = false;
        this.health = 100
    }



    run() {
        this.update();
        this.render();
        this.flock(world.creatures.herb6LYT);
        this.checkEdges();
        this.bigFish();
        this.seekOthers();
        this.seekFoods();

    }
    seekFoods() {
        let dd = 80;
        if (this.dataBlock.health < 70 && this.numClose > 1) {

            for (let i = 0; i < world.foods.food4.length; i++) {

                let f4 = world.foods.food4[i];
                let oo = f4;
                let dist = this.loc.distance(oo.loc);
                if (dist < 30) {
                    this.vel = new JSVector(0, 0);

                    this.wrld.foods.food4[i].lifeSpan -= 50;
                    this.health += 0.5;
                }
                if (dd > dist && dist > 15) {

                    let t = new JSVector(oo.loc.x, oo.loc.y);//bro idk this is one of the only way I can get this to work
                    this.acc = JSVector.subGetNew(t, this.loc);

                    this.acc.normalize();
                    this.acc.multiply(0.235128);
                    this.vel.add(this.acc);
                    this.vel.limit(1.0);

                    this.loc.add(this.vel);

                }

            }
        }
    }

    seekOthers() {
        let dd = 120;
        let h4 = world.creatures.herb6LYT;
        for (let i = 0; i < h4.length; i++) {
            if (!this.cc && !h4[i].cc) {

                let oo = h4[i];
                if (this != oo) {
                    let dist = this.loc.distance(oo.loc);
                    if (dd > dist) {
                        let ee = JSVector.subGetNew(oo.loc, this.loc);
                        ee.normalize();
                        ee.multiply(0.20)
                        this.vel.add(ee);
                        this.vel.limit(1.5);
                        if (dist < 5) {//this number is giving me annoyance



                            let h4 = world.creatures.herb6LYT;

                            let x = this.loc.x;
                            let y = this.loc.y;
                            let dx = Math.random() * 2 - 1;
                            let dy = Math.random() * 2 - 1;

                            this.cc = true;
                            h4[i].cc = true;
  
                            if (h4.length < 1000) {
                                this.vel = new JSVector(0, 0);
                                setTimeout(() => {//idk I found this
                                    //bascially just waits x/1000 seconds thens runs the code
                                    let lc = new JSVector(x, y);
                                    let vl = new JSVector(dx, dy);
                                    h4.push(new Herb6FlockLYT(lc, vl, this.sz, this.wrld));
                                    let mature = h4[h4.length - 1];
                                    this.vel.x = Math.random() * 2 - 1;
                                    this.vel.y = Math.random() * 2 - 1;
                                    h4[h4.length - 1].cc = true;

                                    setTimeout(() => {//my brains hurting rn the logic this uses is incorrect
                                        this.cc = false;
                                        mature.cc = false;
                                    }, "2000");
                                }, "2500");//time in miliseconds




                            }
                        }
                    }
                }
            }

        }
    }
    bigFish() {
        let h4 = world.creatures.herb6LYT;
        this.numClose = 0;
        for (let i = 0; i < h4.length; i++) {
            let dist = this.loc.distance(h4[i].loc);

            if (dist < 75) {
                this.numClose++;

                if (this.numClose > 4) {
                    let ctx = this.ctx;
                    ctx.save();
                    ctx.translate(this.loc.x, this.loc.y)
                    ctx.strokeStyle = "rgba(255,0,0,0.08)";//overlapping causes this to be a lot thicker
                    ctx.beginPath();
                    ctx.arc(0, 0, 75, 0, Math.PI * 2, false);

                    ctx.closePath();
                    ctx.stroke();

                    ctx.restore();

                }
            }
        }

    }
    checkEdges() {//this does not work

        if (this.loc.x >= this.wrld.dims.width / 2 || this.loc.x <= -this.wrld.dims.width / 2) {
            this.vel.x *= -1;
            this.count++;
            if (this.count > 1000) {
                this.loc.x = Math.random() * this.wrld.dims.width - this.wrld.dims.width / 2;
                this.loc.y = Math.random() * this.wrld.dims.height - this.wrld.dims.height / 2;
                this.count = 0;
            }
        }
        if (this.loc.y >= this.wrld.dims.height / 2 || this.loc.y <= -this.wrld.dims.height / 2) {
            this.vel.y *= -1;
            this.count++;
            if (this.count > 1000) {
                this.loc.x = Math.random() * this.wrld.dims.width - this.wrld.dims.width / 2;
                this.loc.y = Math.random() * this.wrld.dims.height - this.wrld.dims.height / 2;
                this.count = 0;
            }
        }
    }

    flock(l) {

        let flockForce = new JSVector(0, 0);

        let sep = this.separate(l);
        let ali = this.align(l);
        let coh = this.cohesion(l);
        sep.multiply(6);
        ali.multiply(8);
        coh.multiply(4);
        //  add each of these to flockForce
        flockForce.add(sep);
        flockForce.add(ali);
        flockForce.add(coh);

        this.acc.add(flockForce);
    }
    update() {
        this.dataBlock.health = this.health * (this.dataBlock.lifeSpan / this.maxLifeSpan);
        this.vel.add(this.acc);
        this.vel.limit(0.5);
        this.loc.add(this.vel);
        if (this.dataBlock.lifeSpan > 2000) {
            this.dataBlock.lifeSpan--;
            this.health -= 0.02;
        }
        if (this.dataBlock.lifeSpan < 2000 || this.dataBlock.health < 30) {
            this.isDead = true;
        }

    }

    render() {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y)
        ctx.rotate(this.vel.getDirection() + Math.PI / 2)
        ctx.strokeStyle = "rgba(0,0,0,1)";//idk black outline looks better rn for me

        ctx.fillStyle = this.clr;
        ctx.beginPath();


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
        let neighbordist = 50;
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