

// Tulis function manageQueue di sini

console.log(manageQueue([1, 2], ["enqueue:3", "dequeue", "enqueue:4"]));
console.log(manageQueue([], ["enqueue:x", "enqueue:y", "dequeue"]));

function manageQueue(){
    let array = arguments[0]
    let command = arguments[1]


    for(let i = 0; i < command.length; i++){
        let commando = command[i]
        

        if(commando.startsWith("enqueue") ){
            let commandoo= commando.split(":")[1];
            const converted = isNaN(commandoo) ? commandoo : Number(commandoo);
            array.push(converted);
            commando.enqueued++;

        } else if (commando === "dequeue"){
            if (array.length > 0) {
            array.shift(); // hapus dari depan (FIFO)
            commando.dequeued++;
        
            }
        }

    }

    return {result: array, command }
} 