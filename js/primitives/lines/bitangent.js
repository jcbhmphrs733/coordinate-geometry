class BitangentPairs {
    constructor(circle1, circle2) {
        
        const d = pt2pt_dist(circle1.origin, circle2.origin)
        const greaterCircle = circle1 ? circle1.r > circle2.r : circle2

        // equal radius circles with parallel direct common tangents
        if(circle1.r = circle2.r) { 
        }
        // non equal radius circles
        else {
            if(d > circle1.r + circle2.r){
                const interiorCircle = new PtRCircle(greaterCircle.origin, Math.abs(circle1.r - circle2.r))
            
                const theta_offset = Math.acos(interiorCircle.r/d)
                const axis_theta = Math.atan2(pt.y,pt.x) 
                
                this.p1 = new Coor(
                    interiorCircle.r * Math.cos(axis_theta + theta_offset),
                    interiorCircle.r * Math.sin(axis_theta + theta_offset)
                )
                this.p2 = new Coor(
                    interiorCircle.r * Math.cos(axis_theta - theta_offset),
                    interiorCircle.r * Math.sin(axis_theta - theta_offset)
                )
                this.tanLine1 = new LineSegment(greaterCircle.origin, this.p1)
                this.tanLine2 = new LineSegment(greaterCircle.origin, this.p2)
            }
        }
       
            
    }
}