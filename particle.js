function particle(x, y, diam) {
    this.diam = diam;
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0,0);
    this.isOverlapping = false;
    this.lifespan = 400;
    this.isDead = false;
    return this;
}

Particle.prototype.run = function () {
    this.update();
    this.render();
}

Particle.prototype.render = function () {
    
      context.strokeStyle = "gray";  // color to fill
      context.fillStyle = "green";     // color to stroke
 
   
    // create the circle path
    context.beginPath();    // clear old path
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    context.arc(this.loc.x, this.loc.y, this.diam, 0, 2 * Math.PI);
  
    context.fill();     // render the fill
    context.stroke();   // render the stroke
  }
  Particle.prototype.update = function () {
    this.acc.x = 0;
    this.acc.y = Math.random()*2+2;
    this.acc.normalize();
    this.acc.multiply(.01);
    this.loc.add(this.vel);
    this.vel.add(this.acc);
  }

