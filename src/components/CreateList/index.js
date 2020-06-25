import React, { Component } from 'react';
import Navbar from '../Navbar/';
import CreateListForm from './CreateListForm';
import ModalListName from './ModalListName';
import axios from 'axios';


export default class CreateList extends Component {
    constructor(props) {
        super(props);
        this.state={
            listName: {
                "listName": "",
                "listStatus": ""
            }
        }
    }

    setListName = async (name) => {
        const newList = {
            "listName": name,
            "userId": this.props.userId,
            "listStatus": 'Active'
        }
        var listId;
        await axios.post('http://localhost:4000/api/lists', newList)
                .then(function(res){ 
                    listId = res.data.listInfo._id;
                    console.log(res.data.listInfo._id+" Saved")
                })
                .catch(function(error){
                    console.log(error)
                });
        this.setState({
            listName: {
                "listName": name,
                "listStatus": "",
                "listId": listId
            }
        });
        // executes child method
        this.refs.CreateListForm.getListItems();
        
    }


    render() {
        return (
            <div>
                <Navbar userId={this.props.userId} userName={this.props.userName}/>
                <ModalListName handleListName={this.setListName}/>                
                <CreateListForm nameList={this.state.listName} ref="CreateListForm"/>
            </div>
        )
    }
}
