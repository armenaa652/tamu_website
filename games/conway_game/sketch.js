let rows;
let cols;

let time;

let grid = [];
let size = 15;

function setup() {
    rows = floor(windowHeight / size);
    cols = floor(windowWidth / size);
    createCanvas(windowWidth, windowHeight);
    grid = createGrid();
    frameRate(10);
    strokeWeight(0);
}

function draw() {
    background(0);
    drawGrid();
    grid = updateGrid();
}

function createGrid() {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < cols; j++) {
            arr[i][j] = !floor(random(2));
        }
    }
    return arr;
}

function drawGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j])
                fill(0);
            else
                fill(255);
            rect(windowWidth / 2 + j * size - cols / 2 * size, windowHeight / 2 + i * size - rows / 2 * size, size, size);
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
    let xpos = floor((mouseX - windowWidth / 2 + cols / 2 * size) / size);
    let ypos = floor((mouseY - windowHeight / 2 + rows / 2 * size) / size);
    if ((0 <= xpos && xpos < cols) && (0 <= ypos && ypos < rows)) {
        grid[ypos][xpos] = true;
    }

}
