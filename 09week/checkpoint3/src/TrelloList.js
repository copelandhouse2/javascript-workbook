import React, { Component } from 'react';
import TrelloCard from './TrelloCard.js'
import './App.css';

class TrelloList extends Component {

  render() {
    return (
      <div id="list">
        {
          this.props.cardList.map((aCard, idx) =>
            <TrelloCard
              card = {aCard}
              key = {idx}
            />
          )
        }
      </div>
    );
  }  // render function
}  // TrelloList class

export default TrelloList;
// <h2>My Trello List</h2>
// this.props.list.length > 0? (
//   return (
//     {
//       this.props.list.map((card, idx) =>
//         <TrelloCard
//           card = {card}
//           key = {idx}
//         />
//       )
//     }
//   );
// ) : (
//   return (
//     <h3>Press the pull list button</h3>
//   )
// )
// }  // render function
