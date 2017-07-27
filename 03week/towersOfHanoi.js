'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
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

function movePiece(startStack,endStack) {
  // const disktoMove = stacks[startStack].pop();
  // console.log(disktoMove);
  stacks[endStack].push(stacks[startStack].pop());
}

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

function towersOfHanoi(startStack, endStack) {
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
  const validUserEntry = (myStack) => {
    const validStacksArr = ['a','b','c'];
    return validStacksArr.some(validStack => myStack === validStack);
  }

  startStack = startStack.toLowerCase().trim();  // ensures user entry will be lower case.  Also gets rid of spaces on either end.
  endStack = endStack.toLowerCase().trim();  // ensures user entry will be lower case.  Also gets rid of spaces on either end.

  if (validUserEntry(startStack) && validUserEntry(endStack)) {
    if (isLegal(startStack, endStack)) {
      movePiece(startStack, endStack);
      if (checkForWin()) {
        console.log('Congratulations!  You won!');
      }
    } else {
      console.log('That is an illegal move.  One of these issues...  Try again\n\n');
      console.log('  a) Cannot place a larger disk on a smaller one.');
      console.log('  b) Start stack is empty');

    }
  } else {
    console.log('Please enter correct stack name... a, b, or c');
  }

}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
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
