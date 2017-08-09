'use strict'

function upperCaser(input) {
  return input.toUpperCase();
}
// module.exports = upperCaser


let i = 0;
function repeat(operation, num) {
    if (i++ < num) {
    operation();
    repeat(operation, num);
  }
}
// module.exports = repeat


function doubleAll(numbers) {
  return numbers.map(element => element*2);
}
// module.exports = doubleAll

const messages = [
  {message: ";lsfdlksjdf;l lksjdaflsjdflj ljslfsldlsadflksjdf;lsa ;laskdfl;jksadf "},
  {message: "abcdefg"},
  {message: "hijklm"},
  {message: "ljasdf;lkjasf;lkjsadf;lkjasdf;lksajdf;lksadjf;lskadkfj;lsakdkf;lsakfkd;salkfd;laskfsaldfkk"},
  {message: "Cam rocks"}
];

//   [{message: ";lsfdlksjdf;l lksjdaflsjdflj ljslfsldlsadflksjdf;lsa ;laskdfl;jksadf "],
//   message2: "abcdefg",
//   message3: "hijklm",
//   message4: "ljasdf;lkjasf;lkjsadf;lkjasdf;lksajdf;lksadjf;lskadkfj;lsakdkf;lsakfkd;salkfd;laskfsaldfkk",
//   message5: "Cam rocks"
// }
function getShortMessages(messages) {
  return messages.map(messageObj => messageObj['message']).filter(message => message.length < 50);
}
 // console.log(getShortMessages(messages));

// module.exports = getShortMessages

const allValidUsers = [
  {id: 1}
  , {id: 2}
  , {id: 3}
  // , {id: 4}

];

const newUsers = [
  {id: 2}
  , {id: 1}
  , {id: 4}
];

function checkUsersValid(goodUsers) {
  return function(submittedUsers) {
    // console.log('In test');
    return submittedUsers.every(submittedObj => goodUsers.some(goodObj => submittedObj['id'] === goodObj['id']));
  };
}
// let checkUser = checkUsersValid(allValidUsers);
// checkUser(newUsers)? console.log('All Users valid') : console.log('Someone not valid');
// module.exports = checkUsersValid

const inputWords = ['Apple', 'Banana', 'Apple', 'Orange', 'Orange', 'Orange'];

function countWords(inputWords) {
  return inputWords.reduce((allWords, word) => {
    word in allWords? allWords[word]++ : allWords[word] = 1;
    return allWords;
  }, {});  // 2nd argument for reduce initializes allWords to {}.  Reduce now starts at index = 0.
  // return countedWords;
}

// console.log(countWords(inputWords));
module.exports = countWords



// This is a cool test showing nested functions and the ability to pass parameters separately.
// function multiplier(factor) {
//   return function(number) {
//     return number * factor;
//   };
// }
//
// let twice = multiplier(2);
// console.log(twice(5));
