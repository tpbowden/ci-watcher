import React from "react";

import "typeface-roboto";

import { render } from "react-dom";
import { MemoryRouter, Route } from "react-router";

import ConfigPage from "./pages/ConfigPage";

const App = () => (
  <MemoryRouter>
    <Route path="/" render={() => <ConfigPage />} />
  </MemoryRouter>
);

render(<App />, document.getElementById("app"));
