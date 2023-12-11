class Food3 extends Food {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc
        this.acc = new JSVector(0, 0.1)
        this.vel = vel
    }

    run(){
        super.run()
    }

    update(){
        if(this.loc.y < 200){
            this.vel.add(this.acc)
            this.loc.add(this.vel)
        }
        
    }
    //  methods
    
}