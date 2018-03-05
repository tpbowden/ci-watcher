import React from "react";

import "typeface-roboto";

import { render } from "react-dom";
import { MemoryRouter, Route } from "react-router";

import AppBar from "material-ui/AppBar";
import ToolBar from "material-ui/ToolBar";
import Typography from "material-ui/Typography";

import ConfigPage from "./pages/ConfigPage";

const App = () => (
  <div>
    <AppBar position="static">
      <ToolBar>
        <Typography variant="title" color="inherit">
          CI Watcher
        </Typography>
      </ToolBar>
    </AppBar>
    <MemoryRouter>
      <Route path="/" render={() => <ConfigPage />} />
    </MemoryRouter>
  </div>
);

render(<App />, document.getElementById("app"));
