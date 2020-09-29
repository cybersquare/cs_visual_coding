// Position of the cat on canvas
x_pos = 115;
y_pos = 115;

// Animation direction
anim_direction = ""

// Load image into a variable
var csCat = new Image();
csCat.src = "images/cs_cat.png";

// Canvases
canvas_back = document.getElementById('canvas_back');
canvas_cat = document.getElementById('canvas_cat');

// Context
var ctx_back = canvas_back.getContext('2d');
var ctx_cat = canvas_cat.getContext('2d');

// Draw lines
ctx_back.beginPath();
ctx_back.strokeStyle = "#e8eaf6";

for(var x=0; x<300; x+=50){
    ctx_back.moveTo(x, 0);
    ctx_back.lineTo(x, 300);
    ctx_back.stroke();
}
for(var y=0; y<300; y+=50){
    ctx_back.moveTo(0, y);
    ctx_back.lineTo(300, y);
    ctx_back.stroke();
}

// Draw image. Give a time delay(2 milli second) to load the image by JavaScript
setTimeout(function() {
    ctx_cat.drawImage(csCat, x_pos , y_pos, 40, 40);
    console.log("drawing");
}, 200);

// Following 3 fucntion are for managing drag and drop programming blocks 

var code = []; // Append dragged block into an array 

// Prevent default behaviour while droppin the block in workspace 
function allowDrop(event) {
    event.preventDefault();
}

// Get the id of the dragging block and sen it using data transfer
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Create a clone of the programming block and add to workspace wile droppig
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text"); //Get id of the element
    var nodeCopy = document.getElementById(data).cloneNode(true); // Clone the block
    nodeCopy.id = "block" + code.length  ; /* We cannot use the same ID */
    code.push(document.getElementById(data).className); //Append direction to code array
    event.target.appendChild(nodeCopy);
}

// Steps moved by the cat while animation
steps = 0;

/* This function is called while clicking Run button. 
As Javascript is asynchronous for loop with time delay will not work.
Use setTimeout fucntion for smooth exectution of animation
*/
run_button = document.getElementById("run_button");
function run_program(){
    // Disable and change colour of the button 
    run_button.disabled = true;
    run_button.style.backgroundColor="grey";
    var i = 0;                      //  set your counter to 0
    var code_length = code.length;
    function myLoop() {             //  create a loop function
        setTimeout(function() {     //  call a 1 second setTimeout when the loop is called
            anim_direction = code[i]; 
            animate();     
            i++;                    //  increment the counter
            if (i < code_length ) { //  if the counter < length of code, call the loop function
                myLoop();             //  ..  again which will trigger another 
            }                       //  ..  setTimeout()
        }, 1000)
    }
    myLoop(); 
    // Keep button disabled till animatin ends
    setTimeout(function(){
        run_button.disabled = false;
        run_button.style.backgroundColor="#f57c00";
        code = []
    }, 1000 * (code.length + 1));
    
}

// Animate function is called while clikcing the run button
function animate(){
    // Start animation
    var anim = requestAnimationFrame(animate);
    // Change value of X and Y postion according to the code for animation
    switch(anim_direction) {
        case "up":
            y_pos--;
            break;
        case "down":
            y_pos++;
            break;
          case "left":
            x_pos--;
            break;
        case "right":
            x_pos++;
            break;
        default:
            anim_direction = "";
    }
    // Redraw the cat for animation
    ctx_cat.clearRect( x_pos , y_pos, 40, 40)
    ctx_cat.drawImage(csCat,  x_pos , y_pos, 40, 40);
    
    // Move 50 steps only
    steps++;
    if(steps>50){
        // End animation
        cancelAnimationFrame(anim);
        steps=0;
    }    
} // End animate function
