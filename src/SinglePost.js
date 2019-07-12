import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import "./App.css";
import { connect } from "react-redux";

class SinglePost extends Component {
  handleDelete = e => {
    const removedId = this.props.myId;
    this.props.handleRemove(removedId);
    this.props.history.push("/");
  };
  useStyles = () =>
    makeStyles(theme => ({
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
      },
      card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      },
      cardMedia: {
        paddingTop: "56.25%" // 16:9
      },
      cardContent: {
        flexGrow: 1
      },
      MuiButtonRoot: {
        backgroundColor: "#ccc"
      }
    }));
  render() {
    const card = this.props.posts.myApp.filter(
      post => post.id === this.props.myId
    )[0];
    const cards = this.props.posts.myApp;
    const classes = this.useStyles();
    return (
      <div>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              <NavLink exact activeStyle={{ color: "orange" }} to="/new-post">
                <Link to="/">Back to post list</Link>
              </NavLink>
            </Typography>
          </Toolbar>
        </AppBar>

        <Card className={classes.card}>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.title} {card.category}
            </Typography>
            <Typography>{card.content}</Typography>
          </CardContent>
          <CardActions>
            <Link key={card.id} to={"/posts/edit/" + card.id}>
              <Button>Edit post</Button>
            </Link>
            <Button onClick={this.handleDelete}>Delete</Button>
          </CardActions>
        </Card>
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
