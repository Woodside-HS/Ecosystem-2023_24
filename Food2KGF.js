class Food2KGF extends Food {
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.arr = [];
        for(let i = 0; i<100; i++){
            this.arr.add(new Particle(this.loc.x, this.loc.y, this.sz));
        }
    }

    update(){
        this.arr.push(new Particle(this.loc.x, this.loc.y, this.sz));

    }

    
          
        

    }




