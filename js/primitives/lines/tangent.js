class TangentPair {
    constructor(circle, pt) {
        
        const d = pt2pt_dist(circle.origin, pt)
        const theta_offset = Math.acos(circle.r/d)
        const axis_theta = Math.atan2(pt.y,pt.x) 

        this.p1 = new Coor(
            circle.r * Math.cos(axis_theta + theta_offset),
            circle.r * Math.sin(axis_theta + theta_offset)
        )
        this.p2 = new Coor(
            circle.r * Math.cos(axis_theta - theta_offset),
            circle.r * Math.sin(axis_theta - theta_offset)
        )
        this.tanLine1 = new LineSegment(pt, this.p1)
        this.tanLine2 = new LineSegment(pt, this.p2)
    }
}