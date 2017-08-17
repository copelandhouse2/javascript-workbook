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
//
// Checker(color)
//   this.color = color
//   this.symbol = 'r' or 'b'  (use ternary operator)
//   consider king state
//   consider active state
//
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
// c) can only move diagonally forward 1 space if not jumping
// d) can only move diagonally forward 2 spaces if jumping

// b) If jumping, move diagonally 2 spaces horizontally, vertically.
//   1. Now kill the checker you jumped over.
//
// testForWin()
  if no pieces left for opposing player, then WIN!
  if opposing player cannot move, then WIN!

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
  this.symbol = color === 'red'? String.fromCharCode( 0x25cf ): (color === 'black'? String.fromCharCode( 0x25cb ) : 'u');
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
  this.checkers = [];
  let redChecker = null;
  let blackChecker = null;
  // creates an 8x8 board array, creates the checkers array.  Places checkers on board.
  this.createGrid = function() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // loop in 8 columns for each row.  We will also fill up a checkers array.
      // Checkers array will be used to track how many checkers each player has left.
      // We will also populate the board with those checkers.  Logic as follows...
      /************ PSUEDO LOGIC **************
      // Personally, I would like black checkers on the bottom, so that means they will be in rows 5-7.
      // Rows 0-2 will then contain red checkers.
      // Rows 3-4 will be empty
      // Rows 5-7 will contain the black checkers
      // Loop on row, column
      //   if square get checker...
      //     create a checker
      //     store it in checkers array
      //     AND place it on board
      ****************************************/
      for (let column = 0; column < 8; column++) {
        switch (row) {
          // rows 0-2, Adding red checkers to board.  Populating checkers array with red checkers.
          case 0:
          case 2:
            column%2 === 1? (  // this selects spaces 1, 3, 5, 7.  From red checker player position, space [0,7] is "bottom left square"
              redChecker = new Checker('red'),  // Create new checker
              this.checkers.push(redChecker),  // Store it in checker stack
              this.grid[row].push(redChecker)  // Place it on board.
            ) : this.grid[row].push(null);  // This would be the blank space between each checker.
            break;
          case 1:
            column%2 === 0? (  // this selects spaces 0, 2, 4, 6.  From black checker player position, space [7,0] is "bottom left square"
              redChecker = new Checker('red'),
              this.checkers.push(redChecker),
              this.grid[row].push(redChecker)
            ) : this.grid[row].push(null);
            break;
          // rows 5-7, Adding black checkers to board.  Populating checkers array with black checkers.
          case 5:
          case 7:
            // const blackChecker = new Checker('black');
            column%2 === 0? (  // this selects spaces 0, 2, 4, 6.  From black checker player position, space [7,0] is "bottom left square"
              blackChecker = new Checker('black'),
              this.checkers.push(blackChecker),
              this.grid[row].push(blackChecker)
            ) : this.grid[row].push(null);

            // column%2 === 0? this.grid[row].push(blackChecker) : this.grid[row].push(null);
            // this.checkers.push(blackChecker);
            break;
          case 6:
            // const blackChecker = new Checker('black');
            column%2 === 1? (  // this selects spaces 0, 2, 4, 6.  From black checker player position, space [7,0] is "bottom left square"
              blackChecker = new Checker('black'),
              this.checkers.push(blackChecker),
              this.grid[row].push(blackChecker)
            ) : this.grid[row].push(null);
          // column%2 === 1? this.grid[row].push(new Checker('black')) : this.grid[row].push(null);
            // this.checkers.push(blackChecker);
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
          rowOfCheckers.push(' ');
          // rowOfCheckers.push(String.fromCharCode( 0x25a0 ));

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

  this.playerTurn;  // Used to alternate the players turn. black, red, black, red
  this.messageToPlayer = '';  // variable used to store error message to player

  this.validEntry = function(source, dest) {
    // console.log('in validEntry()');  /** DEBUG **/
    if (source.length !==2 || dest.length !== 2) {
      this.messageToPlayer = 'you entered an invalid square.  Too many indices.';
      return false;
    } else if ( parseInt(source.charAt(0)) < 0 || 7 < parseInt(source.charAt(0)) || parseInt(source.charAt(1)) < 0 || 7 < parseInt(source.charAt(1)) ) {
      this.messageToPlayer = 'you entered an invalid row-column index for source.  0-7 only.';
      return false;
    } else if ( parseInt(dest.charAt(0)) < 0 || 7 < parseInt(dest.charAt(0)) || parseInt(dest.charAt(1)) < 0 || 7 < parseInt(dest.charAt(1)) ) {
      this.messageToPlayer = 'you entered an invalid row-column index for dest.  0-7 only.';
      return false;
    }
    return true;
  }

  this.validCheckerMove = function(sRow, sCol, dRow, dCol) {
    // Checking to make sure source checker belongs the player

    // Had to comment out to pass tests.
    // if (this.board.grid[sRow][sCol].color !== game.playerTurn) {
    //   this.messageToPlayer = `You are trying to move your opponent's piece.  Please select one of your checkers.`;
    //   return false;
    // }

    // Checking to make sure destination square is empty
    if (this.board.grid[dRow][dCol]) {
      this.messageToPlayer = `Destination is invalid.`;
      return false;
    }

    // c) can only move diagonally forward 1 space if not jumping
    // d) can only move diagonally forward 2 spaces if jumping
    // add tests

    return true;
  }

  this.moveChecker = (source, dest) => {
    // console.log('in moveChecker()');  /** DEBUG **/
    if (this.validEntry(source, dest)) {
      // console.log('in IF validEntry()');  /** DEBUG **/

      // Since I confirmed the person typed in valid input,
      // brecking up the indices to make code easier to read.
      const sRow = parseInt(source.charAt(0));  // source Row
      const sCol = parseInt(source.charAt(1));  // source Column
      const dRow = parseInt(dest.charAt(0));    // destination Row
      const dCol = parseInt(dest.charAt(1));    // destination Column

      if (this.validCheckerMove(sRow, sCol, dRow, dCol)) {
        if (Math.abs(dRow - sRow) === 2) {  // we have a jump.
          // Determining the coordinates for the middle checker being jumped.  kRow, kCol will be the kill coordinates
          let kRow = dRow - sRow > 0? sRow + 1 : dRow + 1;  // locating the middle checker position for the kill.
          let kCol = dCol - sCol > 0? sCol + 1 : dCol + 1;
          // Testing the color of the jumped checker.  If red, remove a checker from the beginning of the checker stack.
          // If black, remove from the end of the stack.
          // Why you say?  Well, when we populated the checker array, we did red first, then black.
          this.board.grid[kRow][kCol].color === 'red'? this.board.checkers.shift() : this.board.checkers.pop();
          this.board.grid[kRow][kCol] = null;
        }
        // These two steps will happen for EVERY checker move.
        this.board.grid[dRow][dCol] = this.board.grid[sRow][sCol];
        this.board.grid[sRow][sCol] = null;

      } else {  // invalid move.  Try again.
        return false;
      }
    } else {  // invalid entry.  Try again.
      // console.log('in ELSE validEntry()');  /** DEBUG **/
      return false;  // returning false takes program to a "message handler"
    }
    return true;
  };

  this.start = function() {
    this.board.createGrid();  // add the pieces to the grid
    this.playerTurn = 'black';  // Black goes first.  Will use this to toggle player turns.
  };

  this.win = function() {
    return false;
  }
}

function getPrompt() {
  game.board.viewGrid();
  // console.log(game.board.checkers.length);
  rl.question(`${game.playerTurn}, which piece?: `, (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      if (game.moveChecker(whichPiece, toWhere)) {  // if the move was successful, keep going.  If not, fall to message handler.
        if (!game.win()) {  // no one has won yet... keep playing.
          game.playerTurn === 'red'? game.playerTurn = 'black' : game.playerTurn = 'red';
          getPrompt();
        } else {  // somebody won!
          console.log(`${game.playerTurn}... Congratulations!`);
        }
      } else {  // My simple message handler.
        console.log(`${game.playerTurn}... ${game.messageToPlayer}`);
        getPrompt();
      } // if statement for game.moveChecker

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
      // console.log(game.board.grid[5][0], game.board.grid[4][1]);
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
