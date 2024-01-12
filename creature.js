class Creature extends Entity {
   constructor(loc, vel, sz, wrld) {
      super(loc, vel, sz, wrld);
      //mover properties
      this.loc = loc;
      this.vel = vel;
      this.acc = new JSVector(0, 0);
      this.clr = this.getRandomColor();
      this.size = sz;
      this.maxSpeed = 1;
      this.ctx = wrld.ctxMain;
      this.wWidth = wrld.dims.width;
      this.wHeight = wrld.dims.height;
      this.antibodies = false;

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
         lifeSpan: Math.random() * 3000,//  miliseconds
         age: 0,
         numOffspring: 3,
         maxSpeed: 1,
         maxSprintSpeed: 1,
         scentValue: 100,
         sightValue: 100,
         weight: 10,
      };
   }//++++++++++++++++++++++++++++++++ end creature constructor

   //++++++++++++++++++++++++++++++++ creature methods
   run() {
      this.update();
      this.checkEdges();
      this.render();
      this.particleCheck();
   }
   update() {
      if (this.dataBlock.lifeSpan-- <= 0) {
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
   particleCheck() {
      let dist = this.loc.distance(world.foods);
      if (dist <= 2000) {
         if (world.foods.cellType === "Antibody") {
            console.log("hit")
            this.antibodies = true;
         } else if (world.foods.cellType === "Poison") {
            this.dataBlock.lifeSpan -= 40;
            this.dataBlock.health -= 0.3;
         }
      }
   }
   render() {
      //  render balls in world
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.fillStyle = this.clr;
      ctx.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI, false);
      ctx.fill();
      //  render balls in mini map
   }
   particleCheck(){
console.log("b")
     let dist = this.loc.distance(world.foods);
     console.log("a")
      if(dist <= 20){
         if(world.foods.cellType === "Antibody"){
           this.antibodies = true;
         } else if(world.foods.cellType === "Poison"){
            this.dataBlock.lifeSpan -= 1.2;
            this.dataBlock.health -= 0.02;
         }
      }
   }

   getRandomColor() {
      //  List of hex color values for movers
      let colors = [
         // "#7102AB",
         "#ab0256",
         "#0285ab",
         "#02ab1a",
         "#ab5302",
         "#773e26",
         "#ab0256",
         "#257874",
         "#78254e",
         "#787725",
         "#1102AB",
         "#000256",
         "#0200ab",
         "#02ab00",
         "#AAAA02",
         "#77FFFF",
         "#ab0006",
         "#000874",
         "#782000"
      ];
      let index = Math.floor(Math.random() * colors.length);
      return colors[index];
   }
}
