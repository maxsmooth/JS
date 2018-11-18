//Setup canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
//Event listeners
window.addEventListener('resize',
function(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
})
window.addEventListener('mousemove',
function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  maxheight = innerHeight - mouse.y;
  })
//variables
var mouse = {
  x: undefined,
  y: undefined
}
const g = .3;
const dr = 50;
const dy = 0;
const colorArray = [
  '#112F41',
  '#068587',
  '#F2B134',
  '#ED553B',
]
const widthratio = .4;
const rwidth = 75;
const hratio = 0;
var range;
const slope = 2;
var maxheight;
var rectArray = [];
var h;
//Main "Class"
function Rect(x,h,dy){
  this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
  this.x=x;
  this.h=h;
  this.dy=dy;
//draw rectangles
  this.draw = function draw(){
    c.beginPath();
    c.fillStyle = this.color
    c.fillRect(this.x, canvas.height-this.h, rwidth, this.h);
    }
//is run with every cycle of the animation function: the logic
    this.update = function update(){
      if (disfm(this.x) <= range && (this.h + dr <maxheight-disfm(this.x)) || this.h - dr < maxheight-disfm(this.x)){
          if (this.h < maxheight - disfm(this.x)){
            this.h = this.h += dr;
          }
      } else if (this.h > h){
          this.dy+=g;
          this.h-=this.dy;
              }else if (this.dy!=dy){
                      this.dy = dy;
                     }
        this.draw();
    }
}
//Creates the rectangle objects and puts them in an array
function init(){
  range = innerWidth*widthratio;
  rectArray = [];
  var numrec=innerWidth/rwidth;
  var xw = 0;
  h = Math.floor(innerHeight*hratio);
  for(let i=0; i<numrec; i++){
    rectArray.push(new Rect(xw,h,dy));
    xw +=rwidth;
  }
}
//Animation Loop
function animate(){
  requestAnimationFrame(animate);
  c.beginPath();
  c.clearRect(0,0,innerWidth,innerHeight);
  for (let i=0; i< rectArray.length; i++){
    rectArray[i].update();
  }
}
//determine distance from the mouse to the block (absolute value)
function disfm(xpos){
 return Math.abs(mouse.x-xpos)*slope; 
}
//begin the program loop
init();
animate();
