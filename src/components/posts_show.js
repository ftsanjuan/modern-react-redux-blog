import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    // react router provides us the :id in the url
    // through this.props.match.params
    // destructure it to get/assign id
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      // navigate to / after successful deletion
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    // ensure that a loading message is shown
    // if the record has not been loaded yet.
    if(!post) {
      return (
        <div>Loading...</div>
      );
    }

    return(
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
          >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// the argument { posts } is ES6 destructuring
// which retrieves the posts property from the state
// object that is passed in.
// i.e. if state = { posts: postData }, then...
//   { posts } == state.posts
// Note also:  ownProps contains all the properties
// that are heading to this component (including the ones like the
// :id that is passed in via params from react-router).
function mapStateToProps({ posts }, ownProps) {
  // instead of getting all the posts for this component
  // retrieve only the post that matches the id from the url
  // and assign it to this component's 'post' property.
  return {
    post: posts[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);