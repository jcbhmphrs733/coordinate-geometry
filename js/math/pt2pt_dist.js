export function pt2pt_dist(a, b){
    // Distance between two coor
    return ((b.x - a.x)**2 + (b.y - a.y)**2) ** 0.5
}