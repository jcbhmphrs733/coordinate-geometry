export class LineSegment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    
    draw(ctx, color = 'black', dashed = false) {
        ctx.beginPath();
        if (dashed) {
            ctx.setLineDash([5,10]);
        }
        ctx.lineWidth = .75;
        ctx.strokeStyle = color;
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        let r = 2
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.p1.x, this.p1.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.p2.x, this.p2.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.setLineDash([]);
    }
}