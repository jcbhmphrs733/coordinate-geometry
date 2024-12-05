const circle1 = new PtRCircle(new Coor(0,0), 85);  
const ctrl_pt = new PtRCircle(getRandomCanvasPt(), 50);
const midLine = new LineSegment(circle1.origin, ctrl_pt);
let targetPt = getRandomCanvasPt();
let targetPt2 = getRandomCanvasPt();

const threshold = 15; 
const easingFactor = .010;

function ptInCircle(pt, circle) {
    if(pt2pt_dist(pt, circle.origin) < circle.r) {
        return true
    } else {
        return false
    }
}

function updateCanvas() {
    if (!paused) {

        let color = colorInput.value;

        ctx.clearRect(-myCanvas.width/2, -myCanvas.height/2, myCanvas.width, myCanvas.height);
        
        let cPCircle = new CPCircle(circle1.origin, targetPt, ctrl_pt);
        // cPCircle.draw(ctx, {color : `${color}`});
        
        if (!ptInCircle(ctrl_pt.origin, circle1)) {
            let tanPair = new TanPairToPt(circle1, ctrl_pt.origin);
            let tanLine1 = tanPair.tanLine1;
            let tanLine2 = tanPair.tanLine2;   
            tanLine1.draw(ctx, {color : `${color}`})
            tanLine2.draw(ctx, {color : `${color}`})
        }
        
        if (pt2pt_dist(targetPt, targetPt2) < threshold) { 
            do {
                targetPt2 = getRandomCanvasPt();
            } while (pt2pt_dist(targetPt2,circle1.origin) <= circle1.r + 15 || pt2pt_dist(targetPt2, circle1.origin) >= circle1.r + 200)
        }
    
        targetPt.x += (targetPt2.x - targetPt.x) * easingFactor
        targetPt.y += (targetPt2.y - targetPt.y) * easingFactor
        ctrl_pt.origin.x += (targetPt.x - ctrl_pt.origin.x) * easingFactor;
        ctrl_pt.origin.y += (targetPt.y - ctrl_pt.origin.y) * easingFactor;
            
        circle1.draw(ctx, {color : `${color}`});
        ctrl_pt.draw(ctx, {color : `${color}`});
        targetPt.draw(ctx, {color : `${color}`});
    }
}

function animate() {
    updateCanvas();
    requestAnimationFrame(animate);
}

animate();