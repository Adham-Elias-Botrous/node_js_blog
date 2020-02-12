import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import { PageNotFound } from './components/PageNotFound';

export default class App extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem('token');
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header></Header>
            <div className="container">
              <div>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/post/create" component={CreatePost} />
                  <Route exact path="/post/view/:id" component={ViewPost} />
                  <Route exact path="/post/edit/:id" component={EditPost} />
                  <Route path="*" component={PageNotFound} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
