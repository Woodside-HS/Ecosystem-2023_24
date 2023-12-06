//This Herb is going to be a (Or whatever I can manage to make decently from random shapes)
//It has horns and the ability to burst speed to run away from predators
//Logan Thomas 12523
//Second thought why not a frog idk I messed around
// with some shapes for a while and thats what I randomly made
//

class Herb4LYT extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.sz = sz;
        this.ctx = wrld.ctxMain;
        this.clr = this.getRandomColor();
        this.count = 0;
        this.lifeSpan = 12000;//This is directly corrolated to health
        //which is also connected to the size of the creature so making this like 3k will
        //make the creatures shrink very fast 
        this.maxLifeSpan = this.lifeSpan;
        this.health = 1;
        this.isDead = false;
        //jumpSpeed goes faster the higher the number is 
        //its number of frames or something like that idk
        //I hope me using a 240 HZ laptop does not change these interaction or that will be annoying
        this.jumpSpeed = 80;//I guess these both can be scaled with health
        this.jumpDistance = 20;
       
        //but how would you do this while hoping over food 
        //what if it gets softlocked indefinity 
        //I'll figure it out 
    }
    run() {
        this.update();
        this.render();
        this.life();
    }

   
        checkEdges() {
            if (this.loc.x > world.dims.right) {
                this.vel.x = -this.vel.x;
            }
            if (this.loc.x < world.dims.left) {
                this.vel.x = -this.vel.x;
            }
            if (this.loc.y > world.dims.bottom) {
                this.vel.y = -this.vel.y;
            }
            if (this.loc.y < world.dims.top) {
                this.vel.y = -this.vel.y;
            }
        }
    
    render() {
        let ctx = this.ctx;
        ctx.save()
        ctx.translate(this.loc.x, this.loc.y)
        ctx.rotate(this.vel.getDirection() + Math.PI / 2)
        ctx.strokeStyle =  "rgba(0,0,0,1)";//idk black outline looks better rn for me

        ctx.fillStyle = this.clr;
        ctx.beginPath();
        //I'm gonna keep this bc the other code is not perfect 
        
        // ctx.arc(-15, 0, this.sz, Math.PI * 2, 0, false);
        // ctx.moveTo(15, 0)//this is to remove some problem with lines going from shape to shape
        // ctx.arc(15, 0, this.sz, Math.PI * 2, 0, false);
        // ctx.moveTo(0, 10)
        // ctx.arc(0, 10, this.sz * 1.5, Math.PI * 2, 0, false);
        // ctx.moveTo(0, 30)
        // ctx.arc(0, 30, this.sz * 2, Math.PI * 2, 0, false);
        // ctx.moveTo(-15, 50);
        // ctx.arc(-15, 50, this.sz * 1.3, Math.PI * 2, 0, false);
        // ctx.moveTo(15, 50);
        // ctx.arc(15, 50, this.sz * 1.3, Math.PI * 2, 0, false);
        //make this in terms of this.sz at some point 

        this.sz *= this.health;
        ctx.arc(-this.sz*2, 0, this.sz, Math.PI * 2, 0, false );
        ctx.moveTo(this.sz*2, 0, this.sz, Math.PI * 2, 0, false);
        ctx.arc(this.sz*2, 0, this.sz, Math.PI * 2, 0, false);
        ctx.moveTo(0, this.sz*(4/3))
        ctx.arc(0, this.sz*(4/3), this.sz * 1.5, Math.PI * 2, 0, false);
        ctx.moveTo(0, this.sz*4)
        ctx.arc(0, this.sz*4, this.sz * 2.3, Math.PI * 2, 0, false);
        ctx.moveTo(-this.sz*2, this.sz*(50/7.5));
        ctx.arc(-this.sz*2, this.sz*(50/7.5), this.sz * 1.3, Math.PI * 2, 0, false);
        ctx.moveTo(this.sz*2, this.sz*(50/7.5));
        ctx.arc(this.sz*2, this.sz*(50/7.5), this.sz * 1.3, Math.PI * 2, 0, false);
        this.sz *= (1/this.health)
        ctx.stroke();
        ctx.fill();
        ctx.restore();

    }
    update() {
        this.health = (this.lifeSpan/this.maxLifeSpan);

        this.count++;
        if (this.count >= this.jumpSpeed) {

            this.vel.multiply(this.jumpDistance*this.health);
            this.loc.add(this.vel);
            this.vel.divide(this.jumpDistance*this.health);
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