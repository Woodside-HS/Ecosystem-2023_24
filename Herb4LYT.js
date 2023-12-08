//Logan Thomas 12523
//I haven't used inheritance at lot at some point I should convert stuff to status blocks and
// datablocks 
//you should do that before you put in a bunch more effort 

class Herb4LYT extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        //   this.loc = loc;
        this.vel = vel;
        this.acc = new JSVector(0, 0);
        this.sz = sz;
        this.cc = false; //why is this named cc (connected couple) I have no idea
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
        this.lifeSpan = 12000;//This is directly corrolated to health
        //which is also connected to the size of the creature so making this like 3k will
        //make the creatures shrink very fast 
        this.maxLifeSpan = this.lifeSpan;
        this.health = 1;//its a 0 to 1 system 
        //its going to be annoying but ig I can change this when going to 0-100 system
        this.isDead = false;
    
        this.jumpDistance = 200;

        //but how would you do this while hoping over food 
        //what if it gets softlocked indefinity 
        //I'll figure it out much later 
    }
    run() {
        this.update();
        this.render();
        this.life();
        this.checkEdges();
        this.seekOthers();
        this.seekFoods();
    }
    seekOthers() {
        let h4 = world.creatures.herb4;
        if(this.health > 0.7){
            for(let i = 0; i < h4.length; i ++){
               
                let dist = this.loc.distance(h4[i].loc);
                
                if(dist != 0 && dist < 5000 && (this.clr === h4[i].clr) && this.cc == false && h4[i].cc == false){
                    //if not itselfs, less than 500 away from same color creature;
                this.acc = JSVector.subGetNew(h4[i].loc, this.loc);
                this.acc.normalize();
                this.acc.multiply(0.03);
                this.cc = true;
                h4[i].cc = true;
                    
                }
            }
        }
    }
    seekFoods() {

    }
    checkEdges() {//idk the creature checkEdges does not work very well

        if (this.loc.x > world.dims.right) {
            this.vel.x = -this.vel.x
        }
        if (this.loc.x < world.dims.left) {
            this.vel.x = -this.vel.x
        }
        if (this.loc.y < world.dims.top) {
            this.vel.y = -this.vel.y;
        }
        if (this.loc.y > world.dims.bottom) {
            this.vel.y = -this.vel.y;
        }
    }
    render() {
        let ctx = this.ctx;
        ctx.save()
        ctx.translate(this.loc.x, this.loc.y)
        ctx.rotate(this.vel.getDirection() + Math.PI / 2)
        ctx.strokeStyle = "rgba(0,0,0,1)";//idk black outline looks better rn for me

        ctx.fillStyle = this.clr;
        ctx.beginPath();




        // this.sz *= this.health;
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
        ctx.moveTo(0, this.sz * (4 / 3))
        ctx.ellipse(0, this.sz * (4 / 3), this.eyeHeight, this.eyeHeight * 0.7, 0, 0, Math.PI * 2)
        if (this.eyeHeight > 0.05 && this.eUP == true) {
            this.eyeHeight -= 0.06;

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

    }
    update() {
        this.health = (this.lifeSpan / this.maxLifeSpan);
        this.vel.add(this.acc);
        this.vel.multiply(this.health);
        this.loc.add(this.vel);
        this.vel.divide(this.health);
        if (this.vel.getMagnitude() == 0) {//ig if the creature is completly stopped i.e eating then
            //this would go off.
            this.sz = this.ssz * this.health;
            //this would be very snappy if it ever happens 
        }
        if (this.vel.getMagnitude() != 0) {

            if (this.count < this.jumpDistance && (this.gUP === true)) {//mate there has to be a way easier way to code this
                //nice not hard coding a bunch of variables tho
                this.sz += 0.02 * this.health;
                this.count++;
            } else if (this.count >= this.jumpDistance) {
                this.gUP = false;
                this.sz -= 0.02 * this.health;
                if (this.sz <= this.ssz) {
                    this.gUP = true;
                    this.count = 0;
                }
            }
        }
    }
    life() {//would just putting this in update be better? 
        if (this.lifeSpan >= 0) {
            this.lifeSpan -= 1;//Prob would be better at -1.5 

        }
        if (this.lifeSpan <= 2000) {
            this.isDead = true;

        }
    }
}