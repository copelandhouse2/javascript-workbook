'use strict';



class TicTacToe extends React.Component {


  constructor(props) {
    super(props);
      this.state = {
          turn: 'X',
      };
      this.initialState = {
          turn: 'X',
      };
    }

  checkForWin(myObj) {
  // wins array stores all the win combinations.  wincombo array is one of the wins.
  // wins.some ... at least one of these win combos needs to be true.
  // aWin.every ... for a win, all the squares in the particular win must equal the players token (X or O)
    const wins = [
      [0,1,2], [3,4,5], [6,7,8],  // horizontal wins
      [0,3,6], [1,4,7], [2,5,8],  // vertical wins
      [0,4,8], [2,4,6]            // diagonal wins
    ];

    return wins.some(aWin => aWin.every(index => myObj[`cell${index}`] === myObj['turn']));
  }  // checkForWin()

  // handleClick.  Method is called when a square is clicked.  Based on onClick
  // event in each div data-cell below.
  // The TTT logic is in here.  a) Making sure it is valid move b) validating win c) messaging.
  handleClick(cell) {
    const state = { ...this.state };
    if (!state[cell]) {
      state[cell] = this.state.turn;
      // console.log('value of checkForWin', this.checkForWin(state));
      if (this.checkForWin(state)) {  //checkForWin returns TRUE if someone won.  It returns FALSE if no win yet.
        this.message = `Congratulations ${this.state.turn}.  You won!  Start a new game by refreshing`;
        // If there have been 9 turns but no winner.  It is a tie.
        // Splicing to get rid of turn key value pair.  That will give me the
        // correct number of cells populated so far.
      } else if (Object.values(state).splice(1).length == 9) {
        this.message = `We have a tie folks.  Start a new game by refreshing`;
      } else {
        state['turn'] = this.state.turn === 'X'? 'O' : 'X';  // Switch between X and O
        this.message = '';
      }
    } else {
      this.message = 'Try again please.  That square is taken.';
    }
    this.setState(state)
  };

  resetBoard () {
    console.log('Button clicked', this.state, this.initialState);
    // const state = { ...this.state };
    // this.state = state;
    // const myState = this.initialState.turn;
    const keyArr = Object.keys(this.state);
    console.log(keyArr);
    keyArr.forEach(key => {
      if (key === 'turn') {
        console.log('in the if.true', key);
        this.state[key] = 'X';
      } else {
        console.log('in the if.false', key);
        delete this.state[key];
      }
      this.message = '';
    });

    // for (let i=0; i < keyArr.length; i++) {
    //   console.log('in the for', keyArr[i])
    //   if (keyArr[i] === 'turn') {
    //     this.state[keyArr[i]] = 'X';
    //   } else {
    //     delete this.state[keyArr[i]];
    //   }
    // }

    // keyArr.map((key) => {
    //
    // });
    this.setState(this.state)
    console.log(this.state);
    // this.render();
  }
  // render method displays the TTT board.
  render() {
    return (
      <div>
        <div className="row">
          <div data-cell="0" onClick={() => this.handleClick('cell0')}>{this.state.cell0}</div>
          <div data-cell="1" onClick={() => this.handleClick('cell1')}>{this.state.cell1}</div>
          <div data-cell="2" onClick={() => this.handleClick('cell2')}>{this.state.cell2}</div>
        </div>
        <div className="row">
          <div data-cell="3" onClick={() => this.handleClick('cell3')}>{this.state.cell3}</div>
          <div data-cell="4" onClick={() => this.handleClick('cell4')}>{this.state.cell4}</div>
          <div data-cell="5" onClick={() => this.handleClick('cell5')}>{this.state.cell5}</div>
        </div>
        <div className="row">
          <div data-cell="6" onClick={() => this.handleClick('cell6')}>{this.state.cell6}</div>
          <div data-cell="7" onClick={() => this.handleClick('cell7')}>{this.state.cell7}</div>
          <div data-cell="8" onClick={() => this.handleClick('cell8')}>{this.state.cell8}</div>
        </div>
          <div id='announce-winner'>{this.message}</div>
          <button type="button" onClick={() => this.resetBoard()}>Reset to Play Again</button>

      </div>
    );
  }

}

ReactDOM.render(<TicTacToe />, document.getElementById('tic-tac-toe'));
