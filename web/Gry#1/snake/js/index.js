// Game Constants & Variables
let direction = {x: 0, y: 0};
let speed = 10;
let score = 0;
let lastUpdateTime = 0;
let snakeArray = [
    {x: 13, y: 15}
];

let min = 2;
let max = 16;
bootle = {x: Math.round(min + (max - min) * Math.random()), y: Math.round(min + (max - min) * Math.random())};
paper = {x: Math.round(min + (max - min) * Math.random()), y: Math.round(min + (max - min) * Math.random())};
paper_bin = {x:5,y:4};
glass_bin = {x:15,y:4};
paper_taken=false;
bootle_taken=false;
is_paused = false;



// Game Functions
function gameLoop(currentTime) {
    window.requestAnimationFrame(gameLoop);
    // console.log(currentTime)
    if((currentTime - lastUpdateTime)/1000 < 1/speed){
        return;
    }
    lastUpdateTime = currentTime;
    updateGame();
}

function checkCollision(snake) {
    // If the snake bumps into itself
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If the snake bumps into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}

function updateGame(){
    // Part 1: Updating the snake array & Food
    if(checkCollision(snakeArray)){
        direction =  {x: 0, y: 0}; 
        snakeArray = [{x: 13, y: 15}];
        score = 0; 
        bootle_taken = false;
        paper_taken = false;
        scoreView.innerHTML = "Score: " + score;
        alert("Game Over. Press any key to play again!");
    }

    // If the snake has eaten the trash  , increment the score and regenerate the trash
    if(snakeArray[0].y === bootle.y && snakeArray[0].x === bootle.x && paper_taken == false && bootle_taken == false){
        scoreView.innerHTML = "Score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y});
        let min = 2;
        let max = 16;
        bootle = {x: Math.round(min + (max - min) * Math.random()), y: Math.round(min + (max - min) * Math.random())}
        bootle_taken = true;
    }
    else if (snakeArray[0].y === paper.y && snakeArray[0].x === paper.x && bootle_taken == false &&  paper_taken == false){
        scoreView.innerHTML = "Score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y});
        let min = 2;
        let max = 16;
        paper = {x: Math.round(min + (max - min) * Math.random()), y: Math.round(min + (max - min) * Math.random())}
        paper_taken = true;
    }
    //logic from throwing out the paper trash to paper bin. 
    if(snakeArray[0].y === paper_bin.y && snakeArray[0].x === paper_bin.x ){
        if(paper_taken == true){
            score += 1;
            scoreView.innerHTML = "Score: " + score;
            paper_taken = false;
        }
        if(bootle_taken == true){
            snakeArray = [{x: 13, y: 15}];
            score = 0; 
            direction =  {x: 0, y: 0}; 
            bootle_taken = false
            scoreView.innerHTML = "Score: " + score;
            alert('Przegrana , wyrzuciles butelke do nieodpowiedniego kosza')
        }
    }
    if(snakeArray[0].y === glass_bin.y && snakeArray[0].x === glass_bin.x ){
        if(bootle_taken == true){
            score += 1;
            scoreView.innerHTML = "Score: " + score;
            bootle_taken = false;
        }
        if(paper_taken == true){
            snakeArray = [{x: 13, y: 15}];
            score = 0; 
            direction =  {x: 0, y: 0}; 
            paper_taken = false;
            scoreView.innerHTML = "Score: " + score;
            alert('Przegrana , wyrzuciles papier do nieodpowiedniego kosza')
        }
    }
    // Moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) { 
        snakeArray[i + 1] = {...snakeArray[i]};
    }

    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;

    // Part 2: Display the snake and Food
    // Display the snake
    gameBoard.innerHTML = "";
    snakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        gameBoard.appendChild(snakeElement);
    });
    // Display the wastes

      //bottle waste
      bootleElement = document.createElement('div');
      bootleElement.style.gridRowStart = bootle.y;
      bootleElement.style.gridColumnStart = bootle.x;
      bootleElement.classList.add('glass_bootle')
      gameBoard.appendChild(bootleElement);
  
      //paper waste
      paperElement = document.createElement('div');
      paperElement.style.gridRowStart = paper.y;
      paperElement.style.gridColumnStart = paper.x;
      paperElement.classList.add('paper_waste')
      gameBoard.appendChild(paperElement);
  
  
  
      //display trashes
    // Display the paper trash
    paper_trash = document.createElement('div');
    paper_trash.style.gridRowStart = paper_bin.y;
    paper_trash.style.gridColumnStart = paper_bin.x;
    paper_trash.classList.add('bin_paper')
    gameBoard.appendChild(paper_trash);
      // Display the glash trash
      glass_trash = document.createElement('div');
      glass_trash.style.gridRowStart = glass_bin.y;
      glass_trash.style.gridColumnStart = glass_bin.x;
      glass_trash.classList.add('bin_glass')
      gameBoard.appendChild(glass_trash);


}

window.requestAnimationFrame(gameLoop);
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            console.log(is_paused)
            if (direction.y !== 1) {
                console.log("ArrowUp");
                direction.x = 0;
                direction.y = -1;
            }
            break;

        case "ArrowDown":
            console.log(is_paused)
            if (direction.y !== -1) {
                console.log("ArrowDown");
                direction.x = 0;
                direction.y = 1;
            }
            break;

        case "ArrowLeft":
            console.log(is_paused)
            if (direction.x !== 1) {
                console.log("ArrowLeft");
                direction.x = -1;
                direction.y = 0;
            }
            break;

        case "ArrowRight":
            console.log(is_paused)
            if (direction.x !== -1) {
                console.log("ArrowRight");
                direction.x = 1;
                direction.y = 0;
            }
            break;
            case "Escape":
                is_paused = !is_paused
                console.log(is_paused)
                if(is_paused){
                    alert("Game paused")
                    is_paused = !is_paused
                }
                break;

        default:
            break;
    }
});
