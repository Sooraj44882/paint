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
    sprayBtn.classList.remove('active');
  });

  eraserBtn.addEventListener('click', function() {
    currentTool = 'eraser';
    eraserBtn.classList.add('active');
    pencilBtn.classList.remove('active');
    bucketBtn.classList.remove('active');
    shapeDropdown.classList.remove('active');
    symmetryBtn.classList.remove('active'); 
    sprayBtn.classList.remove('active');
  });

  bucketBtn.addEventListener('click', function() {
    currentTool = 'bucket';
    bucketBtn.classList.add('active');
    pencilBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    shapeDropdown.classList.remove('active');
    symmetryBtn.classList.remove('active'); 
    sprayBtn.classList.remove('active');
  });

  shapeDropdown.addEventListener('click', function() {
    currentTool = 'shape';
    shapeDropdown.classList.add('active');
    pencilBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    bucketBtn.classList.remove('active');
    symmetryBtn.classList.remove('active');
    sprayBtn.classList.remove('active');
  });
  
  shapeDropdown.addEventListener('change', function() {
    currentTool = 'shape';
    shapeDropdown.classList.add('active');
    pencilBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    bucketBtn.classList.remove('active');
    symmetryBtn.classList.remove('active');
    sprayBtn.classList.remove('active');
  });



symmetryBtn.addEventListener('click',function(){
  currentTool="symmetry";
  symmetryBtn.classList.add('active');
  pencilBtn.classList.remove('active');
  eraserBtn.classList.remove('active');
  bucketBtn.classList.remove('active');
  shapeDropdown.classList.remove('active');
  sprayBtn.classList.remove('active');
});

sprayBtn.addEventListener('click',function(){
  currentTool="spray";
  sprayBtn.classList.add('active');
  pencilBtn.classList.remove('active');
  eraserBtn.classList.remove('active');
  bucketBtn.classList.remove('active');
  shapeDropdown.classList.remove('active');
  symmetryBtn.classList.remove('active');
})


}