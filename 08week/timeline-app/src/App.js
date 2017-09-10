import React, { Component } from 'react';
import './App.css';
import TimeLine from './TimeLine';
import Button from 'react-bootstrap/lib/Button';

class App extends Component {
    /** Two Components, one parent that takes a user's status
     * and a child that displays all the statuses */
  constructor(props){
    super(props);
    this.state = {
        inputValue: '',
        timeLine: [],
        editCard: null,
        editValue: '',
    }
  }
  handleChange(e){
      this.setState({inputValue: e.target.value});
  }
  handleClick=()=>{
      const card = {
          createdAt: new Date(),
          text:  this.state.inputValue,
          color: 'blue',
          id: this.state.timeLine.length + 1
      };
      this.setState({timeLine: [...this.state.timeLine, card], inputValue: ''})
  };

  deleteStatus=(id)=>{
      // console.log(id ,this.state.timeLine);
      const deleteCardList = this.state.timeLine.filter((card, index) =>{
          return card.id !== id;
      });
      this.setState({timeLine: deleteCardList});
  };

  // These methods handle the editing task
  initEdit=(id)=>{  // To activate edit mode
    // console.log('In initEdit', id);
    this.setState({editCard: id,});
  };

  handleChange2=(e)=>{
    // console.log('In handleChange2', e.target.value);
    this.setState({editValue: e.target.value});
  };

  saveEdit=(id)=>{
    // console.log('In saveEdit', id);
    const timeLine=[...this.state.timeLine];
    timeLine[id-1]['text'] = this.state.editValue;
    this.setState({
      timeLine: timeLine,
      editCard: null,
      editValue: ''
    });
  };

  render() {
    // let Button = ReactBootstrap;
    return (
      <div className="App">
        <input
            onChange={(e) => this.handleChange(e)}
            value={this.state.inputValue}
            type="text"
        />
        <Button
          id="button-timeline"
          bsStyle="primary"
          bsSize="large"
          onClick={this.handleClick}>Submit</Button>
        <TimeLine
          deleteStatus={this.deleteStatus}
          list={this.state.timeLine}
          initEdit={this.initEdit}
          editCard={this.state.editCard}
          handleChange2={this.handleChange2}
          editValue={this.state.editValue}
          saveEdit={this.saveEdit}
        />
      </div>
    );
  }
}

export default App;
