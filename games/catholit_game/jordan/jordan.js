class Jordan {
    constructor(animation, b_width, b_height) {
        let scl = 10;
        let lSteps = 0, rSteps = 0;

        this.animation = animation;
        this.h = this.animation[0].height;
        this.w = this.animation[0].width;
        this.y = windowHeight / 2 - this.h / 2;
        this.x = windowWidth / 2 - b_width / 2 + 40;

        this.moveDir = 0;
        this.gravity = 0.7;
        this.velocity = 0;
        this.lift = -6.5 * (scl * .2);
        this.airborn = false;

        this.show = function () {
            if (this.moveDir > 0 && rSteps < 15) {
                image(this.animation[2], this.x, this.y);
            } else if (this.moveDir > 0 && rSteps < 30) {
                image(this.animation[3], this.x, this.y);
            } else if (this.moveDir > 0 && rSteps < 45) {
                image(this.animation[4], this.x, this.y);
            } else if (this.moveDir > 0 && rSteps < 60) {
                image(this.animation[5], this.x, this.y);
            } else if (this.moveDir > 0) {
                image(this.animation[2], this.x, this.y);
                rSteps = 1;
            } else if (this.moveDir < 0 && lSteps < 15) {
                image(this.animation[6], this.x, this.y);
            } else if (this.moveDir < 0 && lSteps < 30) {
                image(this.animation[7], this.x, this.y);
            } else if (this.moveDir < 0 && lSteps < 45) {
                image(this.animation[8], this.x, this.y);
            } else if (this.moveDir < 0 && lSteps < 60) {
                image(this.animation[9], this.x, this.y);
            } else if (this.moveDir < 0) {
                image(this.animation[6], this.x, this.y);
                lSteps = 1;
            } else if (this.y + this.h < windowHeight / 2 + b_height / 2 + 15) {
                image(this.animation[1], this.x, this.y);
            } else {
                image(this.animation[0], this.x, this.y);
            }
        }

        this.update = function () {
            this.velocity += this.gravity;
            this.y += this.velocity;
            this.x += this.moveDir * (scl * 0.9);

            if (this.x < windowWidth / 2 - b_width / 2) {
                this.x = windowWidth / 2 - b_width / 2;
            } else if (this.x + this.w > windowWidth / 2 + b_width / 2) {
                this.x = windowWidth / 2 + b_width / 2 - this.w;
            }

            if (this.y + this.h > windowHeight / 2 + b_height / 2 + 15) {
                this.y = windowHeight / 2 + b_height / 2 + 15 - this.h;
                this.velocity = 0;
                this.airborn = false;
            }

            if (rSteps > 0) {
                rSteps++;
            }
            if (lSteps > 0) {
                lSteps++;
            }
        }

        this.up = function () {
            if (this.airborn == false) {
                this.velocity += this.lift;
                this.airborn = true;
            }
        }

        this.setMoveDir = function (a) {
            this.moveDir = a;
            if (a > 0) {
                rSteps++;
            } else if (a < 0) {
                lSteps++;
            } else {
                lSteps = rSteps = 0;
            }
        }
    }

}