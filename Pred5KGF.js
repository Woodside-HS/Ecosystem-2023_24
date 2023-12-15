class Pred5KGF extends Creature{
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.target = new JSVector(Math.random()*wrld.dims.width, Math.random()*wrld.dims.height) // change to world dimensions
        this.arr=[];
        this.a=Math.random();
        this.dis = true;
        for(let i = 0; i<50; i++){
        this.arr.add(new JSVector(this.loc.x, this.loc.y));
        }
    }
    
    run() {
        this.update();
        for(let i = 0; i<50; i++){
            arr[i].render();
        }
        this.checkEdges();
    }
    
    render() {
        //  render balls in world
        let ctx = this.ctx;
        context.lineCap = "round";
        ctx.lineWidth = 10;
        ctx.strokeStyle = this.clr;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(this.vel.getDirection());
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 10);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        //ctx.fill();
        //  render balls in mini map
     }

     update(){
        if(this.dataBlock.lifeSpan-- <= 0){
            this.dataBlock.isDead = true;
         }
         if(this.target.distance(this.arr[0].loc) < 50){

            this.target.x = Math.random()*600;
            this.target.y = Math.random()*600;
          }
        this.arr[0].acc = JSVector.subGetNew(this.loc, this.target);
        this.arr[0].acc.normalize();
        this.arr[0].acc.multiply(0.03);
        this.arr[0].vel.add(this.arr[0].acc);
        this.arr[0].vel.limit(this.maxSpeed);
        this.arr[0].loc.add(this.arr[0].vel);
        for(let i = 1; i<50; i++){
            this.arr[i].vel = JSVector.subGetNew(this.arr[i-1].loc, this.arr[i].loc);
            this.arr[i].vel.multiply(this.a);
            this.arr[i].acc.normalize();
            this.arr[i].acc.multiply(0.03);
            this.arr[i].vel.add(this.arr[i].acc);
            this.arr[i].vel.limit(1);
            this.arr[i].loc.add(this.arr[i].vel);
                
        }
        //expand and collapse length
          if(this.a>.99){
            this.dis = true;
          }
          if(this.a<.2){
            this.dis = false;
          }
          if(this.dis == true){
            this.a-=0.0003;
          }
          if(this.dis == false){
            this.a+=0.0006;
          }
              
     }

}

