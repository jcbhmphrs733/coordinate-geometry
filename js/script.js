const circle1 = new PtRCircle(new Coor(0,0), 85);  
const ctrl_pt = new PtRCircle(getRandomCanvasPt(), 50);
const midLine = new LineSegment(circle1.origin, ctrl_pt);
let targetPt = getRandomCanvasPt();
let targetPt2 = getRandomCanvasPt();
let midline1 = new LineSegment(targetPt, circle1.origin)
let midline2 = new LineSegment(ctrl_pt.origin, circle1.origin)

const threshold = 50;  
const easingFactor = .015;

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
        
        let cPCircle = new CPCircle(circle1.origin, targetPt, ctrl_pt.origin);
        cPCircle.draw(ctx, {color : `${color}`, dashed:false});

        midline1.draw(ctx, {color : `${color}`})
        midline2.draw(ctx, {color : `${color}`})
        
        
        if (!ptInCircle(ctrl_pt.origin, circle1)) {
            let tanPair = new TanPairToPt(circle1, ctrl_pt.origin);
            let tanLine1 = tanPair.tanLine1;
            let tanLine2 = tanPair.tanLine2;   
            tanLine1.draw(ctx, {color : `${color}`})
            tanLine2.draw(ctx, {color : `${color}`})
            let tanChord = new LineSegment(tanPair.p1, tanPair.p2)
            tanChord.draw(ctx, {color : `${color}`, dashed: false})
        }
        if (!ptInCircle(targetPt, circle1)) {
            let tanPair = new TanPairToPt(circle1, targetPt);
            let tanLine1 = tanPair.tanLine1;
            let tanLine2 = tanPair.tanLine2;   
            tanLine1.draw(ctx, {color : `${color}`})
            tanLine2.draw(ctx, {color : `${color}`})
            let tanChord = new LineSegment(tanPair.p1, tanPair.p2)
            tanChord.draw(ctx, {color : `${color}`, dashed: false})
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