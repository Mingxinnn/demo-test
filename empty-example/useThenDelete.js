
function Particle(x,y,size) {
    this.alive = true;
    this.size = size || 10;
    this.wander = 0.15;
    this.theta = random( TWO_PI );
    this.drag = 0.92;
    this.color = '#fff';
  	this.location = createVector(x || 0.0, y || 0.0);
	this.velocity = createVector(0.0, 0.0);
}
Particle.prototype.move = function() {
    this.location.add(this.velocity);
  	this.velocity.mult(this.drag);
    this.theta += random( theta1, theta2 ) * this.wander;
    this.velocity.x += sin( this.theta ) * 0.1;
    this.velocity.y += cos( this.theta ) * 0.1;
    this.size *= sizeScalar;
    this.alive = this.size > 0.5;
}
Particle.prototype.show = function() {
  //arc( this.location.x, this.location.y, this.size, 0, TWO_PI );
  fill( this.color );
  noStroke();
  ellipse(this.location.x,this.location.y, this.size, this.size);
}

function spawn(x,y) {
    var particle, theta, force;
    if ( particles.length >= MAX_PARTICLES ) {
        pool.push( particles.shift() );
    }
    particle = new Particle(mouseX, mouseY, random(size1,size2));
    particle.wander = random( wander1, wander2 );
    particle.color = random( COLORS );
    particle.drag = random( drag1, drag2 );
    theta = random( TWO_PI );
    force = random( force1, force2 );
  	particle.velocity.x = sin( theta ) * force;
    particle.velocity.y = cos( theta ) * force;
    particles.push( particle );
}
function update() {
    var i, particle;
    for ( i = particles.length - 1; i >= 0; i-- ) {
        particle = particles[i];
        if ( particle.alive ) {
          particle.move();
        } else {
          pool.push( particles.splice( i, 1 )[0] );
        }
    }
}
function moved() {
    var particle, max, i;
    max = random( 1, 4 );
    for ( i = 0; i < max; i++ ) {
      spawn( mouseX, mouseY );
    }
}


/* Raymond G McCord (slow_izzm)
   07/23/2016
*/


var angle,
    gen = 333;

function setup() {
	
  createCanvas(windowWidth, windowHeight);
  stroke(200, 0, 255, 80);
  fill(233, 0, 55, 30);
}

function draw() {
  background(33);

  angle = sin(gen * 33) * 33;
  
  

  push();
  translate(width / 2, height / 2);
  rotate(gen * 2);
  for (var i = 0; i < 133; i++) {
    rotate(3 * gen / 33);
    curve(i, i, 0, angle + i, 133, angle - i, i + 133, i);
    //bezier(i, i, 0, angle + i, 333, angle + i, i + 333, i);

  }
  pop();
  
  
  
  push();
  translate(width / 2, height / 2);
  rotate(gen * 2);
  for (var i = 0; i < 133; i++) {
    rotate(3 * gen / 33);
    stroke(255, 0, 242);
    strokeWeight(0.3);
    bezier(i, i, 0, cos(angle - i), 133, angle + i, i + 133, i);

  }
  pop();
  
push();
  translate(width / 2, height / 2);
  rotate(gen * 2);
  for (var i = 0; i < 133; i++) {
    rotate(-3 * gen / 33);
    stroke(255);
    strokeWeight(1);
    ellipse(i, 0, .3, .3);

  }
  pop();

  gen += 0.0009;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
