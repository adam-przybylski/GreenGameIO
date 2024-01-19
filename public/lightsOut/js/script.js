const boardSize = 5;
const lights = [];
let points = 0;
let gameInterval;
let generationSpeed = 1000; // milliseconds
let gameDuration = 2500; // milliseconds
let currentTime = 0;
let gamePaused = false;
let ended = false;
const urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("id") !== "null" ? urlParams.get("id") : null;
let previousXp = 0;
let highscore = 0;
var modal;

function createBoard() {
    let temp = getXpByUserId(userId);
    temp.then(r => {
        previousXp = r
    });
    let temp2 = getHighscore(userId);
    temp2.then(r => {
        highscore = r
    });
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const light = document.createElement('div');
            light.classList.add('light');
            light.id = `light-${i}-${j}`;
            light.addEventListener('click', () => toggleLight(light.id));

            light.style.width = '60px';
            light.style.height = '60px';
            light.style.borderRadius = '50%';

            boardElement.appendChild(light);
            lights.push({id: light.id, active: false, activationTime: 0});
        }
        boardElement.appendChild(document.createElement('br'));
    }
}

async function getXpByUserId(userId) {
    const url = `http://localhost:8081/api/v1/games/xp/${userId}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json().then(r => r);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 0;
    }
}

async function getHighscore(userId) {
    const url = `http://localhost:8081/api/v1/games/lightsOut/${userId}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json().then(r => r);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 0;
    }
}


function toggleLight(lightId) {
    const light = lights.find(l => l.id === lightId);
    if (light) {
        if (light.active) {
            light.active = false;
            updatePoints(1);
            light.activationTime = light.active ? currentTime : 0;
            document.getElementById(lightId).style.backgroundColor = '#333';
        } else {
            endGame();
        }
    }
}

function checkEndGame() {
    return lights.some(light => light.active && (currentTime - light.activationTime) >= gameDuration);
}

function startGame() {
    if(userId === null) {
        alert("Musisz się zalogować aby zagrać w tą grę!");
        return;
    }
    if (previousXp < 300) {
        alert("Musisz mieć minimum 300 XP aby zagrać w tą grę! Masz " + previousXp + " XP.");
        return;
    }
    function gameIntervalHandler() {
        if (!gamePaused) {
            currentTime += generationSpeed;
            generateLights();

            if (checkEndGame()) {
                endGame();
            }
        }
    }

    gameInterval = setInterval(gameIntervalHandler, generationSpeed);
    setInterval(() => {
        generationSpeed -= 100;
        console.log("Nowa wartość generationSpeed: " + generationSpeed);
        clearInterval(gameInterval);
        gameInterval = setInterval(gameIntervalHandler, generationSpeed);
        if (generationSpeed <= 0) {
            clearInterval(gameInterval);
        }
    }, 5000);
}

function updatePoints(amount) {
    points += amount;
    const pointsElement = document.getElementById('points');
    if (pointsElement) {
        pointsElement.textContent = points;
    }
}

function generateLights() {
    if (ended) return;

    let light;
    do {
        const randomIndex = Math.floor(Math.random() * lights.length);
        light = lights[randomIndex];
    } while (light.active);

    light.active = true;
    light.activationTime = currentTime;
    document.getElementById(light.id).style.backgroundColor = '#efef4f';
    document.getElementById(light.id).style.borderRadius = '50%';

    setTimeout(() => {
        if (checkEndGame()) {
            endGame();
        }
    }, gameDuration / 30);
}

function endGame() {
    clearInterval(gameInterval);
    ended = true;
    showGameOverModal(points)
    const xpEarned = calculateXPfromPoints(points);

    updateXPInDatabase(userId, xpEarned);
    setTimeout(function(){
        updateLightsOutResult(userId, points);
    }, 1000);

    resetGame();
}

function updateXPInDatabase(userId, xp) {
    const url = `http://localhost:8081/api/v1/games/updateUserXP/${userId}/${xp}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function updateLightsOutResult(userId, score) {
    const url = `http://localhost:8081/api/v1/games/lightsOut/${userId}/${score}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function showGameOverModal(points) {
    document.getElementById('pointsEarned').innerText = points + " punktów" + "\n" + "Zdobyłeś " + calculateXPfromPoints(points) + " XP" + "\n" + "Twój rekord przed podejściem: " + highscore + " punktów";



    modal = document.getElementById("gameOverModal");
    modal.style.display = "block";
    // $('#gameOverModal').modal('show');
}

function resetGame() {
    lights.forEach(light => {
        light.active = false;
        document.getElementById(light.id).style.backgroundColor = '#333';
    });

    currentTime = 0;
    updatePoints(0)
    createBoard();
    startGame();
}

function toggleGame() {
    gamePaused = !gamePaused;
    if (gamePaused) {
        clearInterval(gameInterval);
        $('#pauseAlertModal').modal('show'); // Show the pause alert modal
    } else {
        $('#pauseAlertModal').modal('hide'); // Hide the pause alert modal
        startGame();
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        toggleGame();
    }
});

function calculateXPfromPoints(points) {
    return points / 5;
}

createBoard();