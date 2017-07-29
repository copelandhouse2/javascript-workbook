'use strict';

console.log('Project 2 - Loops');
console.log('');
console.log('');


// Test 1 - For loop
console.log('Test 1 - for loop');
const carsInReverse = ['Ford','Chevy','Buick','Chrysler','Nissan', 'Toyota'];
for (let i = 0; i< carsInReverse.length; i++) {
  console.log(carsInReverse[i]);
}
console.log('');

// Test 2 - for... in loop.
console.log('Test 2 - For ... in loop');
const persons = {
  firstName:'Jane',
  lastName:'Doe',
  birthDate:'Jan 5, 1925',
  gender:'female'
};

for (const key in persons) {
  console.log(key);
  // console.log(`${key}: ${persons[key]}`);
}

for (let key in persons) {
  if (key === 'birthDate') {
    console.log(`She was born on ${persons[key]}`);
  }
}
console.log('');

// Test 3 - while loop
console.log('Test 3 - using while loops');
let i = 1;
let numList = ''
while (i <= 1000) {
  numList += i + ', ';
  i++;
}
console.log(numList);
console.log('');

// Test 4 - Using do..while loop
console.log('Test 4 - using do..while loop');
i = 1;
numList = ''
do {
  numList += i + ', ';
  i++;
} while (i <= 1000);
console.log(numList);
console.log('');

// Test 5 - For vs while
console.log('Test 5 - For vs while loops');
console.log('When is a for loop better than a while?\nWell... when you are looping over a known number of items, like in an array');
console.log('How is the readability affected?\nFor loops define start value, condition to check, and iteration\nWhile loops only define the condition to check');
console.log('');

// Test 6 - for vs for..in loop
console.log('Test 6 - For vs for..in loop');
console.log('What is the difference between a for loop and a for..in loop\nThe for..in loop is a special loop for objects.  One can loop on the keys of the object');
console.log('');


// Test 7 - While vs do..while
console.log('Test 7 - While vs do..while loop');
console.log('What is the difference between a while loop and do..while loop\nThe while loop checks the condition at the beginning of the loop.\nThe do..while loop, goes through the loop at least once, and checks the condition at the end.');
console.log('');
