import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/';
import CreateList from './components/CreateList/';
import Mylists from './components/MyLists/';
import ListView from './components/MyLists/ListView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container p-4">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/CreateList" exact component={CreateList} />
        <Route path="/MyLists" exact component={Mylists} />
        <Route path="/MyLists/:listId" exact component={ListView} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
