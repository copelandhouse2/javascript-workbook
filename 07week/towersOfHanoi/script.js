'use strict';

/****************** WHITE BOARD NOTES **********************
// Given: the board, stacks and blocks.  Board Display.
//
// create object with 3 arrays?
//
// Click on a block (and stack)
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
class TowersOfHanoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stacks: {
        1: [100,75,50,25],
        2: [],
        3: []
      },
      popped: {
        stack: null,
        block: null
      }
    }
  }  // Constructor

  popOffBlock(stacks, sKey, popped) {
    // popped
    console.log('in popOffBlock');
    popped['stack'] = sKey;
    popped['block'] = stacks[sKey][stacks[sKey].length-1];
    return popped;
  }

  handleClick(sKey) {
    // Creating an exact copy of stacks... one that is not by reference.
    const stacks = {1:[],2:[],3:[]};
    stacks[1] = this.state.stacks[1].slice();
    stacks[2] = this.state.stacks[2].slice();
    stacks[3] = this.state.stacks[3].slice();
    let popped = {stack:null,block:null};
    popped['stack'] = this.state.popped['stack'];
    popped['block'] = this.state.popped['block'];
    console.log('popped before change', popped);
    if (popped['block']) { //block was already popped.  Now I want to push block
      // if (sKey) {
      //   console.log('you clicked on me: '+ sKey);
      // }
      // else {
      //   console.log('you clicked on nothing');
      // }
      popped['stack'] = null;
      popped['block'] = null;

      // No block was popped.  Therefore, we are clicking stack to pop a
      // block off.  Let's make sure stack has blocks to pop off.
    } else if (stacks[sKey].length > 0) { // Ok, no block was popped
      console.log('stacks length', stacks[sKey].length);
      popped = this.popOffBlock(stacks, sKey, popped);
      console.log('popped after', popped);
      // No popped block.  User click empty stack.  Tell User
      // he is a complete dolt.
    } else {
      console.log('Please select a stack with blocks.');
    }
    this.setState({stacks: stacks, popped: popped,});
  }

  checkForWin() {
    console.log('in checkForWin');
  }

  render() {
    // let block;
    return (
      <div>
        <div data-stack="1" onClick={()=>this.handleClick(1)}>
          <div data-block="100"></div>
          <div data-block="75" ></div>
          <div data-block="50" ></div>
          <div data-block="25" ></div>
        </div>
        <div data-stack="2" onClick={()=>this.handleClick(2)}>
        </div>
        <div data-stack="3" onClick={()=>this.handleClick(3)}>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<TowersOfHanoi />, document.getElementById('towers-of-hanoi'));
