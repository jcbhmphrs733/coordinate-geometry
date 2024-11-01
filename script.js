import {pt2pt_dist} from "/math/pt2pt_dist.js" 

import {LineSegment} from "/primitives/lines/segment.js"
import {TangentPair} from "/primitives/lines/tangent.js"
import {PtRCircle} from "/primitives/circles/ptRCircle.js"
import {Coor} from "/primitives/coor.js"

let myCanvas = document.getElementById('myCanvas');
let ctx = myCanvas.getContext('2d');

myCanvas.width = 500;
myCanvas.height = 400;


const circle1 = new PtRCircle(new Coor(0,0), 100);  
const ctrl_pt = new Coor(200,0);
const midLine = new LineSegment(circle1.origin, ctrl_pt)
const targetPt = new Coor(100,100)

ctx.translate(myCanvas.width / 2, myCanvas.height / 2);
ctx.scale(1, -1);

document.getElementById("minY").innerText = `Y -${myCanvas.height / 2}`;
document.getElementById("maxY").innerText = `Y +${myCanvas.height / 2}`;
document.getElementById("minX").innerText = `X -${myCanvas.width / 2}`;
document.getElementById("maxX").innerText = `X +${myCanvas.width / 2}`;


function updateCanvas() {
    ctx.clearRect(-myCanvas.width/2, -myCanvas.height/2, myCanvas.width, myCanvas.height);
    
    let color = 'rgb(255,100,150)'
    
    const threshold = 5; 
    const easingFactor = .03;
    
    if (pt2pt_dist(ctrl_pt, targetPt) < threshold) { 
        do {
            targetPt.x = Math.random() * myCanvas.width - myCanvas.width / 2;
            targetPt.y = Math.random() * myCanvas.height - myCanvas.height / 2;
        } while (pt2pt_dist(targetPt,circle1.origin) <= circle1.r + 20)
    }

    ctrl_pt.x += (targetPt.x - ctrl_pt.x) * easingFactor;
    ctrl_pt.y += (targetPt.y - ctrl_pt.y) * easingFactor;
    
    if (pt2pt_dist(circle1.origin, ctrl_pt) >= circle1.r) {
        let tanPair = new TangentPair(circle1, ctrl_pt)

        let tanLine1 = tanPair.tanLine1
        let tanLine2 = tanPair.tanLine2
        let c2tanA = new LineSegment(circle1.origin, tanPair.p1)
        let c2tanB = new LineSegment(circle1.origin, tanPair.p2)
        let a2bLine = new LineSegment(tanPair.p1, tanPair.p2);
        
        tanLine1.draw(ctx, color);
        tanLine2.draw(ctx, color);
        c2tanA.draw(ctx, color);
        c2tanB.draw(ctx, color);
        a2bLine.draw(ctx, color, {dashed : true})
    }
    
    circle1.draw(ctx, color);
    ctrl_pt.draw(ctx, color);
    targetPt.draw(ctx, color);
    midLine.draw(ctx, color);
}

function animate() {
    updateCanvas();
    requestAnimationFrame(animate);
}

animate();