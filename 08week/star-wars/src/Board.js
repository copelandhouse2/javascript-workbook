import React, { Component } from 'react';
import Category from './Category';

class Board extends Component {

  render() {
    // Planets, Spaceships, Vehicles, People, Films, Species
    /***** CODE HERE ****/
    return (
      <div id="board" onKeyPress={this.props.handleKey}>
        <input type="text"></input>
        <Category id="planets"/>
        <Category id="spaceships"/>
        <Category id="vehicles"/>
        <Category id="people"/>
        <Category id="films"/>
        <Category id="species"/>
      </div>
    );
  }  // return

}  // class Board

export default Board;
