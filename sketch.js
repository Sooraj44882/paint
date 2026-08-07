let currentTool = 'pencil';
let pencilBtn ,eraserBtn ,sizeDropdown ,colorPicker ,undoBtn ,redoBtn;
let clearBtn ,saveBtn;

let isDrawing=false;

let undoStack=[];
let redoStack=[];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');
  background(255);

  pencilBtn = document.getElementById('pencilBtn');
  eraserBtn = document.getElementById('eraserBtn');
  sizeDropdown = document.getElementById('sizeDropdown');
  colorPicker = document.getElementById('colorPicker');
  clearBtn = document.getElementById("clearBtn");
  saveBtn = document.getElementById("saveBtn");
  undoBtn = document.getElementById("undoBtn");
  redoBtn = document.getElementById("redoBtn");

  
  saveState();

  undoBtn.addEventListener("click",function(){
    if(undoStack.length>1){
      let currentState= undoStack.pop();
      redoStack.push(currentState);

      let previousState=undoStack[undoStack.length-1];
      image(previousState,0,0);
    }
  });

  redoBtn.addEventListener("click",function(){
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
  });

  eraserBtn.addEventListener('click', function() {
    currentTool = 'eraser';
    eraserBtn.classList.add('active');
    pencilBtn.classList.remove('active');
  });
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    isDrawing = true;
  }
}

function draw() {
  if (isDrawing === true) {
    
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