import React, { Component } from 'react';
import Navbar from '../Navbar/';
import CreateListForm from './CreateListForm';
import ModalListName from './ModalListName';
export default class CreateList extends Component {
    constructor(props) {
        super(props);
        this.state={
            listName: ""
        }
    }

    setListName = (name) => {
        this.setState({
            listName: name
        });
    }


    render() {
        return (
            <div>
                <Navbar />
                <ModalListName handleListName={this.setListName}/>                
                <CreateListForm nameList={this.state.listName}/>
            </div>
        )
    }
}
