import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./App.css";

import { connect } from "react-redux";

class PostList extends Component {
  useStyles = () =>
    makeStyles(theme => ({
      icon: {
        marginRight: theme.spacing(2)
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
      },
      heroButtons: {
        marginTop: theme.spacing(4)
      },
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
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
      }
    }));
  render() {
    const cards = this.props.posts.myApp;
    const classes = this.useStyles();

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              <NavLink exact activeStyle={{ color: "orange" }} to="/new-post">
                <Button>Add post</Button>
              </NavLink>
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <div className={classes.heroButtons}>
                <Grid container spacing={4}>
                  {cards.map(card => (
                    <Grid item key={card} xs={12} sm={6} md={6} lg={6} xl={6}>
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
                        </CardContent>
                        <CardActions>
                          <Link
                            className="post-card"
                            key={card.id}
                            to={"/posts/" + card.id}
                          >
                            <Button size="small" color="primary">
                              View
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Container>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { posts: state };
};

export default connect(mapStateToProps)(PostList);
