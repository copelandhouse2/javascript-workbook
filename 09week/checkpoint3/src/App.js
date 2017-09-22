import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TrelloList from './TrelloList';
import UpsertTrello from './UpsertTrello';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      activeCardID: null,
      list: []
    };

    this.myList = '582249cada43a45469e9eec2';

  }  // END constructor

  componentWillMount() {
    this.getList();
  }

  upsertCard = () => {

    const creationSuccess = (data) => {
      console.log('Card created successfully.');
      console.log('THE DATA', data);
      // this.getList;
      this.setState({activeCardID:data['id']})

      // console.log(JSON.stringify(data, null, 2));
    };

    const newCard = {
      name: 'Jordan is really Brandon',
      desc: 'This is the description of our new card.',
      // Place this card at the top of our list
      idList: this.myList,
      pos: 'top'
    };

    if (this.state.activeCardID) {
      window.Trello.put(`/cards/${this.state.activeCardID}`, {name: `Craig Card ${this.state.activeCardID}`});
    } else {  // new Card
      window.Trello.post('/cards/', newCard, creationSuccess);
    }

  };

  upList = () => {
    if (this.state.activeCardID === 0) {
      this.setState({activeCardID:null});
    } else {
      this.setState({activeCardID:this.state.activeCardID--});
    }
  }

  downList = () => {
    if (this.state.activeCardID === null) {
      this.setState({activeCardID:0});
    } else if (this.state.activeCardID === this.state['list'].length-1) {
      null;  // do nothing.  Stay there
    } else {
      this.setState({activeCardID:this.state.activeCardID++});
    }
  }

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
        muiTheme={getMuiTheme(darkBaseTheme)}
      >
        <div id="canvas">
          <h1 id="title">My Trello Interface</h1>
          <div id="main-container">
            <TrelloList
              cardList = {this.state['list']}
            />
            <UpsertTrello
              cardID = {this.state['activeCardID']}
              cardList = {this.state['list']}
              upsertCard = {this.upsertCard}
              up = {this.upList}
              down = {this.downList}
            />
          </div>
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

// <FloatingActionButton
//   style={this.roundButtonStyle}
//   onClick = {this.addNewCard}
// >
//   <ContentAdd />
// </FloatingActionButton>
