/*************** WHITE BOARD NOTES ********************
// This will be an article entry.  it will control the
// formatting of the entry.
*******************************************************/
import React, { Component } from 'react';
import './App.css';
// import './style.css';


class Entry extends Component {
  render() {
    return (
      <h3>
        <a href={this.props.story['url']} target="_blank" className={this.props.color}
>
          {this.props.story['title']}
        </a>
      </h3>
    );
  }
}

export default Entry;
// onClick = {this.props.handleClick}
// className={this.props.color}
