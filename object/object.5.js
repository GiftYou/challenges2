


function manageStudents (students, operations){
    let {  newStudent} = operations;

    students.push(newStudent);
    
    let Math = students.filter(item => item.subject == "Math")
    let Science = students.filter(item => item.subject == "Science")

    return {
        totalStudents: students.length,
        averageGrade:  students.reduce((total, student) => total + student.grade, 0)/ students.length,
        topStudent: students.reduce((top, student) => student.grade > top.grade? top = student: top ),
        bySubject : {
            Math,
            Science
        },
        Statistics : {
            Math :{count: Math.length, average: Math.reduce((total, student) => total + student.grade, 0)/ Math.length},
            Science: {count: 2, average: Science.reduce((total, student) => total + student.grade, 0)/ Science.length}
        }
    };
}


let students = [
  { id: 1, name: "Alice", grade: 85, subject: "Math" },
  { id: 2, name: "Bob", grade: 92, subject: "Science" },
  { id: 3, name: "Charlie", grade: 78, subject: "Math" }
];

let result = manageStudents(students, {
  action: "analyze",
  newStudent: { id: 4, name: "Diana", grade: 88, subject: "Science" }
});
console.log(JSON.stringify(result, null, 3));
