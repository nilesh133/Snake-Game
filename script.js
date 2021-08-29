let direction = { x: 0, y: 0 };
let snake = [{ x: 11, y: 12 }];
let food = { x: 18, y: 15 };
let lastTime = 0;
let score = 0;
let highscore = 0;
let speed;
const eat_food = new Audio("eat_food.mp3");
const button_click = new Audio("button_click.mp3")



let btn = document.querySelectorAll('button');
for(let items of btn){
     items.addEventListener('click',function(e){
      speed = e.target.innerText;
      button_click.play();
      document.getElementById("board").style.height = "90vmin";
      document.getElementById("board").style.width = "90vmin";
      document.getElementById("home-page").style.display = "none";
      document.getElementById("score-board").style.width = "40vmin";
      document.getElementById("score-board").style.height = "20vmin";
    } 
     )};


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastTime) / 1000 < 0.5/speed) {
        return;
    }
    else {
        lastTime = ctime;
    }
    game();
}

function isCollide(snake) {
    
    for (let idx = 1; idx < snake.length; idx++) {
        if (snake[idx].x === snake[0].x && snake[idx].y === snake[0].y) {
            return true;
        }
    }

    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }
    return false;
    
}

function game() {
    if (isCollide(snake)) {
        setTimeout(() => {
            document.getElementById("game-over").style.height = "40%";
            document.getElementById("game-over").style.width = "40%";
            document.getElementById("board").style.height = "0vmin";
            document.getElementById("board").style.width = "0vmin";
            document.getElementById("score-board").style.width = "0vmin";
            document.getElementById("score-board").style.height = "0vmin";
        }, 200);

        document.getElementById("game-over-score-display").innerHTML = score;
        direction = { x: 0, y: 0 };
        snake = [{ x: 11, y: 12 }];
        score = 0;
        document.getElementById("score-num-2").innerHTML = score;

      window.addEventListener('keydown',function(e){
        document.getElementById("game-over").style.height = "0vmin";
        document.getElementById("game-over").style.width = "0vmin";
        document.getElementById("board").style.height = "90vmin";
        document.getElementById("board").style.width = "90vmin";
        document.getElementById("score-board").style.width = "40vmin";
        document.getElementById("score-board").style.height = "20vmin";
       
       });
    }



    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.unshift({ x: snake[0].x + direction.x, y: snake[0].y + direction.y });
        eat_food.play();
        score++;
        if(score > highscore){
            highscore = score;
        }
        document.getElementById("high-score-num-2").innerHTML = highscore;
        document.getElementById("score-num-2").innerHTML = score;

        food = { x: Math.round(2 + (18 - 2) * Math.random()), y: Math.round(2 + (18 - 2) * Math.random()) };
    }

    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }

    snake[0].x += direction.x;
    snake[0].y += direction.y;

    board.innerHTML = "";
    snake.forEach(function (e, idx) {
        snakeElm = document.createElement('div');
        snakeElm.style.gridRowStart = e.y;
        snakeElm.style.gridColumnStart = e.x;

        if (idx === 0) {
            snakeElm.classList.add('head');
        }
        else {
            snakeElm.classList.add('snake');
        }
        board.appendChild(snakeElm);
    });

    foodElm = document.createElement('div');
    foodElm.style.gridRowStart = food.y;
    foodElm.style.gridColumnStart = food.x;
    foodElm.classList.add('food');
    board.appendChild(foodElm);
    
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }

});