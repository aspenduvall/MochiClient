let age = 9;

if (age >= 10) {
    console.log('You are older than 10!');
} else {
    console.log('You are not older than 10!');
}

let personAge = 15;
let height = "5'2";

if (personAge === 15 && height.includes("5'2")) {
    console.log('Hells yeah!');
} else {
    console.log('Hells no!');
}

let youngAge = 15;

if (youngAge = 13 && youngAge <= 18) {
    console.log('Congrats you are a teenager!');
} else {
    console.log('You are not a teenager!');
}

let petName = 'Maris';
let petType = 'Cat';

if (petName === 'Maris' && petType === 'Cat') {
    console.log('Your pet is the one!');
} else {
    console.log('Your pet is not the one!');
}


let fruitInventory = {
    bananas: 15,
    strawberries: 45,
    mangoes: 22
}

for (fruit in fruitInventory) {
    console.log('key:', fruit);
    // console.log(Object.values(fruitInventory));
    console.log('value:', fruitInventory[fruit]);
}

let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

for(number of array) {
    switch(number % 2) {
        case  0 :
            console.log(`${number} is even`);
            break;
        default:
            console.log(`${number} is odd`);
    }
}