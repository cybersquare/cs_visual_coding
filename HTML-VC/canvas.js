// Get canvas element to a variable
var canvas = document.querySelector('canvas');

// Set width and height of canvas
canvas.width = 300;
canvas.height = 300;

// Context
var ctx = canvas.getContext('2d');

// Draw vertical lines on the canvas
ctx.beginPath();
ctx.strokeStyle = "#e8eaf6";
for(var x=0; x<300; x+=50){
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 300);
    ctx.stroke();
}

// Draw horizontal lines on the canvas
for(var y=0; y<300; y+=50){
    ctx.moveTo(0, y);
    ctx.lineTo(300, y);
    ctx.stroke();
}

// Create an image variable and load image into the variable
var csCat = new Image();
csCat.src = "images/cs_cat.png";

// Draw image. Give a time delay(2 milli seconds) to load the image by JavaScript
setTimeout(() => {
    ctx.drawImage(csCat, 110 , 105, 40, 40);
}, 200);

