class Herb3BJC extends Creature {
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        this.acc = new JSVector(0, 0);
        this.context = wrld.ctxMain;
    //    this.poisonDarts = [];
        this.col = "rgba(0, 200, 150, 0)";
        this.colorState = false; //false = normal color, true = invisible for defense 
    }

    run(){
        this.render();
        this.update();
      //  this.runDarts();
    }

    render(){
        let ctx = this.context;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(this.vel.getDirection() + Math.PI /2);
        ctx.beginPath();

        if(this.colorState = false){ //normal color
        ctx.strokeStyle = this.col;
        ctx.fillStyle = this.col;
        }

        if(this.colorState = true){ //invisible for defense
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        }

        ctx.moveTo(0, -15);
        ctx.lineTo(-5, 5);
        ctx.lineTo(0, 0);
        ctx.lineTo(5, 5);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    update(){
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.acc.multiply(0);

  //   //if close to pred
       // this.loadDarts(direction); //shoot out poison darts to pred
        //this.colorState = true; //turn invisible

    // //if need food
       //this.seekFood(index);

    //if need to reproduce
      //  this.seekOthers(index);

    }

    // seekFood(i){

    // }

  //  seekOthers(i){

  //  }

//    loadDarts(direction){
//     let dartCol = "rgba(128, 0, 128, 0)";
//     let acc = new JSVector(0, 0);
//     let vel = new JSVector(); //shoots in direction of predators
//     let diam = 4;
//     this.poisonDarts.push(new PoisonDartsBJC(this, dartCol, acc, vel, diam));

//    }

//    runDarts(){
//     for (let i = 0; i < this.poisonDarts.length; i++) {
//         this.poisonDarts[i].run();
//     }
//    }

}