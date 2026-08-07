let currentTool = 'pencil';
let pencilBtn;
let eraserBtn;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');

  background(255);

  pencilBtn = document.getElementById('pencilBtn');
  eraserBtn = document.getElementById('eraserBtn');

  pencilBtn.addEventListener('click', function() {
    currentTool = 'pencil';
    pencilBtn.classList.add('active');
    eraserBtn.classList.remove('active');
  });

  eraserBtn.addEventListener('click', function() {
    currentTool = 'eraser';
    eraserBtn.classList.add('active');
    pencilBtn.classList.remove('active');
  });
}

function draw() {
  if (mouseIsPressed === true) {
    
    strokeWeight(4);
    
    if (currentTool === 'pencil') {
      stroke(0);
    } else if (currentTool === 'eraser') {
      stroke(255);
    }
    
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}