import React from "react";
import { connect } from "react-redux";
import { MemoryRouter, Route } from "react-router";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Dispatch, State } from "../store";

import { createInitializeApplicationAction } from "./ducks";

interface InnerProps {
  initialized: boolean;
  initializeApplication(): void;
}

class MainComponent extends React.Component<InnerProps> {
  public componentDidMount() {
    this.props.initializeApplication();
  }

  public render() {
    if (!this.props.initialized) {
      return <h1>Loading</h1>;
    }

    return (
      <main>
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
        <MemoryRouter />
      </main>
    );
  }
}

const mapStateToProps = (state: State) => ({
  initialized: state.main.initialized
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initializeApplication: () => dispatch(createInitializeApplicationAction())
});

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
