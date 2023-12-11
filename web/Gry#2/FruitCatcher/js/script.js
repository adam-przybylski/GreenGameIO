//For the time being trying to use view port size instead of pixel to see if it scales correctly
const PLAYER_WIDTH = 120;
const PLAYER_HEIGHT = 100;
const BOARD_WIDTH=1000;
const BOARD_HEIGHT=600;
const ITEM_WIDTH=50;
const ITEM_HEIGHT=50;
class Player{
    // fields
    // positionX, positionY, PlayerStyleHandle, doMoveLeft, doMoveRight
    constructor(position) {
        this.positionY = 500;
        this.positionX = position;
        this.PlayerStyleHandle = document.getElementById("player").style;
        document.addEventListener("keydown", (event)=> {
            if (event.key === "ArrowRight" ) { // Moving right
                this.doMoveRight = true;
            }
            if (event.key === "ArrowLeft" ) { // Moving left
                event.preventDefault();
                this.doMoveLeft = true;
            }
        });

        document.addEventListener("keyup", (event)=> {
            if (event.key === "ArrowRight" ) { // Moving left
                event.preventDefault();
                this.doMoveRight = false;
            }
            if (event.key === "ArrowLeft" ) { // Moving left
                event.preventDefault();
                this.doMoveLeft = false;
            }
        })
    }

    //delta - how much to move a player left or right
    move(){
        let delta = 0;
        if(this.doMoveLeft) delta = -12;
        else if(this.doMoveRight) delta+=12;
        if(this.positionX+delta > 0 && this.positionX+PLAYER_WIDTH+delta<BOARD_WIDTH && delta !== 0) {
            this.positionX += delta;
            this.PlayerStyleHandle.setProperty("left",this.positionX + "px");
        }
    }
}

class FruitCatcherGame{
    //fields
    //lives, player, fpsInterval, elapsed, framesCycle, itemSpawnFrames, items, score, scoreHandle, livesHandle
    constructor() {
        this.lives = 3;
        this.player = new Player((BOARD_WIDTH-PLAYER_WIDTH)/2);
        this.fpsInterval = 1000 / 55;
        this.then = Date.now();
        this.framesCycle = -1;
        this.itemSpawnFrames=50;
        this.items = [];
        this.score = 0;
        this.scoreHandle = document.getElementById("score");
        this.livesHandle = document.getElementById("lives");
    }

    gameLoop(){
        // request another frame
        requestAnimationFrame(() => this.gameLoop());
        // calc elapsed time since last loop
        this.now = Date.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fpsInterval) {
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = this.now - (this.elapsed % this.fpsInterval);

            if(this.framesCycle++>this.itemSpawnFrames){
                this.items.push(new Item);
                this.framesCycle=0;
            }
            this.player.move();

            this.items.forEach((item) => {
                if(item.move()) {
                    item.destroy();
                    this.items = this.items.filter((element) => {return element.id !== item.id;});
                    if(item.isGood) {
                        this.lives--;
                        this.livesHandle.innerText=this.lives
                        if(this.lives===0){this.endGame();}
                    }
                }
                if(this.checkCollisions(item)){
                    item.isGood?this.changeScore(+100):this.changeScore(-100);
                    item.destroy();
                    this.items = this.items.filter((element) => {return element.id !== item.id;});
                }
            });
        }
    }

    //returns true if collision happened
    checkCollisions(item){
        let xFirstPoint = (item.positionX > this.player.positionX) && (item.positionX < this.player.positionX + PLAYER_WIDTH);
        let xSecondPoint = (item.positionX + ITEM_WIDTH > this.player.positionX) && (item.positionX + ITEM_WIDTH < this.player.positionX + PLAYER_WIDTH);
        let yFirstPoint = (item.positionY > this.player.positionY) && (item.positionY < this.player.positionY + PLAYER_HEIGHT);
        let ySecondPoint = (item.positionY + ITEM_HEIGHT > this.player.positionY) && (item.positionY + ITEM_HEIGHT < this.player.positionY + PLAYER_HEIGHT);
        return (xFirstPoint || xSecondPoint) && (yFirstPoint || ySecondPoint);
    }

    changeScore(amount){
        this.score += amount;
        this.scoreHandle.innerText = this.score;
    }

    endGame(){
        //TODO save to database popup
        alert("You loose!");
        this.resetGameState();
    }

    resetGameState(){
        this.scoreHandle.innerText=0;
        this.lives = 3;
        this.livesHandle.innerText = this.lives;
        this.player.positionX = (BOARD_WIDTH-PLAYER_WIDTH)/2;
        this.items.forEach((item) => item.destroy());
        this.items = [];
        this.player.doMoveRight = false;
        this.player.doMoveLeft = false;
    }
}

const ItemType = {
    good0: 0,
    good1: 1,
    good2: 2,
    bad0: 3,
    bad1: 4,
    bad2: 5
}

class Item{
    //id,positionX, positionY, type, isGood, itemHandle
    constructor() {
        this.id = Date.now();
        this.positionX = Math.abs(Math.floor(Math.random() * BOARD_WIDTH-ITEM_WIDTH));
        this.positionY = -ITEM_HEIGHT;
        //to determine the class of an item to use different images
        this.type = Math.floor(Math.random() * 6);
        //based od item type, determines if item is good or bad
        this.isGood = this.type <= 2;

        this.itemHandle = document.createElement("div");
        this.itemHandle.className = this.type.toString()+" item";
        this.itemStyleHandle = this.itemHandle.style;
        this.itemStyleHandle.setProperty("top",this.positionY + "px");
        this.itemStyleHandle.setProperty("left",this.positionX + "px");
        document.getElementById("board").appendChild(this.itemHandle);
    }

    //returns true if item should be removed
    //delta - how much to move an item
    move(){
        let delta = 3;
        if(this.positionY+delta+ITEM_HEIGHT>BOARD_HEIGHT){;
            return true;
        }else{
            this.positionY+=delta;
            this.itemStyleHandle.setProperty("top",this.positionY + "px");
            return false;
        }
    }

    destroy(){
        document.getElementById("board").removeChild(this.itemHandle);
    }
}

let game = new FruitCatcherGame();
game.gameLoop();