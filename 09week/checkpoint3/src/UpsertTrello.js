import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import Up from 'material-ui/svg-icons/content/arrow_upward';
// import Down from 'material-ui/svg-icons/content/arrow_downward';
import TextField from 'material-ui/TextField';



import './App.css';

class UpsertTrello extends Component {

  render() {
    return (
      <div id = "control">
        <RaisedButton
          label="Add / Update Card"
          primary={true}
          onClick = {this.props.upsertCard}
        />

        <h2>ID</h2>
        <TextField
        hintText="Enter the card description"
        floatingLabelText="Card Name"
        /><br />
        <TextField
        hintText="Enter the card description"
        floatingLabelText="Card Desc"
        /><br />

        <FloatingActionButton
          primary={true}
          onClick = {this.props.upsertCard}
        >
          <i className="material-icons">arrow_upward</i>
        </FloatingActionButton>

        <FloatingActionButton
          primary={true}
          onClick = {this.props.upsertCard}
        >
          <i className="material-icons">arrow_downward</i>
        </FloatingActionButton>

      </div>
    );
  }  // render function
}  // TrelloList class

export default UpsertTrello;
// <IconButton
//   iconClassName="material-icons"
//   primary={true}
//   onClick = {this.props.up}
//   style={{outline: "5px green solid"}}
// >
// arrow_upward
// </IconButton>
