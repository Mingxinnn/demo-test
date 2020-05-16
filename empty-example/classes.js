
class clickedCircles {
  constructor(x, y, r, red, green, blue, audio){
    this.x = x;
    this.y = y;
    this.r = r;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.audio = audio;
  }

  clicked(mx,my){
    let d = dist(this.x*3+644, this.y*3+100, mx, my);
    if(d < this.r * 0.85){
      fill(this.red, this.green, this.blue, 100);
      noStroke();
      ellipse(this.x*3+644, this.y*3+100, this.r*1.5, this.r*1.5);
      this.audio.play();
      this.audio.setVolume(0.5);
    }
  }
}

export{clickedCircles}




	//创建一个迭代器，传入的必须是Array类型的数据
function makeIterator(array = []) {
		let index = 0;


		return {
			hasNext: function () {
				return index < array.length;
			},

			next: function () {
				return this.hasNext ? array[index++] : null;
			},

			current: function () {
				return array[index];
			}
    }
}


class ParticleSystem
{
   construtctor(){
     this.list = [];
   }

   update(){
     this.updateFloatingParticles();
   }

   updateFloatingParticles(){


     let iterators = makeIterator(this.list);

     while(iterators.hasNext()){
       let f = iterators.next();
       if(f != null){
         f.vel.limit(f.limit);
         f.move();
         if (f.isdead())
         {
         }else{
            f.display()
         }
       }
     }
   }
 }



class Particle
{

     constructor(p)
     {
         this.p = p;
         this.pos = createVector(this.p.x,this.p.y);
         this.acc = createVector(random(-0.1, 0.1), 0);
         this.c = color(255, 255, 255);

         this.mass = random(2,2.5);
         this.size = 2;
         this.lifespan = 400;
         this.explode = false;
         this.subParticle = false;
//            let mass = random(2,2.5);
//            let size = 2;
//            let lifespan = 400;
//            let explode = false;
//            let subParticle = false;
     }

     move()
     {
       this.vel.add(this.acc); // Apply acceleration
       this.pos.add(this.vel); // Apply our speed vector to our position
       this.acc.mult(0);

       // Decrease particle lifespan
       this.lifespan--;
     }

     applyForce(force)
     {
        this.force = force;
         let f = p5.Vector(this.force, this.mass);
         this.acc.add(f);
     }

     display()
     {
       // We dim the colour of the particle as the lifespan decreases
       fill(this.c, map(this.lifespan, 0, floating_particle_lifespan, 0, 255));

       ellipse(this.pos.x, this.pos.y, this.size, this.size);
     }

     isDead()
     {
       if (this.lifespan < 0) {
         return true;
       } else {
         return false;
       }
     }
   }

class FloatingParticle extends Particle
{
     constructor(p,  _c)
     {
       super(p);

       this.c = _c;//color(random(200, 255), random(200, 255), 0);
       this.subParticle = true;
       this.acc = p5.Vector.random2D();
       this.applyForce (p5.Vector.random2D());
       //  velocity min /max   0/ radius    map(0 ,velocity_min, velocity_max, 0,radius )
       this.limit = random(FLOATING_PARTICLE_VELOCITY_LIMIT_MIN, floating_praticle_velocity_limit_max);
       fill(this.c, map(this.lifespan, 0, floating_particle_lifespan, 0, 255));
       this.lifespan = floating_particle_lifespan;
       this.size = random(1, FLOATING_PARTICLE_SIZE + 3);
     }
}
