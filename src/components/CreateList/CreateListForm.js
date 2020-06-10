import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import CurrentList from '../Home/CurrentList';

export default class CreateListForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    /*************************************************************************************** */
    /*                  These are the Methods of Current List Child                          */
    /*************************************************************************************** */

    getListItems = async () =>  {
        //const res = await axios.get('https://xvdhu.sse.codesandbox.io/api/currentList');
        console.log(this.props.nameList.listId)
        await axios.get('http://localhost:4000/api/listItems', {
            params: {
                listId: this.props.nameList.listId
            }
          }).then(async res => {
                console.log(res.data.items);
                await this.setState({
                    data: res.data.items
                })
            }
          );

        
        
    }
    createListItem = async (item) => {
        const newitem = {
            itemName: item.itemName,
            itemStatus: item.itemStatus,
            listId: this.props.nameList.listId
        }
        await axios.post('http://localhost:4000/api/listItems', newitem)
                    .then(function(res){ 
                        console.log(res)
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }

    deleteListItem = async (id) => {
        console.log(id);
        await axios.delete('http://localhost:4000/api/listItems/'+id)
                    .then(function(res){
                        console.log(res);
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }

    updateCheckedItem = async (itemId, itemName) => {
        const itemToUpdate = {
            "itemName": itemName,
            "itemStatus": "Checked"
        };
        console.log(itemId);

        await axios.put('http://localhost:4000/api/listItems/'+itemId, itemToUpdate)
                    .then(function(res){ 
                        console.log(res)
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }

    updateCheckedItemToActive = async (itemId, itemName) => {
        const itemToUpdate = {
            "itemName": itemName,
            "itemStatus": "Active"
        };
        await axios.put('http://localhost:4000/api/listItems/'+itemId, itemToUpdate)
                    .then(function(res){ 
                        console.log(res)
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }
    
    
   /* createItemsComponent = () => {
        console.log(this.props.nameList.length);
        if(this.props.nameList.length){
            return (
                <CurrentList 
                    updateValues={this.getListItems} 
                    updateCheckedItem={this.updateCheckedItem}
                    updateCheckedItemToActive={this.updateCheckedItemToActive}
                    createItem={this.createListItem}
                    deleteItem={this.deleteListItem}
                    inicialItems={this.state.data}
                />
            )
        }
        
    }*/

    render() {
        return (
            <div>
                <h4 className="componentTitle">{this.props.nameList.listName}</h4>
                <Container>
                    <CurrentList 
                    updateValues={this.getListItems} 
                    updateCheckedItem={this.updateCheckedItem}
                    updateCheckedItemToActive={this.updateCheckedItemToActive}
                    createItem={this.createListItem}
                    deleteItem={this.deleteListItem}
                    inicialItems={this.state.data}
                    />
                </Container>
            </div>
        )
    }
}
