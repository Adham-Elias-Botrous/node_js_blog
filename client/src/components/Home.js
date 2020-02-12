import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      error: '',
      isLoading: true
    };
  }
  fetchPosts = () => {
    axios
      .get('/api/posts')
      .then(res => {
        this.setState({ posts: res.data, error: '', isLoading: false });
      })
      .catch(err => {
        this.setState({ error: err.response.data, isLoading: false });
      });
  };
  componentDidMount() {
    this.fetchPosts();
  }
  render() {
    if (this.state.isLoading) {
      return (
        <h4>
          Please wait...
          <br /> Loding...
        </h4>
      );
    }
    if (this.state.error) {
      return <h4>{this.state.error}</h4>;
    }

    if (this.state.posts.length < 1) {
      return <h4>There is NOT any post yet.</h4>;
    }
    return this.state.posts.map(post => {
      return (
        <Fragment key={post._id}>
          <div className="row">
            <div className="column ">
              <h4>{post.title}</h4>
              <h6 className="title">
                {post.author._id === localStorage.getItem('_id')
                  ? post.author.name + ' (Me)'
                  : post.author.name}
              </h6>
              <p>{post.content.substr(0, 120)}.....</p>

              <Link to={'/post/view/' + post._id}>
                <button className="button-primary button-outline">View</button>
              </Link>
            </div>
          </div>
          <hr />
        </Fragment>
      );
    });
  }
}
