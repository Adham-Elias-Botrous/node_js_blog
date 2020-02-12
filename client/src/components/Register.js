import React, { Component } from 'react';

import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('token')) {
      this.props.history.push('/');
    }
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      registered: false
    };
  }

  onChangeHandler = event => {
    this.setState({ [event.target.id]: event.target.value, error: '' });
  };
  onSubmitHandler = event => {
    event.preventDefault();
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post('/api/register', data)
      .then(res => {
        this.setState({ registered: true });
        axios.defaults.headers.common = {
          Authorization: `Bearer ${res.data.token}`
        };
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  };
  renderError = () => {
    return this.state.error ? (
      <blockquote>{this.state.error}</blockquote>
    ) : null;
  };
  render() {
    if (this.state.registered) {
      return (
        <div className="column">
          <p>
            Welcome <strong>{this.state.name}</strong>:
            <br />
            You are registered successfully.
            <br />
            You can log in using your email
            <strong> {this.state.email}</strong> and the password.
            <br /> Go to:
            <Link to="/login">
              <strong className="title"> Log In</strong>
            </Link>
          </p>
        </div>
      );
    }
    return (
      <div className="column column-50 column-offset-25">
        {this.setState.registered === true ? <h1>registered</h1> : null}
        <h4>Create new account</h4>
        <hr />
        {this.renderError()}
        <form onSubmit={this.onSubmitHandler}>
          <label>Name</label>
          <input
            type="text"
            id="name"
            value={this.state.name}
            onChange={this.onChangeHandler}
          />
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
          />
          <input className="button-primary" type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
