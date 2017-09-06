/*************** WHITE BOARD NOTES ********************
// This will be an article entry.  it will control the
// formatting of the entry.
*******************************************************/
import React, { Component } from 'react';
import './App.css';


class Entry extends Component {
  render() {
    return (
      <h3 class={this.props.color}>test
        {this.props.story['title']}&nbsp;
        <a href={this.props.story['url']} target="_blank" class={this.props.color}>
          Click here!
        </a>
      </h3>
    );
  }
}

export default Entry;
// onClick = {this.props.handleClick}
