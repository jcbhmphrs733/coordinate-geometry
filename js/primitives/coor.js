export class Coor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, color) {
        let r = 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fill();
    }
}