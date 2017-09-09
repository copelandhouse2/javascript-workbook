/*************** WHITE BOARD NOTES ********************
// This will be an articles List.  it will call class Entry
// for each entry.  It will also format the List.
*******************************************************/
import React, { Component } from 'react';
import Entry from './Entry';

class List extends Component {
  render() {
    return (
      <div>
      <button
        type="button"
        onClick = {this.props.handleClick}
      >
        Change Colors!
      </button>
      {
        this.props.stories.map((story, idx) =>
          <Entry
            story = {story}
            key = {idx}
            color = {this.props.color}
          />
        )
      }
      </div>
    );
  }
}

export default List;
