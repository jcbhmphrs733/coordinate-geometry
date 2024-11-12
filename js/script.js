let myCanvas = document.getElementById('myCanvas');
let ctx = myCanvas.getContext('2d');

myCanvas.width = 1100;
myCanvas.height = 650;


const circle1 = new PtRCircle(new Coor(0,0), 100);  
const ctrl_pt = new Coor(0,5);
const midLine = new LineSegment(circle1.origin, ctrl_pt);
const targetPt = new Coor(60,60);
const targetPt2 = new Coor(100,100);

ctx.translate(myCanvas.width / 2, myCanvas.height / 2);
ctx.scale(1, -1);

document.getElementById("minY").innerText = `Y -${myCanvas.height / 2}`;
document.getElementById("maxY").innerText = `Y +${myCanvas.height / 2}`;
document.getElementById("minX").innerText = `X -${myCanvas.width / 2}`;
document.getElementById("maxX").innerText = `X +${myCanvas.width / 2}`;


function handlePtInCircle(color) {
    let tanPair = new TangentPair(circle1, ctrl_pt);
    
    let tanLine1 = tanPair.tanLine1;
    let tanLine2 = tanPair.tanLine2;
    // let c2tanA = new LineSegment(circle1.origin, tanPair.p1);
    // let c2tanB = new LineSegment(circle1.origin, tanPair.p2);
    let a2bLine = new LineSegment(tanPair.p1, tanPair.p2);
    
    tanLine1.draw(ctx, {color : "red"});
    tanLine2.draw(ctx, {color : "red"});
    // c2tanA.draw(ctx, {color : "red"});
    // c2tanB.draw(ctx, {color : "red"});
    a2bLine.draw(ctx, {color : "red", dashed : true})
}

function updateCanvas() {
    ctx.clearRect(-myCanvas.width/2, -myCanvas.height/2, myCanvas.width, myCanvas.height);
    
    let color = 'rgb(100,125,50)'
    
    let cPCircle = new CPCircle(circle1.origin, targetPt, ctrl_pt);
    cPCircle.draw(ctx, {color : `${color}`});
    const threshold = 15; 
    const easingFactor = .010;
    
    if (pt2pt_dist(targetPt, targetPt2) < threshold) { 
        do {
            targetPt2.x = Math.random() * myCanvas.width - myCanvas.width / 2;
            targetPt2.y = Math.random() * myCanvas.height - myCanvas.height / 2;
        } while (pt2pt_dist(targetPt2,circle1.origin) <= circle1.r + 15 || pt2pt_dist(targetPt2, circle1.origin) >= circle1.r + 200)
        // do {
        //     targetPt.x += (targetPt2.x - targetPt.x) * easingFactor
        //     targetPt.y += (targetPt2.y - targetPt.y) * easingFactor

        // } while (pt2pt_dist(targetPt, ctrl_pt) < 5 * threshold)
        }

        targetPt.x += (targetPt2.x - targetPt.x) * easingFactor
        targetPt.y += (targetPt2.y - targetPt.y) * easingFactor
        ctrl_pt.x += (targetPt.x - ctrl_pt.x) * easingFactor;
        ctrl_pt.y += (targetPt.y - ctrl_pt.y) * easingFactor;
        
        if (pt2pt_dist(circle1.origin, ctrl_pt) >= circle1.r) {
            handlePtInCircle(color)
        }
        circle1.draw(ctx, {color : "red"});
        ctrl_pt.draw(ctx, {color : "red"});
        targetPt.draw(ctx, {color : "green"});
        targetPt2.draw(ctx, {color : "white"});
    // midLine.draw(ctx, color);
}

function animate() {
    updateCanvas();
    requestAnimationFrame(animate);
}

animate();