/**
 * Virus class
 * @author Diego Comfort
 */
class Virus extends Creature {
    /**
     * Virus constructor
     * @param {JSVector} location the initial location of the virus
     * @param {JSVector} velocity the initial velocity of the virus
     * @param {number} radius the radius of the segments of the virus
     * @param {World} world the world this virus belongs to
     * @param {JSVector[]} [segments=] the segments of this virus
     */
    constructor(location, velocity, radius, world, segments) {
	super(location, velocity, radius, world);
	/** @type {string} */
	this.clr = "#f255db";
	/** @type {JSVector[]} */
	this.segments = segments ?? [location.copy()];
	/** @type {number} */
	this.speed = 15;
	/** @type {number} */
	this.maximumSegments = 20;
    }

    /**
     * Location of the (head of) the virus
     * @return {JSVector} the location
     */
    get loc() {
	return this.segments[0];
    }

    /**
     * Location of the (head of) the virus
     * @param {JSVector} newLoc the new location of the (head of) the virus
     */
    set loc(newLoc) {
	if (this.segments)
	    this.segments[0] = newLoc;
	else
	    this.segments = [newLoc];
    }

    /**
     * Radius of the viruses 'segments'
     * @return {number} the radius
     */
    get radius() {
	return this.size;
    }

    /**
     * Run the virus
     */
    run() {
	this.update();
	this.reproduce();
	this.checkEdges();
	this.render();
    }

    /**
     * Update the viruses position/location
     */
    update() {
	if(--this.dataBlock.lifeSpan <= 0){
            this.dataBlock.isDead = true;
	}

	const dt = 1 / 60 * this.speed;
	// Update all segments but the first
	for (let i = this.segments.length - 1; i > 0; --i) {
	    const dx = JSVector.subGetNew(this.segments[i - 1], this.segments[i]);
	    dx.multiply(dt);
	    this.segments[i].add(dx);
	}
	// Update head
	// TODO: ponts towards certain things?
	if (Math.random() < 0.05)
	    this.vel.setDirection(
		this.vel.getDirection() + (Math.PI / 20) * (Math.random() - 0.5));
	const dx = this.vel.copy();
	dx.multiply(dt);
	this.segments[0].add(dx);
    }

    /**
     * Force the virus to stay within the world
     */
    checkEdges() {
	if (this.segments[0].x + this.radius  >= this.wrld.dims.width / 2) {
	    this.vel.x *= -1;
	    this.segments[0].x = this.wrld.dims.width / 2;
	} else if (this.segments[0].x - this.radius <= -this.wrld.dims.width / 2) {
	    this.vel.x *= -1;
	    this.segments[0].x = -this.wrld.dims.width / 2;
	}
	if (this.segments[0].y + this.radius >= this.wrld.dims.height / 2) {
	    this.vel.y *= -1;
	    this.segments[0].y = this.wrld.dims.height / 2;
	} else if (this.segments[0].y - this.radius <= -this.wrld.dims.height / 2) {
	    this.vel.y *= -1;
	    this.segments[0].y = -this.wrld.dims.height / 2;
	}
    }

    /**
     * Render the virus
     * TODO: change the colors
     */u15
    render() {
	// this.ctx.fillStyle = this.clr;	
	let i = 0;
	for (const segment of this.segments) {
	    this.ctx.fillStyle = `hsl(${360 * i / this.segments.length}, 100%, 50%)`;
	    this.ctx.beginPath();
	    this.ctx.arc(segment.x, segment.y, this.radius, 0, 2 * Math.PI);
	    this.ctx.fill();
	    ++i;
	}
	
    }

    /**
     * Make the virus split in two
     * TODO: make it split when it comes into
     */
    reproduce() {
	for (const creatureType in this.wrld.creatures) {
	    for (const creature of this.wrld.creatures[creatureType]) {
		// Grow the virus
		let dist = this.loc.distance(creature.loc);
		if (dist < creature.size) {
		    this.segments.push(
			this.segments[this.segments.length - 1].copy());
		}
		// Split the virus
		if (this.segments.length >= this.maximumSegments) {
		    const newSegments = this.segments.slice(10);
		    const newVel = this.vel.copy();
		    const da = Math.PI / 2 * (Math.random() - 0.5);
		    newVel.setDirection(
			newVel.getDirection() + da);
		    this.wrld.viruses.push(new Virus(
			new JSVector(),
			newVel,
			this.radius,
			this.wrld,
			newSegments));
		    this.segments.splice(10);
		}
	    }
	}
    }
}
