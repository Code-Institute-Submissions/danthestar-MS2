const canvas = document.getElementById('game');
const rtw = canvas.getContext('2d');

class ZnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

// by changing the number (higher = faster) refreshing time of game
let speed = 2;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

const znakeParts = [];
let tailLength = 0;  // chaniging starting SIZE of znakes body (higer number = longer body)

let foodX = 5;
let foodY = 5;

let xSpeed = 0;
let ySpeed = 0;

let result = 0;

// game loop sequence's
function drawZnakeGame(){
    changeZnakePosition();
    resetScreen();
    

    checkFoodCollision();
    drawFood();
    drawZnake();

    drawResult();

    setTimeout(drawZnakeGame, 1000/ speed);
}

// score result display window
function drawResult(){
    rtw.fillStyle = 'white';
    rtw.font = "10px Verdana"
    rtw.fillText("Score " + result, canvas.width - 50, 10)
}

function resetScreen(){
    rtw.fillStyle = 'black';
    rtw.fillRect(0,0,canvas.width,canvas.height);
}
// snake on display :D
function drawZnake(){
    rtw.fillStyle = 'white';
    rtw.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    rtw.fillStyle = 'green';
    for(let i = 0; i < znakeParts.length; i++){
        let part = znakeParts[i];
        rtw.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    znakeParts.push(new ZnakePart(headX, headY)); // longggg znake body
    while(znakeParts.length > tailLength){  // by changing if statemant to while allows us more option in future!
        znakeParts.shift(); // body of znake remains in corect lenght on "if" or improved "while" version of statment!! :D
    }
}

function changeZnakePosition(){
    headX = headX + xSpeed;
    headY = headY + ySpeed;
}

// food on display 
function drawFood(){
    rtw.fillStyle = "orange";
    rtw.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize)
}

// food disapears on collison and apears randomly in tilecount area :D
function checkFoodCollision(){
    if(foodX === headX && foodY == headY){
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        tailLength++;
        result++;  // chainging score each time we eat "food"
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    // code for key "up" it 38 
    if(event.keyCode == 38){ 
        if(ySpeed == 1)
            return; // blocking to go back aginst the movment
        ySpeed = -1;
        xSpeed = 0;
    }
    // code for key "down" it 40
    if(event.keyCode == 40){
        if(ySpeed == -1)
            return;
        ySpeed = 1;
        xSpeed = 0;
    }
    // code for key "left" it 37
    if(event.keyCode == 37){
        if(xSpeed == 1)
            return;
        ySpeed = 0;
        xSpeed = -1;
    }
    // code for key "right" it 39
    if(event.keyCode == 39){
        if(xSpeed == -1)
            return;
        ySpeed = 0;
        xSpeed = 1;
    }

}

drawZnakeGame();