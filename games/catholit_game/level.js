function Level(character, gameWidth, gameHeight) {
    let ben = 0;

    this.speechIndex = 0

    this.intro_screen = function () {
        fill(0);
        stroke(0);
        rect(windowWidth / 2 - b_level[0].width / 2 - 10, windowHeight / 2 - b_level[0].height / 2 + 10, b_level[0].width + 20, b_level[0].height + 20, 5)
        image(b_level[0], windowWidth / 2 - b_level[0].width / 2, windowHeight / 2 - b_level[0].height / 2 + 20);
        fill(235)
        rect(windowWidth / 2 - 103, windowHeight / 2 + gameHeight / 2 - character[0].height + 40, 200, 40, 4)
        fill(0);
        text('Press Space to Continue', windowWidth / 2 - 85, windowHeight / 2 + gameHeight / 2 - character[0].height + 64);

    }

    this.first_level_show = function () {
        fill(0);
        stroke(0);
        rect(windowWidth / 2 - b_level[0].width / 2 - 10, windowHeight / 2 - b_level[0].height / 2 + 10, b_level[0].width + 20, b_level[0].height + 20, 5)
        image(b_level[1], windowWidth / 2 - b_level[0].width / 2, windowHeight / 2 - b_level[0].height / 2 + 20);
        image(character[3 * (1 - ben % 2) + ben % 2], windowWidth / 2 + gameWidth / 2 - character[0].width - 5, windowHeight / 2 + gameHeight / 2 + 7 - character[0].height);
        jordan.show();
        this.level_speech(this.speechIndex);
    }

    this.second_level_show = function () {
        fill(0);
        stroke(0);
        rect(windowWidth / 2 - b_level[0].width / 2 - 10, windowHeight / 2 - b_level[0].height / 2 + 10, b_level[0].width + 20, b_level[0].height + 20, 5)
        image(b_level[2], windowWidth / 2 - b_level[0].width / 2, windowHeight / 2 - b_level[0].height / 2 + 20);
        image(character[3 * (1 - ben % 2) + ben % 2], windowWidth / 2 - gameWidth / 2 + character[0].width + 65, windowHeight / 2 + gameHeight / 2 + 7 - 2 * character[0].height - 10);
        image(character[0 * (1 - ben % 2) + ben % 2], windowWidth / 2 - gameWidth / 2 + 3 * character[0].width + 50, windowHeight / 2 + gameHeight / 2 + 7 - 2 * character[0].height - 10);
        image(character[2 * (1 - ben % 2) + ben % 2], windowWidth / 2 - gameWidth / 2 + 0 * character[0].width + 65, windowHeight / 2 + gameHeight / 2 + 7 - 1.5 * character[0].height + 10);
        image(character[6 * (1 - ben % 2) + ben % 2], windowWidth / 2 - gameWidth / 2 + 4 * character[0].width + 50, windowHeight / 2 + gameHeight / 2 + 7 - 1.5 * character[0].height + 10);
        jordan.show();
        if (inGame == false) {
            fill(235);
            stroke(3);
            rect(windowWidth / 2 - 103, windowHeight / 2 + gameHeight / 2 - character[0].height + 95, 200, 40, 4)
            fill(0);
            text('Press Space to Continue', windowWidth / 2 - 85, windowHeight / 2 + gameHeight / 2 - character[0].height + 119);
        }
    }

    this.third_level_show = function () {
        fill(0);
        stroke(0);
        rect(windowWidth / 2 - b_level[0].width / 2 - 10, windowHeight / 2 - b_level[0].height / 2 + 10, b_level[0].width + 20, b_level[0].height + 20, 5)
        image(b_level[4], windowWidth / 2 - b_level[0].width / 2, windowHeight / 2 - b_level[0].height / 2 + 20);
        image(character[0 * (1 - ben % 2) + ben % 2], windowWidth / 2 - character[0].width / 2 - 15, windowHeight / 2 - 25);
        image(character[1 * (1 - ben % 2) + ben % 2], windowWidth / 2 - character[0].width / 2 - 15 + character[0].width + 10, windowHeight / 2 - 25 + character[0].height / 2 - 20);
        image(character[2 * (1 - ben % 2) + ben % 2], windowWidth / 2 - character[0].width / 2 - 15 + 2 * character[0].width - 20, windowHeight / 2 - 25 + 2 * character[0].height / 2 - 50);
        image(character[3 * (1 - ben % 2) + ben % 2], windowWidth / 2 - character[0].width / 2 - 15 + 3 * character[0].width - 50, windowHeight / 2 - 25 + 2 * character[0].height / 2 - 20);
        image(character[4 * (1 - ben % 2) + ben % 2], windowWidth / 2 - character[0].width / 2 - 15 - character[0].width - 10, windowHeight / 2 - 25 + character[0].height / 2 - 20);
        image(character[5 * (1 - ben % 2) + ben % 2], windowWidth / 2 - character[0].width / 2 - 15 - 2 * character[0].width + 20, windowHeight / 2 - 25 + 2 * character[0].height / 2 - 50);
        image(character[6 * (1 - ben % 2) + ben % 2], windowWidth / 2 - character[0].width / 2 - 15 - 3 * character[0].width + 50, windowHeight / 2 - 25 + 2 * character[0].height / 2 - 20);
        jordan.show();
    }

    this.update = function () {
        jordan.update();
    }

    this.level_speech = function (a) {
        switch (a) {
            case 0:
                fill(235);
                stroke(0);
                ellipse(windowWidth / 2 + gameWidth / 2 - character[0].width - 40, windowHeight / 2 + gameHeight / 2 - character[0].height + 4, 100, 40)
                ellipse(windowWidth / 2 + gameWidth / 2 - character[0].width - 5 + 12, windowHeight / 2 + gameHeight / 2 + 22 - character[0].height + 5, 12, 12);
                ellipse(windowWidth / 2 + gameWidth / 2 - character[0].width - 5 + 22, windowHeight / 2 + gameHeight / 2 + 35 - character[0].height + 5, 6, 6);
                fill(0);
                noStroke();
                text('Hey Jordan!', windowWidth / 2 + gameWidth / 2 - character[0].width - 82, windowHeight / 2 + gameHeight / 2 - character[0].height + 10);
                break;
            case 1:
                fill(235);
                stroke(0);
                ellipse(windowWidth / 2 + gameWidth / 2 - character[0].width - 20, windowHeight / 2 + gameHeight / 2 - character[0].height + 4, 140, 40)
                ellipse(windowWidth / 2 + gameWidth / 2 - character[0].width - 5 + 16, windowHeight / 2 + gameHeight / 2 + 26 - character[0].height + 5, 10, 10);
                ellipse(windowWidth / 2 + gameWidth / 2 - character[0].width - 5 + 22, windowHeight / 2 + gameHeight / 2 + 35 - character[0].height + 5, 6, 6);
                fill(0);
                noStroke();
                text('Let\'s play a game!', windowWidth / 2 + gameWidth / 2 - character[0].width - 82, windowHeight / 2 + gameHeight / 2 - character[0].height + 10);
                break;
            case 2:

        }
    }

    this.setSpeechIndex = function (b) {
        this.speechIndex = b;
    }

    this.switchBens = function () {
        ben++;
    }

    this.blur = function () {
        fill(130, 210);
        rect(windowWidth / 2 - b_level[0].width / 2, windowHeight / 2 - b_level[0].height / 2 + 20, b_level[0].width, b_level[0].height)
    }
}