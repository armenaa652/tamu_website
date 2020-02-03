var sketch = function (b) {
    b.banner;
    b.setup = function () {
        b.banner = b.createCanvas(transX, transY);
        b.banner.position(0, 0);
        b.banner.style('z-index', '-1');
        b.fill(80, 0, 0)
        b.rect(0, -2, transX, transY + 2)
    }
    b.draw = function () {
    }
}
var myp5 = new p5(sketch);

let rows;
let cols;


let grid = [];
let size = 10;

let canvas;
let width;
let height;

let transX = 220;
let transY = transX * (152 / 220);

let first = true;
let resize = false;
let time;

let offset = 16;

function setup() {
    //noStroke()
    width = windowWidth - transX;
    height = transY;
    canvas = createCanvas(width - offset, height);
    canvas.position(transX, 0);
    canvas.style('z-index', '-1');
    grid = createGrid();
    frameRate(10);
}

function draw() {
    if (first) {
        if (resize) {
            time = millis();
        } else {
            if (time + 100 < millis()) {
                grid = createGrid();
                first = false;
            }
        }
    }
    canvas.position(0, 0);
    fill(80, 0, 0)
    rect(0, 0, windowWidth, transY);
    canvas.position(transX, 0);
    drawGrid();
    grid = updateGrid();
    resize = false;
}

function windowResized() {
    resizeCanvas(windowWidth - transX - offset, height);
    resize = true;
    first = true;
}

function createGrid() {
    width = windowWidth - transX;
    height = transY;
    rows = floor(height / size);
    cols = floor(width / size);
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
        for (let j = 0; j < cols; j++)
            arr[i][j] = !floor(random(2));
    }
    return arr;
}

function drawGrid() {
    noStroke();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j])
                fill(255);
            else
                noFill();
            //rect(j * size + transX, i * size, size, size)
            rect(width / 2 + j * size - cols / 2 * size, height / 2 + i * size - rows / 2 * size, size, size);
        }
    }
}

function updateGrid() {
    let arr = createGrid();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            arr[i][j] = updateCell(i, j);
        }
    }
    return arr;
}

function updateCell(i, j) {
    let pop = 0;
    for (yoffset = -1; yoffset <= 1; yoffset++) {
        for (xoffset = -1; xoffset <= 1; xoffset++) {
            let y = (i + yoffset + rows) % rows;
            let x = (j + xoffset + cols) % cols;
            if (!(y < 0) && !(y >= rows) && !(x < 0) && !(x >= cols) && !(y == i && x == j)) {
                if (grid[y][x])
                    pop++;
            }
        }
    }
    if ((grid[i][j] && pop >= 2 && pop <= 3) || (!grid[i][j] && pop == 3))
        return true;
    else
        return false;
}

function mouseMoved() {
    //let xpos = floor(((mouseX - transX) - width / 2 + cols / 2 * size) / size);
    let xpos = floor((mouseX - width / 2 + cols / 2 * size) / size);
    let ypos = floor((mouseY - height / 2 + rows / 2 * size) / size);
    if ((0 <= xpos && xpos < cols) && (0 <= ypos && ypos < rows)) {
        grid[ypos][xpos] = true;
    }

}

