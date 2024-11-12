//point-radius circle
class PtRCircle {
    constructor(origin, r) {
        this.origin = origin;
        this.r = r;
    }

    draw(ctx, color = 'black') {
        ctx.beginPath();
        ctx.lineWidth = 1.75
        ctx.strokeStyle = color;
        ctx.arc(this.origin.x, this.origin.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
    }
}