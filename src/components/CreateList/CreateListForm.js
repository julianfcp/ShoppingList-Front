import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CurrentList from '../Home/CurrentList';

export default class CreateListForm extends Component {
    
    createItemsComponent = () => {
        if(this.props.nameList.length !== 0)
        return <CurrentList inicialItems={[]}/>
    }

    render() {
        return (
            <div>
                <h4 className="componentTitle">{this.props.nameList}</h4>
                <Container>
                    {this.createItemsComponent()}
                </Container>
            </div>
        )
    }
}
