function Quiz(gameHeight) {
    this.qChoice = 1;
    this.qAnswer;
    this.score = 0;
    let answered = false;
    this.qNum = 1;
    this.waitTime = 100;
    this.countDown = this.waitTime;

    this.show = function () {
        level.second_level_show();
        level.blur();
        this.bubbles();
        this.question(this.qNum);
        this.update();
    }

    this.update = function () {
        if (answered) {
            if (this.qAnswer == this.qChoice && this.countDown == this.waitTime) {
                this.score++;
            }
            this.countDown--;
            if (this.countDown == 0) {
                this.countDown = this.waitTime;
                answered = false;
                this.qNum++;
                this.qChoice = 1;
            }
        }
    }

    this.question = function () {
        textAlign(CENTER, CENTER);
        fill(0);
        switch (this.qNum) {
            case 1:
                name = 'Adam';
                question = 'Who is my favorite soccer player?';
                answerOne = 'Robert Lewandowski';
                answerTwo = 'Bobert Lewandowski';
                answerThree = 'Abby Armendariz';
                answerFour = 'Lionel Messi';
                this.qAnswer = 1;
                break;
            case 2:
                name = 'Robbie';
                question = 'What job do I want to have?';
                answerOne = 'Business';
                answerTwo = 'Engineer';
                answerThree = 'Dentist';
                answerFour = 'Lawyer';
                this.qAnswer = 4;
                break;
            case 3:
                name = 'Ryan';
                question = 'What\'s my favorite color?';
                answerOne = 'Lime Green';
                answerTwo = 'Green';
                answerThree = 'Emerald Green';
                answerFour = 'Red';
                this.qAnswer = 2;
                break;
            case 4:
                name = 'Happen';
                question = 'What\'s my favorite song?';
                answerOne = 'Changes';
                answerTwo = 'Yes Indeed';
                answerThree = 'The Spiteful Chant';
                answerFour = '7 Minute Freestyle';
                this.qAnswer = 4;
                break;
            case 5:
                name = 'Sahar';
                question = 'Jordan, do you love me? Are you riding?\nSay you\'ll never ever leave from beside me?';
                answerOne = 'Heck Yes';
                answerTwo = 'Heck No';
                answerThree = 'Ownly Partly';
                answerFour = 'New Phone Who Dis';
                this.qAnswer = 1;
                break;
            case 6:
                name = 'Ben';
                question = 'What\'s my favorite movie?';
                answerOne = 'Inception';
                answerTwo = 'Interstellar';
                answerThree = 'Saving Private Ryan';
                answerFour = 'The Alamo';
                this.qAnswer = 3;
                break;
            case 7:
                name = 'Teresa';
                question = 'What\'s my favorite movie?';
                answerOne = 'The Emoji Movie';
                answerTwo = 'Inside Out';
                answerThree = 'Mamma Mia';
                answerFour = 'The Aristocats';
                this.qAnswer = 4;
                break;
            case 8:
                name = 'Robbie';
                question = 'What\'s my favorite eagle?';
                answerOne = 'Jordan Rae Deitch';
                answerTwo = 'Golden';
                answerThree = 'Bald';
                answerFour = 'Harpy';
                this.qAnswer = 1;
                break;
            case 9:
                name = 'Adam';
                question = 'What\'s my favorite hobby?';
                answerOne = 'Soccer';
                answerTwo = 'Programming';
                answerThree = 'Archery';
                answerFour = 'Biking';
                this.qAnswer = 1;
                break;
            case 10:
                name = 'Happen';
                question = 'What\'s my favorite color?';
                answerOne = 'Neon Orange';
                answerTwo = 'Neon Yellow';
                answerThree = 'Neon Pink';
                answerFour = 'Neon Green';
                this.qAnswer = 3;
                break;
            case 11:
                name = 'Bonus-Adam';
                question = 'When and where did I first\nfigure out I liked you?';
                answerOne = 'During the Office Finale';
                answerTwo = 'I Don\'t Like You?';
                answerThree = 'In This Car Ride';
                answerFour = 'Who Cares?';
                this.qAnswer = 3;
                break;
        }
        text('Question ' + this.qNum + ': ' + question, windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 50 + 50);
        text(answerOne, windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 200 + 20);
        text(answerTwo, windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 250 + 20);
        text(answerThree, windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 300 + 20);
        text(answerFour, windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 350 + 20);
        text(name, windowWidth / 2 - 130, windowHeight / 2 - gameHeight / 2 + 143 + 20);
        text('Score: ' + this.score, windowWidth / 2 + 130, windowHeight / 2 - gameHeight / 2 + 143 + 20);
        strokeWeight(1);
        textAlign(LEFT, BASELINE);
    }

    this.bubbles = function () {
        fill(255);
        strokeWeight(3);
        rect(windowWidth / 2 - 180, windowHeight / 2 - gameHeight / 2 + 78, 100, 100, 4);
        rect(windowWidth / 2 - 50 + 130, windowHeight / 2 - gameHeight / 2 + 78, 100, 100, 4);

        rect(windowWidth / 2 - 200, windowHeight / 2 - gameHeight / 2 + 50, 400, 100, 4);
        rect(windowWidth / 2 - 200, windowHeight / 2 - gameHeight / 2 + 200, 400, 40, 4);
        rect(windowWidth / 2 - 200, windowHeight / 2 - gameHeight / 2 + 250, 400, 40, 4);
        rect(windowWidth / 2 - 200, windowHeight / 2 - gameHeight / 2 + 300, 400, 40, 4);
        rect(windowWidth / 2 - 200, windowHeight / 2 - gameHeight / 2 + 350, 400, 40, 4);

        fill(130);
        if (answered) {
            if (this.qChoice == this.qAnswer)
                fill(100, 255, 100);
            else
                fill(255, 100, 100);
            //setTimeout(this.update(), 5000);
        }

        if (this.qChoice == 1)
            rect(windowWidth / 2 - 200, windowHeight / 2 - gameHeight / 2 + 200, 400, 40, 4);
        else if (this.qChoice == 2)
            rect(windowWidth / 2 - 200, windowHeight / 2 - gameHeight / 2 + 250, 400, 40, 4);
        else if (this.qChoice == 3)
            rect(windowWidth / 2 - 200, windowHeight / 2 - gameHeight / 2 + 300, 400, 40, 4);
        else if (this.qChoice == 4)
            rect(windowWidth / 2 - 200, windowHeight / 2 - gameHeight / 2 + 350, 400, 40, 4);

        fill(0);
        strokeWeight(1);
        textAlign(LEFT, CENTER)
        text('[A]', windowWidth / 2 - 180, windowHeight / 2 - gameHeight / 2 + 200 + 20);
        text('[B]', windowWidth / 2 - 180, windowHeight / 2 - gameHeight / 2 + 250 + 20);
        text('[C]', windowWidth / 2 - 180, windowHeight / 2 - gameHeight / 2 + 300 + 20);
        text('[D]', windowWidth / 2 - 180, windowHeight / 2 - gameHeight / 2 + 350 + 20);
    }

    this.enterAnswer = function () {
        answered = true;
    }
}