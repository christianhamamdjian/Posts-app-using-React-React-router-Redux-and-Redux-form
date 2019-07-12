import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import * as Datetime from "react-datetime";
// import "./react-datetime.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
// const handleDate = date => {
//   // this.setState({ date });
//   console.log(date._d.toISOString());
//   const newDate = date._d.toISOString();
//   change("eventDate".date);
// };
class NewPost extends Component {
  handleSave = e => {
    e.preventDefault();
    let payload = this.props.posts.form.newPost.values;
    payload.id = `${Date.now()}`;
    payload.editing = false;
    this.props.onSubmit(payload);
    this.props.history.push("/");
  };
  useStyles = () =>
    makeStyles(theme => ({
      margin: {
        margin: theme.spacing(2)
      }
    }));
  render() {
    const classes = this.useStyles();
    console.log(validate);

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

          {/* <label htmlFor="dateAndTime">Date And Time</label>
          <Datetime name="dateAndTime" onChange={handleDate} /> */}

          <Button type="submit" disabled={this.validate}>
            Save
          </Button>

          <NavLink to="/">
            <Button>Cancel</Button>
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
