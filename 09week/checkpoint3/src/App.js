import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TrelloList from './TrelloList'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './App.css';

class App extends Component {

  state = {
    activeCardID: null,
    list: []
  };

  myList = '582249cada43a45469e9eec2';


  addNewCard = () => {

    const creationSuccess = (data) => {
      console.log('Card created successfully.');
      console.log('THE DATA', data);
      this.setState({activeCardID:data['id']})

      // console.log(JSON.stringify(data, null, 2));
    };

    const newCard = {
      name: 'New Test Card 5',
      desc: 'This is the description of our new card.',
      // Place this card at the top of our list
      idList: this.myList,
      pos: 'top'
    };

    window.Trello.post('/cards/', newCard, creationSuccess);
  };

  updateCard = () => {
    if (this.state.activeCardID) {
      window.Trello.put(`/cards/${this.state.activeCardID}`, {name: `Craig Card ${this.state.activeCardID}`});
    } else {

    }
  };

  getList = () => {
    const listPullSuccess = (data) => {
      console.log('in listPullSuccess', data);
      this.setState({list: data});
    }

    window.Trello.get(`/lists/${this.myList}/cards`, listPullSuccess)
  }

  roundButtonStyle = {
    marginRight: 20
  };

  render() {
    return (
      <MuiThemeProvider
        muiTheme={getMuiTheme(darkBaseTheme)} >
        <div>
          <h1>My Trello Interface</h1>
          <FloatingActionButton
            style={this.roundButtonStyle}
            onClick = {this.addNewCard}
          >
            <ContentAdd />
          </FloatingActionButton>
          <RaisedButton
            label="Update Card"
            secondary={true}
            onClick = {this.updateCard}
          />
          <RaisedButton
            label="Pull List"
            primary={true}
            onClick = {this.getList}
          />

          <TrelloList
            cardList = {this.state['list']}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
// <AppBar title="My AppBar" />
// <RaisedButton
//   label="Create New Card"
//   primary={true}
//   onClick = {this.addNewCard}
// />
