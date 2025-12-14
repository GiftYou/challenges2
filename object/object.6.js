

function createCalculator(){
    let history = [];

    function record (operation, a, b, result) {
        history.push({
            operation: operation,
            operands: [a, b],
            result: result
        });
    }

    return {
        add(a, b){
            let result = a + b;
            record("add", a, b, result);
            return result 
        },
        subtract (a, b){
            let result = a - b;
            record("subtract", a, b, result);
            return result
        },
        multiply (a, b){
            let result = a * b;
            record("multiply", a, b, result);
            return result
        },
        divide (a, b){
            let result = a / b;
            record("divide", a, b, result);
            return result
        },
        getHistory(){
            return history;
        },
        reset(){
            return history.splice(0, history.length);
        },
    }
}


let calc = createCalculator();
console.log(calc.add(5, 3));
console.log(calc.multiply(4, 2));
console.log(calc.divide(10, 2));
console.log(calc.getHistory());
calc.reset();
console.log(calc.getHistory());