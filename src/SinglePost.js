import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Prompt,
  Switch
} from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

class SinglePost extends Component {
  handleDelete = e => {
    const removedId = this.props.myId;
    this.props.handleRemove(removedId);
    this.props.history.push("/");
  };
  render() {
    const selectedPost = this.props.posts.myApp.filter(
      post => post.id === this.props.myId
    )[0];

    return (
      <div>
        <Link to="/">Back to post list</Link>

        <div>{this.props.myId}</div>
        <Link key={selectedPost.id} to={"/posts/edit/" + selectedPost.id}>
          <button>Edit post</button>
        </Link>
        <button onClick={this.handleDelete}>Delete</button>
        <ul>
          <li>
            <h2>{selectedPost.title}</h2>
            <h3>{selectedPost.category}</h3>
            <p>{selectedPost.content}</p>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRemove: removed => {
      dispatch({
        type: "DELETE_POST",
        id: removed
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
