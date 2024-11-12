class Intersection {
    constructor(line1, line2) {
        this.line1 = line1;
        this.line2 = line2;
        this.intersection = this.calculateIntersection();
    }

    calculateIntersection() {
        const coefficients = [this.line1.coefficient, this.line2.coefficient];
        const solutions = [this.line1.solution, this.line2.solution];
        const determinant = coefficients[0][0] * coefficients[1][1] - coefficients[0][1] * coefficients[1][0];
        if (determinant === 0) {
            console.log("Lines are parallel or coincident; no unique intersection.");
            return null;
        }

        const product = math.multiply(math.inv(coefficients), solutions);
        
        return new Coor(product[0], product[1]);
    }
}
