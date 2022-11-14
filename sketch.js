let vehicleArray = [];
let enterBool = false;
let radius = 10;
let alignRange = 30;
let separationRange = (radius*2);
let cohesionRange = 80;
let weight1 = 0.8; // alignment
let weight2 = 1; // separation
let weight3 = 1.4; // cohesion
let speed = 4;

function setup() {
  createCanvas(1000, 800);
  
  for (let i = 0; i < 100; i++) {
    vehicleArray.push(new Vehicle(random(0,width),random(0,height), speed, radius, alignRange, separationRange, cohesionRange));
  }
}

function draw() {
  background(220);
  
  for (let i = 0; i < vehicleArray.length; i++) {
    vehicleArray[i].align(vehicleArray);
    vehicleArray[i].updateForce(weight1);
    vehicleArray[i].separate(vehicleArray);
    vehicleArray[i].updateForce(weight2);
    vehicleArray[i].cohesion(vehicleArray);
    vehicleArray[i].updateForce(weight3);
    vehicleArray[i].borders();
    vehicleArray[i].update();
    vehicleArray[i].display(enterBool);
  }
  textSize(20);
  text("Alignment: " + round(weight1,1), 0, 20);
  text("Separation: " + round(weight2,1), 0, 40);
  text("Cohesion: " + round(weight3,1), 0, 60);
}

function mouseDragged() {
  vehicleArray.push(new Vehicle(mouseX,mouseY, speed, radius, alignRange, separationRange, cohesionRange));
}

function keyPressed() {
  if(keyCode == 13) {
    enterBool = !enterBool;
  }
  if (keyCode == 49) {
    weight1 -= 0.1; 
  }
  if (keyCode == 50) {
    weight1 += 0.1; 
  }
  if (keyCode == 51) {
    weight2 -= 0.1; 
  }
  if (keyCode == 52) {
    weight2 += 0.1; 
  }
  if (keyCode == 53) {
    weight3 -= 0.1; 
  }
  if (keyCode == 54) {
    weight3 += 0.1;
  }
}