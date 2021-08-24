/*
TERNARIES

5-expressionsAndOperators
    03-ternaries.js
*/

let x = 6;

x > 0 ? console.log('x is positive') : console.log('x is negative');

if (x > 0) {
    console.log('x is positive)');
} else {
    console.log('x is negative');
}

let greeting = 'Salutations!';

if (greeting.length > 10) {
    console.log('That is a long greeting!');
} else if (greeting.length == 10) {
    console.log('Your greeting is exactly 10 characters.');
} else {
    console.log('What a normal greeting.');
}

greeting.length > 10 ? console.log('That is a long greeting!') :
greeting.length == 10 ? console.log('Your greeting is exactly ten characters.') :
console.log('What a normal greeting.');