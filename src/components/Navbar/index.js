import React, { Component } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }


    handleLogout = async () => {
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:4000/api/user/logout',
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache': 'no-cache'
                  }
                
            });
            if(res.data.success) {
                console.log('User logged out '+res.data);
                Cookie.remove('access_token');
                window.location.replace("http://localhost:3000/login");
            }
            
        } catch (error) {
            console.log('No user found');
            alert(error);
        }
        
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm p-3 mb-3">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <div className="appTitle">
                                <small>Hello {this.props.userName} !</small>
                            </div>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li><Link id="" className="nav-link" to="/">Home</Link></li>
                                <li><Link id="" className="nav-link" to="/CreateList">Create List</Link></li>
                                <li><Link id="" className="nav-link" to="/GroceryList">Grocery List</Link></li>
                                <li><Link id="" className="nav-link" to="/" onClick={this.handleLogout}><b>Logout</b></Link></li>
                            </ul>
                        </div>
                    </div>
                </nav> 
            </div>
        )
    }
}
