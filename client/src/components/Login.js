import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('token')) {
      this.props.history.push('/');
    }
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }
  onChangeHandler = event => {
    this.setState({ [event.target.id]: event.target.value, error: '' });
  };
  onSubmitHandler = event => {
    event.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post('/api/auth', data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('_id', res.data.id);
        axios.defaults.headers.common = {
          Authorization: `Bearer ${res.data.token}`
        };

        this.props.history.push('/');
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
    return (
      <div className="column column-50 column-offset-25">
        <h4>Log in</h4>
        <hr />
        {this.renderError()}
        <form onSubmit={this.onSubmitHandler}>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
            required
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            required
          />
          <input className="button-primary" type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}
