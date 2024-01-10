class CalFood extends Entity {
    // properties
    constructor(loc, vel, sz, wrld, index) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.clr = this.getRandomColor();
        this.ctx = wrld.ctxMain;
        this.size = sz;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.statBlock = {//  properties 
            health: 100,
            nourishment: 100,
            lifeSpan:30000,
            opacity:1.0,
            foodPts:100
        };
        this.particles = [];//array for all the particles 
        this.gravity = new JSVector(1, 1);
        this.gravity.setDirection(-3 * Math.PI / 2);
        this.gravity.setMagnitude(0.08);
        this.life = 600;
        this.index = index;
    }
    //  methods
    run() {
        if(this.life%100 === 0){
            this.addParticle();
        }
        this.render();//load the particles of this particle system on the screen 
        this.update();//move the particles 
        if(this.particles.length === 0){
            particleSystems.splice(this.index, 1);
        }
        this.life--;
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].vel.setMagnitude(this.particles[i].vel.getMagnitude()-0.1);
            let newLoc = new JSVector.addGetNew(this.particles[i].loc, this.particles[i].vel);
            this.particles[i].loc = newLoc.copy();//add gravity to the velocity of the particles 
            if (this.particles[i].loc.y > 1010)
                this.particles.splice(i, 1);
        }
    }

    render() {
        for (let i = 0; i < this.particles.length; i++) {
            this.ctx.fillStyle = "rgba(12, 131, 48, " + this.opacity + ")";
            this.ctx.beginPath();
            this.ctx.roundRect(this.particles[i].loc.x, this.particles[i].loc.y, this.size, this.size, 5);
            this.ctx.fill();
        }
    }

    addParticle(){
        if (this.life > 0) {
            this.particles.push(Particle(this.loc));
        }
    }

    Particle(){
        this.loc = loc;
    this.vel = new JSVector(0, 5);
    this.angle = Math.random() * Math.PI * 2;
    this.vel.setDirection(this.angle * -1);
    this.opacity = 1;
    }

    getRandomColor() {
        //  List of hex color values for movers
        let colors = [
            "#25AA34",
            "#18CC2e",
            "#389925",
            "#11AA99",
            "#99CC00",
            "#11FF65"
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

}