import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/';
import CurrentList from './CurrentList';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : []
        }
    }
    /*
    const dataResp = res.data.map(item => (
        item.itemName
    ));*/
    componentDidMount () {
       this.getCurrentListItems();
    }

    getCurrentListItems = async () =>  {
        const res = await axios.get('http://localhost:4000/api/currentList');
        this.setState({ data: res.data });
        console.log(this.state.data);

    }

    render() {
        return (
            <div>
                <Navbar />
                <h4 className="componentTitle">Currently At Home</h4>
                <CurrentList inicialItems={this.state.data}/>
            </div>
        )
    }
}
