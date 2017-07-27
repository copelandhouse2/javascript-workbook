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

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece() {
  // Your code here

}

function isLegal() {
  // Your code here

}

function checkForWin() {
  // Your code here

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
