import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/User/login';
import Signup from './components/User/signup';
import Home from './components/GroceryList';
import CreateList from './components/CreateList/';
import Mylists from './components/MyLists/';
import ListView from './components/MyLists/ListView';
import './App.css';
//        <Route path="/" exact component={Home} />

function App() {
  return (
    <Router>
      <div className="container p-4">
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/" exact component={Mylists}/>
        <PrivateRoute path="/MyLists/:listId" exact component={ListView} />
        <PrivateRoute path="/CreateList" exact component={CreateList} />
        <PrivateRoute path="/GroceryList" exact component={Home} />
        
      </Switch>
      </div>
    </Router>


  );
}

export default App;
