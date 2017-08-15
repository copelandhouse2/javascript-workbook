'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';
let turnCount = 0;

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {
  return board[0].every(square => square === playerTurn) || board[1].every(square => square === playerTurn) || board[2].every(square => square === playerTurn);
}

function verticalWin() {
  return [board[0][0], board[1][0], board[2][0]].every(square => square === playerTurn) || [board[0][1], board[1][1], board[2][1]].every(square => square === playerTurn) || [board[0][2], board[1][2], board[2][2]].every(square => square === playerTurn);
}

function diagonalWin() {
  return [board[0][0], board[1][1], board[2][2]].every(square => square === playerTurn) || [board[0][2], board[1][1], board[2][0]].every(square => square === playerTurn);
}

function checkForWin() {
  if (horizontalWin()) {
    printBoard();  // refreshes the screen and shows the last play prior to the message below.
    console.log(`Congratulations player ${playerTurn}.  You notched a horizontal win`);
    return true;
  } else if (verticalWin()) {
    printBoard();  // refreshes the screen and shows the last play prior to the message below.
    console.log(`Congratulations player ${playerTurn}.  You notched a vertical win`);
    return true;
  } else if (diagonalWin()) {
    printBoard();  // refreshes the screen and shows the last play prior to the message below.
    console.log(`Congratulations player ${playerTurn}.  You notched a diagonal win`);
    return true;
  }
  return false;
}

function ticTacToe(row, column) {
  // Program will control player turns using X's and O's
  // Based on row and column, populate array position in board
  // Test for 0, 1, 2 indexes.  User cannot enter anything else.
  // Make sure square is available.
  // Now check for a win.  Can be horizontal, vertical or diagonal.
  // If no one wins, switch to the next player and repeat.

  const validValue = (myIndex) => {
    const valuesArr = [0,1,2];
    return valuesArr.some(validIndex => myIndex == validIndex);
  }

  if (validValue(row) && validValue(column)) {  // This test makes sure values entered are 0, 1, 2 and nothing else.
    if (!board[row][column].trim() ) {  // This test makes sure the square is empty.
      board[row][column] = playerTurn;  // set the square equal to the current player.
      turnCount++;
      if (checkForWin()) {  // checkForWin returns TRUE if someone won.  It returns FALSE if no one has won yet.
        console.log(`Yes we have a winner folks... player ${playerTurn}.  Start a new game`);
        return true;  // returning true ends the game.  We have a winner.
      } else if (turnCount === 9) {
        printBoard();  // refreshes the screen and shows the last play prior to the message below.
        console.log(`Yes we have a tie folks.  No one won.  Start a new game`);
        return true;  // returning true ends the game.  We have a winner.
      } else {
        // Ok no one has won yet.
        // this logic controls who's turn it is.
        playerTurn === 'X'? playerTurn = 'O' : playerTurn = 'X';
      }
    } else {
      console.log('Hey, that square is already filled in.  Select another');
    }
  } else {
    console.log('Please enter a valid index.  Valid values are 0, 1, 2');
  }
  return false;  // returning false keeps the game going.
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      // I wrapped ticTacToe function around a condition so I can "end" the game.  ticTacToe returns TRUE if someone won the game
      // or there is a tie.  The game is over.  It returns FALSE if the game is still going on.
      if (!ticTacToe(row, column)) {
        getPrompt();
      } else {
        process.exit(0);  // this command exits the Program
      }
    });
  });

}

// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
