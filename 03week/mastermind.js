'use strict';
/******************************** WHITE BOARD NOTES ****************************************
// Mastermind... There is a set of items (letters, numbers, colors, shapes, etc.), the Gamemaster selects items from this set
// and places them in a certain order.  The goal is for you to guess the right items in the right order.
// The Gamemaster (the one that knows the right combination), gives you 2 hints after each guess.
//    a) right item, right place
//    b) right item, wrong place.
// if it is a wrong item (it is also by definition in the wrong place), so it is not counted.
// You can use these hints to improve on your guess.
// You continue guessing and receiving hints until you get the right combination.
//
// For our computer game, the items are letters... a-h.
// The Computer is Gamemaster.  It will randomly select 4 letters in a certain combination.  This is the winning combination
// I will make a guess.  Need to test to make sure player only select letters a-h.  Need to test that player only pick 4.
// Computer will test for win.  If the player won, announce winner.  End game.
// If player didn't win, Computer will tell player how many are "right item right order" - "right item wrong order".  It will look like 1-3, 2-1, etc.
// The player will guess again.
//
// ********************************** PSEUDO CODE *************************************
// generateSolution() // Given.  Computer selects winning combination (combo of 4 letters)
// if valid entry(guess) then  // Test for a) letters a-h, b) guess.length = solution.length (just 4 letters)
//   if guess = solution then
//     Announce winner and number of guesses it took!
//     End game
//   else
//     guessCount++
//     console.log(generateHint(myGuess))
//     Continue playing game
//   end if
// else
//   Tell user to make another selection
// end if

// generateHint(myGuess)
//   // Test for exact Match
//   Loop on the characters of myGuess
//     if myGuess[i] === solution[i]
//       exactMatch++
//     end if
//   end loop
//
//   // Test for matching character.  not in right position
//   Loop on characters of myGuess
//     if character exists in solution then
//       matchChar++
//     end if
//   end loop
//   return exactMatch + matchChar
*****************************************************************************************/

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(myGuess) {
  // your code here
  let exactMatch = 0;
  let correctLetter = 0;
  let solutionArr = solution.split('');
  let myGuessArr = myGuess.split('');
  // This for loop tests for exact match
  for (let i=0; i<myGuessArr.length; i++) {
    if (myGuess[i] === solutionArr[i]) {
        exactMatch++;
        solutionArr[i] = '';  // clear out value.  This sets us up to look for correct letter test.
        myGuessArr[i] = '';  // clear out value.  This sets us up to look for correct letter test.
    }
    // console.log(myGuessArr[i], solutionArr[i]);  // This is our debug to show us the solution while testing.
  }
  // This for loop now looks for a correct letter, but not in the right position.
  for (let i=0; i<myGuessArr.length; i++) {
    // console.log(myGuessArr[i], solutionArr[i]);  // This is our debug to show us the solution while testing.
    if (myGuessArr[i]) {
      for (let j=0; j<solutionArr.length; j++) {
        if (myGuessArr[i] === solutionArr[j]) {
          correctLetter++;
          solutionArr[j] = '';  // clear out value.  This ensures we don't count duplicates.
          break;  // just in case there are duplicate values in the solution, once it finds a letter match, break out.
        }
      }
    }
  }
  return `${exactMatch}-${correctLetter}`;
}

// validEntry() tests the user's entry.  Valid entries only contain letters a-h.  Only 4 letters.
function validEntry(myGuess) {
  // Testing for length and testing if all the letters in guess are valid.
  return myGuess.length === solution.length && myGuess.split('').every(myChar => letters.some(validLetter => myChar === validLetter));
}

function mastermind(guess) {
  // solution = 'caa'; // Comment this out to generate a random solution
  guess = guess.toLowerCase().trim();  // this is a "cleanup" statement will change all letters to lowercase and remove spaces.

  if (validEntry(guess)) {
    if (guess === solution) {
      board[board.length] = `${guess}  :  ${generateHint(guess)}`;
      return true;  // player won!
    } else {
      board[board.length] = `${guess}  :  ${generateHint(guess)}`;
    }
  } else {
    console.log('Hey dude, you need to re-enter your guess.  Use letters a-h.  Also, only 4 letters')
  }
  return false;  // game is still going on.
}


function getPrompt() {
  rl.question('guess or (Q to quit): ', (guess) => {
    // This statement gives the user some control to quit the game instead of CTRL-C.
    if (guess.toLowerCase().trim() === 'q') {
      console.log('Quiting...');
      process.exit(0);
    }

    if (mastermind(guess)) {
      printBoard();
      console.log(`Great job.  You won!\nYou cracked the code in ${board.length} moves.`);
      console.log('Starting new game...');
      // initialize variables...
      while (board.length > 0) {board.pop();}  // clears board.
      solution = '';  // set solution to NULL before generating new combination.  Otherwise, it will append to the old.
      generateSolution();
      getPrompt();
    } else {
        printBoard();
        getPrompt();
    }
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
