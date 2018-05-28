import React from "react";

import "typeface-roboto";

import { render } from "react-dom";
import { MemoryRouter, Route } from "react-router";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ConfigPage from "./pages/ConfigPage";

const App = () => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
          CI Watcher
        </Typography>
      </Toolbar>
    </AppBar>
    <MemoryRouter>
      <Route path="/" render={() => <ConfigPage />} />
    </MemoryRouter>
  </div>
);

render(<App />, document.getElementById("app"));
