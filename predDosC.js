class predDosC extends Entity {
   constructor(loc, vel, sz, wrld) {
      super(loc, vel, sz, wrld)
      //mover properties
      this.loc = loc;
      this.vel = vel;
      this.acc = new JSVector(0, 0);
      this.clr = this.getRandomColor();
      this.size = sz;
      this.maxSpeed = .1;
      this.ctx = wrld.ctxMain;
      this.wWidth = wrld.dims.width;
      this.wHeight = wrld.dims.height;

      this.statusBlock = {
         searchFood:true,
         searchMate:true,
         eating:false,
         sprint:false,
         sleeping:false,
         attack:false,
         deathProc:false
         
      };

      this.dataBlock = {//  status block 
         health: 100,
         isDead: false,
         nourishment: 100,
         lifeSpan:Math.random()*3000,//  miliseconds
         age:0,
         numOffspring:3,
         maxSpeed: 1,
         maxSprintSpeed: 1,
         scentValue: 100,
         sightValue: 100,
         weight:10,
      };
   }//++++++++++++++++++++++++++++++++ end creature constructor

   //++++++++++++++++++++++++++++++++ creature methods
   run() {
      this.update();
      this.checkEdges();
      this.render();
   }
   update() {
      if(this.dataBlock.lifeSpan-- <= 0){
         this.dataBlock.isDead = true;
      }
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.loc.add(this.vel);
   }
   checkEdges() {
      if (this.loc.x >= world.dims.width / 2 || this.loc.x <= -world.dims.width / 2) {
         this.vel.x *= -1;
      }
      if (this.loc.y >= world.dims.height / 2 || this.loc.y < -world.dims.height / 2) {
         this.vel.y *= -1;
      }
   }
   render() {
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.fillStyle = this.clr;
      ctx.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI, false);
      ctx.fill();
   }

   getRandomColor() {
      return "rgba(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";;
   }
}