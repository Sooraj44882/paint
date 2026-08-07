let currentTool = 'pencil';
let pencilBtn;
let eraserBtn;
let sizeDropdown;
let colorPicker;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');

  background(255);

  pencilBtn = document.getElementById('pencilBtn');
  eraserBtn = document.getElementById('eraserBtn');
  sizeDropdown = document.getElementById('sizeDropdown');
  
  colorPicker = document.getElementById('colorPicker');

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
    
    let brushSize = sizeDropdown.value;
    strokeWeight(brushSize);
    
    if (currentTool === 'pencil') {
      stroke(colorPicker.value); 
    } else if (currentTool === 'eraser') {
      stroke(255); 
    }
    
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}