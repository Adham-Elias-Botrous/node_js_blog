import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    axios.defaults.headers.common = { authorization: '' };
    this.props.history.push('/');
  };
  render() {
    if (localStorage.getItem('token')) {
      return (
        <div className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/post/create">Create Post</Link>
            </li>
            <li>
              <Link to="#logout" onClick={this.logout}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default withRouter(Header);
