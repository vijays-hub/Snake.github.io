const canvas= document.getElementById('snake');
const can_context=canvas.getContext("2d");
console.log(can_context)


// // create the Unit (Box) with width and height of 32px
const Box=32 ;

// // Load the Images

//     // Ground
    const ground_img=new Image();
    ground_img.src="img/ground.png";

//     // Food
    const food_img=new Image();
    food_img.src="img/food.png";

// Load the audio files
let eat=new Audio() 
let dead=new Audio() 
let right=new Audio() 
let left=new Audio() 
let up=new Audio() 
let down=new Audio() 

dead.src="audio/dead.mp3"
eat.src="audio/eat.mp3"
left.src="audio/left.mp3"
right.src="audio/right.mp3"
up.src="audio/up.mp3"
down.src="audio/down.mp3"
dead.src="audio/dead.mp3"

// // Creation of Snake 
let snake=[]
snake[0]={
    x:9*Box,
    y:10*Box
}

// Generate Food
let food={
    x:  Math.floor(Math.random()*17+1)*Box,
    y:  Math.floor(Math.random()*15+3)*Box
}

// Score
let score= 0;



// Assign Direction
let d;

document.addEventListener("keydown",direction)

function direction(event){
    if(event.keyCode==37 && d!="RIGHT"){
        d="LEFT";
        left.play();
    }
    else if(event.keyCode==38 && d!="DOWN"){
        d="UP";
        up.play();
    }
    else if(event.keyCode==39 && d!="LEFT"){
        d="RIGHT";
        right.play();
    }
    else if(event.keyCode==40 && d!="UP"){
        d="DOWN";
        down.play();
    }


}

function collision(head,array){

    for(let i=0;i<array.length;i++){
        if(head.x == array[i].x && head.y == array[i].y){        
            return true;
        }
    }
    return false;
}


// Function to Draw Everything to the Canvas
function draw(){
 
    can_context.drawImage(ground_img,0,0);

    for(let i=0;i<snake.length;i++){
        can_context.fillStyle= (i==0)?'green':'white'
        can_context.fillRect(snake[i].x,snake[i].y,Box,Box)

        can_context.strokeStyle="red";
        can_context.strokeRect(snake[i].x,snake[i].y,Box,Box)
    }

    // generate food every time draw() is called
    can_context.drawImage(food_img,food.x,food.y)


    // Old Head Position
    let snakeX= snake[0].x;
    let snakeY= snake[0].y;

   
    // Based on the direction moving the snake
    if(d=="RIGHT") snakeX=snakeX+Box;
    else if(d=="LEFT") snakeX=snakeX-Box;
    if(d=="UP") snakeY=snakeY-Box;
    if(d=="DOWN") snakeY=snakeY+Box;

     // when snake eats food
     if(snakeX == food.x && snakeY==food.y){
        score++;
        food={
            x:  Math.floor(Math.random()*17+1)*Box,
            y:  Math.floor(Math.random()*15+3)*Box
        }
        eat.play();
    }else{
         //Pop the tail
        snake.pop() 
    }
    

    // Add New Head
    let newHead={
        x:snakeX,
        y:snakeY,
    }
    
   if(snakeX<1*Box || snakeY> 17*Box || snakeX> 17*Box || snakeY<3*Box || collision(newHead,snake)){   
    can_context.fillStyle="white"
    can_context.font= '50px Raleway'
    can_context.fillText("Game Over!!",4*Box,1.6*Box)
       clearInterval(game_control)
       dead.play()
   }
   
   snake.unshift(newHead);
   
   // Score
   can_context.fillStyle="white"
   can_context.font= '50px Raleway'
   can_context.fillText(score,2*Box,1.6*Box)


}

// Calling Draw function every 100ms
let game_control= setInterval(draw,100)




  


















