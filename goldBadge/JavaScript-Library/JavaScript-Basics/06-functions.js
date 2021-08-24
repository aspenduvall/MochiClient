function pacersWon() {
    console.log("Pacers won!");
}
pacersWon();
pacersWon();
pacersWon();
pacersWon();
pacersWon();
pacersWon();

function numberEntered(num) {
    console.log("The number you entered was: ", num);
}
numberEntered(5);
numberEntered(4);
numberEntered(3);
numberEntered(2);
numberEntered(1);

function addAnyTwoNumbers(x, y) {
    console.log(x + y);
}

addAnyTwoNumbers(4, 5);
addAnyTwoNumbers(6, 11);
addAnyTwoNumbers(7, 8);

function subAnyTwoNumbers(x, y) {
    console.log(x / y);
}

subAnyTwoNumbers(3, 5);
subAnyTwoNumbers(10, 11);
subAnyTwoNumbers(1, 50);

function getMyBattingAverage(atBats, numberOfHits) {
    let myAverage = numberOfHits / atBats;
    return myAverage;
}
console.log(getMyBattingAverage(250, 91)); // = 0.364

function calculatePriceIndiana(quantity, price) {
    let totalPrice = 1.07 * quantity * price;
    return totalPrice;
}
console.log(calculatePriceIndiana(17, 5));