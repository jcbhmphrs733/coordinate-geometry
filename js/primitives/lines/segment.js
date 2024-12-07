class LineSegment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.vertical = (p1.x === p2.x);
        this.slope = this.vertical? null: (p1.y - p2.y) / (p1.x - p2.x);
        this.perpSlope = (this.slope === 0)? null: (this.slope === null? 0 : -(1 / this.slope));
        this.mp = new Coor((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5);
        this.coefficient = this.vertical? [1,0] : [-this.slope, 1];
        this.solution = this.vertical? p1.x : (-this.slope * p1.x) + p1.y;
        };
    
    draw(ctx, {color = 'white', lineWidth = .75, dashed = false}) {
        ctx.beginPath();
        if (dashed) {
            ctx.setLineDash([5,10]);
        }
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        // this.p1.draw(ctx, {color : color} )
        // this.p2.draw(ctx, {color : color} )
        ctx.setLineDash([]);
    }
}  