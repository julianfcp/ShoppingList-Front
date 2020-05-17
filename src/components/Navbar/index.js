import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <div className="appTitle">
                                <h2>Shopping List</h2>
                            </div>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li><Link id="" className="nav-link" to="/">Home</Link></li>
                                <li><Link id="" className="nav-link" to="/CreateList">Create List</Link></li>
                                <li><Link id="" className="nav-link" to="/MyLists">My lists</Link></li>
                                <li><Link id="" className="nav-link" to="/"><b>Logout</b></Link></li>
                            </ul>
                        </div>
                    </div>
                </nav> 
            </div>
        )
    }
}
