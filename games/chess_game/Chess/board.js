function Board() {
    let chessBoard = [];
    let chessPieces = [];
    let moveList = [];
    this.threatMoves = [];
    this.holdingPiece = false;

    this.preload = function () {
        createBoard();
        this.calculateThreats();
    }
    this.show = function () {
        drawBoard(this.holdingPiece);
        showThreats(this.threatMoves);
    }
    this.update = function () {
        if (this.holdingPiece) {
            drawPiece(pickedPiece, mouseX - white_piece[0].width / 2, mouseY - white_piece[0].height / 2)
        }
        console.log(pieceColor)
        //logic.enPassantReset();
    }

    function createBoard() {
        for (let i = 0; i < rows; i++) {
            chessBoard[i] = [];
            chessPieces[i] = [];
            for (let j = 0; j < cols; j++) {
                if (i % 2 && !(j % 2))
                    chessBoard[i][j] = 0;
                else if (i % 2 && j % 2)
                    chessBoard[i][j] = 1;
                else if (!(i % 2) && !(j % 2))
                    chessBoard[i][j] = 1;
                else if (!(i % 2) && j % 2)
                    chessBoard[i][j] = 0;
                chessPieces[i][j] = 0;
            }
        }
        /*
            pawn = 6
            rook = 5
            knight = 4
            bishop = 3
            queen = 2
            king = 1
        */
        for (let i = 0; i < 2; i++) {
            chessPieces[i] = [];
            for (let j = 0; j < cols; j++) {
                if (i == 0) {
                    if (j == 0 || j == cols - 1)
                        chessPieces[i][j] = -5;
                    else if (j == 1 || j == cols - 2)
                        chessPieces[i][j] = -4;
                    else if (j == 2 || j == cols - 3)
                        chessPieces[i][j] = -3;
                    else if (j == 3)
                        chessPieces[i][j] = -2;
                    else if (j == 4)
                        chessPieces[i][j] = -1;
                } else {
                    chessPieces[i][j] = -6
                }
                chessPieces[rows - i - 1][j] = -chessPieces[i][j];
            }
        }
    }

    function drawBoard(showMoves) {
        stroke(0 * 255 / 2);
        strokeWeight(4);
        ellipseMode(CENTER)
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (chessBoard[y][x]) {
                    fill(255);
                } else {
                    fill(80, 0, 0);
                }
                rect(x * scl + windowWidth / 2 - 4 * scl, y * scl + windowHeight / 2 - 4 * scl, scl, scl, 2);
                drawPiece(chessPieces[y][x], x * scl + windowWidth / 2 - 4 * scl, y * scl + windowHeight / 2 - 4 * scl);
                if (showMoves) {
                    for (let z = 0; z < moveList.length; z++) {
                        if (moveList[z][0] == x && moveList[z][1] == y) {
                            fill(255);
                            ellipse(x * scl + windowWidth / 2 - 4 * scl + scl / 2, y * scl + windowHeight / 2 - 4 * scl + scl / 2, scl / 4);
                        }
                    }
                }
            }
        }
    }

    function drawPiece(piece, xpos, ypos) {
        if (piece > 0) {
            image(white_piece[piece - 1], xpos, ypos)
        } else if (piece < 0) {
            image(black_piece[-piece - 1], xpos, ypos)
        }
    }

    this.flipBoard = function () {
        chessBoard.reverse();
        chessPieces.reverse();
    }

    this.pickPiece = function () {
        let xpos = floor((mouseX - windowWidth / 2 + 4 * scl) / scl);
        let ypos = floor((mouseY - windowHeight / 2 + 4 * scl) / scl);
        if ((0 <= xpos && xpos < 8) && (0 <= ypos && ypos < 8)) {
            if (chessPieces[ypos][xpos] != 0) {
                this.holdingPiece = true;
                moveList = logic.getMoveList(chessPieces, chessPieces[ypos][xpos], xpos, ypos)
                pickedPiece = chessPieces[ypos][xpos];
                chessPieces[ypos][xpos] = 0;
                this.initX = xpos;
                this.initY = ypos;
            }
        }
    }
    this.dropPiece = function () {
        if (this.holdingPiece) {
            this.holdingPiece = false;
            let xpos = floor((mouseX - windowWidth / 2 + 4 * scl) / scl);
            let ypos = floor((mouseY - windowHeight / 2 + 4 * scl) / scl);
            logic.enPassantReset();
            if (pickedPiece == 6 && this.initY == 6 && ypos == 4) {
                logic.enPassant[xpos] = 1;
            }
            chessPieces[ypos][xpos] = pickedPiece;
            //this.flipBoard();
        }
    }


    this.calculateThreats = function () {
        this.threatMoves = [];
        pieceColor *= -1;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (chessPieces[i][j] < -1 * -pieceColor) {
                    let threats = logic.getMoveList(chessPieces, chessPieces[i][j], j, i)
                    if (threats.length > 0) {
                        this.threatMoves.push(threats);
                    }
                }
            }
        }
        pieceColor *= -1;
    }

    function showThreats(threatMoves) {
        fill(255, 255, 0)
        for (let a = 0; a < threatMoves.length; a++) {
            for (let b = 0; b < threatMoves[a].length; b++) {

                //ellipse(threatMoves[a][b][0] * scl + windowWidth / 2 - 4 * scl + scl / 2, threatMoves[a][b][1] * scl + windowHeight / 2 - 4 * scl + scl / 2, scl / 4);
            }
        }

    }
}