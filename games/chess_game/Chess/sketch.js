let pieces_spritesheet;
let pieces_spritedata;
let white_piece = [];
let black_piece = [];
const scl = 70;
let pieceColor = 1;
const rows = 8;
const cols = 8;

function preload() {
    pieces_spritedata = loadJSON('pieces/chess_spritesheet.json');
    pieces_spritesheet = loadImage('pieces/chess_spritesheet.png');

    board = new Board();
    logic = new Logic();
    board.preload();
}

function setup() {
    let pieces_frames = pieces_spritedata.frames;
    for (let i = 0; i < pieces_frames.length; i++) {
        let pos = pieces_frames[i].frame;
        let img = pieces_spritesheet.get(pos.x, pos.y, pos.w, pos.h);
        if (i % 2)
            black_piece.push(img);
        else
            white_piece.push(img);
    }
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
    board.show();
    board.update();
    console.log(logic.enPassant)
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function mousePressed() {
    board.pickPiece();
}

function mouseReleased() {
    board.dropPiece();
    board.calculateThreats();
}

function keyPressed() {
    if (keyCode == 32) {
        //board.flipBoard();
        //whiteMove = !whiteMove;
        pieceColor *= -1;
    }
}