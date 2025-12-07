console.log(analyzeElements([10, "hello", true]));
console.log(analyzeElements([1, 2, 3]));

function analyzeElements(){
    let lengthh = arguments[0].length
    let arrayy = arguments[0]
    let element = [];
    let type = []
    let retur = []

    
    for (let i = 0; i < lengthh; i++) {
        // type[index] = array[index];
        // element[index] = typeof array[index];
        // retur[index] = type
        // retur[index] = element
        retur.push({
            value: arrayy[i],
            index: i,
            type: typeof arrayy[i]
        })
    }
    return retur
}