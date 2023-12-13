class predDosC extends Creature {
   constructor(loc, vel, segments, sz, wrld) {
      super(loc, vel, sz, wrld);
      //snake arms 
      this.Sacc = [];
      for (let i = 0; i <= segments - 1; i++) {
         this.Sacc[i] = new JSVector(0, 0);
      }
      this.Svel = [];
      for (let i = 0; i <= segments - 1; i++) {
         this.Svel[i] = new JSVector(-1, -0.5);
         this.Svel[i].normalize();
      }
      this.segments = [];//each segment has a vector 
      for (let i = 0; i <= segments; i++) {
         this.segments[i] = this.loc.copy();
      }
      this.baseDis = 15;
      //colors
      this.addr = true;
      this.addg = false;
      this.addb = true;
      this.adda = false;
      this.r = Math.floor(Math.random() * 255);
      this.g = Math.floor(Math.random() * 255);
      this.b = Math.floor(Math.random() * 255);
      this.a = 1;
      this.backwards = false;
   }

   run() {
      this.update();
      this.checkEdges();
      this.render();
      this.colorChange();
   }
   update() {
      if (this.dataBlock.lifeSpan-- <= 0) {
         this.dataBlock.isDead = true;
      }
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.loc.add(this.vel);
      //snake arms follow the one in front 
      if (this.backwards) {//snake arms come back to creature 
         //direct head back towards creature 
         this.Sacc[0] = JSVector.subGetNew(this.loc, this.segments[0]);
         this.Sacc[0].normalize();
         this.Sacc[0].multiply(0.05);
         this.Svel[0] = JSVector.addGetNew(this.Svel[0], this.Sacc[0]);
         this.Svel[0].limit(1);
         this.segments[0] = JSVector.addGetNew(this.segments[0], this.Svel[0]);
         //if the head segment is back at the creature, it removes it from the array 
         if (this.segments[0].distance(this.segments[this.segments.length - 1]) < 10 && this.segments[0] !== null) {
            this.Svel.splice(0, 1);
            this.segments.splice(0, 1);
            this.Sacc.splice(0, 1);
         }
         //regular segment update for snake arm 
         for (let i = 1; i < this.segments.length - 1; i++) {
            this.Sacc[i] = JSVector.subGetNew(this.segments[i - 1], this.segments[i]);
            this.Sacc[i].normalize();
            this.Sacc[i].multiply(0.05);
            this.Svel[i] = JSVector.addGetNew(this.Svel[i], this.Sacc[i]);
            this.Svel[i].limit(this.Svel[i - 1].getMagnitude());

            this.segments[i] = JSVector.addGetNew(this.segments[i], this.Svel[i]);
         }
         //stop backwards once the array is down to one loc, because there is one more segment than vel and acc 
         if (this.segments.length === 1) {
            this.backwards = false;
         }
      }
      else if (!this.backwards && this.Svel[0] != null) {
         //snake arms go out to prey 
         this.Sacc[0] = JSVector.subGetNew(world.creatures.pred3[0].loc, this.segments[0]);
         this.Sacc[0].normalize();
         this.Sacc[0].multiply(0.05);
         this.Svel[0] = JSVector.addGetNew(this.Svel[0], this.Sacc[0]);
         this.Svel[0].limit(1);
         this.segments[0] = JSVector.addGetNew(this.segments[0], this.Svel[0]);
         //regular segment update for snake arm 
         for (let i = 1; i < this.segments.length - 1; i++) {
            if (this.segments[i].distance(this.segments[i - 1]) < this.baseDis) {
               this.Svel[i].multiply(0.5);
            }
            else if (this.segments[i].distance(this.segments[i - 1]) > this.baseDis) {
               this.Sacc[i] = JSVector.subGetNew(this.segments[i - 1], this.segments[i]);
               this.Sacc[i].normalize();
               this.Sacc[i].multiply(0.05);
               this.Svel[i] = JSVector.addGetNew(this.Svel[i], this.Sacc[i]);
               this.Svel[i].limit(this.Svel[i - 1].getMagnitude());
            }
            this.segments[i] = JSVector.addGetNew(this.segments[i], this.Svel[i]);
         }
      }
      for (let i = 1; i < this.segments.length - 1; i++) {
         if (this.segments[i].distance(this.segments[i - 1]) < this.baseDis) {
            this.Svel[i].multiply(0.5);
         }
         else if (this.segments[i].distance(this.segments[i - 1]) > this.baseDis) {
            this.Sacc[i] = JSVector.subGetNew(this.segments[i - 1], this.segments[i]);
            this.Sacc[i].normalize();
            this.Sacc[i].multiply(0.05);
            this.Svel[i] = JSVector.addGetNew(this.Svel[i], this.Sacc[i]);
            this.Svel[i].limit(this.Svel[i - 1].getMagnitude());
         }
         this.segments[i] = JSVector.addGetNew(this.segments[i], this.Svel[i]);

      }



      //end of snake arm stays with creature 
      this.segments[this.segments.length - 1] = new JSVector(this.loc.x + 5, this.loc.y + 5);

      //if head reaches prey, come back 
      if(this.segments[0].distance(world.creatures.pred3[0].loc)<15){
         this.backwards = true;
      }



   }

   checkEdges() {
      //check edges of head 
      if (this.segments[0].x < 10) {
         this.Svel[0].x *= -1;
         this.backwards = true;
      }
      if (this.segments[0].x > this.wWidth - 10) {
         this.Svel[0].x *= -1;
         this.backwards = true;
      }
      if (this.segments[0].y < 10) {
         this.Svel[0].y *= -1;
         this.backwards = true;
      }
      if (this.segments[0].y > this.wHeight - 10) {
         this.Svel[0].y *= -1;
         this.backwards = true;
      }
   }
   render() {
      //body round rectangle 
      this.ctx.fillStyle = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
      this.ctx.beginPath();
      this.ctx.roundRect(this.loc.x, this.loc.y, 100, 100, 10);//x loc, y loc, width, height, radius for roundness 
      this.ctx.fill();
      //snake arms 
      if (this.segments[0] !== null) {
         for (let i = 0; i < this.segments.length - 1; i++) {//draw sections of snake 
            this.ctx.beginPath();
            this.ctx.lineWidth = 10;
            this.ctx.lineCap = "round";
            this.ctx.strokeStyle = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + 0.5 + ")";
            this.ctx.moveTo(this.segments[i].x, this.segments[i].y);
            this.ctx.lineTo(this.segments[i + 1].x, this.segments[i + 1].y);
            this.ctx.stroke();
            this.ctx.closePath();
         }
      }
   }

   colorChange() {
      if (this.r === 0) {
         this.addr = true;
      }
      else if (this.r === 255) {
         this.addr = false;
      }
      if (this.addr) {
         this.r += 0.5;
      }
      else {
         this.r -= 0.5;
      }
      if (this.g === 0) {
         this.addg = true;
      }
      else if (this.g === 255) {
         this.addg = false;
      }
      if (this.addg) {
         this.g += 0.5;
      }
      else {
         this.g -= 0.5;
      }
      if (this.b === 0) {
         this.addb = true;
      }
      else if (this.b === 255) {
         this.addb = false;
      }
      if (this.addb) {
         this.b += 0.5;
      }
      else {
         this.b -= 0.5;
      }
   }
}