console.log(manageStack([1, 2], ["push:3", "push:4", "pop"]));
console.log(manageStack([], ["push:a", "push:b", "pop", "push:c"]));



function manageStack(){
    let array = arguments[0]
    let command = arguments[1]
    let command1 = []


    for(let i = 0; i < command.length; i++){
        let commando = command[i]

        if (commando.startsWith("push:")){
            const value = commando.split(":")[1];
            const converted = isNaN(value) ? value : Number(value)
            array.push(converted);
            command1.push(`added ${value}`)
        } else if (commando === "pop"){
            const removed = array.pop();
             if (removed !== undefined) {
            command1.push(`Removed ${removed}`);
        }
        }
    }


    return {
        result: array,
        command1: command1
    }
}