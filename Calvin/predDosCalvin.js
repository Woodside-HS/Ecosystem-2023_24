class predDosC extends Creature {
   constructor(loc, vel, segments, sz, wrld, index) {
      super(loc, vel, sz, wrld);
      //snake arms 
      this.Sacc = [[], [], [], []];//start with zero acceleration 
      for(let ii = 0; ii<4; ii++){
         for (let i = 0; i <= segments - 1; i++) {
            this.Sacc[ii][i] = new JSVector(0, 0);
         }
      }
      this.Svel = [[], [], [], []];//start with velocities pointing away from creature 
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
      this.predWidth = 100;
      this.predLength = 100;
      this.segments = [[], [], [], []];//each segment has a vector 
      for(let ii = 0; ii<4; ii++){
         for (let i = 0; i <= segments; i++) {
            if(ii === 0){//top left
               this.segments[ii][i] = this.loc.copy();
            }
            if(ii === 1){//bottom left
               this.segments[ii][i] = new JSVector(this.loc.x, this.loc.y+this.predLength);
            }
            if(ii === 2){//bottom right
               this.segments[ii][i] = new JSVector(this.loc.x+this.predWidth, this.loc.y+this.predLength);
            }
            if(ii === 3){//top right
               this.segments[ii][i] = new JSVector(this.loc.x+this.predWidth, this.loc.y);
            }
         }
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
      this.backwards = [false, false, false, false];
      this.searchFood = false;
      this.dataBlock.lifeSpan = 24000;
      this.preyIndex = [];
      this.eat = [false, false, false, false];
      this.antibodies = false;
      this.index = index;
   }

   run() {
      this.update();
      this.checkEdges();
      this.render();
      this.colorChange();
      //this.reproduce(); not working 
   }
   update() {
      if (this.dataBlock.lifeSpan-- <= 0) {
         this.dataBlock.isDead = true;
         world.creatures.pred2.splice(this.index, 1);
      }
      else{
         this.dataBlock.lifeSpan--;
         //make creature eat 
         if(Math.random()*100>90){
            let innn = Math.floor(Math.random()*4);
            if(this.eat[innn] && !this.backwards[innn])
               this.eat[innn] = false;
         }
         //move creature 
         this.vel.add(this.acc);
         this.vel.limit(this.maxSpeed);
         this.loc.add(this.vel);
         //snake arms follow the one in front 
         for(let n = 0; n<this.segments.length; n++){
            if (this.backwards[n]) {//snake arms come back to creature 
               //direct head back towards creature depending on which arm it is 
               if(n===0){
                  this.Sacc[n][0] = JSVector.subGetNew(this.loc, this.segments[n][0]);
               }
               else if(n===1){
                  this.Sacc[n][0] = JSVector.subGetNew(new JSVector(this.loc.x, this.loc.y+this.predLength), this.segments[n][0]);
               }
               else if(n===2){
                  this.Sacc[n][0] = JSVector.subGetNew(new JSVector(this.loc.x+this.predWidth, this.loc.y+this.predLength), this.segments[n][0]);
               }
               else if(n===3){
                  this.Sacc[n][0] = JSVector.subGetNew(new JSVector(this.loc.x+this.predWidth, this.loc.y), this.segments[n][0]);
               }
               this.Sacc[n][0].normalize();
               this.Sacc[n][0].multiply(0.05);
               this.Svel[n][0] = JSVector.addGetNew(this.Svel[n][0], this.Sacc[n][0]);
               this.Svel[n][0].limit(1);
               this.segments[n][0] = JSVector.addGetNew(this.segments[n][0], this.Svel[n][0]);
               //move prey with head 
               if(!this.eat[n] && world.creatures.pred3[this.preyIndex[n]] != null){
                  world.creatures.pred3[this.preyIndex[n]].loc = this.segments[n][0].copy();
               }
               //check if prey is at creature 
               if(!this.eat[n] && world.creatures.pred3[this.preyIndex[n]] != null && world.creatures.pred3[this.preyIndex[n]].loc.distance(this.segments[n][this.segments[n].length-1])<15){
                  world.creatures.pred3.splice(this.preyIndex[n], 1);
                  this.dataBlock.lifeSpan += 600;
                  for(let i = 0; i<this.preyIndex.length; i++){
                     if(this.preyIndex[n]<this.preyIndex[i]){
                        this.preyIndex[i]--;
                     }
                  }
                  this.eat[n] = true;
               }  
               //if the head segment is back at the creature, it removes it from the array 
               if (this.segments[n][0].distance(this.segments[n][this.segments[n].length - 1]) < 10 && this.segments[n][0] !== null) {
                  if(this.segments[n].length > 2){
                     this.Svel[n].splice(0, 1);
                     this.segments[n].splice(0, 1);
                     this.Sacc[n].splice(0, 1);
                  }
                  else{
                     this.segments[n] = [this.segments[n][this.segments[n].length-1], this.segments[n][this.segments[n].length-1]];
                  }
                  
               }
               //regular segment update for snake arm 
               for (let i = 1; i < this.segments[n].length - 1; i++) {
                  this.Sacc[n][i] = JSVector.subGetNew(this.segments[n][i - 1], this.segments[n][i]);
                  this.Sacc[n][i].normalize();
                  this.Sacc[n][i].multiply(0.05);
                  this.Svel[n][i] = JSVector.addGetNew(this.Svel[n][i], this.Sacc[n][i]);
                  this.Svel[n][i].limit(this.Svel[n][i - 1].getMagnitude());

                  this.segments[n][i] = JSVector.addGetNew(this.segments[n][i], this.Svel[n][i]);
               }
               //stop backwards once the array is down to one loc, because there is one more segment than vel and acc 
               if (this.segments[n].length === 1) {
                  this.backwards[n] = false;
               }
            }
            else if (!this.backwards[n] && this.Svel[n][0] != null && !this.eat[n]) {
               // for(let j = 0; j<world.creatures.pred3.length; j++){
               //    if(world.creatures.pred3[j] != null && this.segments[n][0].distance(world.creatures.pred3[i].loc) <=100){//if creature exists and is within range 
                     
               //    }
                  //snake arms go out to prey 
                  let preyCount = 0;
                  for(let i = 0; i<world.creatures.pred3.length; i++){
                     let distance = this.segments[n][0].distance(world.creatures.pred3[i].loc);
                     if(distance <=100){
                        preyCount++;
                        this.Sacc[n][0] = JSVector.subGetNew(world.creatures.pred3[i].loc, this.segments[n][0]);
                        this.Sacc[n][0].normalize();
                        this.Sacc[n][0].multiply(0.05);
                        this.Svel[n][0] = JSVector.addGetNew(this.Svel[n][0], this.Sacc[n][0]);
                        this.Svel[n][0].limit(1);
                     }
                  }
                  if(this.Sacc[n][0].x != 0 && this.Sacc[n][0].y != 0 && preyCount != 0){//if no acc, keep segments with creature
                     this.segments[n][0] = JSVector.addGetNew(this.segments[n][0], this.Svel[n][0]);
                  }
                  else{
                     this.segments[n] = [this.segments[n][this.segments[n].length-1], this.segments[n][this.segments[n].length-1]];
                  }
              // }//end of for loop checking for prey 
               //regular segment update for snake arm 
               for (let i = 1; i < this.segments[n].length - 1; i++) {
                  //slow down segments if they get to close to each other 
                  if (this.segments[n][i].distance(this.segments[n][i - 1]) < this.baseDis) {
                     this.Svel[n][i].multiply(0.5);
                  }
                  //segments follow the one in front of it 
                  else if (this.segments[n][i].distance(this.segments[n][i - 1]) > this.baseDis) {
                     this.Sacc[n][i] = JSVector.subGetNew(this.segments[n][i - 1], this.segments[n][i]);
                     this.Sacc[n][i].normalize();
                     this.Sacc[n][i].multiply(0.05);
                     this.Svel[n][i] = JSVector.addGetNew(this.Svel[n][i], this.Sacc[n][i]);
                     this.Svel[n][i].limit(this.Svel[n][i - 1].getMagnitude());
                  }
                  this.segments[n][i] = JSVector.addGetNew(this.segments[n][i], this.Svel[n][i]);
               }
               //add new segment if last segment gets too far from creature 
               if(this.segments[n].length >= 2 && this.segments[n][this.segments[n].length-2].distance(this.segments[n][this.segments[n].length-1])>this.baseDis){
                  if(n === 0){
                     this.segments[n].splice(this.segments[n].length-1, 0, this.loc.copy());
                  }
                  else if(n === 1){
                     this.segments[n].splice(this.segments[n].length-1, 0, new JSVector(this.loc.x, this.loc.y+this.predLength));
                  }
                  else if(n === 2){
                     this.segments[n].splice(this.segments[n].length-1, 0, new JSVector(this.loc.x+this.predWidth, this.loc.y+this.predLength));
                  }
                  else if(n === 3){
                     this.segments[n].splice(this.segments[n].length-1, 0, new JSVector(this.loc.x+this.predWidth, this.loc.y));
                  }
                  this.Svel[n].splice(this.Svel[n].length-1, 0, this.Svel[n][this.Svel[n].length-1].copy());
                  this.Sacc[n].splice(this.Sacc[n].length-1, 0, this.Sacc[n][this.Sacc[n].length-1].copy());
               }
            }
            for (let i = 1; i < this.segments[n].length - 1; i++) {
               if (this.segments[n][i].distance(this.segments[n][i - 1]) < this.baseDis) {
                  this.Svel[n][i].multiply(0.5);
               }
               else if (this.segments[n][i].distance(this.segments[n][i - 1]) > this.baseDis) {
                  this.Sacc[n][i] = JSVector.subGetNew(this.segments[n][i - 1], this.segments[n][i]);
                  this.Sacc[n][i].normalize();
                  this.Sacc[n][i].multiply(0.05);
                  this.Svel[n][i] = JSVector.addGetNew(this.Svel[n][i], this.Sacc[n][i]);
                  this.Svel[n][i].limit(this.Svel[n][i - 1].getMagnitude());
               }
               this.segments[n][i] = JSVector.addGetNew(this.segments[n][i], this.Svel[n][i]);

            }

            //end of snake arm stays with creature 
            if(n===0){
               this.segments[n][this.segments[n].length - 1] = new JSVector(this.loc.x + 5, this.loc.y + 5);
            }
            else if(n===1){
               this.segments[n][this.segments[n].length - 1] = new JSVector(this.loc.x + 5, this.loc.y+this.predLength-5);
            }
            else if(n===2){
               this.segments[n][this.segments[n].length - 1] = new JSVector(this.loc.x+this.predWidth-5, this.loc.y+this.predLength-5);
            }
            else if(n===3){
               this.segments[n][this.segments[n].length - 1] = new JSVector(this.loc.x+this.predWidth-5, this.loc.y+5);
            }
            //if head reaches prey, come back 
            for(let i = 0; i<world.creatures.pred3.length; i++){
               if(this.segments[n][0].distance(world.creatures.pred3[i].loc)<15){
                  this.backwards[n] = true;
                  this.preyIndex[n] = i;
                  i = world.creatures.pred3.length;
               }
            }
         }//end of massive for loop 
      }//end of if else statement 
   }//end of update method 

   checkEdges() {
      //check edges of head 
      if (this.segments[0][0].x < world.dims.left) {
         this.Svel[0][0].x *= -1;
         this.backwards[0] = true;
      }
      if (this.segments[0][0].x > world.dims.right) {
         this.Svel[0][0].x *= -1;
         this.backwards[0] = true;
      }
      if (this.segments[0][0].y < world.dims.top) {
         this.Svel[0][0].y *= -1;
         this.backwards[0] = true;
      }
      if (this.segments[0][0].y > world.dims.bottom) {
         this.Svel[0][0].y *= -1;
         this.backwards[0] = true;
      }
   }
   render() {
      //body round rectangle 
      this.ctx.fillStyle = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
      this.ctx.beginPath();
      this.ctx.roundRect(this.loc.x, this.loc.y, this.predWidth, this.predLength, 10);//x loc, y loc, width, height, radius for roundness 
      this.ctx.fill();
      //snake arms 
      for(let n = 0; n<this.segments.length; n++){
         if (this.segments[0][0] !== null) {
            for (let i = 0; i < this.segments[n].length - 2; i++) {//draw sections of snake 
               this.ctx.beginPath();
               this.ctx.lineWidth = 10;
               this.ctx.lineCap = "round";
               this.ctx.strokeStyle = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + 0.5 + ")";
               this.ctx.moveTo(this.segments[n][i].x, this.segments[n][i].y);
               this.ctx.lineTo(this.segments[n][i + 1].x, this.segments[n][i + 1].y);
               this.ctx.stroke();
               this.ctx.closePath();
            }
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

   // reproduce(){ 
   //    if(world.creatures.pred2.length<18){
   //       world.creatures.pred2.splice(world.creatures.pred2.length-1, 0, new predDosC(new JSVector(Math.random()*this.wWidth, Math.random()*this.wHeight), new JSVector(Math.random(), Math.random()), 1, 80, world, world.creatures.pred2.length));
   //    }
   // }
}