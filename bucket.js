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