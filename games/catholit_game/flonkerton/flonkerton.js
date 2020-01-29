function Flonkerton(character, gameWidth, gameHeight) {
    let offsetOne = 0;
    let offsetTwo = 70;
    let spaceDistance = 0;
    this.speed = .55;
    this.jordanDistance = 0;
    this.kevinDistance = 0;
    this.firstPress = false;

    this.show = function () {
        fill(0);
        stroke(0);
        strokeWeight(1);
        rect(windowWidth / 2 - b_level[0].width / 2 - 10, windowHeight / 2 - gameHeight / 2 + 10, b_level[0].width + 20, gameHeight + 20, 5)
        image(b_level[3], windowWidth / 2 - gameWidth / 2, windowHeight / 2 - gameHeight / 2 + 20);

        rectMode(CENTER)
        fill(255, 150);
        stroke(0);
        strokeWeight(4);
        rect(windowWidth / 2, windowHeight / 2 - 40 + offsetOne, gameWidth - 100, 50, 5)
        rect(windowWidth / 2, windowHeight / 2 + 40 + offsetTwo, gameWidth - 100, 50, 5)
        rectMode(CORNER)

        fill(255, 0, 0, 200)
        rect(windowWidth / 2 - (gameWidth - 100) / 2, windowHeight / 2 - 40 - 25 + offsetOne, this.jordanDistance, 50, 5)
        rect(windowWidth / 2 - (gameWidth - 100) / 2, windowHeight / 2 + 40 - 25 + offsetTwo, this.kevinDistance, 50, 5)

        image(character[0], windowWidth / 2 - (gameWidth - 100) / 2 + this.jordanDistance - character[0].width / 2, windowHeight / 2 - 40 - 25 + offsetOne - 3);
        image(character[1], windowWidth / 2 - (gameWidth - 100) / 2 + this.kevinDistance - character[0].width / 2, windowHeight / 2 + 40 - 25 + offsetTwo - 3);
        strokeWeight(1);
    }

    this.update = function () {
        if (this.kevinDistance < gameWidth - 100)
            this.kevinDistance += .5;
        if (this.jordanDistance < gameWidth - 100)
            if (this.jordanDistance < spaceDistance)
                this.jordanDistance += this.speed;
    }

    this.runJordan = function () {
        spaceDistance += 5
        //this.jordanDistance += 5
    }
}