//* If we have two file & we want that we only run one file & the second file automatically runs. Than we use:-
//! Syntax:- require("filepath")    OR    require("./filename");
// Here require means all the code of that particular file is come as by default int the form of private. Or we can say that it will come like IIFE.

// require("./second"); // It is also known as Common JS Module (CJS).

/* How require("./second") works?
(function (){
    console.log("Hello I am second.");

    function sum(a,b){
        console.log(a+b);
    }
})()
*/

//todo For accessing the sum function we use:-
//! Syntax:- const vName = require("./filePath");
const sum = require("./second");

console.log("Hello I am first");

//? To call that function we use vName();
sum(2, 3);

const { multiply, divide, subtraction:sub } = require("./third");

multiply(4, 5);
divide(20, 5);
sub(10, 3);
