// Function to delete element from the array
function removeFromArray(arr, elt) {
    // Could use indexOf here instead to be more efficient
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
    var Manhattan_Distance = abs(a.i - b.i) + abs(a.j - b.j);
    return Manhattan_Distance;
}

// How many columns and rows?
var cols = 20;
var rows = 20;

// This will be the 2D array
var grid = new Array(cols);

// Open and closed set
var openSet = [];
var closedSet = [];

// Start and end
var start;
var end;

// var fireList = [fire0, fire1, fire2, fire3, fire4, fire5];
var fire1;
var fire2;
var fire3;
var fire4;
var fire5;

// Width and height of each cell of grid
var w, h;
var isFinsh = false;
// The road taken
var path = [];

var wall = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var wall_1 = [
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0],
    [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
];


var wall_2 = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
];

var start_x = 0;
var start_y = 0;
var end_x = rows - 1;
var end_y = cols - 1;

var fire1_x = 8;
var fire1_y = 2;
var fire2_x = 6;
var fire2_y = 10;
var fire3_x = 13;
var fire3_y = 12;
var fire4_x = 4;
var fire4_y = 16;
var fire5_x = 15;
var fire5_y = 16;

function setFire(point, x, y) {
    point = grid[x][y];
    point.set = true;
    point.status = 'B';
    point.wall = true;
}

function setNoFire(point, x, y) {
    point = grid[x][y];
    point.set = true;
    point.status = 'N';
    point.wall = false;
}

function preload() {
    getTemp();
    // wall = wall_1;
    wall = wall_2;
}

// function getRandomInt(min, max) {
//     const minCeiled = Math.ceil(min);
//     const maxFloored = Math.floor(max);
//     return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
// }

function setup() {
    console.log('START A*');
    let divElement = document.getElementById("window");
    let canvas = createCanvas(700, 700);;
    canvas.parent(divElement);
    canvas.style("display", "block");


    // Grid cell size
    w = width / cols;
    h = height / rows;

    // Making a 2D array
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    // All the neighbors
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    //stop

    //wall
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].wall = wall[j][i];
        }
    }
    //fire
    // (public_Temp1 > 30) ? setFire(fire1, 13, 12) : setNoFire(fire1, 13, 12);
    // (public_Temp2 > 30) ? setFire(fire2, 8, 2) : setNoFire(fire2, 8, 2);
    // (public_Temp3 > 30) ? setFire(fire3, 6, 10) : setNoFire(fire3, 6, 10);
    // (public_Temp4 > 30) ? setFire(fire4, 16, 17) : setNoFire(fire4, 16, 17);
    // (public_Temp5 > 30) ? setFire(fire5, 4, 16) : setNoFire(fire5, 4, 16);


    //"rgb(190, 21, 21)"

    // Start and end

    // var start_x = getRandomInt(0, rows);
    // var start_y = getRandomInt(0, cols);
    // var end_x = getRandomInt(0, rows);
    // var end_y = getRandomInt(0, cols);

    start = grid[start_x][start_y];

    end = grid[end_x][end_y];

    start.wall = false;
    end.wall = false;

    // openSet starts with beginning only
    openSet.push(start);
}

function draw() {

    (public_Temp1 > 30) ? setFire(fire1, fire1_x, fire1_y) : setNoFire(fire1, fire1_x, fire1_y);
    (public_Temp2 > 30) ? setFire(fire2, fire2_x, fire2_y) : setNoFire(fire2, fire2_x, fire2_y);
    (public_Temp3 > 30) ? setFire(fire3, fire3_x, fire3_y) : setNoFire(fire3, fire3_x, fire3_y);
    (public_Temp4 > 30) ? setFire(fire4, fire4_x, fire4_y) : setNoFire(fire4, fire4_x, fire4_y);
    (public_Temp5 > 30) ? setFire(fire5, fire5_x, fire5_y) : setNoFire(fire5, fire5_x, fire5_y);

    // Am I still searching?
    if (openSet.length > 0) {
        // Best next option
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];

        // Did I finish?
        if (current === end) {
            isFinsh = true;
            noLoop();
            console.log('DONE!');
        }

        // Best option moves from openSet to closedSet
        removeFromArray(openSet, current);
        closedSet.push(current);

        // Check all the neighbors
        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            // Valid next spot?
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + heuristic(neighbor, current);

                // Is this a better path than before?
                var newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                // Yes, it's a better path
                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
        // Uh oh, no solution
    } else {
        console.log('No Solution');
        noLoop();
        return;
    }

    // Draw current state of everything
    background(255);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0, 50));
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0, 20));
    }

    // Find the path by working backwards
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    for (var i = 0; i < path.length; i++) {
        path[i].show(color(0, 255, 0, 90));
    }
    start.show(color(0, 0, 255));
    end.show(color(0, 255, 0));


    // Drawing path as continuous line
    if (isFinsh)
        display_path();
}

function display_path() {
    noFill();
    stroke(0, 255, 0);
    strokeWeight(w / 2);
    beginShape();
    for (var i = path.length - 1; i >= 0; i--) {
        vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
        console.log("(" + path[i].i + "," + path[i].j + ")");
        GetWay(i, fire1_x, fire1_y);
        GetWay(i, fire2_x, fire2_y);
        GetWay(i, fire3_x, fire3_y);
        GetWay(i, fire4_x, fire4_y);
        GetWay(i, fire5_x, fire5_y);
    }
    endShape();
    this.Status1 = grid[fire1_x][fire1_y].status;
    console.log(this.Status1);
    this.Status2 = grid[fire2_x][fire2_y].status;
    console.log(this.Status2);
    this.Status3 = grid[fire3_x][fire3_y].status;
    console.log(this.Status3);
    this.Status4 = grid[fire4_x][fire4_y].status;
    console.log(this.Status4);
    this.Status5 = grid[fire5_x][fire5_y].status;
    console.log(this.Status5);
}


function GetWay(i, firePoint_x, firePoint_y) {
    if (path[i].i === firePoint_x && path[i].j === firePoint_y) {
        if (path[i - 1].i != path[i].i) {
            if (path[i - 1].i > path[i].i) {
                grid[firePoint_x][firePoint_y].status = 'R'; console.log(grid[firePoint_x][firePoint_y].status);
            }
            else {
                grid[firePoint_x][firePoint_y].status = 'L'; console.log(grid[firePoint_x][firePoint_y].status);
            }
        }
        if (path[i - 1].j != path[i].j) {
            if (path[i - 1].j > path[i].j) {
                grid[firePoint_x][firePoint_y].status = 'L'; console.log(grid[firePoint_x][firePoint_y].status);
            }
            else {
                grid[firePoint_x][firePoint_y].status = 'R'; console.log(grid[firePoint_x][firePoint_y].status);
            }
        }
    }
}