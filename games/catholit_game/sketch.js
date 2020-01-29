// Jordan's Game

let mLeft = mRight = false;
let inGame = false;
let speechIndex = 1;
var lvl = 0;

let j_spritesheet;
let j_spritedata;
let j_sprite = [];

let b_spritesheet;
let b_spritedata;
let b_level = [];

let c_spritesheet;
let c_spritedata;
let c_sprite = [];

let p_spritesheet;
let p_spritedata;
let pacman_sprite = [];

let f_spritesheet;
let f_spritedata;
let f_sprite = [];

function preload() {
	fontOne = loadFont('fonts/AvenirNextLTPro-Demi.otf')
	fontTwo = loadFont('fonts/square block.ttf')

	j_spritedata = loadJSON('jordan/jordan_spritesheet.json');
	j_spritesheet = loadImage('jordan/jordan_spritesheet.png');

	b_spritedata = loadJSON('backgrounds/backgrounds_sheet.json');
	b_spritesheet = loadImage('backgrounds/backgrounds_sheet.png');

	c_spritedata = loadJSON('characters/character_spritesheet.json');
	c_spritesheet = loadImage('characters/character_spritesheet.png');

	p_spritedata = loadJSON('pacman_game/pacman_spritesheet.json');
	p_spritesheet = loadImage('pacman_game/pacman_spritesheet.png');

	f_spritedata = loadJSON('flonkerton/flonkerton_sprites.json');
	f_spritesheet = loadImage('flonkerton/flonkerton_sprites.png');
}

function setup() {
	textFont(fontOne);
	textSize(15);
	let b_frames = b_spritedata.frames;
	for (let i = 0; i < b_frames.length; i++) {
		let pos = b_frames[i].frame;
		let img = b_spritesheet.get(pos.x, pos.y, pos.w, pos.h);
		b_level.push(img);
	}

	let j_frames = j_spritedata.frames;
	for (let i = 0; i < j_frames.length; i++) {
		let pos = j_frames[i].frame;
		let img = j_spritesheet.get(pos.x, pos.y, pos.w, pos.h);
		j_sprite.push(img);
	}

	let c_frames = c_spritedata.frames;
	for (let i = 0; i < c_frames.length; i++) {
		let pos = c_frames[i].frame;
		let img = c_spritesheet.get(pos.x, pos.y, pos.w, pos.h);
		c_sprite.push(img);
	}

	let p_frames = p_spritedata.frames;
	for (let i = 0; i < p_frames.length; i++) {
		let pos = p_frames[i].frame;
		let img = p_spritesheet.get(pos.x, pos.y, pos.w, pos.h);
		pacman_sprite.push(img);
	}

	let f_frames = f_spritedata.frames;
	for (let i = 0; i < f_frames.length; i++) {
		let pos = f_frames[i].frame;
		let img = f_spritesheet.get(pos.x, pos.y, pos.w, pos.h);
		f_sprite.push(img);
	}

	pacman = new Pacman(pacman_sprite, b_level);
	quiz = new Quiz(b_level[0].height);
	flonkerton = new Flonkerton(f_sprite, b_level[0].width, b_level[0].height);
	jordan = new Jordan(j_sprite, b_level[0].width, b_level[0].height);
	level = new Level(c_sprite, b_level[0].width, b_level[0].height);
	splashscreen = new Splashscreen(c_sprite, b_level[0].width, b_level[0].height);

	pacman.preload();

	createCanvas(windowWidth, windowHeight);
}

function draw() {
	rectMode(CORNER);
	background(255);
	if (inGame == false) {
		switch (lvl) {
			case 0:
				level.intro_screen();
				break;
			case 1:
				level.first_level_show();
				level.update();
				break;
			case 2:
				level.second_level_show();
				level.update();
				break;
			case 3:
				level.third_level_show();
				level.update();
		}
	} else {
		switch (lvl) {
			case 0:
				break;
			case 1:
				pacman.show();
				pacman.update();
				if (pacman.checkForWin()) {
					inGame = false;
					lvl++;
					splashscreen.on = true;
				}
				break;
			case 2:
				if (quiz.qNum <= 11) {
					quiz.show();
					quiz.update();
				} else if (quiz.score >= 7) {
					lvl++;
					splashscreen.on = true;
				} else {
					quiz = new Quiz(b_level[0].height);
				}
				break;
			case 3:
				flonkerton.show();
				if (flonkerton.firstPress)
					flonkerton.update();
				if (!(flonkerton.jordanDistance < b_level[0].width - 100)) {
					if (flonkerton.kevinDistance < b_level[0].width - 100) {
						inGame = false;
						jordan.x = 400;
						splashscreen.on = true;
					}
					else {
						flonkerton = new Flonkerton(f_sprite, b_level[0].width, b_level[0].height);
						flonkerton.speed += .05;
					}
				}
		}

	}
	if (splashscreen.on) {
		splashscreen.show(lvl);
		if (lvl < 4)
			splashscreen.update();
	}
}

function keyPressed() {
	if (!splashscreen.on) {
		if (inGame == false) {
			if (keyCode == UP_ARROW || keyCode == 87) {
				jordan.up();
			} else if (keyCode == RIGHT_ARROW || keyCode == 68) {
				jordan.setMoveDir(1);
				mRight = true;
			} else if (keyCode == LEFT_ARROW || keyCode == 65) {
				jordan.setMoveDir(-1);
				mLeft = true;
			}
			if (keyCode == 32) {
				switch (lvl) {
					case 0:
						lvl++;
						splashscreen.on = true;
						break;
					case 1:
						if (jordan.x + jordan.w > windowWidth / 2 + b_level[0].width / 2 - jordan.w - 5) {
							if (speechIndex == 2) {
								jordan.x = windowWidth / 2 - c_sprite[0].width / 2 - 2;
								inGame = true;
								pacman.preload();
								splashscreen.on = true;
							}
							level.setSpeechIndex(speechIndex);
							speechIndex++;
						} else {
							if (speechIndex == 2) {
								level.switchBens();
							}
						}
						break;
					case 2:
						inGame = true;
						splashscreen.on = true;
						break;
					case 3:
						lvl++;
						splashscreen.on = true;
						break;
				}
			}
		} else {
			switch (lvl) {
				case 0:

				case 1:
					if (keyCode == UP_ARROW || keyCode == 87) {
						pacjordan.setChangeDir([0, -1]);
						pacman.firstPress = true;
					} else if (keyCode == RIGHT_ARROW || keyCode == 68) {
						pacjordan.setChangeDir([1, 0]);
						pacman.firstPress = true;
					} else if (keyCode == LEFT_ARROW || keyCode == 65) {
						pacjordan.setChangeDir([-1, 0]);
						pacman.firstPress = true;
					} else if (keyCode == DOWN_ARROW || keyCode == 83) {
						pacjordan.setChangeDir([0, 1]);
						pacman.firstPress = true;
					}
					break;
				case 2:
					if (quiz.countDown == quiz.waitTime) {
						if ((keyCode == UP_ARROW || keyCode == 87) && quiz.qChoice > 1) {
							quiz.qChoice--;
						} else if ((keyCode == RIGHT_ARROW || keyCode == 68) && quiz.qChoice < 4) {
							quiz.qChoice++;
						} else if ((keyCode == LEFT_ARROW || keyCode == 65) && quiz.qChoice > 1) {
							quiz.qChoice--;
						} else if ((keyCode == DOWN_ARROW || keyCode == 83) && quiz.qChoice < 4) {
							quiz.qChoice++;
						}
					}
					break;
			}
			if (keyCode == 32) {
				switch (lvl) {
					case 0:
						break;
					case 1:
						pacman.switchBlips();
						break;
					case 2:
						quiz.enterAnswer();
						break;
					case 3:
						flonkerton.firstPress = true;
						flonkerton.runJordan();
				}
			}
		}
	}
	if (keyCode == 219) {
		if (lvl >= 0) {
			lvl--;
		}
	} else if (keyCode == 221) {
		lvl++;
	} else if (keyCode == 189) {
		inGame = false;
	} else if (keyCode == 187) {
		inGame = true;
	}
}

function keyReleased() {
	if (!splashscreen.on) {
		if (inGame == false) {
			if ((keyCode == RIGHT_ARROW || keyCode == 68) && !mLeft) {
				jordan.setMoveDir(0);
				mRight = false;
			}
			if ((keyCode == LEFT_ARROW || keyCode == 65) && !mRight) {
				jordan.setMoveDir(0);
				mLeft = false;
			}
			mLeft = mRight = false;
		}
	}
}