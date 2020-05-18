import React, { Component } from 'react';
import Navbar from '../Navbar/';
import CurrentList from './CurrentList';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h4 className="componentTitle">Currently At Home</h4>
                <h1>Excelente!</h1>
                <CurrentList />
            </div>
        )
    }
}
