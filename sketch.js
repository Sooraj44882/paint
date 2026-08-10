let currentTool = 'pencil';
let pencilBtn ,eraserBtn ,bucketBtn, sizeDropdown ,shapeDropdown, colorPicker ,undoBtn ,redoBtn;
let clearBtn ,saveBtn;
let symmetryBtn;

let isDrawing=false;
let startX, startY; 

let undoStack=[];
let redoStack=[];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');
  
  pixelDensity(1); 
  background(255);

  pencilBtn = document.getElementById('pencilBtn');
  eraserBtn = document.getElementById('eraserBtn');
  bucketBtn = document.getElementById('bucketBtn'); 
  
  sizeDropdown = document.getElementById('sizeDropdown');
  shapeDropdown = document.getElementById('shapeDropdown'); 
  colorPicker = document.getElementById('colorPicker');
  clearBtn = document.getElementById("clearBtn");
  saveBtn = document.getElementById("saveBtn");
  undoBtn = document.getElementById("undoBtn");
  redoBtn = document.getElementById("redoBtn");

  symmetryBtn =document.getElementById('symmetryBtn');

  
  saveState();

  undoBtn.addEventListener('click',function(){
    if(undoStack.length>1){
      let currentState= undoStack.pop();
      redoStack.push(currentState);

      let previousState=undoStack[undoStack.length-1];
      image(previousState,0,0);
    }
  });

  redoBtn.addEventListener('click',function(){
    if(redoStack.length>0){
      let nextState=redoStack.pop();
      undoStack.push(nextState);
      image(nextState,0,0);
    }
  });


  saveBtn.addEventListener('click',function(){
    saveCanvas("mypaint",'png');
  });

  clearBtn.addEventListener('click',function(){
    background(255);
    saveState();
  });

  pencilBtn.addEventListener('click', function() {
    currentTool = 'pencil';
    pencilBtn.classList.add('active');
    eraserBtn.classList.remove('active');
    bucketBtn.classList.remove('active');
    shapeDropdown.classList.remove('active');
    symmetryBtn.classList.remove('active');
  });

  eraserBtn.addEventListener('click', function() {
    currentTool = 'eraser';
    eraserBtn.classList.add('active');
    pencilBtn.classList.remove('active');
    bucketBtn.classList.remove('active');
    shapeDropdown.classList.remove('active');
    symmetryBtn.classList.remove('active'); 
  });

  bucketBtn.addEventListener('click', function() {
    currentTool = 'bucket';
    bucketBtn.classList.add('active');
    pencilBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    shapeDropdown.classList.remove('active');
    symmetryBtn.classList.remove('active'); 
  });

  shapeDropdown.addEventListener('click', function() {
    currentTool = 'shape';
    shapeDropdown.classList.add('active');
    pencilBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    bucketBtn.classList.remove('active');
    symmetryBtn.classList.remove('active');
  });
  
  shapeDropdown.addEventListener('change', function() {
    currentTool = 'shape';
    shapeDropdown.classList.add('active');
    pencilBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    bucketBtn.classList.remove('active');
    symmetryBtn.classList.remove('active');
  });

  symmetryBtn.addEventListener('click',function(){
  currentTool="symmetry";
  symmetryBtn.classList.add('active');
  pencilBtn.classList.remove('active');
  eraserBtn.classList.remove('active');
  bucketBtn.classList.remove('active');
  shapeDropdown.classList.remove('active');
});
}



function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    
    if (currentTool === 'bucket') {
      floodFill(Math.floor(mouseX), Math.floor(mouseY), colorPicker.value);
      saveState(); 
    } else {
      isDrawing = true;
      startX = mouseX;
      startY = mouseY;
    }
  }
}

function draw() {
  if (isDrawing === true) {
    let brushSize = sizeDropdown.value;
    strokeWeight(brushSize);
    
  if (currentTool === 'pencil' || currentTool === 'eraser') {
    if (currentTool === 'pencil') {
      stroke(colorPicker.value); 
    } else if (currentTool === 'eraser') {
      stroke(255); 
    }

    line(pmouseX, pmouseY, mouseX, mouseY);
    }

    else if(currentTool==='symmetry'){
      stroke(colorPicker.value);

      let cx=width/2;
      let cy = height / 2;
      let segments = 8; 
      let angle = TWO_PI / segments;

      push();
      translate(cx, cy);

      for (let i = 0; i < segments; i++) {
        rotate(angle);
        
        line(pmouseX - cx, pmouseY - cy, mouseX - cx, mouseY - cy);
        
        push();
        scale(1, -1); 
        line(pmouseX - cx, pmouseY - cy, mouseX - cx, mouseY - cy);
        pop();
      }
      
      pop();
    
    }

    
    else if (currentTool === 'shape') {
      let previousState = undoStack[undoStack.length - 1];
      image(previousState, 0, 0);
      
      stroke(colorPicker.value);
      noFill(); 
      
      let w = mouseX - startX;
      let h = mouseY - startY;
      let shapeType = shapeDropdown.value;

      if (shapeType === 'rect') {
        rect(startX, startY, w, h);
      } 
      else if (shapeType === 'circle') {
        ellipseMode(CORNERS);
        ellipse(startX, startY, mouseX, mouseY);
      } 
      else if (shapeType === 'square') {
        let side = Math.max(Math.abs(w), Math.abs(h));
        let sqW = w < 0 ? -side : side;
        let sqH = h < 0 ? -side : side;
        rect(startX, startY, sqW, sqH);
      } 
      else if (shapeType === 'triangle') {
        triangle(startX + w / 2, startY, mouseX, mouseY, startX, mouseY);
      }
    }
  }
}

function mouseReleased(){
  if (isDrawing=== true) {
  saveState();
  redoStack=[];
  isDrawing=false;
  console.log(undoStack)
  }
}

function saveState(){
  undoStack.push(get());

  if (undoStack.length > 10) {
    undoStack.shift(); 
  }
}

function hexToRgba(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b, 255]; 
}

function floodFill(startX, startY, hexColor) {
  loadPixels(); 
  
  let fillRgba = hexToRgba(hexColor);
  
  let startPos = (startY * width + startX) * 4; 
  let startR = pixels[startPos];
  let startG = pixels[startPos + 1];
  let startB = pixels[startPos + 2];

  if (startR === fillRgba[0] && startG === fillRgba[1] && startB === fillRgba[2]) return;

  let stack = [[startX, startY]];

  while (stack.length > 0) {
    let [x, y] = stack.pop(); 
    let pos = (y * width + x) * 4;

    if (x >= 0 && x < width && y >= 0 && y < height &&
        pixels[pos] === startR &&
        pixels[pos + 1] === startG &&
        pixels[pos + 2] === startB) {
        
        pixels[pos] = fillRgba[0];    
        pixels[pos + 1] = fillRgba[1]; 
        pixels[pos + 2] = fillRgba[2]; 
        pixels[pos + 3] = 255;        

        stack.push([x + 1, y]);
        stack.push([x - 1, y]);
        stack.push([x, y + 1]);
        stack.push([x, y - 1]);
    }
  }
  
  updatePixels(); 
}