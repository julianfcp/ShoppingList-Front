import React, { Component } from 'react';
import Navbar from '../../Navbar';
import CurrentList from '../../Home/CurrentList';

export default class index extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h4 className="componentTitle">{this.props.match.params.listId}</h4>  
                <CurrentList />
            </div>
        )
    }
}
