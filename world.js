class World {

  constructor() {
    this.cnvMain = document.getElementById("cnv1");
    this.ctxMain = this.cnvMain.getContext("2d");
    this.cnvMainLoc = new JSVector(0, 0);
    this.dims = {
      top: -1500,
      left: -2000,
      bottom: 1500,
      right: 2000,
      width: 4000,
      height: 3000,
    };
    this.showGrid = true;
    this.numRows = 90;
    this.numCols = 120;
    this.rowHeight = this.dims.height / this.numRows;
    this.colWidth = this.dims.width / this.numCols;
    //  calculate the rows and cols of the grid that we want to render
    this.cnvMainRow = (this.cnvMainLoc.y - this.dims.top) / this.rowHeight;
    this.cnvMainCol = (this.cnvMainLoc.x - this.dims.left) / this.colWidth;
    this.rowRange = Math.floor(this.cnvMain.height / this.rowHeight);
    this.colRange = Math.floor(this.cnvMain.width / this.colWidth);

    this.grid = [];
    for (let row = 0; row < this.numRows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.numCols; col++) {
        this.grid[row][col] = new Cell(this, this.ctxMain, row, col);
      }
    }


    this.entities = [];
    this.foodItems = [];

    this.creatures = {
      pred1: [new Pred1(new JSVector(400, 600), new JSVector(0, -30), 20, this)],
      pred2: [new Creature(new JSVector(100, 120), new JSVector(20, 0), 20, this)],
      pred3: [],
      herb1: [],
      herb2: [new Herb2(new JSVector(300, 300), new JSVector(0.1, 0), 10, this)],
      herb3: [],
      herb4LYT: [],
      herb5: [],
      herb6: [],


      flocks: [],
    };

    this.foods = {
      food1: [],
      food2: [],
      food3: [],
      food4: [],
      food5: [],
    };
    // load all foods (currently only Food4)
      this.loadFood4YBR(30);

    this.loadherb4LYT(80);
    // performance -- change the number of entities to see the effect on framerate
    this.numEntities = 100;
    this.loadEntities(
      this.numEntities,
      this.ctxMain,
      this.dims.width,
      this.dims.height
    );
    // performance
    this.framerate = 60;
    this.framecount = 0;
    // every second (250 ms), see how many times that world.run() has
    // executed.
    setInterval(function () {
      world.framerate = world.framecount;
      world.framecount = 0;
    }, 1000);
  }

  run() {
   
    // performance
    this.framecount++;
    // run the world in animation
    this.ctxMain.fillStyle = "rgb(0, 0, 55)"; //  color of outer border on Main canvas
    this.ctxMain.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height); //  clear the canvas
    // //+++++++++++++++++++++++++++ Draw all entites
    this.ctxMain.save();
    //  move the main canvas inside of the world
    this.ctxMain.translate(-this.cnvMainLoc.x, -this.cnvMainLoc.y);

    this.runCreatures();
    this.runherb4LYT();
    this.runFood();
    this.ctxMain.restore();

    // translate cnvMain according to the location of the canvas in the world
    this.ctxMain.save();
    this.ctxMain.translate(this.cnvMainLoc.x * (-1), this.cnvMainLoc.y * (-1));
    //bounds of the world in cnvMain
    this.ctxMain.strokeStyle = "rgba(0, 140, 240, 1)";
    this.ctxMain.beginPath();
    this.ctxMain.lineWidth = 12;
    this.ctxMain.strokeRect(
      this.dims.left,
      this.dims.top,
      this.dims.width,
      this.dims.height
    );
    this.ctxMain.stroke();
    this.ctxMain.restore();

    // framerate
    this.ctxMain.font = "20px  bold";
    this.ctxMain.fillStyle = "orange";
    let fps = this.framerate + " FPS"; // frames per second
    this.ctxMain.fillText(fps, 20, this.cnvMain.height - 105);


  } //+++++++++++++++++++++++++++ end run


  loadEntities(numEntities, ctx, w, h) {
    //++++++++++++++++++++++++++++  load entities
    for(let i = 0; i < numEntities; i++){
      let x = (Math.random() * w) - w/2;
      let y = (Math.random() * h) - h/2;
      let loc = new JSVector(x, y);
      let dx = Math.random() * 2 - 1;
      let dy = Math.random() * 2 - 1;
      let vel = new JSVector(dx, dy);
      let sz = Math.floor(Math.random()*0.5+0.5);
      this.creatures.herb3.push(new Herb3BJC(loc, vel, sz, this));
    }
  }


  runCreatures() {
    for (let i = 0; i < this.creatures.pred1.length; i++) {
      this.creatures.pred1[i].run();
    }
    for (let i = 0; i < this.creatures.pred2.length; i++) {
      this.creatures.pred2[i].run();
    }
    
           this.creatures.herb2[0].run()
let c = this.creatures;
for(let i = 0; i < c.herb3.length; i++){
  c.herb3[i].run();
  if(c.herb3[i].isDead === true){
    c.herb3.splice(i, 1);

  }
}
  }




  loadherb4LYT(n){
    for (let i = 0; i < n; i++) {
      let x = (Math.random() * this.dims.width)-this.dims.width/2;
      let y = (Math.random() * this.dims.height) -this.dims.height/2;
      let loc = new JSVector(x, y);
      let dx = Math.random() * 2 - 1;
      let dy = Math.random() * 2 - 1;
      let vel = new JSVector(dx, dy);
      let sz = Math.floor(Math.random()*4 + 4);
      this.creatures.herb4LYT.push(new Herb4LYT(loc, vel, sz, this));

    }
  }


  loadFood4YBR(n) { // loads the initial amounts of food 4 particle systems
    for (let i = 0; i < n; i++) {
      let x = Math.random() * (1920 - (-1920)) + (-1920);
      let y = Math.random() * (1420 - (-1420)) + (-1420);

      this.foods.food4.push(new Plant4YBR(this, x, y))
    }
  }
  runherb4LYT(){
    let c = this.creatures;
    for (let i = 0; i < c.herb4LYT.length; i++) {
      c.herb4LYT[i].run();
        if (c.herb4LYT[i].dataBlock.isDead === true) {
          c.herb4LYT.splice(i, 1);
        }
    }
  }


    
  

    
    }
  


  runFood() {
    for (let i = 0; i < this.foods.food4.length; i++) {
      this.foods.food4[i].run();
    }
  }

} //++++++++++++++++++++++++++++++  end world constructor

