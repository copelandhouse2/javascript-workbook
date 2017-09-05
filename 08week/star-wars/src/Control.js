import React, { Component } from 'react';
import { Button, CardPanel } from 'react-materialize'

class Control extends Component {

  render() {
    return (
      this.props.startGame? (
        <div id="control">
          <h1>Star Wars Jeopardy</h1>
          <Button
            className='blue accent-4 tooltipped'
            data-tooltip='May the force be with you!'
            waves='yellow'
            onClick={this.props.resetClick}
          >Restart Game</Button>
        </div>
      ) : (
        <div id="control">
          <h1>Star Wars Jeopardy</h1>
          <Button
            className='blue accent-4 tooltipped'
            data-tooltip='May the force be with you!'
            waves='yellow'
            onClick={this.props.startClick}
          >Start Game</Button>
          <div id="playersFrame">
            <div className={this.props.classQ}>
              <h2>{this.props.playerInfo['Q']['name']}</h2>
              <h3>{this.props.playerInfo['Q']['score']}</h3>
              <h4>Attempted: {this.props.playerInfo['Q']['attempted']} Correct: {this.props.playerInfo['Q']['correct']}</h4>
            </div>
            <CardPanel className="teal lighten-4 black-text score-card">
              <h2>{this.props.playerInfo['Q']['name']}</h2>
              <p>{this.props.playerInfo['Q']['score']}</p>
              <p>Attempted: {this.props.playerInfo['Q']['attempted']} Correct: {this.props.playerInfo['Q']['correct']}</p>
            </CardPanel>
          </div>
          <div id="inputFrame">
            // keystroke reader
            // input box
            // submit button
          </div>
        </div>
      )
    );
  }  // return

}  // class Control

export default Control;
// <button type="button" onClick={this.props.startClick}>Start Game</button>

// className='blue accent-4 tooltipped disabled'
