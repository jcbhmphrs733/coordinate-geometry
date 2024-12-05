class ParallelLine {
    constructor(p1, line) {
        this.p1 = p1;
        this.slope = line.slope;
        this.vertical = (this.slope === null);
        this.perpSlope = (this.slope === 0) ? null : (this.slope === null ? 0 : -1 / this.slope);
        this.coefficient = this.vertical ? [1,0] : [-this.slope, 1];
        this.solution = this.vertical ? p1.x : (-this.slope * p1.x) + p1.y;
    }

}  