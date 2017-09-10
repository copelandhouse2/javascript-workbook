import React, { Component } from 'react';
import './App.css';
import { Panel, Button, FormControl } from 'react-bootstrap';
// import { InputGroup, FormGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';


class TimeLine extends Component {
    renderList(){
        if(this.props.list && this.props.list.length > 0){
            return this.props.list.map((card, index) =>{
                return(
                    <Panel
                      header={card.text}
                      bsStyle="primary"
                      key={index}
                    >
                    {this.props.editCard === card.id? (
                      <div>
                        <FormControl
                          type="text"
                          value={this.props.editValue}
                          placeholder={card.text}
                          onChange={(e)=>this.props.handleChange2(e)}
                        />
                        <Button
                          bsStyle="primary"
                          onClick={() => this.props.saveEdit(card.id)}
                        >
                          Submit
                        </Button>
                      </div>
                    ) : (
                      <div id="button-panel">
                        <Button
                          bsStyle="warning"
                          onClick={() => this.props.initEdit(card.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          bsStyle="danger"
                          onClick={() => this.props.deleteStatus(card.id)}
                        >
                         Delete
                        </Button>
                      </div>
                    )}
                    </Panel>
                )
            });
        }
    }
    render() {
        return (
            <div className="">
                {this.renderList()}
            </div>
        );
    }
}

export default TimeLine;

// <div key={index}>
//     <h2>{card.text}</h2>
//     <p onClick={() => this.props.deleteStatus(card.id)}>X</p>
// </div>
