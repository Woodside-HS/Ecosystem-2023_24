class SKHerb4 extends Creture{

  constructor(x,y,diam){  
this.loc = new JSVector(x, y);
  this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);
  this.acc = new JSVector(0, 0);
  this.diam=8;
  }

  render(){
    ctx.strokestyle = "rgba(255,0,0,1)";
    ctx.fillStyle = "rgba(138, 69, 138)";
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.diam, Math.PI * 2, 0, false);
    ctx.stroke();
    ctx.fill();
  }

}