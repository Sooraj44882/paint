let currentTool = 'pencil';
let pencilBtn ,eraserBtn ,bucketBtn, sizeDropdown ,shapeDropdown, colorPicker ,undoBtn ,redoBtn;
let clearBtn ,saveBtn;
let symmetryBtn,sprayBtn;

let isDrawing=false;
let startX, startY; 

let undoStack=[];
let redoStack=[];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');
  
  pixelDensity(1); 
  background(255);

setupUI();
saveState();
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

    else if(currentTool==='spray'){
      stroke(colorPicker.value);
      strokeWeight(1);
      let spreadRadius = brushSize * 2;
      let dotDensity = brushSize * 4;

      for(let i=0;i<dotDensity;i++){
        let angle = random(spreadRadius);
        let radius = random(spreadRadius);
        let dotX = mouseX + cos(angle) * radius;
        let dotY = mouseY + sin(angle) * radius;
        point(dotX,dotY);
      }
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