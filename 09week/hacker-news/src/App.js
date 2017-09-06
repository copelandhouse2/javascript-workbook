/*************** WHITE BOARD NOTES ********************
// This app.js will be the driver program.  It will  call
// List.
*******************************************************/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import List from './List';

class App extends Component {

  state = {
    stories: [],
    color : ''
  };

  componentDidMount(){
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then((res) => {
      res.json().then((storyIds) => {
        storyIds.slice(0, 10).forEach((storyId) => {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`).then((res) => {
            res.json().then((story) => {
              console.log('in story', story);
              this.setState({ stories: [...this.state.stories, story] })
            });
          });
        });
      });
    });
  }

  handleClick = () => {
    console.log('in handleClick');
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    const ID = Math.floor(Math.random() * colors.length);
    this.setState({ color: colors[ID] });

  }

  render() {
    return (
      <List
        stories = {this.state.stories}
        handleClick = {this.handleClick}
        color = {this.state['color']}
      />
    );
  }
}

export default App;
// {this.state.stories.title}
