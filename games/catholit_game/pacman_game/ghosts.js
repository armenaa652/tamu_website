function Ghosts(ghost_sprite, b_level, pacMap, ghostNum) {
    switch (ghostNum) {
        case 0:
            index = [11, 10];
            break;
        case 1:
            index = [12, 10];
            break;
        case 2:
            index = [11, 12];
            break;
        case 3:
            index = [12, 12];
            break;
    }

    let ghostCounter = 0;
    let releaseGhost = -1;
    let scl = 25;
    this.moveDir = [0, 0];
    this.x = index[0] * scl + windowWidth / 2 - b_level[0].width / 2;
    this.y = index[1] * scl + windowHeight / 2 - b_level[0].height / 2 + 20;

    this.show = function () {
        if (this.moveDir[0] == 0 && this.moveDir[1] == 0 || this.moveDir[0] == 0 && this.moveDir[1] == 1) {
            image(ghost_sprite[8], this.x, this.y)
        } else if (this.moveDir[0] == 0 && this.moveDir[1] == -1) {
            image(ghost_sprite[9], this.x, this.y)
        } else if (this.moveDir[0] == 1 && this.moveDir[1] == 0) {
            image(ghost_sprite[10], this.x, this.y)
        } else if (this.moveDir[0] == -1 && this.moveDir[1] == 0) {
            image(ghost_sprite[11], this.x, this.y)
        } else {
            image(ghost_sprite[8], this.x, this.y)
        }
    }

    this.update = function () {
        let xindex = ((this.x - windowWidth / 2 + b_level[0].width / 2) / scl);
        let yindex = ((this.y - windowHeight / 2 + b_level[0].height / 2 - 20) / scl);

        if (releaseGhost < 3) {
            if (ghostCounter < 300) {
                ghostCounter++;
            } else {
                releaseGhost++;
                ghostCounter = 0;
            }
        }

        if (releaseGhost == ghostNum && ghostCounter == 0) {
            ghostCounter++;
            this.x = 11 * scl + windowWidth / 2 - b_level[0].width / 2;
            this.y = 8 * scl + windowHeight / 2 - b_level[0].height / 2 + 20;
            this.chooseDir(xindex, yindex);
        }

        if (floor(xindex) == xindex && floor(yindex) == yindex) {
            if (pacMap[yindex][xindex] == 3 || pacMap[yindex][xindex] == 7) {
                this.chooseDir(xindex, yindex);
            }
        }

        this.x += this.moveDir[0];
        this.y += this.moveDir[1];
    }

    this.chooseDir = function (xindex, yindex) {
        let moveList = [];
        let prevMoveDir = this.moveDir;
        if (pacMap[yindex + 1][xindex] != 0 && pacMap[yindex + 1][xindex] != 5) {
            moveList[moveList.length] = [0, 1];
        }
        if (pacMap[yindex - 1][xindex] != 0 && pacMap[yindex - 1][xindex] != 5) {
            moveList[moveList.length] = [0, -1];
        }
        if (pacMap[yindex][xindex + 1] != 0 && pacMap[yindex][xindex + 1] != 5) {
            moveList[moveList.length] = [1, 0];
        }
        if (pacMap[yindex][xindex - 1] != 0 && pacMap[yindex][xindex - 1] != 5) {
            moveList[moveList.length] = [-1, 0];
        }
        if (!(ghostNum % 2)) {
            help = [0, 1];
            if (pacjordan.y - this.y < 0) {
                for (let i = 0; i < moveList.length; i++) {
                    if (arraysEqual(moveList[i], [0, 1]) && moveList.length > 1) {
                        moveList.splice(i, 1);
                    }
                }
            }
            if (pacjordan.y - this.y > 0) {
                for (let i = 0; i < moveList.length; i++) {
                    if (arraysEqual(moveList[i], [0, -1]) && moveList.length > 1) {
                        moveList.splice(i, 1);
                    }
                }
            }
            if (pacjordan.x - this.x < 0) {
                for (let i = 0; i < moveList.length; i++) {
                    if (arraysEqual(moveList[i], [1, 0]) && moveList.length > 1) {
                        moveList.splice(i, 1);
                    }
                }
            }
            if (pacjordan.x - this.x > 0) {
                for (let i = 0; i < moveList.length; i++) {
                    if (arraysEqual(moveList[i], [-1, 0]) && moveList.length > 1) {
                        moveList.splice(i, 1);
                    }
                }
            }
            if (moveList.length > 1) {
                if (this.y == pacjordan.y) {
                    for (let i = 0; i < moveList.length; i++) {
                        if (arraysEqual(moveList[i], [0, -1]) && moveList.length > 1) {
                            moveList.splice(i, 1);
                        }
                        if (moveList.length > 1)
                            if (arraysEqual(moveList[i], [0, 1]))
                                moveList.splice(i, 1);
                    }

                } else if (this.x == pacjordan.x) {
                    for (let i = 0; i < moveList.length; i++) {
                        if (arraysEqual(moveList[i], [-1, 0]) && moveList.length > 1) {
                            moveList.splice(i, 1);
                        }
                        if (moveList.length > 1)
                            if (arraysEqual(moveList[i], [1, 0]))
                                moveList.splice(i, 1);
                    }
                }
            }
        }
        chooseDir = moveList[floor(random() * moveList.length)];
        for (let i = 0; i < 3; i++) {
            if (chooseDir[0] == prevMoveDir[0] && chooseDir[1] == -1 * prevMoveDir[1]) {
                chooseDir = moveList[floor(random() * moveList.length)];
            } else if (chooseDir[0] == -1 * prevMoveDir[0] && chooseDir[1] == prevMoveDir[1]) {
                chooseDir = moveList[floor(random() * moveList.length)];
            }
        }

        this.moveDir = chooseDir;
    }

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var i = arr1.length; i--;) {
            if (arr1[i] !== arr2[i])
                return false;
        }

        return true;
    }
}