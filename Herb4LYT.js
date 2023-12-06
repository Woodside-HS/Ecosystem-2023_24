//This Herb is going to be a (Or whatever I can manage to make decently from random shapes)
//It has horns and the ability to burst speed to run away from predators
//Logan Thomas 12523
//Second thought why not a frog idk I messed around
// with some shapes for a while and thats what I randomly made


class Herb4LYT extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.sz = sz;
        this.ctx = wrld.ctxMain;
        this.clr = this.getRandomColor();
        this.count = 0;
        this.lifeSpan = 3000;
        this.health = 100;
        this.isDead = false;
        //jumpSpeed goes faster the higher the number is 
        //its number of frames or something like that idk
        this.jumpSpeed = 80;//I guess these both can be scaled with health
        this.jumpDistance = 20;
       
        //but how would you do this while hoping over food 
        //what if it gets softlocked indefinity 
        //I'll figure it out 
    }
    run() {
        this.render();
        this.update();
        this.life();
    }
    render() {
        let ctx = this.ctx;
        ctx.save()
        ctx.translate(this.loc.x, this.loc.y)
        ctx.rotate(this.vel.getDirection() + Math.PI / 2)
        ctx.strokeStyle = this.clr;

        ctx.fillStyle = this.clr;
        ctx.beginPath();

        ctx.arc(-15, 0, this.sz, Math.PI * 2, 0, false);
        ctx.moveTo(15, 0)//this is to remove some problem with lines going from shape to shape
        ctx.arc(15, 0, this.sz, Math.PI * 2, 0, false);
        ctx.moveTo(0, 10)
        ctx.arc(0, 10, this.sz * 1.5, Math.PI * 2, 0, false);
        ctx.moveTo(0, 30)
        ctx.arc(0, 30, this.sz * 2, Math.PI * 2, 0, false);
        ctx.moveTo(-15, 50);
        ctx.arc(-15, 50, this.sz * 1.3, Math.PI * 2, 0, false);
        ctx.moveTo(15, 50);
        ctx.arc(15, 50, this.sz * 1.3, Math.PI * 2, 0, false);
        //make this in terms of this.sz at some point 


        ctx.stroke();
        ctx.fill();
        ctx.restore();

    }
    update() {
        this.count++;
        if (this.count >= this.jumpSpeed) {

            this.vel.multiply(this.jumpDistance);
            this.loc.add(this.vel);
            this.vel.divide(this.jumpDistance);
            //Make this more stable/not just teleporting 
            //could you somehow make this more leap like
            this.count = 0;
        }
    }
    life() {//would just putting this in update be better? 
        //yeah I agree proboly should do that 
        if(this.lifeSpan >= 0){
        this.lifeSpan--;
        
        }
        if(this.lifeSpan <= 0){
            this.isDead = true;
            
        }
    }

}