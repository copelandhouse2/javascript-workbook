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


function Checker(color) {
  // Your code here
  // define colors?  (r)ed, (b)lack.  Use r, b as checkers and turn.
  // use Active player
  this.color = color;
  this.color === 'red'? this.symbol = String.fromCharCode( 0x25cf ): (color === 'black'? this.symbol = String.fromCharCode( 0x25cb ) : this.symbol = 'u');
  let king = false;
  let active = false;

  this.isKing = () => {
    return king;
  }
  this.isActive = () => {
    return active;
  }

  this.toggleKing = () => {
    king = !king;  // consider changing symbol to upper/lowercase
    return king;
  }
  this.toggleActive = () => {
    // active? (active = false, active) : (active = true, active);
    active = !active;
    return active;
  }
}  // ending brace for Checker class

function Board() {
  this.grid = [];
  // creates an 8x8 array, filled with null values
  this.createGrid = function() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        switch (row) {
          // rows 0-2, red checkers
          case 0:
          case 2:
            column%2 === 1? this.grid[row].push(new Checker('red')) : this.grid[row].push(null);
            break;
          case 1:
            column%2 === 0? this.grid[row].push(new Checker('red')) : this.grid[row].push(null);
            break;
          // rows 5-7, black checkers
          case 5:
          case 7:
            column%2 === 0? this.grid[row].push(new Checker('black')) : this.grid[row].push(null);
            break;
          case 6:
            column%2 === 1? this.grid[row].push(new Checker('black')) : this.grid[row].push(null);
            break;
          // rows 3-4, empty
          default:
            this.grid[row].push(null);
        }
        // this.grid[row].push(null);
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
          // rowOfCheckers.push(' ');
          rowOfCheckers.push(String.fromCharCode( 0x25a0 ));

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

  this.playerTurn;

  validEntry = function(source, dest) {
    parseInt(source.charAt(0))
  }

  validCheckerMove = function() {

  }

  this.moveChecker = function(source, dest) {
    // if valid entry then
    //   if validCheckerMove is true then
    //     moveChecker()
    //   else
    //     "Invalid move, try again"
    // else
    //   "Invalid entries.  Pick a valid row, column"
    // end if

    // validCheckerMove tests for these things...
    // a) the piece you're moving is yours
    // b) destination space must be empty
    // c) can only move forward.
    // c) ensure
    // b) can only move diagonally 1 space if not jumping

    // b) If jumping, move diagonally 2 spaces horizontally, vertically.
    //   1. Now kill the checker you jumped over.
  };

  this.start = function() {
    this.board.createGrid();  // add the pieces to the grid
    this.playerTurn = 'black';  // Black goes first.  Will use this to toggle player turns.
  };
}

function getPrompt() {
  game.board.viewGrid();
  rl.question(`${game.playerTurn}, which piece?: `, (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      game.playerTurn === 'red'? game.playerTurn = 'black' : game.playerTurn = 'red';
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
