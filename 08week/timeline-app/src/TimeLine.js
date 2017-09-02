import React, { Component } from 'react';
import './App.css';
import { Button, InputGroup, InputGroup.Addon, InputGroup.Button } from 'react-bootstrap';


class TimeLine extends Component {
    renderList(){
        if(this.props.list && this.props.list.length > 0){
            return this.props.list.map((card, index) =>{
                return(
                    // <div key={index}>
                    //     <h2>{card.text}</h2>
                    //     <p onClick={() => this.props.deleteStatus(card.id)}>X</p>
                    // </div>
                    <FormGroup>
                      <InputGroup>
                        <FormControl type="text" disabled value={card.text}/>
                        <DropdownButton
                          componentClass={InputGroup.Button}
                          id="input-dropdown-addon"
                          title="Action"
                        >
                          <MenuItem key="1">Edit</MenuItem>
                          <MenuItem key="2" onClick={() => this.props.deleteStatus(card.id)}>Delete</MenuItem>
                        </DropdownButton>
                      </InputGroup>
                    </FormGroup>

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
