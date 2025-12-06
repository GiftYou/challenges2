// Tulis function getArrayInfo di sini

console.log(getArrayInfo([1, 2, 3, 4, 5]));
console.log(getArrayInfo(["a", "b", "c"]));
console.log(getArrayInfo([]));


function getArrayInfo(){
    let args = arguments[0].length
    let args1 = arguments[0][0]
    let args2 = arguments[0].length
    let args22 = arguments[0][args2 -1]

    let isEmpty;
    if (arguments[0][0] === undefined){
        args3 = true
    }   else   {
        args3 = false
    }
    let args4 = {lenght : args, first : args1, last : args22, isEmpty: args3}
    return args4
    
}