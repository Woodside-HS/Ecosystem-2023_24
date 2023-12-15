//Logan Thomas 12523
class Herb4LYT extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.wrld = wrld;
        this.acc = new JSVector(0, 0);
        this.sz = sz;
        this.cc = false; //why is this named cc
        this.eyeHeight = this.sz * 0.8;
        this.seyeHeight = this.eyeHeight;
        this.ssz = this.sz;
        this.ctx = wrld.ctxMain;
        this.clr = this.getRandomColor();//this is the body
        this.clr2 = this.getRandomColor();//this is the pupil 
        //the white part of the eye is always white 
        this.count = 0;
        this.gUP = true;//dumb way but only way I can think of 
        this.eUP = true;
        this.jumpDistance = 200;//this just states how long it takes to get from bottom-top-bottom
        this.dataBlock.lifeSpan = 8000;
        this.dataBlock.health;
        this.dataBlock.isDead = false;//do you even need to declare this as false?
        this.maxLifeSpan = this.dataBlock.lifeSpan;


    }
    run() {

        this.update();
        this.render();
        this.life();
        this.checkEdges();
        this.seekOthers();
        //this is very no no working
        //  this.seekFoods();
    }
    seekOthers() {

        if (this.dataBlock.health > 70) {

            let dd = 120;
            let h4 = world.creatures.herb4;
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
                            if (dist < 25) {//this number is giving me annoyance



                                let h4 = world.creatures.herb4;

                                //  let x = Math.random() * world.dims.width - world.dims.width / 2;
                                //  let y = Math.random() * world.dims.height - world.dims.height / 2;
                                let x = this.loc.x;
                                let y = this.loc.y;
                                let dx = Math.random() * 4 - 2;
                                let dy = Math.random() * 4 - 2;

                                this.cc = true;
                                h4[i].cc = true;
                                if (h4.length < 1000) {
                                    this.vel = new JSVector(0, 0);
                                    h4[i].vel = new JSVector(0, 0);

                                    setTimeout(() => {//idk I found this
                                        //bascially just waits x/1000 seconds thens runs the code
                                        h4.push(new Herb4LYT(new JSVector(x, y), new JSVector(dx, dy), this.sz, this.wrld));
                                        let mature = h4[h4.length - 1];
                                        this.vel.x = Math.random() * 2 - 1;
                                        this.vel.y = Math.random() * 2 - 1;
                                      
                                      //  h4[i].vel.x = Math.random() * 2 - 1;//ditto with the bottom comment this will not work if 
                                        //this parent dies in in this 2500 milisecond window
                                       // h4[i].vel.y = Math.random() * 2 - 1;
                                        h4[h4.length - 1].cc = true;

                                        setTimeout(() => {//my brains hurting rn the logic this uses is incorrect

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
    }



    seekFoods() {
        let dd = 120;
        if (this.dataBlock.health < 70) {
            let f4 = world.creatures.food4;
            for (let i = 0; i < f4.length; i++) {
                let oo = f4[i];
                let dist = this.loc.dist(oo.loc);
                if (dd < dist) {
                    let ee = JSVector.subGetNew(oo.loc);
                    ee.normalize();
                    ee.multiply(0.08)
                    this.vel.add(ee);
                    this.vel.limit(1.5);
                    if (dist < 20) {
                        this.vel = new JSVector(0, 0);
                        this.vel.x = Math.random() * 2 - 1;
                        this.vel.y = Math.random() * 2 - 1;


                    }
                }
            }
        }
    }
    checkEdges() {//idk the creature checkEdges does not work very well

        if (this.loc.x >= this.wrld.dims.width / 2 || this.loc.x <= -this.wrld.dims.width / 2) {
            this.vel.x *= -1;
        }
        if (this.loc.y >= this.wrld.dims.height / 2 || this.loc.y <= -this.wrld.dims.height / 2) {
            this.vel.y *= -1;

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




        this.sz *= (this.dataBlock.health / 100);
        //ill attempt to get with to work but so far this is going to be very annoying 
        ctx.moveTo(-this.sz * 2, 0, this.sz, Math.PI * 2, 0, false);
        ctx.ellipse(-this.sz * 2, 0, this.sz * 1.2, this.sz / 1.5, -Math.PI * 0.75, 0, Math.PI * 2)
        ctx.moveTo(this.sz * 2, 0, this.sz, Math.PI * 2, 0, false);
        ctx.ellipse(this.sz * 2, 0, this.sz * 1.2, this.sz / 1.5, Math.PI * 0.75, 0, Math.PI * 2)
        ctx.moveTo(0, this.sz * 4 / 3);

        ctx.arc(0, this.sz * 4 / 3, this.sz * 1.5, Math.PI * 2, 0, false);
        ctx.moveTo(0, this.sz * 4);
        ctx.arc(0, this.sz * 4, this.sz * 2, Math.PI * 2, 0, false);
        ctx.moveTo(-this.sz * 2, this.sz * (20 / 3));
        ctx.ellipse(-this.sz * 2, this.sz * (20 / 3), this.sz * 2, this.sz, Math.PI * 0.75, 0, Math.PI * 2)
        ctx.moveTo(this.sz * 2, this.sz * (20 / 3));
        ctx.ellipse(this.sz * 2, this.sz * (20 / 3), this.sz * 2, this.sz, -Math.PI * 0.75, 0, Math.PI * 2)


        ctx.stroke();
        ctx.fill();
        ctx.beginPath();//I honestly don't know if their is a better way of doing multiple colors but their should be 
        ctx.strokeStyle = "rgba(0,0,0,1)";//random black dot 
        //I kinda wanna make it a eye animation might be a pain tho
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.moveTo(0, this.sz * 4)
        ctx.arc(0, this.sz * 4, this.sz * 4 / 3, Math.PI * 2, 0, false);
        ctx.moveTo(0, this.sz * (4 / 3));
        ctx.arc(0, this.sz * (4 / 3), this.sz, Math.PI * 2, 0, false);
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,1)";//white part
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.moveTo(0, this.sz * 4);
        ctx.ellipse(0, this.sz * 4, this.eyeHeight * 1.5, this.eyeHeight, 0, 0, Math.PI * 2);
        ctx.moveTo(0, this.sz * (4 / 3));
        ctx.ellipse(0, this.sz * (4 / 3), this.eyeHeight, this.eyeHeight * 0.7, 0, 0, Math.PI * 2)
        if (this.eyeHeight > 0.05 && this.eUP == true) {
            this.eyeHeight -= 0.04;

        } else {
            this.eUP = false;

            this.eyeHeight += 0.03;//looks scuff maybe increase and decrease some values depending
            // on how close it is to 0 or this.seyeHeight

            if (this.eyeHeight > this.seyeHeight) {//this.seyeHeight is just
                // the highest this.eyeHeight was it ever was 
                this.eUP = true;//I did this again there must be a better way to do this 
            }
        }


        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = this.clr2;//pupil part 
        ctx.fillStyle = this.clr2;
        ctx.moveTo(0, this.sz * 4);
        if (this.eyeHeight > this.sz * 0.5) {
            ctx.arc(0, this.sz * 4, this.sz * 0.5, Math.PI * 2, 0, false);
            ctx.moveTo(0, this.sz * (4 / 3));
            ctx.arc(0, this.sz * (4 / 3), this.sz * 0.3, Math.PI * 2, 0, false);
        } else {
            ctx.ellipse(0, this.sz * 4, this.sz * 0.5, this.eyeHeight, 0, 0, Math.PI * 2)
            ctx.moveTo(0, this.sz * (4 / 3));
            ctx.ellipse(0, this.sz * (4 / 3), this.sz * 0.3, this.eyeHeight * 0.7, 0, 0, Math.PI * 2)
        }
        ctx.stroke();
        ctx.fill();

        ctx.restore();
        this.sz *= (100 / this.dataBlock.health)
    }
    update() {


        this.dataBlock.health = (this.dataBlock.lifeSpan / this.maxLifeSpan) * 100;
        this.vel.add(this.acc);
        this.vel.limit(1.5);
        this.vel.multiply(this.dataBlock.health / 100);
        this.loc.add(this.vel);
        this.vel.divide(this.dataBlock.health / 100);
        // }
        if (this.vel.getMagnitude() == 0) {//ig if the creature is completly stopped i.e eating then
            //this would go off.
            this.sz = this.ssz * (this.dataBlock.health / 100);
            //this would be very snappy if it ever happens 
        }
        if (this.vel.getMagnitude() != 0) {

            if (this.count < this.jumpDistance && (this.gUP === true)) {//mate there has to be a way easier way to code this
                //nice not hard coding a bunch of variables tho
                this.sz += 0.01 * (this.dataBlock.health / 100);
                this.count++;
            } else if (this.count >= this.jumpDistance) {
                this.gUP = false;
                this.sz -= 0.01 * (this.dataBlock.health / 100);
                if (this.sz <= this.ssz) {
                    this.gUP = true;
                    this.count = 0;
                }
            }
        }
    }
    life() {//would just putting this in update be better? 
        if (this.dataBlock.lifeSpan >= 0) {
            this.dataBlock.lifeSpan -= 1;//Prob would be better at -1.5 

        }
        if (this.dataBlock.lifeSpan <= 2000) {
            this.dataBlock.isDead = true;

        }
    }
}
