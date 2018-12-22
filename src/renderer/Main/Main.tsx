import React from "react";
import { connect } from "react-redux";
import { MemoryRouter, Route } from "react-router";
import { compose } from "redux";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import { StyledComponentProps, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { authenticate as authAction } from "../Auth/ducks";
import { Unauthenticated } from "../Auth/Unauthenticated";
import { Dispatch, State } from "../store";

import { initializeApplication } from "./ducks";

interface InnerProps extends StyledComponentProps {
  initialized: boolean;
  authenticate(): void;
  init(): void;
}

const styles = {
  login: {
    margin: 50,
    padding: 20
  },
  loginHeading: {
    marginBottom: 20
  }
};

class MainComponent extends React.Component<InnerProps> {
  public componentDidMount() {
    this.props.init();
  }

  public render() {
    const { authenticate, classes = {}, initialized } = this.props;

    if (!initialized) {
      return <h1>Loading</h1>;
    }

    return (
      <main className={classes.main}>
        <AppBar position="static">
          <Toolbar style={{ display: "flex" }}>
            <Typography style={{ flexGrow: 1 }} variant="title" color="inherit">
              CI Watcher
            </Typography>
            <Button color="inherit">
              <Icon>settings</Icon>
            </Button>
          </Toolbar>
        </AppBar>
        <Unauthenticated>
          <Paper className={classes.login}>
            <Typography
              className={classes.loginHeading}
              variant="headline"
              component="h4"
            >
              Please log in to GitHub to continue
            </Typography>
            <Button variant="outlined" color="primary" onClick={authenticate}>
              Log in with GitHub
            </Button>
          </Paper>
        </Unauthenticated>
        <MemoryRouter />
      </main>
    );
  }
}

const mapStateToProps = (state: State) => ({
  initialized: state.main.initialized
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authenticate: () => dispatch(authAction()),
  init: () => dispatch(initializeApplication())
});

export const Main = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(MainComponent);
