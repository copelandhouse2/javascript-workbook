import React, { Component } from 'react';
import './App.css';

class TimeLine extends Component {
// Two components, one parent that takes a user's status, and a child that
// displays all the statuses.
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderList() {
    return this.props.list.map((card, index)=> {
      return <h3 key={index}>{card.text}</h3>
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="">
        <h1>Timeline</h1>
        {this.renderList()}
      </div>
    );
  }
}

export default TimeLine;
