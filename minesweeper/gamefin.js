//set the world size
const THEDOJO = [];
const dojoDiv = document.querySelector("#the-dojo");
class Cell {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    this.mine = false;
    this.number = 0;
    this.flag = false;
    this.revealed = false;
    }
}

//set the cells
const setCells = () => {
    for (let i = 0; i < 10; i++) {
        THEDOJO[i] = [];
        for (let j = 0; j < 10; j++) {
            THEDOJO[i][j] = new Cell(i, j);
        }
    }
}
//reveal cells
const revealCell = (x, y) => {
    if (THEDOJO[x][y].revealed) {
        return;
    }
    if (THEDOJO[x][y].flag) {
        return;
    }
    THEDOJO[x][y].revealed = true;
    let cell = document.getElementById(`${x}-${y}`);
    cell.classList.add('revealed');
    if (THEDOJO[x][y].mine) {
        cell.classList.add('mine');
        setTimeout(restartGame, 1000, alert('Game Over!'));
        return;
    }
    if (THEDOJO[x][y].number > 0) {
        cell.innerHTML = THEDOJO[x][y].number;
        return;
    }
    if (x > 0 && y > 0) {
        revealCell(x - 1, y - 1);
    }
    if (x > 0) {
        revealCell(x - 1, y);
    }
    if (x > 0 && y < 9) {
        revealCell(x - 1, y + 1);
    }
    if (y > 0) {
        revealCell(x, y - 1);
    }
    if (y < 9) {
        revealCell(x, y + 1);
    }
    if (x < 9 && y > 0) {
        revealCell(x + 1, y - 1);
    }
    if (x < 9) {
        revealCell(x + 1, y);
    }
    if (x < 9 && y < 9) {
        revealCell(x + 1, y + 1);
    }
}

//set the board
const setBoard = () => {
    dojoDiv.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', `${i}-${j}`);
            cell.addEventListener('click', () => {
                revealCell(i, j);
            });
            dojoDiv.appendChild(cell);
        }
    }
}


//set the mines
//set variable to adjust the number of mines
//depending on the difficulty

const setMines = () => {
    for (let i = 0; i < 10; i++) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        THEDOJO[x][y].mine = true;
    }
}

//set the numbers
const setNumbers = () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (THEDOJO[i][j].mine) {
                continue;
            }
            let count = 0;
            if (i > 0 && j > 0 && THEDOJO[i - 1][j - 1].mine) {
                count++;
            }
            if (i > 0 && THEDOJO[i - 1][j].mine) {
                count++;
            }
            if (i > 0 && j < 9 && THEDOJO[i - 1][j + 1].mine) {
                count++;
            }
            if (j > 0 && THEDOJO[i][j - 1].mine) {
                count++;
            }
            if (j < 9 && THEDOJO[i][j + 1].mine) {
                count++;
            }
            if (i < 9 && j > 0 && THEDOJO[i + 1][j - 1].mine) {
                count++;
            }
            if (i < 9 && THEDOJO[i + 1][j].mine) {
                count++;
            }
            if (i < 9 && j < 9 && THEDOJO[i + 1][j + 1].mine) {
                count++;
            }
            THEDOJO[i][j].number = count;
        }
    }
}
//set the colors of the numbers
const setColors = () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (THEDOJO[i][j].number === 1) {
                document.getElementById(`${i}-${j}`).classList.add('one');
            }
            if (THEDOJO[i][j].number === 2) {
                document.getElementById(`${i}-${j}`).classList.add('two');
            }
            if (THEDOJO[i][j].number === 3) {
                document.getElementById(`${i}-${j}`).classList.add('three');
            }
            if (THEDOJO[i][j].number === 4) {

                document.getElementById(`${i}-${j}`).classList.add('four');
            }
            if (THEDOJO[i][j].number === 5) {
                document.getElementById(`${i}-${j}`).classList.add('five');
            }
            if (THEDOJO[i][j].number === 6) {
                document.getElementById(`${i}-${j}`).classList.add('six');
            }
            if (THEDOJO[i][j].number === 7) {
                document.getElementById(`${i}-${j}`).classList.add('seven');
            }
        }
    }
}
//set the flags
const setFlags = () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            THEDOJO[i][j].flag = false;
        }
    }
}

//set the game state
const setGameState = () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            THEDOJO[i][j].revealed = false;
        }
    }
}

//set the game timer
const setGameTimer = () => {
    let time = 0;
    setInterval(() => {
        time++;
        document.getElementById('timer').innerHTML = time;
    }, 1000);
}

//flag the cells
const flagCell = (x, y) => {
    if (THEDOJO[x][y].revealed) {
        return;
    }
    THEDOJO[x][y].flag = !THEDOJO[x][y].flag;
    let cell = document.getElementById(`${x}-${y}`);
    cell.classList.toggle('flag');
}

//count the flags
const countFlags = () => {
    let count = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (THEDOJO[i][j].flag) {
                count++;
            }
        }
    }
    return count;
}

//show the mine total and count down with the flags
const showMineCount = () => {
    let count = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (THEDOJO[i][j].mine) {
                count++;
            }
        }
    }
    let flags = countFlags();
    let mines = count - flags;
    document.getElementById('mines').innerHTML = mines;
}

const flagClick = (e) => {
    let x = e.target.id.split('-')[0];
    let y = e.target.id.split('-')[1];
    flagCell(x, y);
    showMineCount();
}

//listen for flag clicks
addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('cell')) {
        e.preventDefault();
        flagClick(e);
    }
});

//win the game if all the mines are flagged and the numbers are revealed
//check if we won the game
const checkWin = () => {
    let count = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (THEDOJO[i][j].mine && THEDOJO[i][j].flag) {
                count++;
            }
            if (THEDOJO[i][j].revealed) {
                count++;
            }
        }
    }
    if (count === 100) {
        alert('You Win!');
        restartGame();
    } else {
        alert('still playing');
    }
}


//restart the game
const restartGame = () => {
    location.reload();
}
//reveal restart button
const revealRestart = () => {
    let x = document.getElementById('restart');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}




//start the game
const startGame = () => {
    setMines();
    setNumbers();
    setFlags();
    setGameState();
    setBoard();
    setGameTimer();
    setColors();
    flagCell
    showMineCount();
    revealRestart();
}
setCells(); 



