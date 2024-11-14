const circle1 = new PtRCircle(new Coor(0,0), 100);  
const ctrl_pt = new Coor(0,5);
const midLine = new LineSegment(circle1.origin, ctrl_pt);
const targetPt = new Coor(60,60);
const targetPt2 = new Coor(100,100);

const threshold = 15; 
const easingFactor = .010;

function handlePtInCircle(color) {
    let tanPair = new TangentPair(circle1, ctrl_pt);
    
    let tanLine1 = tanPair.tanLine1;
    let tanLine2 = tanPair.tanLine2;
    // let c2tanA = new LineSegment(circle1.origin, tanPair.p1);
    // let c2tanB = new LineSegment(circle1.origin, tanPair.p2);
    let a2bLine = new LineSegment(tanPair.p1, tanPair.p2);
    
    tanLine1.draw(ctx, {color : `${color}`})
    tanLine2.draw(ctx, {color : `${color}`})
    // c2tanA.draw(ctx, {color : `${color}`})
    // c2tanB.draw(ctx, {color : `${color}`})
    a2bLine.draw(ctx, {color : `${color}`, dashed: true})
}

function updateCanvas() {
    if (!paused) {

        ctx.clearRect(-myCanvas.width/2, -myCanvas.height/2, myCanvas.width, myCanvas.height);
        
        let color = colorInput.value;
        
        let cPCircle = new CPCircle(circle1.origin, targetPt, ctrl_pt);
        cPCircle.draw(ctx, {color : `${color}`});
        
        if (pt2pt_dist(targetPt, targetPt2) < threshold) { 
            do {
                targetPt2.x = Math.random() * myCanvas.width - myCanvas.width / 2;
                targetPt2.y = Math.random() * myCanvas.height - myCanvas.height / 2;
            } while (pt2pt_dist(targetPt2,circle1.origin) <= circle1.r + 15 || pt2pt_dist(targetPt2, circle1.origin) >= circle1.r + 200)
        }
    
        targetPt.x += (targetPt2.x - targetPt.x) * easingFactor
        targetPt.y += (targetPt2.y - targetPt.y) * easingFactor
        ctrl_pt.x += (targetPt.x - ctrl_pt.x) * easingFactor;
        ctrl_pt.y += (targetPt.y - ctrl_pt.y) * easingFactor;
            
        if (pt2pt_dist(circle1.origin, ctrl_pt) >= circle1.r) {
            handlePtInCircle(color)
        }
        
        circle1.draw(ctx, {color : `${color}`});
        ctrl_pt.draw(ctx, {color : `${color}`});
        targetPt.draw(ctx, {color : `${color}`});
        targetPt2.draw(ctx, {color : `${color}`});
        // midLine.draw(ctx, {color : `${color}`});
    }
}

function animate() {
    updateCanvas();
    requestAnimationFrame(animate);
}

animate();