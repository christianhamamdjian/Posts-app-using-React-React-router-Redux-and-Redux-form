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
import { Field, reduxForm } from "redux-form";

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  } else if (values.title.length < 4) {
    errors.title = "Must be 4 characters or more";
  }
  if (!values.category) {
    errors.category = "Required";
  } else if (values.category.length < 4) {
    errors.category = "Must be 4 characters or more";
  }

  return errors;
};

// const warn = values => {
//   const warnings = {};
//   if (values.title.length < 4) {
//     warnings.title = "Your title is too short!";
//   }
//   return warnings;
// };

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span className="message">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
const renderTextArea = ({ input, meta: { touched, error, warning } }) => (
  <div>
    <label>Content</label>
    <div>
      <textarea {...input} placeholder="Content" rows="10" cols="40" />
    </div>
  </div>
);
class NewPost extends Component {
  handleSave = e => {
    e.preventDefault();
    let payload = this.props.posts.form.newPost.values;
    payload.id = `${Date.now()}`;
    payload.editing = false;
    this.props.onSubmit(payload);
    this.props.history.push("/");
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="container">
        <form onSubmit={this.handleSave}>
          <Field
            placeholder="Title"
            name="title"
            type="text"
            component={renderField}
            label="Title"
          />

          <Field
            placeholder="Category"
            name="category"
            type="text"
            component={renderField}
            label="Category"
          />

          <Field
            placeholder="Content"
            name="content"
            type="text"
            component={renderTextArea}
            label="Write a new post"
          />

          <button type="submit">Save</button>

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
    onSubmit: payload => dispatch({ type: "ADD_POST", payload })
  };
};

const myForm = reduxForm({
  form: "newPost",
  validate
  // warn
})(NewPost);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myForm);
