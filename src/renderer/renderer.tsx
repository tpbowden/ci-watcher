import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { Main } from "./Main/Main";
import { store } from "./store";

import "typeface-roboto";

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("app")
);
