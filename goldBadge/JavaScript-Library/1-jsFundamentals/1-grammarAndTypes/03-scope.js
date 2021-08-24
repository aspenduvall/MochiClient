/*
SCOPE

1-grammarAndTypes
    03-scope.js
*/

/*
What is scope?

JS has both LOCAL and GLOBAL scope
*/

//example 1

var x = 12;

function scope(){
    var x = 33;
    console.log(x);
}
scope();
console.log(x);

//example 2

var x = 12;

function scope(){
    x = 33;
    console.log(x);
}

scope()
console.log(x);

//example 3
var x = 1;

function scope() {
    var x = 2;
    function scopeInner(){
        var x = 3;
        console.log(x);
    }
    scopeInner();
    console.log(x);
}
scope();
console.log(x);

// example 4 contrasts with 5:
var x = 12;

function scope(){
    var x = 33;
    if (true) {
        let x = 45;
        console.log(x);
    }
    console.log(x);
}

scope();
console.log(x);

//example 5 contrats with 4:
var x = 12;

function scope() {
    var x = 33;
    if (true){
        var x = 45;
        console.log(x);
    }
    console.log(x);
}

scope();
console.log(x);