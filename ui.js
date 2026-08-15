function setupUI() {

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
  sprayBtn = document.getElementById('sprayBtn');
  audioBtn = document.getElementById('audioBtn');

  function updateCursor(tool) {
    let cvs = document.querySelector('canvas');
    if (!cvs) return;

    if (tool === 'pencil') {
      cvs.style.cursor = 'url("asset/pen.svg") 8 24, auto';
    } 
    else if (tool === 'eraser') {
      cvs.style.cursor = 'url("asset/eraser.svg") 12 12, auto';
    } 
    else if (tool === 'bucket') {
      cvs.style.cursor = 'url("asset/colors.svg") 0 24, auto';
    } 
    else {
      cvs.style.cursor = 'crosshair';
    }
  }

  function switchTool(toolName, clickedElement) {
    currentTool = toolName;       
    updateCursor(toolName);

    pencilBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    bucketBtn.classList.remove('active');
    symmetryBtn.classList.remove('active');
    sprayBtn.classList.remove('active');
    audioBtn.classList.remove('active');
    shapeDropdown.classList.remove('active');

    clickedElement.classList.add('active');
  }

  updateCursor('pencil');


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
     switchTool('pencil', pencilBtn); });

  eraserBtn.addEventListener('click', function() {
     switchTool('eraser', eraserBtn); });

  bucketBtn.addEventListener('click', function() {
     switchTool('bucket', bucketBtn); });

  shapeDropdown.addEventListener('click', function() {
     switchTool('shape', shapeDropdown); });

  symmetryBtn.addEventListener('click', function() {
     switchTool('symmetry', symmetryBtn); });


  sprayBtn.addEventListener('click', function() { 
    switchTool('spray', sprayBtn); });
  audioBtn.addEventListener('click', function() {
     switchTool('audio', audioBtn); });
    }