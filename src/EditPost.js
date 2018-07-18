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

class EditPost extends Component {
  constructor(props) {
    super(props);

    const selectedPost =
      this.props.posts.myApp.find(post => post.id === props.myId) || {};

    this.state = {
      title: selectedPost.title || "",
      category: selectedPost.category || "",
      content: selectedPost.content || ""
    };
  }

  handleUpdate = e => {
    e.preventDefault();
    const postId = this.props.myId;
    const newTitle = this.state.title;
    const newCategory = this.state.category;
    const newContent = this.state.content;

    const payload = { newTitle, newCategory, newContent };
    console.log(payload);
    this.props.handleSubmit(postId, payload);

    this.props.history.push("/posts/" + postId);
  };

  changeTitle(changedTitle) {
    this.setState({
      title: changedTitle
    });
  }
  changeCategory(changedCategory) {
    this.setState({
      category: changedCategory
    });
  }
  changeContent(changedContent) {
    this.setState({
      content: changedContent
    });
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleUpdate}>
          <label>Title</label>
          <input
            placeholder="Title"
            value={this.state.title}
            onChange={e => this.changeTitle(e.target.value)}
          />

          <label>Category</label>
          <input
            placeholder="Category"
            value={this.state.category}
            onChange={e => this.changeCategory(e.target.value)}
          />

          <label>Write a new post</label>
          <textarea
            rows="5"
            cols="28"
            placeholder="Content"
            value={this.state.content}
            onChange={e => this.changeContent(e.target.value)}
          />

          <button type="submit">Update</button>

          <NavLink to="/">
            <button>Cancel</button>
          </NavLink>
        </form>
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
    handleSubmit: (postId, payload) => {
      dispatch({ type: "UPDATE_POST", id: postId, payload: payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);
