function Splashscreen(character, gameWidth, gameHeight) {
    let pauseTime = 800;
    let countDown = pauseTime;
    this.on = false;

    this.show = function (levelNum) {
        rectMode(CORNER)
        fill(0);
        stroke(0);
        strokeWeight(1);
        rect(windowWidth / 2 - b_level[0].width / 2 - 10, windowHeight / 2 - gameHeight / 2 + 10, b_level[0].width + 20, gameHeight + 20, 5)
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        textFont(fontTwo);
        if (!inGame) {
            fill(255);
            rect(windowWidth / 2, windowHeight / 2 + 20, gameWidth, gameHeight);
            textSize(30);
            fill(0);
            switch (levelNum) {
                case 1:
                    text('Level One: Tuloso Midway UIL', windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 70);
                    textSize(20);
                    text('Description: This... is where we first met :)\nBy complete random chance, I DIDN\'T leave early\nand right as we were about to leave\nWE EXCHANGED SNAPS !?\n\n\nArrow keys: Move up and down\nSpacebar: Talk to people', windowWidth / 2, windowHeight / 2 + 40);
                    break;
                case 2:
                    text('Level Two: The Back of Happen\'s Car', windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 70);
                    textSize(20);
                    text('Description: This is where we got to know each other :)\nWe asked a lot of different questions and\nlearned a lot about each other\nDEFINITELY the most important car ride of my life\n\n\nArrow keys: Move up and down\nSpacebar: To continue', windowWidth / 2, windowHeight / 2 + 40);
                    break;
                case 3:
                    text('Level Three: The Big Question', windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 70);
                    textSize(20);
                    text('Description: Now here comes the big question...\nJordan, will you marr... be my girlfriend !!?\n#thebestdecisionofmylife\n\n\nArrow keys: Move up and down\nSpacebar: To continue', windowWidth / 2, windowHeight / 2 + 40);
                    break;
                case 4:
                    background(255);
                    textFont(fontOne);
                    textSize(14);
                    fill(0);
                    text('Hi Jordan ! I hope you liked your program :) as you know it took quite a while to make lol,\nbut it was COMPLETELY worth it bc the entire time I was just thinking about how happy it would make you (HOPEFULLY)\nI\’ve been wanting to make this for like 5ever, and I still plan on making a bunch of other programs for you,\nbut this is the first one :) IDEAS: a program that spins a wheel and picks where we\’re going to eat/do/go :)\n maybe it can pick what concert we\’re going to next :) @brockhampton…\nthe other idea is of course finishing your medical program :) Now that I know graphics better, I can make it a lot nicer :)\nand my last idea is a part 2 for this program :) the general idea for this game was to capture all\nof the most important moments that lead up to me asking you to be my girlfriend :)\nObviously where we met was a pretty important part, and I wanted to make some sort of game\nwhere you had to catch as many streaks as possible… so pacman seemed like a perfect fit!\nI knew without a doubt the second game was gonna be a question game where you had to see how well we know us,\nsince thats pretty much exactly what happened the first time we hung out :)\nThat was the first time I like REALLLLLYYY started liking you, because YOU WERE SO COOL ?!\nLike honest to God that was the moment… That mixed with the fact that you were so willing to do whatever with us\nmade me fall for you :) and then of course, then I asked you! I wanted to make that moment as special as possible,\nand now it is immortalized in your own personalized game :) each character, each position, each background… EVERYTHING\nwas hand did by me :) I literally only used two programs to make everything you see before you.\nI learnt an entirely new language so it would be easier to play on your computer,\nand I really really hope you like it Jordan :)\nI put as much love and thought into every single aspect of this program as I could .\n\nI\nLOVE\nYOU', windowWidth / 2, windowHeight / 2);
                    break;
            }
        } else {
            fill(0);
            rect(windowWidth / 2, windowHeight / 2 + 20, gameWidth, gameHeight);
            textSize(30);
            fill(255);
            switch (levelNum) {
                case 1:
                    text('Level One Game: Streak-man', windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 70);
                    textSize(20);
                    text('Description: It\'s Pacman... but with streaks!\neach blip represents a streak\ncollect them all to move on :)\n\n\nArrow keys: Move up and down\nSpacebar: ???', windowWidth / 2, windowHeight / 2 + 40);
                    break;
                case 2:
                    text('Level Two Game: Jeopardy?', windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 70);
                    textSize(20);
                    text('Description: I asked all of our friends\nto give me a question to ask you...\nlets see how much you know us ??\n\n\nArrow keys: Pick between answers\nSpacebar: Choose answer', windowWidth / 2, windowHeight / 2 + 40);
                    break;
                case 3:
                    text('Level Three Game: Flonkerton', windowWidth / 2, windowHeight / 2 - gameHeight / 2 + 70);
                    textSize(20);
                    text('Description: From the Office Olympics...Flonkerton !!!\nYou will be racing Kevin with reems\nof paper on your feet ! Good luck !\n\n\nSpacebar: Press as fast as you can\nto move forward', windowWidth / 2, windowHeight / 2 + 40);
                    break;
            }

        }
        if (lvl < 4) {
            rect(windowWidth / 2, windowHeight / 2 + gameHeight / 2 - 20, pauseTime / 2, 30)
            rectMode(CORNER)
            fill(0, 191, 255);
            fill(185, 25, 25);
            rect(windowWidth / 2 - pauseTime / 4, windowHeight / 2 + gameHeight / 2 - 20 - 15, (pauseTime - countDown) / 2, 30)
        }
        rectMode(CORNER)
        textAlign(LEFT, BASELINE)
        textFont(fontOne);
        textSize(15);
    }

    this.update = function () {
        countDown--;
        if (countDown == 0) {
            countDown = pauseTime;
            this.on = false;
        }
    }
}