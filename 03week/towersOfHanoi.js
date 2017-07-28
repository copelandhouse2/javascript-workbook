'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [3, 2, 1],
  b: [],
  c: []
};

const winCount = stacks.a.length;
let message = '';

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// At this point in the code, the user data has been vetted and the move has been confirmed to be legal.
// This function simply pops the top "disc" off of start Stack and pushes in on end Stack
function movePiece(startStack,endStack) {
  // const disktoMove = stacks[startStack].pop();
  // console.log(disktoMove);
  stacks[endStack].push(stacks[startStack].pop());
}

// The user data has been tested to make sure they are valid values.  Now we need to test a bit further to see if the
// move from source to end is valid.  This function does that.
function isLegal(startStack, endStack) {
  // console.log('Start: ' + stacks[startStack][stacks[startStack].length-1]);
  // console.log(`End: ${stacks[endStack].length}`);

  if (stacks[startStack].length === 0) {
    return false;
  } else if (stacks[endStack].length === 0) {
    return true;
  } else {
    return stacks[startStack][stacks[startStack].length-1] < stacks[endStack][stacks[endStack].length-1];
  }
}

// Function tests to see if all the discs are on the other stacks.  If they are, that is a WIN.
function checkForWin() {
  // console.log(`win count: ${winCount}`);
  // console.log(`stack a count: ${stacks.a.length}`);
  // console.log(`stack b count: ${stacks.b.length}`);
  // console.log(`stack c count: ${stacks.c.length}`);
  if (stacks.b.length === winCount || stacks.c.length === winCount) {
    return true;
  }
  return false;
  // stacks.b.length === winCount || stacks.c.length === winCount ? (return true) : (return false);
}

// this function is the main driver function.
function towersOfHanoi(startStack, endStack) {
  /****************************** WHITE BOARD NOTES *******************************
  // first, make sure the user typed in either stack a, b, or c.  User must enter a, b, c.  Nothing else.
  // the source stack selected must not be empty.  There should be a disk there.
  // (isLegal): If the last value (selected disk) on source stack is smaller than the last value on the target stack
  // then call: (movePiece).  Otherwise, prompt the user to try again.  Clearly, the user is making an illegal move.
  // (checkForWin) If stack b or stack c has all the disks, WIN.

  // If valid entries then
  //   if isLegal() then
  //     movePiece()
  //     if checkForWin() then
  //       Announce winner!
  //     else
  //       Continue playing game
  //     end if
  //   else
  //     Tell user move cannot be made.  Make another selection
  //   end if
  // else
  //   Tell user to enter correct stack values
  // end if

  // isLegal(sourceStack, targetStack)  // the tests expect this function to take in 2 values.
  //  if source stack array.last < target stack array.last then
  //    return true
  //  end if
  //  return false

  // movePiece()
  //  target stack array.push(source stack array.pop)
  //  return

  // checkForWin()
  //  if b.array.length === 4 || c.array.length === 4 then
  //    return true
  //  end if
  //  return false
  *************************************************************************/

  // Tests to make sure user entries are only a, b, or c.
  const validUserEntry = (myStack) => {
    const validStacksArr = ['a','b','c'];
    return validStacksArr.some(validStack => myStack === validStack);
  }

  startStack = startStack.toLowerCase().trim(); // ensures user entry will be lower case.  Also gets rid of spaces on either end.
  endStack = endStack.toLowerCase().trim();     // ensures user entry will be lower case.  Also gets rid of spaces on either end.

  if (validUserEntry(startStack) && validUserEntry(endStack)) {  // test to make sure a, b, or c is entered.
    if (isLegal(startStack, endStack)) {   // test to make sure move is legal
      movePiece(startStack, endStack);     // Confirmed it is a legal move.  Go ahead and pop disc from startStack and push to endStack
      if (checkForWin()) {                 // See if all discs have been moved to stack b or c.  If so, then WIN.
        console.log('Congratulations!  You won!');
        return true;                       // Returning true ends the game.  We have a winner.
      }
    } else {
      console.log('That is an illegal move.  One of these issues...  Try again\n');
      console.log('  a) Cannot place a larger disk on a smaller one.');
      console.log('  b) Start stack is empty');

    }
  } else {
    console.log('Please enter correct stack name... a, b, or c');
  }

  return false;                            // No win yet.  Returning false keeps the game going.
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      // I wrapped towersOfHanoi function around a condition so I can "end" the game.  towersOfHanoi returns TRUE if someone
      // won the game.  It returns FALSE if the game is still going on.
      if (!towersOfHanoi(startStack, endStack)) {
        getPrompt();
      } else {
        process.exit(0);  // this command exits the Program
      }
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {

  getPrompt();

}
