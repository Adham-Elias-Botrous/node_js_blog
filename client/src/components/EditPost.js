import React, { Component } from 'react';
import axios from 'axios';

export default class EditPost extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    }
    this.state = {
      title: '',
      content: '',
      authorId: '',
      isLoading: true,
      error: ''
    };
  }
  onChangeHandler = event => {
    this.setState({ [event.target.id]: event.target.value, error: '' });
  };
  onSubmitHandler = event => {
    event.preventDefault();

    let token = localStorage.getItem('token');
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    let data = {
      title: this.state.title,
      content: this.state.content
    };

    axios
      .put('/api/posts/' + this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  };
  componentDidMount() {
    axios.get('/api/posts/' + this.props.match.params.id).then(res => {
      this.setState({
        title: res.data.title,
        content: res.data.content,
        authorId: res.data.author._id,
        isLoading: false
      });
    });
  }
  renderError = () => {
    return this.state.error ? (
      <blockquote>{this.state.error}</blockquote>
    ) : null;
  };
  render() {
    if (this.state.isLoading) {
      return (
        <h4>
          Please wait...
          <br /> Loding...
        </h4>
      );
    }

    return (
      <div className="column column-50 column-offset-25">
        <h4>Edit Post</h4>
        <hr />
        {this.renderError()}
        <form onSubmit={this.onSubmitHandler}>
          <label>Title</label>
          <input
            type="text"
            id="title"
            value={this.state.title}
            onChange={this.onChangeHandler}
          />
          <label>Content</label>
          <textarea
            type="text"
            id="content"
            value={this.state.content}
            onChange={this.onChangeHandler}
          />
          <input className="button-primary" type="submit" value="Edit Post" />
        </form>
      </div>
    );
  }
}
