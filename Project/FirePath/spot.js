

// An object to describe a spot in the grid
function Spot(i, j) {
    // Location
    this.i = i;
    this.j = j;

    // f, g, and h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;

    // Neighbors
    this.neighbors = [];

    // Where did I come from?
    this.previous = undefined;

    // Am I a wall?
    this.wall = false;
    this.set = false;
    this.status = 'N';
    // if (random(1) < 0.3) {
    //     this.wall = true;
    // }

    // Display me
    this.show = function (col) {
        if (this.wall && this.status === 'N') {
            fill(0);
            noStroke();
            // ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
            rect(this.i * w, this.j * h, w, h);
        }
        else if (this.status === 'B' && this.wall && this.set) {
            fill(255, 0, 0);
            noStroke();
            ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
            // rect(this.i * w, this.j * h, w, h);
        }
        else if (this.status === 'N' && !this.wall && this.set) {
            fill(0, 255, 0);
            noStroke();
            ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
            // rect(this.i * w, this.j * h, w, h);
        }
        else if (col) {
            fill(col);
            rect(this.i * w, this.j * h, w, h);
        }


    };

    // Figure out who my neighbors are
    this.addNeighbors = function (grid) {
        var i = this.i;
        var j = this.j;
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
        // if (i > 0 && j > 0) {
        //     this.neighbors.push(grid[i - 1][j - 1]);
        // }
        // if (i < cols - 1 && j > 0) {
        //     this.neighbors.push(grid[i + 1][j - 1]);
        // }
        // if (i > 0 && j < rows - 1) {
        //     this.neighbors.push(grid[i - 1][j + 1]);
        // }
        // if (i < cols - 1 && j < rows - 1) {
        //     this.neighbors.push(grid[i + 1][j + 1]);
        // }
    };
}