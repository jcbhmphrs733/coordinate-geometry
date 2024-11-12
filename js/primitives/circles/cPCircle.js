class CPCircle {
    constructor(p1, p2, p3) {
        const ab = new LineSegment(p1, p2);
        const bc = new LineSegment(p2, p3);
        const abPerp = new PointSlopeLine(ab.mp, ab.perpSlope);
        const bcPerp = new PointSlopeLine(bc.mp, bc.perpSlope);
        const intersection = new Intersection(abPerp, bcPerp).intersection;
        this.origin = new Coor(intersection.x, intersection.y)
        this.r = pt2pt_dist(this.origin, p1);
    }

    draw(ctx, {color = 'white', lineWidth = .75, dashed = false}) {
        ctx.beginPath();
        if (dashed) {
            ctx.setLineDash([5,10]);
        }
        ctx.lineWidth = .75
        ctx.strokeStyle = color;
        ctx.arc(this.origin.x, this.origin.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
    }
}