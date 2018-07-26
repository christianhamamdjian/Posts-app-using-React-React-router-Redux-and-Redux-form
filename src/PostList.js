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
import EditPost from "./EditPost";

class PostList extends Component {
  render() {
    return (
      <div>
        <button>
          <NavLink exact activeStyle={{ color: "orange" }} to="/new-post">
            Add post
          </NavLink>
        </button>
        <div>
          <ul>
            {console.log(this.props)}
            {this.props.posts.myApp.map(post => (
              <Link
                className="post-card"
                key={post.id}
                to={"/posts/" + post.id}
              >
                {post.editing ? (
                  <EditPost post={post} key={post.id} />
                ) : (
                  <li>
                    <h1>{post.title}</h1>
                    <h2>{post.category}</h2>
                    <p>{post.content}</p>
                  </li>
                )}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { posts: state };
};

export default connect(mapStateToProps)(PostList);
