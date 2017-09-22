import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './App.css';

class TrelloCard extends Component {

  render() {
    return (
      <Card
        style={{
          width: "90%",
          margin: "0 0 10px 5%"
        }}
      >
        <CardTitle
          title={this.props.card['name']}
          subtitle={this.props.card['due']} />
        <CardText>
          {this.props.card['desc']}
        </CardText>
      </Card>
    );
  }
}  // TrelloCard component

export default TrelloCard;
// <CardHeader
//   title="URL Avatar"
//   subtitle="Subtitle"
//   avatar="./trello.jpg"
// />
// <CardMedia
//   overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
// >
//   <img src="./trello.jpg" alt="" />
// </CardMedia>
// <CardActions>
//   <FlatButton label="Action1" />
//   <FlatButton label="Action2" />
// </CardActions>
