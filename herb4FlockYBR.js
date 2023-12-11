class Herb4 extends Creature {
    constructor(loc, vel, sz, world) {
        super(loc, vel, sz, world);
        this.loc = loc;
        this.vel = vel;
        this.sz = sz;
        this.wrld = world;
        this.isHunted = false;

    }

    run() {
        this.update();
        this.render();
        this.isHunted(); // need to wait since I don't have pred code yet.
        this.foodSeek();
        this.checkEdges();
    }

    update() {

    }

    render() {

    }

    isHunted() {

    }

    foodSeek() {

    }

    flock() {
        //  flock force is the accumulation of all forces
        let flockForce = new JSVector(0, 0);

        // set up force vectors to be added to acc
        let sep = this.separate(vehicles);
        let ali = this.align(vehicles);
        let coh = this.cohesion(vehicles);

        //  add each of these to flockForce
        flockForce.add(sep);
        flockForce.add(ali);
        flockForce.add(coh);
        this.acc.add(flockForce);
    }

    checkEdges() {
        if (this.loc.x >= this.wrld.dims.width / 2 || this.loc.x <= -this.wrld.dims.width / 2) {
            this.vel.x *= -1;
        }

        if (this.loc.y >= this.wrld.dims.height / 2 || this.loc.y < -this.wrld.dims.height / 2) {
            this.vel.y *= -1;
        }
    }
}