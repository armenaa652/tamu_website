function Logic() {
    /*
            pawn = 6
            rook = 5
            knight = 4
            bishop = 3
            queen = 2
            king = 1
    */
    this.enPassant = [0, 0, 0, 0, 0, 0, 0, 0];

    this.enPassantReset = function () {
        this.enPassant = [0, 0, 0, 0, 0, 0, 0, 0];
    }

    this.getMoveList = function (boardState, piece, xpos, ypos) {
        let moveList = [];
        if (piece == 6) {
            moveList = pawnW_Moves(xpos, ypos, boardState);
        } else if (abs(piece) == 5) {
            moveList = rookMoves(xpos, ypos, boardState, moveList);
        } else if (abs(piece) == 4) {
            moveList = knightMoves(xpos, ypos);
        } else if (abs(piece) == 3) {
            moveList = bishopMoves(xpos, ypos, boardState, moveList);
        } else if (abs(piece) == 2) {
            moveList = rookMoves(xpos, ypos, boardState, moveList);
            moveList = bishopMoves(xpos, ypos, boardState, moveList);
        } else if (abs(piece) == 1) {
            moveList = kingMoves(xpos, ypos, boardState);
        }
        moveList = removeFriendly(boardState, moveList);
        return moveList;
    }

    function removeFriendly(boardState, moveList) {
        //var copyList = moveList.slice();
        do {
            var copyList = moveList.slice();
            changed = false;
            for (let i = 0; i < moveList.length && changed == false; i++) {
                if (boardState[moveList[i][1]][moveList[i][0]] == pieceColor * abs(boardState[moveList[i][1]][moveList[i][0]]) && boardState[moveList[i][1]][moveList[i][0]] != 0) {
                    moveList.splice(i, 1);
                    changed = true;
                }
            }
        } while (!arraysEqual(copyList, moveList));
        return moveList;
    }

    function pawnW_Moves(xpos, ypos, boardState) {
        let pawnMoves = [];
        if (ypos == rows - 2)
            if (boardState[ypos - 2][xpos] == 0 && boardState[ypos - 1][xpos] == 0)
                pawnMoves.push([xpos, ypos - 2]);
        if (ypos > 0) {
            if (boardState[ypos - 1][xpos] == 0)
                pawnMoves.push([xpos, ypos - 1]);
            if (xpos < cols - 1)
                if (boardState[ypos - 1][xpos + 1] < 0)
                    pawnMoves.push([xpos + 1, ypos - 1]);
            if (xpos > 0)
                if (boardState[ypos - 1][xpos - 1] < 0)
                    pawnMoves.push([xpos - 1, ypos - 1]);

        }
        return pawnMoves;
    }

    function knightMoves(xpos, ypos) {
        let knightMoves = [];
        if (xpos > 0) {
            if (ypos < rows - 2)
                knightMoves.push([xpos - 1, ypos + 2]);
            if (ypos > 1)
                knightMoves.push([xpos - 1, ypos - 2]);
        }
        if (ypos > 0) {
            if (xpos < rows - 2)
                knightMoves.push([xpos + 2, ypos - 1]);
            if (xpos > 1)
                knightMoves.push([xpos - 2, ypos - 1]);
        }
        if (xpos < cols - 1) {
            if (ypos < rows - 2)
                knightMoves.push([xpos + 1, ypos + 2]);
            if (ypos > 1)
                knightMoves.push([xpos + 1, ypos - 2]);
        }
        if (ypos < cols - 1) {
            if (xpos < rows - 2)
                knightMoves.push([xpos + 2, ypos + 1]);
            if (xpos > 1)
                knightMoves.push([xpos - 2, ypos + 1]);
        }
        return knightMoves;
    }
    function rookMoves(xpos, ypos, boardState, rookMoves) {
        let breakLoop = false;
        for (let i = 1; ypos + i < rows && !breakLoop; i++) {
            if (boardState[ypos + i][xpos] == 0) {      //IMPORTANT
                rookMoves.push([xpos, ypos + i]);
            } else if (boardState[ypos + i][xpos] / abs(boardState[ypos + i][xpos]) == -pieceColor) {
                rookMoves.push([xpos, ypos + i]);
                breakLoop = true;
            } else {
                breakLoop = true;
            }
        }
        breakLoop = false;
        for (let i = 1; ypos - i >= 0 && !breakLoop; i++) {
            if (boardState[ypos - i][xpos] == 0) {
                rookMoves.push([xpos, ypos - i]);
            } else if (boardState[ypos - i][xpos] / abs(boardState[ypos - i][xpos]) == -pieceColor) {
                rookMoves.push([xpos, ypos - i]);
                breakLoop = true;
            } else {
                breakLoop = true;
            }
        }
        breakLoop = false;
        for (let i = 1; xpos + i < cols && !breakLoop; i++) {
            if (boardState[ypos][xpos + i] == 0) {
                rookMoves.push([xpos + i, ypos]);
            } else if (boardState[ypos][xpos + i] / abs(boardState[ypos][xpos + i]) == -pieceColor) {
                rookMoves.push([xpos + i, ypos]);
                breakLoop = true;
            } else {
                breakLoop = true;
            }
        }
        breakLoop = false;
        for (let i = 1; xpos - i >= 0 && !breakLoop; i++) {
            if (boardState[ypos][xpos - i] == 0) {
                rookMoves.push([xpos - i, ypos]);
            } else if (boardState[ypos][xpos - i] / abs(boardState[ypos][xpos - i]) == -pieceColor) {
                rookMoves.push([xpos - i, ypos]);
                breakLoop = true;
            } else {
                breakLoop = true;
            }
        }
        return rookMoves;
    }

    function bishopMoves(xpos, ypos, boardState, bishopMoves) {
        let breakLoop = false;
        for (let i = 1; ypos + i < rows && xpos + i < cols && !breakLoop; i++) {
            if (boardState[ypos + i][xpos + i] == 0) {
                bishopMoves.push([xpos + i, ypos + i]);
            } else if (boardState[ypos + i][xpos + i] / abs(boardState[ypos + i][xpos + i]) == -pieceColor) {
                bishopMoves.push([xpos + i, ypos + i]);
                breakLoop = true;
            } else {
                breakLoop = true;
            }
        }

        breakLoop = false;
        for (let i = 1; ypos + i < rows && xpos - i >= 0 && !breakLoop; i++) {
            if (boardState[ypos + i][xpos - i] == 0) {
                bishopMoves.push([xpos - i, ypos + i]);
            } else if (boardState[ypos + i][xpos - i] / abs(boardState[ypos + i][xpos - i]) == -pieceColor) {
                bishopMoves.push([xpos - i, ypos + i]);
                breakLoop = true;
            } else {
                breakLoop = true;
            }
        }

        breakLoop = false;
        for (let i = 1; ypos - i >= 0 && xpos + i < cols && !breakLoop; i++) {
            if (boardState[ypos - i][xpos + i] == 0) {
                bishopMoves.push([xpos + i, ypos - i]);
            } else if (boardState[ypos - i][xpos + i] / abs(boardState[ypos - i][xpos + i]) == -pieceColor) {
                bishopMoves.push([xpos + i, ypos - i]);
                breakLoop = true;
            } else {
                breakLoop = true;
            }
        }

        breakLoop = false;
        for (let i = 1; ypos - i >= 0 && xpos - i >= 0 && !breakLoop; i++) {
            if (boardState[ypos - i][xpos - i] == 0) {
                bishopMoves.push([xpos - i, ypos - i]);
            } else if (boardState[ypos - i][xpos - i] / abs(boardState[ypos - i][xpos - i]) == -pieceColor) {
                bishopMoves.push([xpos - i, ypos - i]);
                breakLoop = true;
            } else {
                breakLoop = true;
            }
        }
        return bishopMoves;
    }

    function kingMoves(xpos, ypos, boardState) {
        let kingMoves = [];
        if (xpos < cols - 1)
            kingMoves.push([xpos + 1, ypos]);
        if (xpos > 0)
            kingMoves.push([xpos - 1, ypos]);
        if (ypos < rows - 1) {
            kingMoves.push([xpos, ypos + 1]);
            if (xpos < cols - 1)
                kingMoves.push([xpos + 1, ypos + 1]);
            if (xpos > 0)
                kingMoves.push([xpos - 1, ypos + 1]);
        }
        if (ypos > 0) {
            kingMoves.push([xpos, ypos - 1]);
            if (xpos < cols - 1)
                kingMoves.push([xpos + 1, ypos - 1]);
            if (xpos > 0)
                kingMoves.push([xpos - 1, ypos - 1]);
        }
        kingMoves = kingThreats(xpos, ypos, boardState, kingMoves);
        return kingMoves;
    }

    function kingThreats(xpos, ypos, boardState, kingMoves) {
        boardState[ypos][xpos] = 0;
        pieceColor *= -1;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (boardState[i][j] < -1 * -pieceColor) {
                    threatMoves = logic.getMoveList(boardState, boardState[i][j], j, i);
                    for (let a = 0; a < threatMoves.length; a++) {
                        for (let b = kingMoves.length - 1; b > 0; b--) {
                            if (threatMoves[a][0] == kingMoves[b][0] && threatMoves[a][1] == kingMoves[b][1]) {
                                kingMoves.splice(b, 1);
                            }
                        }
                    }
                }
            }
        }
        pieceColor *= -1;
        boardState[ypos][xpos] = 1;
        return kingMoves
    }
}