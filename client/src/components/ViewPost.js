import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      error: '',
      comment: '',
      commentError: ''
    };
  }

  deletePost = () => {
    let token = localStorage.getItem('token');
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .delete('/api/posts/' + this.state.post._id)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          error: err.response.data.message
        });
      });
  };
  onChangeComment = e => {
    this.setState({
      comment: e.target.value,
      commentError: ''
    });
  };
  onSubmitComment = e => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    let data = { content: this.state.comment };
    axios
      .post('/api/comments/' + this.props.match.params.id, data)
      .then(res => {
        let post = this.state.post;
        post.comments.push({
          _id: res.data._id,
          content: res.data.content,
          author: { _id: localStorage.getItem('_id') }
        });
        this.setState({
          post: post,
          commentError: '',
          comment: ''
        });
      })
      .catch(err => {
        this.setState({
          commentError: <blockquote>{err.response.data.message}</blockquote>
        });
      });
  };

  componentDidMount() {
    let postId = this.props.match.params.id;
    axios
      .get('/api/posts/' + postId)
      .then(res => {
        this.setState({ post: res.data, error: '' });
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  }

  renderActions = () => {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('_id') === this.state.post.author._id
    ) {
      return (
        <span>
          <Link to={'/post/edit/' + this.state.post._id}>
            <button>Edit</button>
          </Link>
          <button onClick={this.deletePost}>Delete</button>
        </span>
      );
    }
  };
  renderComments = () => {
    let comments = <p>There is NOT any comment yet.</p>;
    if (this.state.post.comments.length) {
      comments = this.state.post.comments.map(comment => {
        return (
          <p key={comment._id} className="border_white">
            <strong className="title">
              {comment.author._id === localStorage.getItem('_id')
                ? 'Me'
                : comment.author.name}
            </strong>
            <br />
            {comment.content}
          </p>
        );
      });
    }
    return comments;
  };

  renderCommentForm = () => {
    if (!localStorage.getItem('token')) {
      return <p>To write a comment, you have to log in.</p>;
    }
    return (
      <div className="bg_wight">
        <h4>Add Comment</h4>
        {this.state.commentError}
        <form onSubmit={this.onSubmitComment}>
          <textarea
            value={this.state.comment}
            onChange={this.onChangeComment}></textarea>
          <input className="button-primary" type="submit" value="Send" />
        </form>
      </div>
    );
  };

  render() {
    if (this.state.error) {
      return <blockquote>{this.state.error}</blockquote>;
    }
    if (!this.state.post.title) {
      return (
        <h4>
          Please wait...
          <br /> Loding...
        </h4>
      );
    }
    return (
      <div className="column ">
        <div className="post_bg">
          <h4>{this.state.post.title}</h4>
          <h6 className="title">
            {this.state.post.author._id === localStorage.getItem('_id')
              ? this.state.post.author.name + ' (Me)'
              : this.state.post.author.name}
          </h6>
          <p>{this.state.post.content}</p>
          {this.renderActions()}
        </div>
        <hr />
        <h4>Comments</h4>
        {this.renderComments()}
        {this.renderCommentForm()}
      </div>
    );
  }
}
