class Food3 extends Food {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc
        this.vel = vel
    }

    run(){
        super.run()
    }

    update(){
        this.loc.add(this.vel)
    }
    //  methods
    
}