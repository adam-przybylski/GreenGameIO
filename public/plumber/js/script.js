const BOARD_WIDTH = 9;
const BOARD_HEIGHT = 9;
const PT = {
    I: "I", L: "L", T: "T"
}

//   0
// 3 x 1
//   2
const DIRECTIONS = {
    UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3
}

// const PIPES = [
//     [0,0,0,0,1,0,0,0,0],
//     [PT.L, PT.I, PT.T, PT.I, PT.T, PT.I, PT.T, PT.I, PT.L],
//     [PT.I, 0, PT.L, PT.L, PT.I, 0, PT.I, 0, PT.I],
//     [PT.T, PT.I, PT.L, PT.T, PT.L, PT.I, PT.T, 0, PT.I],
//     [PT.T, PT.I, PT.T, PT.L, PT.I, PT.T, PT.L, PT.I, PT.L],
//     [PT.I, 0, 0, PT.I, 0, PT.T, PT.I, PT.I, PT.L],
//     [PT.I, 0, 0, PT.I, 0, PT.I, 0, 0, PT.I],
//     [1,0,0,1,0,1,0,0,1]
// ];

class PipesGame {
    constructor() {
        this.pipes = [];
        this.pipesHTML = document.getElementById("pipes");
        this.path = []
        this.timeHTML = document.getElementById("time");
        this.score = 0;
        this.scoreCopy = 0;
        this.duration = 20000;
        this.scoreHTML = document.getElementById("score");
        this.intervalId = 0;
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get("id") !== "null" ? urlParams.get("id") : null;
    }

    initGame() {
        //creation of first row by hand
        let pipesRow = [];
        let pipesRowHTML = document.createElement("tr");
        for (let i = 0; i < BOARD_WIDTH - 1; i++) {
            pipesRow.push(0);
            pipesRowHTML.appendChild(document.createElement("td"));
        }
        let entryPipe = new Pipe(0, PT.I);
        entryPipe.pipeHTML.className = entryPipe.pipeHTML.className + " noOnClick";
        pipesRow[Math.floor(BOARD_WIDTH / 2)] = entryPipe;
        pipesRowHTML.replaceChild(entryPipe.pipeHTML, pipesRowHTML.children[Math.floor(BOARD_WIDTH / 2)]);
        this.pipes.push(pipesRow);
        this.pipesHTML.appendChild(pipesRowHTML);

        for (let i = 1; i < BOARD_HEIGHT - 1; i++) {
            pipesRow = []
            pipesRowHTML = document.createElement("tr");
            for (let j = 0; j < BOARD_WIDTH; j++) {
                let number = (Math.floor(Math.random() * 3));
                let type;
                switch (number) {
                    case 0:
                        type = PT.I;
                        break;
                    case 1:
                        type = PT.T;
                        break;
                    case 2:
                        type = PT.L;
                        break;
                }
                let newPipe = new Pipe(Math.floor(Math.random() * 4), type);
                pipesRow.push(newPipe);
                pipesRowHTML.appendChild(newPipe.pipeHTML);
            }
            this.pipes.push(pipesRow);
            this.pipesHTML.appendChild(pipesRowHTML);
        }
        this.pipesHTML.onclick = (event) => {
            const x = event.target.cellIndex;
            const y = event.target.parentElement.rowIndex;
            if (x !== undefined && y !== undefined && this.pipes[y][x] instanceof Pipe) {
                this.pipes[y][x].rotate()
            }
        }
        let row = [];
        let rowHTML = document.createElement("tr");
        for (let i = 0; i < 9; i++) {
            let newSpace = document.createElement("td");
            row.push(0);
            rowHTML.appendChild(newSpace);
        }
        this.pipes.push(row);
        this.pipesHTML.appendChild(rowHTML);
        this.addNewWaterCup();
    }

    //direction - where the water is coming from
    simulateWaterFlow(x, y, direction) {
        if (x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT || this.findCoordinates(this.path, [x, y]) !== -1) {
            return false
        }

        if (this.pipes[y][x] instanceof WaterCup) {
            return true;
        }

        if (!(this.pipes[y][x] instanceof Pipe) || !this.pipes[y][x].canWaterFlow(direction)) {
            return false;
        }

        this.path.push([x, y]);
        if (this.pipes[y][x].canWaterFlow(DIRECTIONS.DOWN) && direction !== DIRECTIONS.DOWN && this.simulateWaterFlow(x, y + 1, DIRECTIONS.UP, this.path)) {

            return true;
        } else if (this.pipes[y][x].canWaterFlow(DIRECTIONS.RIGHT) && direction !== DIRECTIONS.RIGHT && this.simulateWaterFlow(x + 1, y, DIRECTIONS.LEFT, this.path)) {

            return true;
        } else if (this.pipes[y][x].canWaterFlow(DIRECTIONS.LEFT) && direction !== DIRECTIONS.LEFT && this.simulateWaterFlow(x - 1, y, DIRECTIONS.RIGHT, this.path)) {

            return true;
        } else if (this.pipes[y][x].canWaterFlow(DIRECTIONS.UP) && direction !== DIRECTIONS.UP && this.simulateWaterFlow(x, y - 1, DIRECTIONS.DOWN, this.path)) {

            return true;
        }
        const index = this.findCoordinates(this.path, [x, y]);
        if (index > -1) { // only splice array when item is found
            this.path.splice(index, 1); // 2nd parameter means remove one item only
        }
        return false;
    }

    async endRound() {
        this.path = [];
        if (this.simulateWaterFlow(4, 0, DIRECTIONS.UP)) {
            for (const pos of this.path) {
                this.pipes[pos[1]][pos[0]].changeWaterOpacity(0, 0.05);
                await new Promise(r => setTimeout(r, 25));
            }
            let x = this.path[this.path.length - 1][0];
            let y = this.path[this.path.length - 1][1] + 1;
            let waterCup = this.pipes[y][x];
            await waterCup.fillCup(0, 0.02);
            await new Promise(r => setTimeout(r, 1000));
            for (const pos of this.path) {
                this.pipes[pos[1]][pos[0]].changeWaterOpacity(1, -0.05);
                await new Promise(r => setTimeout(r, 25));
            }
            await new Promise(r => setTimeout(r, 1000));
            this.removeWaterCup(x);
            this.addNewWaterCup();
            return true;
        } else {
            this.endGame();
            return false;
        }
    }

    //returns index of the coordinates in the path
    //if not found returns -1
    findCoordinates(arr, pos) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] === pos[0] && arr[i][1] === pos[1]) {
                return i;
            }
        }
        return -1;
    }

    addNewWaterCup() {
        let newWaterCup = new WaterCup();
        let cupPosition = Math.floor(Math.random() * BOARD_WIDTH);
        let elementToReplace = document.querySelector(`tr:last-child > td:nth-child(${cupPosition + 1})`);
        this.pipesHTML.lastChild.replaceChild(newWaterCup.cupHTML, elementToReplace);
        this.pipes[BOARD_HEIGHT - 1][cupPosition] = newWaterCup;
    }

    removeWaterCup(cupPosition) {
        this.score++;
        this.scoreHTML.innerText = this.score;
        this.pipes[BOARD_HEIGHT - 1][cupPosition] = 0;
        let elementToReplace = document.querySelector(`tr:last-child > td:nth-child(${cupPosition + 1})`);
        this.pipesHTML.lastChild.replaceChild(document.createElement("td"), elementToReplace);
    }

    gameLoop(duration) {
        let timer = duration, seconds, milliseconds;
        this.intervalId = setInterval(async () => {
            seconds = parseInt(timer / 1000, 10);
            milliseconds = parseInt(timer % 1000, 10) / 100;

            this.timeHTML.textContent = seconds + ":" + milliseconds + " s";

            timer -= 100;
            if (timer < 0) {
                clearInterval(this.intervalId);
                this.endRound().then((wasRoundWon) => {
                    if (wasRoundWon) {
                        this.gameLoop(duration - 500);
                    }
                });
            }

        }, 100);
    }

    endGame() {
        this.addExperience();
        clearInterval(this.intervalId)
        let bestScore = 0;
        this.scoreCopy = this.score;
        if(this.userId !== null){
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:8081/api/v1/games/plumber/" + this.userId, true);
            xhttp.timeout = 2000;
            xhttp.onload = () => {
                if (xhttp.status === 200) {
                    bestScore = xhttp.responseText;
                    document.getElementById("showBestScore").innerText = bestScore;
                    if (this.scoreCopy > bestScore) document.getElementById("saveButton").disabled = false;
                } else if (xhttp.status === 500) {
                    document.getElementById("saveButton").disabled = false;
                }
            }
            xhttp.ontimeout = () => {
                document.getElementById("response").innerText = "Brak połączenia";
                document.getElementById("response").style.setProperty("color", "yellow");
            }
            xhttp.send(null);
        }
        document.getElementById("showScore").innerText = this.score;
        document.getElementById("showBestScore").innerText = "";
        document.getElementById("endScreen").style.setProperty("display", "block");
    }

    closeModal() {
        document.getElementById("endScreen").style.setProperty("display", "none");
        document.getElementById("saveButton").disabled = true;
        document.getElementById("response").innerText = "";
        this.resetGameState();
        this.gameLoop(this.duration);
    }

    saveScore() {
        if(this.userId === null) return;
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8081/api/v1/games/plumber/" + this.userId + "/" + this.scoreCopy, true);
        // xhttp.timeout = 2000;
        xhttp.onload = () => {
            document.getElementById("response").innerText = "Zapisano";
            document.getElementById("response").style.setProperty("color", "green");
            document.getElementById("saveButton").disabled = true;
        }
        xhttp.ontimeout = () => {
            document.getElementById("response").innerText = "Brak połączenia";
            document.getElementById("response").style.setProperty("color", "yellow");
        }
        xhttp.onerror = () => {
            document.getElementById("response").innerText = "Błąd";
            document.getElementById("response").style.setProperty("color", "red");
        }
        xhttp.send();
    }

    addExperience() {
        if (this.score === 0 || this.userId === null) return;
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8081/api/v1/games/updateUserXP/" + this.userId + "/100", true);
        xhttp.send();
    }

    resetGameState() {
        this.pipes = [];
        this.pipesHTML.textContent = '';
        this.score = 0;
        this.scoreHTML.textContent="0";
        this.initGame();
    }
}

class WaterCup {
    constructor() {
        this.cupHTML = document.createElement("td");
        this.imageHTML = document.createElement("a");
        this.imageHTML.className = "waterCup";
        this.waterHTML = document.createElement("a");
        this.waterHTML.className = "water";
        this.cupHTML.appendChild(this.imageHTML);
        this.cupHTML.appendChild(this.waterHTML);
    }

    async fillCup(level, step) {
        if (level > 0.9) return;
        this.waterHTML.style.height = `calc(var(--item-size)*${level})`;
        this.waterHTML.style.top = `calc(var(--item-size) - (var(--item-size)*${level})`
        setTimeout(() => this.fillCup(level + step, step), 40);
    }
}

class Pipe {
//rotation, type

    constructor(rotation, type) {
        this.rotation = rotation;
        this.type = type;
        this.pipeHTML = document.createElement("td");

        this.pipeHTML.className += this.type;
        this.pipeHTML.className += " " + this.rotation;
    }

    rotate() {
        this.rotation = (this.rotation + 1) % 4;
        this.pipeHTML.className = this.type + " " + this.rotation;
    }

    canWaterFlow(direction) {
        switch (this.type) {
            case PT.I:
                return (direction === (DIRECTIONS.UP + this.rotation) % 4 || direction === (DIRECTIONS.DOWN + this.rotation) % 4);
            case PT.L:
                return (direction === (DIRECTIONS.UP + this.rotation) % 4 || direction === (DIRECTIONS.RIGHT + this.rotation) % 4);
            case PT.T:
                return (direction === (DIRECTIONS.RIGHT + this.rotation) % 4 || direction === (DIRECTIONS.DOWN + this.rotation) % 4 || direction === (DIRECTIONS.LEFT + this.rotation) % 4);
        }
    }

    async changeWaterOpacity(opacity, step) {
        if (opacity > 1 || opacity < 0) return;
        this.pipeHTML.style.backgroundColor = `rgb(0, 153, 255, ${opacity})`
        setTimeout(() => this.changeWaterOpacity(opacity + step, step), 40);
    }
}

let game = new PipesGame();
game.initGame();
game.gameLoop(game.duration);