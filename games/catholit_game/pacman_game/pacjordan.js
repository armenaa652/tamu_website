function Pacjordan(pacjordan_sprite, b_level, pacMap, prevScore) {
    let scl = 25;
    this.score = prevScore;
    let moveDir = [0, 0];
    this.changeDir = [0, 0];
    this.invinsible = false;
    invinsibleTime = 0;
    this.x = 12 * scl + windowWidth / 2 - b_level[0].width / 2;
    this.y = 8 * scl + windowHeight / 2 - b_level[0].height / 2 + 20;

    this.show = function () {
        if (this.invinsible && invinsibleTime > 0) {
            invinsibleTime--;
            if (invinsibleTime > 100) {
                fill(120, 120, 255);
            }
            else {
                fill(255, 120, 120);
            }
            stroke(3)
            rect(this.x + 1, this.y, pacjordan_sprite[0].width - 2, pacjordan_sprite[0].height, 7)
        }
        if (invinsibleTime == 0) {
            this.invinsible = false;
        }
        if (moveDir[0] == 0 && moveDir[1] == 0 || moveDir[0] == 0 && moveDir[1] == 1) {
            image(pacjordan_sprite[4], this.x, this.y)
        } else if (moveDir[0] == 0 && moveDir[1] == -1) {
            image(pacjordan_sprite[5], this.x, this.y)
        } else if (moveDir[0] == 1 && moveDir[1] == 0) {
            image(pacjordan_sprite[6], this.x, this.y)
        } else if (moveDir[0] == -1 && moveDir[1] == 0) {
            image(pacjordan_sprite[7], this.x, this.y)
        } else {
            image(pacjordan_sprite[4], this.x, this.y)
        }
    }
    this.update = function () {
        let xindex = ((this.x - windowWidth / 2 + b_level[0].width / 2) / scl);
        let yindex = ((this.y - windowHeight / 2 + b_level[0].height / 2 - 20) / scl);

        if (this.changeDir[0] == moveDir[0] || this.changeDir[1] == moveDir[1]) {
            moveDir = this.changeDir;
        }

        if (floor(xindex) == xindex && floor(yindex) == yindex) {
            if (pacMap[yindex][xindex] == 3 || pacMap[yindex][xindex] == 7) {
                if (!(pacMap[yindex + this.changeDir[1]][xindex + this.changeDir[0]] == 0 && pacMap[yindex + moveDir[1]][xindex + moveDir[0]] != 0)) {
                    moveDir = this.changeDir;
                }
            }

            if (pacMap[yindex + moveDir[1]][xindex + moveDir[0]] == 0) {
                moveDir = [0, 0];
            }

            if (pacMap[yindex][xindex] == 1) {
                pacMap[yindex][xindex] = 6;
                this.score++;
                //console.log(score);
            } else if (pacMap[yindex][xindex] == 2) {
                pacMap[yindex][xindex] = 6;
                this.score += 2;
                invinsibleTime = 500;
                this.invinsible = true;
            } else if (pacMap[yindex][xindex] == 3) {
                pacMap[yindex][xindex] = 7;
                this.score++;
                //console.log(score);
                //172 max score, 4 blocks long (5th free)
            }
        }

        if (xindex == 0 && yindex == 8) {
            this.x = 23 * scl + windowWidth / 2 - b_level[0].width / 2;
        } else if (xindex == 23 && yindex == 8) {
            this.x = 0 * scl + windowWidth / 2 - b_level[0].width / 2;
        }

        this.x += moveDir[0];
        this.y += moveDir[1];
    }

    this.setChangeDir = function (a) {
        this.changeDir = a;
    }
}