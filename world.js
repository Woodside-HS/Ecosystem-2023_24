class World {
  //  Commit 1: 221109
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
      pred1: [],
      pred2: [],
      pred3: [],
      pred4: [],
      herb1: [],
      herb2: [],
      herb3: [],
      flocks: [],
    };

    this.foods = {
      food1: [],
      food2: [],
      food3: [],
      food4: [],
      food5: [],

    };

    // performance -- change the number of entities to see the effect on framerate
    this.numEntities = 5000;
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
  }
  
  loadEntities(numEntities, ctx, w, h) {
    for(let i = 0; i < numEntities; i++){
      let x = (Math.random() * this.dims.width) - 2000;
      let y = (Math.random() * this.dims.height) - 1500;
      let loc = new JSVector(x, y);
      let dx =  (Math.random() * 20 - 1);
      let dy =  (Math.random() * 20 - 1);
      let vel = new JSVector(dx, dy);
      let sz = Math.floor(Math.random() * 9 + 6);
      this.creatures.pred4.push(new Pred4jdg(loc,vel,sz, this));

    }    
    //++++++++++++++++++++++++++++  load entities
  }
  
  runCreatures() {
    for (let i = 0; i < this.creatures.pred4.length; i++) {
      this.creatures.pred4[i].run();
  }
}
 
  runFood() {
    
  }
} //++++++++++++++++++++++++++++++  end world constructor


