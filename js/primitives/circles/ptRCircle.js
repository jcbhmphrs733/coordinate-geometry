//point-radius circle
class PtRCircle {
    constructor(origin, r) {
        this.origin = origin;
        this.r = r;
    }

    draw(ctx, {color = 'white', lineWidth = .75, dashed = false}) {
        ctx.beginPath();
        if (dashed) {
            ctx.setLineDash([5,10]);
        }
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = color;
        ctx.arc(this.origin.x, this.origin.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
        this.origin.draw(ctx, {color : color})
    }
}