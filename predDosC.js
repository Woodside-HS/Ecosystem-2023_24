class predDosC extends Creature {
   constructor(loc, vel, segments, sz, wrld) {
      super(loc, vel, sz, wrld);
      //snake arms 
      this.Sacc = [];
      for(let i = 0; i<segments; i++){
         this.Sacc[i] = new JSVector(0,0);
      }
      this.Svel = [];
      for (let i = 0; i<segments; i++){
         this.Svel[i] = new JSVector(Math.random()-0.5, Math.random()-0.5);
         this.Svel[i].normalize();
      }
      this.Ssegments = [];//each segment has a vector 
      for (let i = 0; i < segments; i++) {
         this.segments[i] = new JSVector(this.loc.x + i * 50 + 10, this.loc.y + i * 50 + 10);
      }
      this.baseDis = this.segments[0].distance(this.segments[1]);
      //colors
      this.addr = true;
      this.addg = false;
      this.addb = true;
      this.adda = false;
      this.r = Math.floor(Math.random() * 255);
      this.g = Math.floor(Math.random() * 255);
      this.b = Math.floor(Math.random() * 255);
      this.a = 1;
   }

   run() {
      this.update();
      this.checkEdges();
      this.render();
      this.colorChange();
   }
   update() {
      if(this.dataBlock.lifeSpan-- <= 0){
         this.dataBlock.isDead = true;
      }
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.loc.add(this.vel);
      //snake arms update 
      this.segments[0].add(this.Svel[0]);
      for(let i = 1; i<this.segments.length; i++){
         if(this.segments[i].distance(this.segments[i-1])<this.baseDis){
               this.Svel[i].multiply(0.5);
         }
         else if(this.segments[i].distance(this.segments[i-1])>this.baseDis){
               this.Sacc[i]= JSVector.subGetNew(this.segments[i-1], this.segments[i]);
               this.Sacc[i].normalize();
               this.Sacc[i].multiply(0.05);
               this.Svel[i] = JSVector.addGetNew(this.Svel[i], this.Sacc[i]);
               this.Svel[i].limit(this.Svel[i-1].getMagnitude());
         }
         this.segments[i] = JSVector.addGetNew(this.segments[i], this.Svel[i]);
      }
   }
   //checkEdges() {
      
   //}
   render() {
      //body round rectangle 
      this.ctx.fillStyle = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
      this.ctx.beginPath();
      this.ctx.roundRect(this.loc.x, this.loc.y, 100, 100, 10);//x loc, y loc, width, height, radius for roundness 
      this.ctx.fill();
      //snake arms 
      for (let i = 0; i < this.segments.length - 1; i++) {//draw sections of snake 
         context.beginPath();
         context.lineWidth = 20;
         context.lineCap = "round";
         context.strokeStyle = this.color;
         context.moveTo(this.segments[i].x, this.segments[i].y);
         context.lineTo(this.segments[i + 1].x + 5, this.segments[i + 1].y + 5);
         context.stroke();
         context.closePath();
     }
      
   }

   colorChange(){
      if(this.r === 0){
         this.addr = true;
      }
      else if(this.r === 255){
         this.addr = false;
      }
      if(this.addr){
         this.r+=0.5;
      }
      else{
         this.r-=0.5;
      }
      if(this.g === 0){
         this.addg = true;
      }
      else if(this.g === 255){
         this.addg = false;
      }
      if(this.addg){
         this.g+=0.5;
      }
      else{
         this.g-=0.5;
      }
      if(this.b === 0){
         this.addb = true;
      }
      else if(this.b === 255){
         this.addb = false;
      }
      if(this.addb){
         this.b+=0.5;
      }
      else{
         this.b-=0.5;
      }
  }
}