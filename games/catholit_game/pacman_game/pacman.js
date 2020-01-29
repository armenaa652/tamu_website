function Pacman(pacman_sprite, b_level) {
    //let score = 0;
    let rows = 16;
    let cols = 24;
    let pacMap = [];

    let scl = 25;
    let blip = 0;
    let ghosts = [];
    let ghostAmount = 4;

    this.lives = 2;
    this.firstPress = false;
    this.preload = function () {
        for (let i = 0; i < rows; i++) {
            pacMap[i] = [];
            for (let j = 0; j < cols; j++) {
                pacMap[i][j] = 0;
            }
        }

        /*
            0 = Wall
            1 = Small Blip
            2 = Large Blip
            3 = Junction
            4 = Grey Cell
            5 = Portal
            6 = Empty
            7 = Empty Junction
        */

        {
            pacMap[1][1] = 3;
            pacMap[1][2] = 1;
            pacMap[1][3] = 1;
            pacMap[1][4] = 3;
            pacMap[1][5] = 1;
            pacMap[1][6] = 1;
            pacMap[1][7] = 1;
            pacMap[1][8] = 3;
            pacMap[1][9] = 1;
            pacMap[1][10] = 3;
            pacMap[2][1] = 2;
            pacMap[2][4] = 1;
            pacMap[2][8] = 1;
            pacMap[2][10] = 1;
            pacMap[3][1] = 1;
            pacMap[3][4] = 1;
            pacMap[3][8] = 1;
            pacMap[3][10] = 1;
            pacMap[4][1] = 3;
            pacMap[4][2] = 1;
            pacMap[4][3] = 1;
            pacMap[4][4] = 3;
            pacMap[4][5] = 1;
            pacMap[4][6] = 3;
            pacMap[4][7] = 1;
            pacMap[4][8] = 3;
            pacMap[4][9] = 1;
            pacMap[4][10] = 3;
            pacMap[4][11] = 1;
            pacMap[5][1] = 1;
            pacMap[5][4] = 1;
            pacMap[5][6] = 1;
            pacMap[6][1] = 3;
            pacMap[6][2] = 1;
            pacMap[6][3] = 1;
            pacMap[6][4] = 3;
            pacMap[6][6] = 3;
            pacMap[6][7] = 1;
            pacMap[6][8] = 1;
            pacMap[6][9] = 1;
            pacMap[6][10] = 3;
            pacMap[7][4] = 1;
            pacMap[7][10] = 1;
            pacMap[8][0] = 5;
            pacMap[8][1] = 3;
            pacMap[8][2] = 1;
            pacMap[8][3] = 1;
            pacMap[8][4] = 3;
            pacMap[8][6] = 3;
            pacMap[8][7] = 1;
            pacMap[8][8] = 1;
            pacMap[8][9] = 3;
            pacMap[8][10] = 3;
            pacMap[8][11] = 6;
            pacMap[9][4] = 1;
            pacMap[9][6] = 1;
            pacMap[9][9] = 1;
            pacMap[10][1] = 3;
            pacMap[10][2] = 1;
            pacMap[10][3] = 1;
            pacMap[10][4] = 3;
            pacMap[10][5] = 1;
            pacMap[10][6] = 3;
            pacMap[10][9] = 1;
            pacMap[10][11] = 4;
            pacMap[11][1] = 1;
            pacMap[11][4] = 1;
            pacMap[11][6] = 1;
            pacMap[11][9] = 1;
            pacMap[12][1] = 1;
            pacMap[12][4] = 1;
            pacMap[12][6] = 3;
            pacMap[12][7] = 1;
            pacMap[12][8] = 1;
            pacMap[12][9] = 3;
            pacMap[12][11] = 4;
            pacMap[13][1] = 2;
            pacMap[13][4] = 1;
            pacMap[13][9] = 1;
            pacMap[14][1] = 3;
            pacMap[14][2] = 1;
            pacMap[14][3] = 1;
            pacMap[14][4] = 3;
            pacMap[14][5] = 1;
            pacMap[14][6] = 1;
            pacMap[14][7] = 1;
            pacMap[14][8] = 1;
            pacMap[14][9] = 3;
            pacMap[14][10] = 1;
            pacMap[14][11] = 1;
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols / 2; j++) {
                pacMap[i][cols - j - 1] = pacMap[i][j];
            }
        }

        pacjordan = new Pacjordan(pacman_sprite, b_level, pacMap, 0);
        for (let i = 0; i < ghostAmount; i++) {
            ghosts[i] = new Ghosts(pacman_sprite, b_level, pacMap, i);
        }
    }

    this.show = function () {
        this.drawBoard();
        pacjordan.show();
        for (let i = 0; i < ghostAmount; i++) {
            ghosts[i].show();
        }
        this.drawPortals();
        this.drawScore();
    }

    this.update = function () {
        //frameRate(120);
        if (this.firstPress) {
            pacjordan.update();
            for (let i = 0; i < 4; i++) {
                ghosts[i].update();
            }
            if (this.checkDistance(pacjordan.invinsible)) {
                if (pacjordan.invinsible == false)
                    if (this.lives > 0) {
                        this.lives--;
                        pacjordan = new Pacjordan(pacman_sprite, b_level, pacMap, pacjordan.score);
                        for (let i = 0; i < ghostAmount; i++) {
                            ghosts[i] = new Ghosts(pacman_sprite, b_level, pacMap, i);
                        }
                    } else {
                        this.preload();
                        this.lives = 2;
                    }
            }
        }
    }

    this.drawBoard = function () {
        fill(0);
        rect(windowWidth / 2 - b_level[0].width / 2 - 10, windowHeight / 2 - b_level[0].height / 2 + 10, b_level[0].width + 20, b_level[0].height + 20, 5)
        noStroke();
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                if (pacMap[y][x] == 0) {
                    fill(31, 37, 88);
                    fill(70);
                } else if (pacMap[y][x] == 1 || pacMap[y][x] == 2 || pacMap[y][x] == 3) {
                    fill(255);
                } else if (pacMap[y][x] == 4) {
                    fill(220);
                } else if (pacMap[y][x] == 5) {
                    fill(0);
                } else {
                    fill(255);
                }
                rect(x * scl + windowWidth / 2 - b_level[0].width / 2, y * scl + windowHeight / 2 - b_level[0].height / 2 + 20, scl, scl);
                if (pacMap[y][x] == 1 || pacMap[y][x] == 3) {
                    image(pacman_sprite[blip % 2], x * scl + windowWidth / 2 - b_level[0].width / 2, y * scl + windowHeight / 2 - b_level[0].height / 2 + 20)
                } else if (pacMap[y][x] == 2) {
                    image(pacman_sprite[blip % 2 + 2], x * scl + windowWidth / 2 - b_level[0].width / 2, y * scl + windowHeight / 2 - b_level[0].height / 2 + 20)
                }
            }
        }
    }

    this.drawScore = function () {
        let scoreText = 'Streaks: '.concat(String(pacjordan.score));
        textSize(15);
        fill(255);
        text(scoreText, 0 * scl + windowWidth / 2 - b_level[0].width / 2 + 6, 16 * scl + windowHeight / 2 - b_level[0].height / 2 + 14)
        for (let i = 0; i <= this.lives; i++)
            image(pacman_sprite[4], (4 + i) * scl + windowWidth / 2 - b_level[0].width / 2, 15 * scl + windowHeight / 2 - b_level[0].height / 2 + 20)
    }

    this.drawPortals = function () {
        fill(0);
        rect(0 * scl + windowWidth / 2 - b_level[0].width / 2, 8 * scl + windowHeight / 2 - b_level[0].height / 2 + 20, scl, scl);
        rect(23 * scl + windowWidth / 2 - b_level[0].width / 2, 8 * scl + windowHeight / 2 - b_level[0].height / 2 + 20, scl, scl);
    }

    this.checkDistance = function (invinsibility) {
        for (let i = 0; i < ghostAmount; i++) {
            //console.log((ghosts[i].x - pacjordan.x) * (ghosts[i].x - pacjordan.x) + (ghosts[i].y - pacjordan.y) * (ghosts[i].y - pacjordan.y))
            if ((ghosts[i].x - pacjordan.x) * (ghosts[i].x - pacjordan.x) + (ghosts[i].y - pacjordan.y) * (ghosts[i].y - pacjordan.y) < (scl - 2) * (scl - 2)) {
                if (invinsibility) {
                    ghosts[i] = new Ghosts(pacman_sprite, b_level, pacMap, i);
                    pacjordan.score += 2;
                }
                return true;
            }
        }
        return false;
    }

    this.checkForWin = function () {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (pacMap[i][j] == 1 || pacMap[i][j] == 2 || pacMap[i][j] == 3) {
                    return false;
                }
            }
        }
        return true;
    }

    this.switchBlips = function () {
        blip++;
    }
}