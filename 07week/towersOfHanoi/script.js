'use strict';

/****************** WHITE BOARD NOTES **********************
// Given: the board, stacks and blocks.  Board Display.
//
// create object with 3 arrays?
//
// Create functional components: Stack and Block
//
// Click on a stack
// Test for popped block.
// If popped block then
//   If validMove() then
//     *** Comparing last block in current stack, test
//     movePiece()
//     if checkForWin() then
//       Announce winner!
//     else
//       Continue playing the game.
//   else
//     alert user, 'Cannot move larger block onto smaller one'
//   end if
// else
//   If !popOffBlock() then
//     alert user, 'select a stack with a block'
//   End if
//
// validMove(sourceStack, targetStack)  // the tests expect this function to take in 2 values.
//  if source stack array.last < target stack array.last then
//    return true
//  end if
//  return false
//
// movePiece()
//  target stack array.push(source stack array.pop)
//  return
//
// checkForWin()
//  if b.array.length === 4 || c.array.length === 4 then
//    return true
//  end if
//  return false
//
// popOffBlock(sourceStack)
//   if sourceStack > 0  // has blocks
//     Pop off top block.
//     return true;
//   else
//     return false;
//   end if

***********************************************************/

// Main driver class.
class TowersOfHanoi extends React.Component {
  constructor() {
    super();
    const startArr = [100,75,50,25];
    const winCount = startArr.length;
    this.state = {
      stacks: {               // My stacks object has 3 arrays for each stack
        1: startArr.slice(),  // a place to store the popped block and the
        2: [],                // winning count.
        3: [],
        popped: null,
        winCount: winCount
      },
      message: '',           // message used to display messages to the user.
      youWon: false          // Used to shut game down after win.
    }
  }  // Constructor

  // Need to ensure player is not placing a larger block on top of a smaller one.
  validMove(popped, stack) {
    if (stack.length === 0 || popped < stack[stack.length - 1]) {
      return true;
    }
    return false;
  }

  // Check for a win.  If stack 2 or 3 has all the blocks, then WIN.
  checkForWin(stacks) {
    // console.log('in checkForWin');
    // console.log('Win criteria',stacks.winCount, stacks[2].length, stacks[3].length);
    if (stacks[2].length === stacks.winCount || stacks[3].length === stacks.winCount) {
      return true;
    }
    return false;
  } // checkForWin()

  // All the TOH logic is in here.
  handleClick(sKey) {
    console.log('In handleClick!');
    // Creating an exact copy of stacks... one that is not by reference.
    const stacks = {1:[],2:[],3:[],popped:null,winCount:null};
    stacks[1] = this.state.stacks[1].slice();
    stacks[2] = this.state.stacks[2].slice();
    stacks[3] = this.state.stacks[3].slice();
    stacks['popped'] = this.state.stacks['popped'];
    stacks['winCount'] = this.state.stacks['winCount'];

    let message = this.state.message;
    let youWon = this.state.youWon;

    if(stacks['popped']) {  // We have a popped block.  Need to push block
      if (this.validMove(stacks['popped'], stacks[sKey])) {
        stacks[sKey].push(stacks['popped']);
        stacks['popped'] = null;
        message = '';
        if (this.checkForWin(stacks) && !youWon) {
          message = 'Congratulations, you solved Towers of Hanoi!';
          youWon = true;
          this.setState({stacks: stacks, message: message, youWon: youWon});
        }
      } else {
        message = 'Invalid move.  Cannot place larger block on smaller one';
      }
    } else {  // We need to pop a block off the selected stack.
      if (stacks[sKey].length > 0) {
        stacks['popped'] = stacks[sKey].pop();
        message = '';
      } else {
        message = 'You selected an empty stack.  Please try again.';
      }
    }
    youWon? null : this.setState({stacks: stacks, message: message, youWon: youWon});

  }  // handleClick()

  // This is the main display for the game.  I display a Stack object.
  // The stack objects display the block objects.
  render() {
    return (
      <div>
        <div>
          <h2>Towers of Hanoi by Craig... React version!</h2>
          <Pop block={this.state.stacks['popped']} />
        </div>
        <div id="board">
          <Stack
            id="1"
            blocks={this.state.stacks[1]}
            handleStackClick={this.handleClick.bind(this)}
          />
          <Stack
            id="2"
            blocks={this.state.stacks[2]}
            handleStackClick={this.handleClick.bind(this)}
          />
          <Stack
            id="3"
            blocks={this.state.stacks[3]}
            handleStackClick={this.handleClick.bind(this)}
          />
        </div>
        <div>
          <h2>{this.state.message}</h2>
        </div>

      </div>
    );
  }
}

// Rendering TowersOfHanoi class within div id=towers-of-hanoi
ReactDOM.render(<TowersOfHanoi />, document.getElementById('towers-of-hanoi'));
