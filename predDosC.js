class predDosC extends Creature {
   constructor(loc, vel, segments, sz, wrld) {
      super(loc, vel, sz, wrld);
      //snake arms 
      this.Sacc = [[], [], [], []];
      for(let ii = 0; ii<4; ii++){
         for (let i = 0; i <= segments - 1; i++) {
            this.Sacc[ii][i] = new JSVector(0, 0);
         }
      }
      this.Svel = [[], [], [], []];
      for(let ii = 0; ii<4; ii++){
         for (let i = 0; i <= segments - 1; i++) {
            if(ii === 0){//top left
               this.Svel[ii][i] = new JSVector(-1, -1);
            }
            if(ii === 1 ){//bottom left
               this.Svel[ii][i] = new JSVector(-1, 1);
            }
            if(ii === 2){//bottom right 
               this.Svel[ii][i] = new JSVector(1, 1);
            }
            if(ii === 3){//top right
               this.Svel[ii][i] = new JSVector(1, -1);
            }
            this.Svel[ii][i].normalize();
         }
      }
      this.segments = [[], [], [], []];//each segment has a vector 
      for(let l = 0; l<4; l++){
         for (let i = 0; i <= segments; i++) {
            this.segments[l][i] = this.loc.copy();
         }
      }
      console.log(this.segments);
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
      this.searchFood = false;
      this.lifeSpan = 0;
      this.preyIndex;
      this.antibodies = false;
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

         this.Sacc[0][0] = JSVector.subGetNew(this.loc, this.segments[0][0]);
         this.Sacc[0][0].normalize();
         this.Sacc[0][0].multiply(0.05);
         this.Svel[0][0] = JSVector.addGetNew(this.Svel[0][0], this.Sacc[0][0]);
         this.Svel[0][0].limit(1);
         this.segments[0][0] = JSVector.addGetNew(this.segments[0][0], this.Svel[0][0]);
         //move prey with head 
         world.creatures.pred3[this.preyIndex].loc = this.segments[0][0];
         //check if prey is at creature 
         if()
         world.creatures.pred3.splice(this.preyIndex, this.preyIndex+1);
         //if the head segment is back at the creature, it removes it from the array 
         if (this.segments[0][0].distance(this.segments[0][this.segments[0].length - 1]) < 10 && this.segments[0][0] !== null) {
            this.Svel[0].splice(0, 1);
            this.segments[0].splice(0, 1);
            this.Sacc[0].splice(0, 1);
            
         }
         //regular segment update for snake arm 
         for (let i = 1; i < this.segments[0].length - 1; i++) {
            this.Sacc[0][i] = JSVector.subGetNew(this.segments[0][i - 1], this.segments[0][i]);
            this.Sacc[0][i].normalize();
            this.Sacc[0][i].multiply(0.05);
            this.Svel[0][i] = JSVector.addGetNew(this.Svel[0][i], this.Sacc[0][i]);
            this.Svel[0][i].limit(this.Svel[0][i - 1].getMagnitude());

            this.segments[0][i] = JSVector.addGetNew(this.segments[0][i], this.Svel[0][i]);
         }
         //stop backwards once the array is down to one loc, because there is one more segment than vel and acc 
         if (this.segments[0].length === 1) {
            this.backwards = false;
         }
      }
      else if (!this.backwards && this.Svel[0][0] != null) {
         //snake arms go out to prey 
         for(let i = 0; i<world.creatures.pred3.length; i++){
            let distance = this.loc.distance(world.creatures.pred3[i].loc);
            if(distance <=100){
               this.Sacc[0][0] = JSVector.subGetNew(world.creatures.pred3[i].loc, this.segments[0][0]);
               this.Sacc[0][0].normalize();
               this.Sacc[0][0].multiply(0.05);
               this.Svel[0][0] = JSVector.addGetNew(this.Svel[0][0], this.Sacc[0][0]);
               this.Svel[0][0].limit(1);
            }
         }
         this.segments[0][0] = JSVector.addGetNew(this.segments[0][0], this.Svel[0][0]);
         //regular segment update for snake arm 
         for (let i = 1; i < this.segments[0].length - 1; i++) {
            //slow down segments if they get to close to each other 
            if (this.segments[0][i].distance(this.segments[0][i - 1]) < this.baseDis) {
               this.Svel[0][i].multiply(0.5);
            }
            //segments follow the one in front of it 
            else if (this.segments[0][i].distance(this.segments[0][i - 1]) > this.baseDis) {
               this.Sacc[0][i] = JSVector.subGetNew(this.segments[0][i - 1], this.segments[0][i]);
               this.Sacc[0][i].normalize();
               this.Sacc[0][i].multiply(0.05);
               this.Svel[0][i] = JSVector.addGetNew(this.Svel[0][i], this.Sacc[0][i]);
               this.Svel[0][i].limit(this.Svel[0][i - 1].getMagnitude());
            }
            this.segments[0][i] = JSVector.addGetNew(this.segments[0][i], this.Svel[0][i]);
         }
         //add new segment if last segment gets too far from creature 
         if(this.segments[0].length >= 2 && this.segments[0][this.segments[0].length-2].distance(this.segments[0][this.segments[0].length-1])>this.baseDis){
            this.segments[0].splice(this.segments[0].length-1, 0, this.loc.copy());
            this.Svel[0].splice(this.Svel[0].length-1, 0, this.Svel[0][this.Svel[0].length-1].copy());
            this.Sacc[0].splice(this.Sacc[0].length-1, 0, this.Sacc[0][this.Sacc[0].length-1].copy());
         }
      }
      for (let i = 1; i < this.segments[0].length - 1; i++) {
         if (this.segments[0][i].distance(this.segments[0][i - 1]) < this.baseDis) {
            this.Svel[0][i].multiply(0.5);
         }
         else if (this.segments[0][i].distance(this.segments[0][i - 1]) > this.baseDis) {
            this.Sacc[0][i] = JSVector.subGetNew(this.segments[0][i - 1], this.segments[0][i]);
            this.Sacc[0][i].normalize();
            this.Sacc[0][i].multiply(0.05);
            this.Svel[0][i] = JSVector.addGetNew(this.Svel[0][i], this.Sacc[0][i]);
            this.Svel[0][i].limit(this.Svel[0][i - 1].getMagnitude());
         }
         this.segments[0][i] = JSVector.addGetNew(this.segments[0][i], this.Svel[0][i]);

      }



      //end of snake arm stays with creature 
      this.segments[0][this.segments[0].length - 1] = new JSVector(this.loc.x + 5, this.loc.y + 5);

      //if head reaches prey, come back 
      for(let i = 0; i<world.creatures.pred3.length; i++){
         if(this.segments[0][0].distance(world.creatures.pred3[i].loc)<15){
            this.backwards = true;
            this.preyIndex = i;
            i = world.creatures.pred3.length;
         }
      }


   }

   checkEdges() {
      //check edges of head 
      if (this.segments[0][0].x < 10) {
         this.Svel[0][0].x *= -1;
         this.backwards = true;
      }
      if (this.segments[0][0].x > this.wWidth - 10) {
         this.Svel[0][0].x *= -1;
         this.backwards = true;
      }
      if (this.segments[0][0].y < 10) {
         this.Svel[0][0].y *= -1;
         this.backwards = true;
      }
      if (this.segments[0][0].y > this.wHeight - 10) {
         this.Svel[0][0].y *= -1;
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
     // console.log(this.segments);
      if (this.segments[0][0] !== null) {
         for (let i = 0; i < this.segments[0].length - 2; i++) {//draw sections of snake 
            this.ctx.beginPath();
            this.ctx.lineWidth = 10;
            this.ctx.lineCap = "round";
            this.ctx.strokeStyle = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + 0.5 + ")";
            this.ctx.moveTo(this.segments[0][i].x, this.segments[0][i].y);
            this.ctx.lineTo(this.segments[0][i + 1].x, this.segments[0][i + 1].y);
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