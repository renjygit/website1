class Vehicle {
  constructor(x, y, speed, radius, range1, range2, range3) {
    this.maxSpeed = speed;
    this.maxForce = 0.01; // Affects handling.
    this.angle = 0;
    this.radius = radius;
    this.pos = createVector(x,y);
    this.vel = createVector(random(-this.maxSpeed,this.maxSpeed),random(-this.maxSpeed,this.maxSpeed));
    this.acc = createVector(0,0);
    this.alignRange = range1;
    this.separationRange = range2;
    this.cohesionRange = range3;
  }
  
  align(vehicles) {
    this.sumAlign = createVector(0,0);
    this.countAlign = 0;
    for (let i = 0; i < vehicles.length; i++) {
      let distanceAlign = p5.Vector.dist(this.pos,vehicles[i].pos);
      if (distanceAlign > 0 && distanceAlign <= this.alignRange) {
        this.sumAlign.add(vehicles[i].vel);
        
        this.countAlign++;
      }
    }
    if (this.countAlign > 0) {
      this.sumAlign.div(this.countAlign); // gets the average velocity
      this.sumAlign.setMag(this.maxSpeed);
      this.steering = p5.Vector.sub(this.sumAlign,this.vel);
      this.steering.limit(this.maxForce);
    }
  }
  
  separate(vehicles) {
    this.sumSeparate = createVector(0,0);
    this.countSeparate = 0;
    this.desiredSeparation = this.separationRange;
    for (let i = 0; i < vehicles.length; i++) {
      this.distanceSeparate = p5.Vector.dist(this.pos,vehicles[i].pos);
      if (this.distanceSeparate > 0 && this.distanceSeparate < this.desiredSeparation) {
        
        this.diffVector = p5.Vector.sub(this.pos,vehicles[i].pos); // find a vector pointing away from the nearby vehicle
        this.diffVector.normalize(); // normalise it
        this.diffVector.div(this.distanceSeparate); // divide by the distance to the nearby vehicle so that closer vehicles contribute more to the separate vector

        this.sumSeparate.add(this.diffVector); // add this direction to the sum vector
        
        
        this.countSeparate++;
      }
    }
    if (this.countSeparate > 0) {
      this.sumSeparate.div(this.countSeparate); // gets an average direction away from the nearby vehicles
      this.sumSeparate.setMag(this.maxSpeed);
      this.steering = p5.Vector.sub(this.sumSeparate,this.vel);
      this.steering.limit(this.maxForce);
    }
  }
  
  cohesion(vehicles) {
    this.sumCohesion = createVector(0,0);
    this.countCohesion = 0;
    for(let i = 0; i < vehicles.length; i++) {
      this.distanceCohesion = p5.Vector.dist(this.pos,vehicles[i].pos);
      if(this.distanceCohesion > 0 && this.distanceCohesion <= this.cohesionRange) {
        
        this.sumCohesion.add(vehicles[i].pos);
        this.countCohesion++;
      }
    }
    if(this.countCohesion > 0) {
      this.sumCohesion.div(this.countCohesion);
            
      this.sumCohesion.setMag(this.maxSpeed);
      this.steering = p5.Vector.sub(this.sumCohesion,this.vel);
      this.steering.limit(this.maxForce);
    }
  }
  
  borders() {
    if(this.pos.x < -1*this.radius) {
      this.pos.x = width + this.radius;
    }
    if(this.pos.x > width+this.radius) {
      this.pos.x = -1*this.radius;
    }
    if(this.pos.y < -1*this.radius) {
      this.pos.y = height+this.radius; 
    }
    if(this.pos.y > height + this.radius) {
      this.pos.y = -1*this.radius;
    }
  }
  
  updateForce(weight) {
    if (this.steering) {
      this.acc.add(this.steering.mult(weight)); // apply the force
    }
  }
  
  update() { 
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0,0);
  }
  
  display(showCircles) {
    push();
    translate(this.pos.x, this.pos.y);
    
    this.angle = createVector(0,-1).angleBetween(this.vel);
    rotate(this.angle);
    triangle(-5,this.radius,0,-this.radius,5,this.radius);
    strokeWeight(3);
    point(0,0);
    //fill(255,200);
    //circle(0,0,this.radius*2);
    
    if (showCircles) {
      noFill();
      stroke(255,0,0,100);
      circle(0,0,this.alignRange*2);
      stroke(0,255,0,100);
      circle(0,0,this.separationRange*2);
      stroke(0,0,255,100);
      circle(0,0,this.cohesionRange*2);
    }
    pop();
  }
}