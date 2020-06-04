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
            "listStatus": 'Active'
        }
        await axios.post('http://localhost:4000/api/lists', newList)
                .then(function(res){ 
                    console.log(res.data.listInfo)
                })
                .catch(function(error){
                    console.log(error)
                });
        this.setState({
            listName:newList
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
