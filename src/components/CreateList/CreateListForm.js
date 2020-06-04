import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CurrentList from '../Home/CurrentList';

export default class CreateListForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    getCurrentListItems = () => {
        console.log(this.props.nameList);
    }
    
    
    createItemsComponent = () => {
        if(this.props.nameList.length !== 0){
            return (
                <CurrentList 
                    updateValues={this.getCurrentListItems} 
                    updateCheckedItem={this.updateCheckedItem}
                    updateCheckedItemToActive={this.updateCheckedItemToActive}
                    createItem={this.createCurrentListItem}
                    deleteItem={this.deleteCurrentItem}
                    inicialItems={this.state.data}
                />
            )
        }
        
    }

    render() {
        return (
            <div>
                <h4 className="componentTitle">{this.props.nameList.listName}</h4>
                <Container>
                    {this.createItemsComponent()}
                </Container>
            </div>
        )
    }
}
