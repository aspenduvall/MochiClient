/*

SPREAD OPERATOR
    - the spread operator pulls out all elements in an array and gives them back to you as a standalone list of elements
    - denoted....
*/

const fullName = ['Aspen', 'Duvall'];
// ...fullName // 'Aspen', 'Duvall'

const copiedFullName = [...fullName]
console.log(copiedFullName);

fullName.push('Mrs');
console.log(fullName, copiedFullName);

// SPREAD OPERATORS AND NUMBERS

console.log(Math.min(1, 5, -3));

const prices = [10.99, 5.99, 3.99, 6.59];
console.log(prices);
console.log(Math.min(prices));
console.log(Math.min(...prices));

// SPREAD OPERATOR AND OBJECTS

const persons = [{name: 'Zach', age: 27}, {name: 'Donovan', age: 24}];
const copiedPersons = [...persons];

persons.push({name: 'Anna', age: 30});
persons[0].name = 'Zachary';
console.log(persons, copiedPersons);

/*

- JS has 5 data types that are passed by value: boolean, null, undefined, string, number. These are known as primitive data types
- if a primitive data type is assigned to a variable, we can think of that variable as containing the primitive value

    let x = 10
    let y = 'abc'
    let z = null

    // x contains 10, y contains 'abc', z contains null - all of these values are primitive data types

*/

let x = 10;
let y = 'abc';
let z = null;