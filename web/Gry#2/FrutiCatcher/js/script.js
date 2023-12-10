//For the time being trying to use view port size instead of pixel to see if it scales correctly
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 100;
const BOARD_WIDTH=1000;
const BOARD_HEIGHT=600;
const ITEM_WIDTH=20;
const ITEM_HEIGHT=20;
class Player{
    // fields
    // positionX, positionY, PlayerStyleHandle, doMoveLeft, doMoveRight
    constructor(position) {
        this.postionY = 500;
        this.postionX = position;
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
        if(this.doMoveLeft) delta = -7;
        else if(this.doMoveRight) delta+=7;
        if(this.postionX+delta > 0 && this.postionX+PLAYER_WIDTH+delta<BOARD_WIDTH && delta !== 0) {
            this.postionX += delta;
            this.PlayerStyleHandle.setProperty("left",this.postionX + "px");
        }
    }
}

class FruitCatcherGame{
    //fields
    //lives, player, fpsInterval, elapsed, framesCycle, itemSpawnFrames, items, score
    constructor() {
        this.lives = 3;
        this.player = new Player((BOARD_WIDTH-PLAYER_WIDTH)/2);
        this.fpsInterval = 1000 / 60;
        this.then = Date.now();
        this.framesCycle = -1;
        this.itemSpawnFrames=50;
        this.items = [];
        this.score = 0;
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
                    if(item.isGood) this.lives--;
                    this.items = this.items.filter((element) => {return element.id !== item.id;});
                }
                if(this.checkCollisions(item)){
                    item.isGood?this.changeScore(+100):this.changeScore(-100);
                    this.items = this.items.filter((element) => {return element.id !== item.id;});
                }
            });
        }
    }

    //returns true if collision happened
    checkCollisions(item){
        return ((item.postionX > this.player.postionX && item.postionX < this.player.postionX + PLAYER_WIDTH) ||
                (item.postionX + ITEM_WIDTH > this.player.postionX && item.postionX + ITEM_WIDTH < this.player.postionX + PLAYER_WIDTH)) &&
            ((item.positionY > this.player.postionY && item.positionY < this.player.postionY + PLAYER_HEIGHT) ||
                (item.positionY + ITEM_HEIGHT > this.player.postionY && item.positionY + ITEM_HEIGHT < this.player.postionY + PLAYER_HEIGHT));
    }

    changeScore(amount){
        this.score = amount;
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
        this.positionX = Math.floor(Math.random() * BOARD_WIDTH-ITEM_WIDTH);
        this.positionY = -ITEM_HEIGHT;
        //to determine the class of an item to use different images
        this.type = Math.floor(Math.random() * 5);
        //based od item type, determines if item is good or bad
        this.isGood = this.type <= 2;

        this.itemHandle = document.createElement("div");
        this.itemHandle.className = this.type.toString()+" item";
        this.itemStyleHandle = this.itemHandle.style;
        this.itemStyleHandle.setProperty("top",this.positionY+" px");
        this.itemStyleHandle.setProperty("left",this.positionX+" px");
        document.getElementById("board").appendChild(this.itemHandle);
    }

    //returns true if item should be removed
    //delta - how much to move an item
    move(){
        let delta = 5;
        if(this.positionY+delta+ITEM_HEIGHT>BOARD_HEIGHT){
            this.destroy();
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