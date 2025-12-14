


function analyzeObject(obj){
    let keys = Object.keys(obj);
    let values = Object.values(obj)

    return {
        propertyCount: keys.length,
        keys: keys,
        values:values,
        isEmpty: keys.length === 0
    }
}

let person = { name: "John", age: 25, city: "Jakarta" };
let empty = {};

console.log(analyzeObject(person));
console.log(analyzeObject(empty));