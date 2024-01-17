/**
 * Virus class
 * @author Diego Comfort
 */
class Virus extends Creature {
    /**
     * Virus constructor
     * @param {JSVector} location the initial location of the virus
     * @param {number} speed the initial speed of the virus
     * @param {number} radius the radius of the segments of the virus
     * @param {World} world the world this virus belongs to
     * @param {JSVector[]} [segments=] the segments of this virus
     */
    constructor(location, speed, radius, world, segments) {
	super(location, new JSVector(), radius, world);

	let angle = Math.random() * 2 * Math.PI;
	/** @type {JSVector} */
	this.vel = new JSVector(
	    this.radius / 2 * Math.cos(angle), this.radius / 2 * Math.sin(angle));

	/** @type {string} */
	this.clr = "#f255db";

	/** @type {number} */
	this.maximumSegments = 10;

	/** @type {JSVector[]} */
	this.segments = segments ?? [location.copy()];

	/** @type {number} */
	this.speed = speed;

	/** @type {number} */
	this.timeSinceGrown = 0; // measured in frames

	/** @type {number} */
	this.reproductionCoolDown = 30; // measured in frames
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

	for (const vec of this.segments) {
	    if (isNaN(vec.x) || isNaN(vec.y)) {
		throw new Error(`$vec has NaN components`);
	    }
	}
    }

    /**
     * Force the virus to stay within the world
     */
    checkEdges() {
	if (this.segments[0].x + this.radius  >= this.wrld.dims.width / 2) {
	    this.vel.x *= -1;
	    this.segments[0].x = this.wrld.dims.width / 2 - this.radius;
	} else if (this.segments[0].x - this.radius <= -this.wrld.dims.width / 2) {
	    this.vel.x *= -1;
	    this.segments[0].x = -this.wrld.dims.width / 2 + this.radius;
	}
	if (this.segments[0].y + this.radius >= this.wrld.dims.height / 2) {
	    this.vel.y *= -1;
	    this.segments[0].y = this.wrld.dims.height / 2 - this.radius;
	} else if (this.segments[0].y - this.radius <= -this.wrld.dims.height / 2) {
	    this.vel.y *= -1;
	    this.segments[0].y = -this.wrld.dims.height / 2 + this.radius;
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
		// Wait to reproduce (after timeout or because it's not touching
		// a creature
		if (this.loc.distance(creature.loc) > creature.size ||
		    this.timeSinceGrown < this.reproductionCoolDown ||
		    creature.antibodies) {
		    ++this.timeSinceGrown;
		    continue;
		}
		// Grow the virus
		if (this.segments.length < this.maximumSegments) {
		    this.segments.push(
			this.segments[this.segments.length - 1].copy());
		    this.timeSinceGrown = 0;
		    creature.dataBlock.lifeSpan -= 5;
		    creature.dataBlock.health -= 0.1;
		    continue;
		}
		// Split it
		const newSegments = [];
		while (this.segments.length > this.maximumSegments / 2) {
		    newSegments.push(
			this.segments.splice(this.maximumSegments / 2, 1)[0]);
		}
		// TODO: Mutations
		this.wrld.viruses.push(new Virus(
		    new JSVector(),
		    this.speed,
		    this.radius,
		    this.wrld,
		    newSegments));
		this.timeSinceGrown = 0;
	    }
	}
    }
}
