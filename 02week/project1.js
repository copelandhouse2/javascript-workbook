'use strict';

console.log('Project 1');
console.log('');
console.log('');

// Test 1 - Print out array length
console.log('Test 1 - array length');
let cars = ['Ford','Chevy','Chrysler','Cadillac'];
console.log(cars.length);
console.log('');

// Test 2 - Use concat method to combine 2 arrays.
console.log('Test 2 - using concat');
let moreCars = ['BMW','Mercedes','Toyota','Honda'];
let totalCars = cars.concat(moreCars);
console.log(totalCars);
console.log('');

// Test 3 - Using indexOf and lastIndexOf
console.log('Test 3 - using indexOf and lastIndexOf');
console.log(`Index for Honda is ${totalCars.indexOf('Honda')}`);
console.log(`Index for Ford is ${totalCars.lastIndexOf('Ford')}`);
console.log('');

// Test 4 - Using join
console.log('Test 4 - using join');
const stringOfCars = totalCars.join(', ');
console.log(stringOfCars);
console.log('');

// Test 5 - Using split
console.log('Test 5 - using split');
totalCars = stringOfCars.split(', ');
console.log(totalCars);
console.log('');

// Test 6 - Using reverse
console.log('Test 6 - using reverse');
const carsInReverse = totalCars.reverse();
console.log(carsInReverse);
console.log('');


// Test 7 - Using sort
console.log('Test 7 - using sort');
console.log(carsInReverse.sort());
// alert(`Does BMW have first position in array?  BMW index = ${carsInReverse.indexOf('BMW')}`);
console.log(`Does BMW have first position in array?  BMW index = ${carsInReverse.indexOf('BMW')}`);
console.log('');


// Test 8 - Using slice
console.log('Test 8 - Using slice');
const removedCars = carsInReverse.slice(4,-2);
console.log(carsInReverse);  // still has the values
console.log(removedCars);
console.log('');


// Test 9 - Using splice
console.log('Test 9 - using splice');
console.log(carsInReverse.splice(1, 2, 'Ford', 'Honda'));
console.log(carsInReverse);
console.log('');


// Test 10 - Using push
console.log('Test 10 - using push');
carsInReverse.push('Cadillac', 'Chevy');
console.log(carsInReverse);
console.log('');


// Test 11 - Using pop
console.log('Test 11 - using pop');
console.log(`The last entry removed: ${carsInReverse.pop()}`);
console.log(`The last car in the array now: ${carsInReverse[carsInReverse.length-1]}`);
console.log('');


// Test 12 - Using shift
console.log('Test 12 - using shift');
console.log(`The first entry removed: ${carsInReverse.shift()}`);
console.log(`The first car in the array now: ${carsInReverse[0]}`);
console.log('');


// Test 13 - Using unshift
console.log('Test 13 - using unshift');
carsInReverse.unshift('Buick');
console.log(carsInReverse);
console.log('');


// Test 14 - Use For Each to add 2 to each element in array.
console.log('Test 14 - using forEach');
function addTwo() {

  let numbers = [23, 45, 0, 2];
  console.log(numbers);
  numbers.forEach((theNum, index) => {
    numbers[index] = theNum + 2});
  console.log('   adding 2...');
  console.log(numbers);

}
addTwo();
