'use strict';

class TicTacToe extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
          turn: 'X',
      };
      // this.message = '';
  }

  checkForWin = (myObj) => {
  // wins array stores all the win combinations.  wincombo array is one of the wins.
  // wins.some ... at least one of these win combos needs to be true.
  // wincombo.every ... for a win, all the squares in the particular wincombo must equal the players token (X or O)
  const wins = [
    ['cell0','cell1','cell2']
    // , ['cell3','cell4','cell5'], ['cell6','cell7','cell8'],  // horizontal wins
    // ['cell0','cell3','cell6'], ['cell1','cell4','cell7'], ['cell2','cell5','cell8'],  // vertical wins
    // ['cell0','cell4','cell8'], ['cell2','cell4','cell6']            // diagonal wins
  ];

  const stateKeys = Object.keys(myObj).splice(1);
  console.log(stateKeys, myObj);
  // if (wins[0].every(mykey => {
  //       // console.log('In every');
  //       // console.log('here', key, myObj[key], myObj['cell1'], myObj['cell2']);
  //       // console.log(wins[0]);
  //       this.state[mykey] === 'X'; //myObj['turn'];
  //     })
  //   ) { return true; }
  //   else {
  //     return false;
  //   }
  //   }
  // );
  return wins.some(winCombo => {winCombo.every((key) => {
        console.log('In every');
        console.log(winCombo);
        console.log('here', key, myObj[key], myObj['turn']);
        myObj[key] === myObj['turn'];
      })
    }
  );

  // return false;
}

  handleClick=(cell)=>{
      const state = {...this.state};
      if (!state[cell]) {
        state[cell] = this.state.turn;
        // console.log(state);
        // console.log(Object.values(state).splice(1).length);
        console.log(this.checkForWin(state));
        if (this.checkForWin(state)) {  //checkForWin returns TRUE if someone won.  It returns FALSE if no win yet.
          this.message = `Congratulations ${this.state.turn}.  You won!  Start a new game by refreshing`;
        } else if (Object.values(state).splice(1).length == 9) {  // If there have been 9 turns but no winner.  It is a tie.
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
      </div>
    );
  }
  // checkForWin(myObj) {
  // // wins array stores all the win combinations.  wincombo array is one of the wins.
  // // wins.some ... at least one of these win combos needs to be true.
  // // wincombo.every ... for a win, all the squares in the particular wincombo must equal the players token (X or O)
  // const stateKeys = Object.keys(state).splice(0,1);
  // return wins.some(winCombo => winCombo.every(key => stateKeys[key] === state['turn']));
  // }

}

ReactDOM.render(<TicTacToe />, document.getElementById('tic-tac-toe'));
