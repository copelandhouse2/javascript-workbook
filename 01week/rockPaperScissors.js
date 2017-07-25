'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ah Rock Paper scissors
// Examples below are in the format hand1:hand2
// Ties: rock:rock; paper:paper; scissors:scissors
// Hand1 wins: rock:scissors; paper:rock; scissors:paper
// Hand2 wins: scissors:rock; rock:paper; paper:scissors
function rockPaperScissors(hand1, hand2) {

  // We are cleaning up the entries.  Camparison tests later in the program expect lowercase and no extra white space
  hand1 = hand1.toLowerCase().trim();
  hand2 = hand2.toLowerCase().trim();

  let winningMessage = '';

  // Did the competitors enter rock, paper or scissors?  Or did they enter some other word.  Need to make sure.
  if ( (hand1 !== 'rock' && hand1 !== 'paper' && hand1 !== 'scissors') ||
       (hand2 !== 'rock' && hand2 !== 'paper' && hand2 !== 'scissors')
     ) {
    winningMessage = "Alright, someone did not enter a valid value";
    return winningMessage;
  }

  // This code tests the competitors to determine who won (or if there is a tie)
  if (hand1 === hand2) {
    winningMessage = "It's a tie!"
  }
  else if (hand1 === 'rock') {
    if (hand2 === 'paper') {
      winningMessage = "Hand two wins!";
    } else {
      winningMessage = "Hand one wins!";
    }
  } // closing bracket to "else if" hand 1 equals rock
  else if (hand1 === 'paper') {
    if (hand2 === 'rock') {
      winningMessage = "Hand one wins!";
    } else {
      winningMessage = "Hand two wins!";
    }
  } // closing bracket to "else if" hand 1 equals paper
  else if (hand1 === 'scissors') {
    if (hand2 === 'rock') {
      winningMessage = "Hand two wins!";
    } else {
      winningMessage = "Hand one wins!";
    }
  }  // closing bracket to "else if" hand 1 equals scissors

  return winningMessage;
}  // final closing bracket to rockPaperScissors

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
