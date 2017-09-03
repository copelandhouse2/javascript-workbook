import React, { Component } from 'react';

class Control extends Component {

  render() {
    /***** CODE HERE ****/
    return (
      <div id="control">
        <h1>Star Wars Jeopardy</h1>
        <button type="button" onClick={this.props.startClick}>Start Game</button>
        // <Butgit aton waves='light'>EDIT ME<Icon left>save</Icon></Button>
      </div>
    );
  }  // return

}  // class Control

export default Control;
