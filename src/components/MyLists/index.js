import React, { Component } from 'react';
import Navbar from '../Navbar';
import Lists from './Lists';

export default class index extends Component {
    
    render() {
        return (
            <div>
                <Navbar />
                <Lists />
            </div>
        )
    }
}
