/**********************WHITE BOARD NOTES *************************
// Givens:
// new Game (defines board) -> game.Start (creates grid) -> getPrompt (viewGrid, prompts user)
//
// classes:
//   Checker, Board, Game
//
//
// createGrid
//   add r, b checker pieces

// moveChecker
// if valid entry then
//   if validCheckerMove is true then
//     moveChecker()
//   else
//     "Invalid move, try again"
// else
//   "Invalid entries.  Pick a valid row, column"
// end if

// validCheckerMove
// a) the piece you're moving is yours
// b) destination space must be empty
// c) can only move forward.
// c) ensure
// b) can only move diagonally 1 space if not jumping

// b) If jumping, move diagonally 2 spaces horizontally, vertically.
//   1. Now kill the checker you jumped over.

*****************************************************************/

'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function Checker() {
  // Your code here
  // define colors?  (r)ed, (b)lack.  Use r, b as checkers and turn.
  // use Active player

}

function Board() {
  this.grid = [];
  // creates an 8x8 array, filled with null values
  this.createGrid = function() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  };

  // prints out the board
  this.viewGrid = function() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  };

  // Your code here
}
function Game() {

  this.board = new Board();

  this.moveChecker = function() {
    // if valid entry then
    //   if validCheckerMove is true then
    //     moveChecker()
    //   else
    //     "Invalid move, try again"
    // else
    //   "Invalid entries.  Pick a valid row, column"
    // end if

    // a) the piece you're moving is yours
    // b) destination space must be empty
    // c) can only move forward.
    // c) ensure
    // b) can only move diagonally 1 space if not jumping

    // b) If jumping, move diagonally 2 spaces horizontally, vertically.
    //   1. Now kill the checker you jumped over.
  };

  this.start = function() {
    this.board.createGrid();  // add the pieces to the grid.
    // addPiece()
    //
    // this.moveChecker()
  };
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
