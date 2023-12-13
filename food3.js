class Food3 extends Food {
    // properties
    constructor(loc, vel, sz, wrld) {

        super(loc, vel, sz, wrld)

        this.originalX = loc.x
        this.originalY = loc.y

        this.ground = this.getRndInteger(50, 200)

        this.loc = loc
        this.acc = new JSVector(0, 0.2)
        this.vel = vel
        this.lifeSpan = 200
    }

    run(){
        if(this.lifeSpan > 0){
            super.run()

        }
    }

    update(){
        this.lifeSpan--
        // if(this.loc.y < 200){
        //     this.vel.add(this.acc)
        //     this.loc.add(this.vel)
        // }
        



        if(Math.abs(this.loc.y - this.originalY) < this.ground){
            this.vel.add(this.acc)
            this.loc.add(this.vel)
        }
        
    }

    getLifeSpan(){
        return this.lifeSpan
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
    //  methods
    
}

