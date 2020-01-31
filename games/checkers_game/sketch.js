board = [];
const rows = 8;
const cols = 8;
const scl = 100;

let turn = -1;
let dir = turn;
let holdingPiece = 0;
let holdingPos = [];
let forcedMoves = [];
let doubleJump = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    createBoard();
}

function draw() {
    background(255);
    drawBoard();
    if (abs(holdingPiece))
        drawMovingPiece();
}

function mousePressed() {
    let xindex = floor((mouseX - windowWidth / 2 - cols / 2 * scl) / scl) + cols;
    let yindex = floor((mouseY - windowHeight / 2 - rows / 2 * scl) / scl) + rows;
    if (xindex >= 0 && xindex < cols && yindex >= 0 && yindex < rows) {
        holdingPiece = board[yindex][xindex];
        board[yindex][xindex] = 0;
        holdingPos = [xindex, yindex];
    }
    if (keyIsPressed) {
        if (keyCode == 97)
            holdingPiece = 0;
        else if (keyCode == 115)
            holdingPiece = -1;
        else if (keyCode == 100)
            holdingPiece = 1;
        else if (keyCode == 102) {
            turn *= -1;
            dir *= -1;
        }
    }
}

function mouseReleased() {
    let xindex = floor((mouseX - windowWidth / 2 - cols / 2 * scl) / scl) + cols;
    let yindex = floor((mouseY - windowHeight / 2 - rows / 2 * scl) / scl) + rows;
    if (abs(holdingPiece) > 1) {
        dir *= -1;
        if (xindex >= 0 && xindex < cols && yindex >= 0 && yindex < rows && holdingPiece != 0 && legalMoveCheck(xindex, yindex)) {
            board[yindex][xindex] = holdingPiece;
            holdingPiece = 0;
            if (yindex == (rows - 1) * ((turn + 1) / 2))
                board[yindex][xindex] *= 2;
            if (!doubleJump.length) {
                turn *= -1;
                dir *= -1;
            }
        }
        dir *= -1;
    }
    if (xindex >= 0 && xindex < cols && yindex >= 0 && yindex < rows && holdingPiece != 0 && legalMoveCheck(xindex, yindex)) {
        board[yindex][xindex] = holdingPiece;
        holdingPiece = 0;
        if (yindex == (rows - 1) * ((turn + 1) / 2) && abs(board[yindex][xindex]) < 2)
            board[yindex][xindex] *= 2;
        if (!doubleJump.length) {
            turn *= -1;
            dir *= -1;
        }
    } else {
        if (holdingPiece != 0)
            board[holdingPos[1]][holdingPos[0]] = holdingPiece;
        holdingPiece = 0;
    }
    forcedMove();
}

function legalMoveCheck(xpos, ypos) {

    if (board[ypos][xpos] != 0)
        return false;
    if (ypos % 2 && xpos % 2 || !(ypos % 2) && !(xpos % 2))
        return false;
    if (holdingPiece / abs(holdingPiece) != turn)
        return false;

    if (doubleJump.length) {
        if (holdingPos[0] == doubleJump[0] && holdingPos[1] == doubleJump[1]) {
            if (ypos - holdingPos[1] == 2 * dir && xpos - holdingPos[0] == 2) {
                board[holdingPos[1] + dir][holdingPos[0] + 1] = 0;
                checkForDoubleJump(xpos, ypos);
                return true;
            }
            if (ypos - holdingPos[1] == 2 * dir && xpos - holdingPos[0] == -2) {
                board[holdingPos[1] + dir][holdingPos[0] - 1] = 0;
                checkForDoubleJump(xpos, ypos);
                return true;
            }
        } else {
            return false;
        }
    }

    if (forcedMoves.length) {
        let wrongMove = true;
        for (move in forcedMoves)
            if (holdingPos[0] == forcedMoves[move][0] && holdingPos[1] == forcedMoves[move][1])
                wrongMove = false;
        if (wrongMove)
            return false;
        else {
            if (ypos - holdingPos[1] == 2 * dir && xpos - holdingPos[0] == 2) {
                board[holdingPos[1] + dir][holdingPos[0] + 1] = 0;
                checkForDoubleJump(xpos, ypos);
                return true;
            }
            if (ypos - holdingPos[1] == 2 * dir && xpos - holdingPos[0] == -2) {
                board[holdingPos[1] + dir][holdingPos[0] - 1] = 0;
                checkForDoubleJump(xpos, ypos);
                return true;
            }
            return false;
        }
    } else {
        if (!(ypos - holdingPos[1] == dir && abs(xpos - holdingPos[0]) == 1))
            return false;
    }



    return true;
}

function forcedMove() {
    forcedMoves = [];
    for (let i = 0 + (-dir + 1); i < rows - (dir + 1); i++)
        for (let j = 0; j < cols; j++) {
            if (board[i][j] / abs(board[i][j]) == turn) {
                if (checkForJump(j, i)) {
                    let repeat = false;
                    for (move in forcedMoves)
                        if (j == forcedMoves[move][0] && i == forcedMoves[move][1])
                            repeat = true;
                    if (!repeat)
                        forcedMoves.push([j, i]);
                }
            }
        }
    dir *= -1;
    for (let i = 0 + (-dir + 1); i < rows - (dir + 1); i++)
        for (let j = 0; j < cols; j++) {
            if (board[i][j] == 2 * turn) {
                if (checkForJump(j, i)) {
                    let repeat = false;
                    for (move in forcedMoves)
                        if (j == forcedMoves[move][0] && i == forcedMoves[move][1])
                            repeat = true;
                    if (!repeat)
                        forcedMoves.push([j, i]);
                }
            }
        }
    dir *= -1;
}

function checkForJump(j, i) {

    if (i * dir < (rows - 2) - (rows - 1) * ((dir - 1) / -2)) {
        if (j < cols - 1) {
            if (board[i + 2 * dir][j + 2] == 0 && abs(board[i + dir][j + 1]) / board[i + dir][j + 1] == -turn) {
                return true;
            }
        }
        if (j > 1) {
            if (board[i + 2 * dir][j - 2] == 0 && abs(board[i + dir][j - 1]) / board[i + dir][j - 1] == -turn) {
                return true;
            }
        }
    }
    return false
}

function checkForDoubleJump(x, y) {
    if (checkForJump(x, y))
        doubleJump = [x, y];
    else
        doubleJump = [];
}

function drawMovingPiece() {
    ellipseMode(CENTER);
    if (holdingPiece > 0)
        fill(242);
    else if (holdingPiece < 0)
        fill(0);
    ellipse(mouseX, mouseY, scl, scl);
    rectMode(CENTER);
    fill(0);
    if (holdingPiece > 1)
        ellipse(mouseX, mouseY, .5 * scl, .5 * scl);
    fill(242);
    if (holdingPiece < -1)
        ellipse(mouseX, mouseY, .5 * scl, .5 * scl);
}

function createBoard() {
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            if ((i % 2 && !(j % 2) || !(i % 2) && j % 2) && i < 3)
                board[i][j] = 1;
            else if ((i % 2 && !(j % 2) || !(i % 2) && j % 2) && i > rows - 4)
                board[i][j] = -1;
            else
                board[i][j] = 0;
        }
    }
}

function drawBoard() {
    rectMode(CORNER);
    fill(100);
    rect(0, 0, 80, 80);
    if (turn > 0)
        fill(242);
    else if (turn < 0)
        fill(0);
    rect(5, 5, 70, 70);
    strokeWeight(0);
    rect(windowWidth / 2, windowHeight / 2, scl, scl);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i % 2 && !(j % 2) || !(i % 2) && j % 2)
                fill(125, 135, 150);
            else if (i % 2 && j % 2 || !(i % 2) && !(j % 2))
                fill(232, 235, 239);
            rectMode(CENTER)
            rect(j * scl + windowWidth / 2 - cols / 2 * scl + scl / 2, i * scl + windowHeight / 2 - rows / 2 * scl + scl / 2, scl, scl);
            fill(242);
            ellipseMode(CORNER);
            if (board[i][j] > 0)
                ellipse(j * scl + windowWidth / 2 - cols / 2 * scl, i * scl + windowHeight / 2 - rows / 2 * scl, scl, scl);
            fill(0);
            if (board[i][j] < 0)
                ellipse(j * scl + windowWidth / 2 - cols / 2 * scl, i * scl + windowHeight / 2 - rows / 2 * scl, scl, scl);
            ellipseMode(CENTER);
            fill(0);
            if (board[i][j] > 1)
                ellipse(j * scl + windowWidth / 2 - cols / 2 * scl + scl / 2, i * scl + windowHeight / 2 - rows / 2 * scl + scl / 2, .5 * scl, .5 * scl);
            fill(242);
            if (board[i][j] < -1)
                ellipse(j * scl + windowWidth / 2 - cols / 2 * scl + scl / 2, i * scl + windowHeight / 2 - rows / 2 * scl + scl / 2, .5 * scl, .5 * scl);
        }
    }
}